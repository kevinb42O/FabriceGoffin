import * as THREE from 'three';
import { Gallery } from './Gallery.js';
import { Scroll } from './Scroll.js';
import { Background } from './Background/index.js';
import { TrailController } from './TrailController.js';

// The original demo's physics, with native page position as its input so the
// gallery can hand scrolling back to the rest of the homepage at either end.
class PageScroll extends Scroll {
  createVelocityVisualizer() {}
  updateVelocityVisualizer() {}
}

export class PortfolioEngine {
  constructor(canvas, data, onIndex, onError, options = {}) {
    this.canvas = canvas;
    this.onIndex = onIndex;
    this.onError = onError;
    this.options = options;
    this.onPhase = null;
    this.onPhotoFrame = null;
    this.disposed = false;
    this.initialized = false;
    this.enabled = false;
    this.frame = 0;
    this.index = -1;
    this.target = 0;
    this.departure = 0;
    this.onFirstFrame = null;
    this.onPresentationFrame = null;
    this.lastPresentation = null;
    this.hasRendered = false;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, .1, 100);
    this.camera.position.set(0, 0, 6);
    this.gallery = new Gallery(data);
    this.background = new Background();
    this.trail = new TrailController({ gallery: this.gallery });
    this.scroll = new PageScroll(this.camera, this.gallery);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.autoClear = false;
    this.textures = new Map();
    this.videos = new Map();
    this.onVisibility = () => { this.syncVideo(); this.schedule(); };
    this.onContextLost = () => { this.setEnabled(false); this.onError(); };
    this.tick = this.tick.bind(this);
  }

  async init() {
    const loader = new THREE.TextureLoader();
    const map = this.options.mapSource ? loader.loadAsync(this.options.mapSource).then(texture => {
      if (this.disposed) { texture.dispose(); return; }
      texture.colorSpace = THREE.SRGBColorSpace;
      this.background.setCityMap(texture);
    }).catch(() => undefined) : Promise.resolve();
    await Promise.all([map, ...this.gallery.getTextureSources().map(async source => {
      const texture = await loader.loadAsync(source);
      if (this.disposed) { texture.dispose(); return; }
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.set(source, texture);
    })]);
    if (this.disposed) return;
    this.gallery.setPreloadedTextures(this.textures);
    await this.gallery.init(this.scene);
    this.background.init();
    this.scroll.init();
    this.setPosition(this.target, true);
    this.trail.init(this.scene, this.camera);
    this.initialized = true;
    this.resize();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.canvas);
    document.addEventListener('visibilitychange', this.onVisibility);
    this.canvas.addEventListener('webglcontextlost', this.onContextLost);
    this.schedule();
  }

  resize() {
    const { clientWidth: width, clientHeight: height } = this.canvas;
    if (!width || !height || this.disposed) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.background.setViewport(width, height);
    this.gallery.updatePlaneScale();
    this.gallery.layoutPlanes();
  }

  setPosition(phase, immediate = false) {
    this.target = THREE.MathUtils.clamp(phase, 0, this.gallery.planeConfig.length - 1);
    // Five world units per item, 0.01 world units per input pixel: demo values.
    this.scroll.scrollTarget = this.target * this.gallery.planeGap / this.scroll.scrollToWorldFactor;
    if (immediate) {
      this.scroll.scrollCurrent = this.scroll.scrollTarget;
      this.scroll.previousScrollCurrent = this.scroll.scrollCurrent;
      this.scroll.velocity = 0;
      this.camera.position.z = this.scroll.cameraZFromScroll(this.scroll.scrollCurrent);
    }
  }

  setDeparture(progress) {
    this.departure = THREE.MathUtils.clamp(progress, 0, 1);
  }

  setEnabled(enabled) {
    if (enabled && !this.enabled && this.initialized) this.setPosition(this.target, true);
    this.enabled = enabled;
    this.syncVideo();
    this.schedule();
  }

  // Only the shared desktop handoff uses this; standalone/mobile defaults stay intact.
  setPresentation(revealed, strength = 1) {
    this.scene.visible = revealed;
    if (!revealed && this.initialized) this.setPosition(0, true);
    this.gallery.parallaxAmountX = .16 * strength;
    this.gallery.parallaxAmountY = .08 * strength;
    this.gallery.breathScaleAmount = .03 * strength;
    this.gallery.breathTiltAmount = .045 * strength;
    this.gallery.gestureParallaxAmountY = .05 * strength;
  }

  getRestingImageFrame(index) {
    const plane = this.gallery.planes[index];
    if (!plane || !this.canvas.clientWidth || !this.canvas.clientHeight) return null;
    const height = 2 * Math.tan(this.camera.fov * Math.PI / 360) * this.scroll.firstPlaneViewOffset;
    const width = height * this.camera.aspect;
    const scale = plane.userData.desktopScale ?? this.gallery.desktopPlaneScale;
    const imageHeight = 3 * scale;
    const imageWidth = imageHeight * plane.userData.aspectRatio;
    return {
      left: (0.5 + (plane.userData.basePosition.x - imageWidth / 2) / width) * 100,
      top: (0.5 - (plane.userData.basePosition.y + imageHeight / 2) / height) * 100,
      width: imageWidth / width * 100,
      height: imageHeight / height * 100,
    };
  }

  // Keep the existing 3D planes and transitions; only swap their image map for
  // a video texture. Download and decode a movie only when its card is active.
  syncVideo() {
    const playingIndex = this.enabled && !this.disposed && !document.hidden ? this.index : -1;
    for (const [index, entry] of this.videos) {
      if (index === playingIndex) continue;
      if (entry.frameRequest !== null) {
        entry.video.cancelVideoFrameCallback(entry.frameRequest);
        entry.frameRequest = null;
      }
      entry.video.pause();
      if (entry.video.readyState >= 1) entry.video.currentTime = 0;
      this.restorePoster(index);
    }
    const definition = this.gallery.planeConfig[playingIndex];
    if (!definition?.videoSrc) return;
    let entry = this.videos.get(playingIndex);
    if (!entry) {
      const video = document.createElement('video');
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'none';
      // Keep the decoder composited. A hidden video inside the canvas fallback
      // subtree can advance its clock without delivering frames to WebGL.
      Object.assign(video.style, { position: 'fixed', top: '0', left: '0', width: '1px', height: '1px', opacity: '.001', pointerEvents: 'none' });
      video.dataset.portfolioVideo = String(playingIndex);
      video.dataset.portfolioFrameReady = 'false';
      video.setAttribute('aria-hidden', 'true');
      const texture = new THREE.VideoTexture(video);
      texture.colorSpace = THREE.SRGBColorSpace;
      entry = { video, texture, failed: false, pending: false, frameRequest: null };
      this.videos.set(playingIndex, entry);
      const present = () => {
        entry.frameRequest = null;
        if (this.disposed || !this.enabled || document.hidden || this.index !== playingIndex || video.paused || video.seeking || video.readyState < 2) return;
        // `playing` alone does not guarantee a frame has reached the compositor.
        // Upload the decoded frame before replacing the known-good poster.
        texture.needsUpdate = true;
        const plane = this.gallery.planes[playingIndex];
        plane.userData.texture = texture;
        plane.material.map = texture;
        plane.material.needsUpdate = true;
        video.dataset.portfolioFrameReady = 'true';
      };
      const awaitFrame = () => {
        if (entry.frameRequest !== null || video.paused || video.seeking) return;
        if ('requestVideoFrameCallback' in video) entry.frameRequest = video.requestVideoFrameCallback(present);
        else present();
      };
      video.addEventListener('playing', awaitFrame);
      video.addEventListener('seeked', awaitFrame);
      video.addEventListener('waiting', () => this.restorePoster(playingIndex));
      video.addEventListener('seeking', () => this.restorePoster(playingIndex));
      video.addEventListener('error', () => {
        entry.failed = true;
        this.restorePoster(playingIndex);
      });
      document.body.appendChild(video);
      video.src = definition.videoSrc;
    }
    if (entry.failed || entry.pending || !entry.video.paused) return;
    entry.pending = true;
    entry.video.play().then(() => {
      if (this.disposed || !this.enabled || document.hidden || this.index !== playingIndex) entry.video.pause();
    }).catch(() => this.restorePoster(playingIndex)).finally(() => { entry.pending = false; });
  }

  restorePoster(index) {
    if (this.disposed) return;
    const video = this.videos.get(index)?.video;
    if (video) video.dataset.portfolioFrameReady = 'false';
    const plane = this.gallery.planes[index];
    if (!plane) return;
    const poster = this.textures.get(this.gallery.planeConfig[index].textureSrc);
    plane.userData.texture = poster;
    plane.material.map = poster;
    plane.material.needsUpdate = true;
  }

  schedule() {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
    if (this.initialized && this.enabled && !this.disposed && !document.hidden) this.frame = requestAnimationFrame(this.tick);
  }

  tick(time) {
    this.frame = 0;
    if (this.disposed || !this.enabled || document.hidden) return;
    this.scroll.update();
    this.trail.update(this.camera, this.scroll, time);
    this.gallery.update(this.camera, this.scroll);
    const blend = this.gallery.getPlaneBlendData(this.camera.position.z);
    this.onPhase?.(blend.currentPlaneIndex + blend.blend);
    const index = blend.blend >= .5 ? blend.nextPlaneIndex : blend.currentPlaneIndex;
    if (index !== this.index) { this.index = index; this.onIndex(index); this.syncVideo(); }
    const mood = this.gallery.getMoodBlendData(this.camera.position.z);
    if (mood) this.background.setMoodBlend(mood);
    const distanceFromCenter = Math.abs(blend.blend - .5) * 2;
    this.background.setMotionResponse({
      depthProgress: this.gallery.getDepthProgress(this.camera.position.z),
      velocityIntensity: THREE.MathUtils.clamp(Math.abs(this.scroll.velocity) / this.scroll.velocityMax, 0, 1)
        * THREE.MathUtils.smoothstep(distanceFromCenter, .35, 1),
    });
    this.background.update(time);
    this.renderer.clear(true, true, true);
    this.background.render(this.renderer);
    this.renderer.clearDepth();
    // Recede only the photographic scene. The atmospheric background stays
    // edge-to-edge; scaling the canvas itself would expose a rectangular seam.
    const departure = this.departure;
    const restingY = this.camera.position.y;
    const restingZoom = this.camera.zoom;
    if (departure) {
      this.camera.zoom = restingZoom * (1 - .06 * departure);
      this.camera.position.y = restingY + .14 * departure;
      this.camera.updateProjectionMatrix();
    }
    this.renderer.render(this.scene, this.camera);
    // Report the actual rendered Justice4Animals plane, including camera
    // damping, pointer tilt and breathing, for the heading's photo ink mask.
    if (this.onPhotoFrame) {
      const plane = this.gallery.planes[2];
      const opacity = this.scene.visible && plane && this.camera.position.z - plane.position.z > this.camera.near ? plane.material.opacity : 0;
      const corners = opacity > .001 ? [[-1.5, 1.5], [1.5, 1.5], [1.5, -1.5], [-1.5, -1.5]].map(([x, y]) => {
        const point = new THREE.Vector3(x, y, 0).applyMatrix4(plane.matrixWorld).project(this.camera);
        return { x: (point.x + 1) * this.canvas.clientWidth / 2, y: (1 - point.y) * this.canvas.clientHeight / 2 };
      }) : [];
      this.onPhotoFrame(corners, opacity);
    }
    if (departure) {
      this.camera.zoom = restingZoom;
      this.camera.position.y = restingY;
      this.camera.updateProjectionMatrix();
      this.camera.updateMatrixWorld();
    }
    if (!this.hasRendered) { this.hasRendered = true; this.onFirstFrame?.(); }
    if (this.lastPresentation !== this.scene.visible) {
      this.lastPresentation = this.scene.visible;
      this.onPresentationFrame?.(this.scene.visible);
    }
    this.frame = requestAnimationFrame(this.tick);
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    for (const { video, texture, frameRequest } of this.videos.values()) {
      if (frameRequest !== null) video.cancelVideoFrameCallback(frameRequest);
      video.pause();
      video.removeAttribute('src');
      video.load();
      video.remove();
      texture.dispose();
    }
    this.videos.clear();
    cancelAnimationFrame(this.frame);
    this.resizeObserver?.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.scroll.dispose();
    this.gallery.dispose();
    this.trail.dispose();
    this.background.dispose();
    const geometries = new Set();
    this.gallery.planes.forEach(plane => { geometries.add(plane.geometry); plane.material.dispose(); });
    geometries.forEach(geometry => geometry.dispose());
    this.textures.forEach(texture => texture.dispose());
    this.textures.clear();
    this.scene.clear();
    this.renderer.dispose();
  }
}
