# DepthGallery integration

Fabrice Goffin integration: ported from the user's local Webaanzee project on 27 October 2026, at the user's request to present the six homepage priorities like Webaanzee's projects. `HomeStandpuntenPreview.tsx` supplies the real priorities, continuous native-scroll camera movement, responsive sizing, controls and semantic fallback. The engine is dynamically imported near this section and runs only while its stage is visible. No demo content is included. Disposal is idempotent so a loading failure and later unmount can safely share cleanup.

Based on [Atmospheric Depth Gallery](https://github.com/houmahani/codrops-depth-gallery) by Houmahani Kane for Codrops, MIT licensed (see LICENSE). Upstream revision: 28190e0920df887f069524c3863db397af34c1c8.

Gallery, Scroll, Background (including GLSL), TrailController, Trail and TrailHeadParticles retain the reference's camera/plane spacing, opacity blending, smoothing, pointer parallax, gesture drift, breath, atmospheric noise and trail. Imports are local; Gallery receives the portfolio data rather than importing flower assets.

PortfolioEngine replaces the standalone engine and debug UI. It connects native document scroll to the original Scroll model, scopes the renderer to the sticky home stage, pauses it outside the showcase or in a hidden tab, and disposes GPU resources on unmount. The editorial labels are React components populated from the existing case data. No demo imagery, advertisements or debug panels are shipped.

Project videos play as video textures on the existing gallery planes. Their sources are loaded only when the project becomes active; playback pauses when another card is selected, the gallery leaves the viewport, or the tab is hidden. Posters remain available during loading and media errors. The engine releases video sources and textures on disposal.
