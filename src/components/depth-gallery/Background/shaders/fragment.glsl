varying vec2 vUv;

uniform vec3 uBackgroundColor;
uniform vec3 uBlob1Color;
uniform vec3 uBlob2Color;
uniform float uNoiseStrength;
uniform float uBlobRadius;
uniform float uBlobRadiusSecondary;
uniform float uBlobStrength;
uniform float uTime;
uniform float uVelocityIntensity;
uniform sampler2D uCityMap;
uniform float uCityMapStrength;
uniform float uCityMapAspect;
uniform float uViewportAspect;

float random(vec2 coord) {
  return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  // Flat background color
  vec3 color = uBackgroundColor;

  // Blob centers subtely animated
  float animTime = uTime * 0.00028;
  vec2 blob1Center = vec2(
    0.50 + sin(animTime * 1.000) * 0.13 + sin(animTime * 1.618) * 0.05,
    0.48 + cos(animTime * 0.794) * 0.09 + cos(animTime * 1.272) * 0.03
  );
  vec2 blob2Center = vec2(
    0.35 + cos(animTime * 0.927) * 0.11 + cos(animTime * 1.414) * 0.04,
    0.55 + sin(animTime * 1.175) * 0.07 + sin(animTime * 0.618) * 0.03
  );

  // Two blobs: 1 at center, 0 at edge
  float blob1 = smoothstep(uBlobRadius, 0.0, distance(vUv, blob1Center));
  float blob2 = smoothstep(uBlobRadiusSecondary, 0.0, distance(vUv, blob2Center));

  // Soften blob colors toward background before applying
  vec3 blob1SoftColor = mix(uBlob1Color, uBackgroundColor, 0.35);
  vec3 blob2SoftColor = mix(uBlob2Color, uBackgroundColor, 0.35);
  color = mix(color, blob1SoftColor, blob1 * uBlobStrength);
  color = mix(color, blob2SoftColor, blob2 * uBlobStrength);

  // Velocity luminance lift
  color += uVelocityIntensity * 0.10;

  // The Oostende map belongs to the background pass; photographs stay untouched.
  if (uCityMapStrength > 0.0) {
    vec2 mapUv = vUv;
    float aspectRatio = uViewportAspect / uCityMapAspect;
    if (aspectRatio > 1.0) mapUv.y = (mapUv.y - .5) / aspectRatio + .5;
    else mapUv.x = (mapUv.x - .5) * aspectRatio + .5;
    float line = 1.0 - dot(texture2D(uCityMap, mapUv).rgb, vec3(.2126, .7152, .0722));
    float luminance = dot(color, vec3(.2126, .7152, .0722));
    vec3 mapInk = mix(min(color + vec3(.10), vec3(1.0)), color * .35, smoothstep(.08, .45, luminance));
    color = mix(color, mapInk, line * uCityMapStrength);
  }

  // Film grain
  float grain = random(vUv * vec2(1387.13, 947.91)) - 0.5;
  color += grain * uNoiseStrength;
  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
