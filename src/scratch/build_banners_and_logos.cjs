const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../../');
const bannerDir = path.resolve(rootDir, 'public/assets/banner');
const brandingDir = path.resolve(rootDir, 'public/assets/branding');
const logoDir = path.resolve(rootDir, 'public/assets/logo');
const scratchDir = __dirname;

[bannerDir, brandingDir, logoDir, scratchDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Helper to generate the EXACT emblem SVG from psycodes_emblem_minimal_dark.svg
function generateExactEmblemSvg(isDark, size = 600) {
  const strokeColor = isDark ? '#FFFFFF' : '#080C18';
  const diamondFill = isDark ? '#080C18' : '#FFFFFF';
  const spireFill = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const starFill = '#00DDEB';
  const pipFill = isDark ? '#FFFFFF' : '#080C18';
  const glowFilter = isDark ? 'filter="url(#emblem-star-glow)"' : '';

  return `
    <g transform="scale(${size / 1000})">
      <defs>
        ${isDark ? `
        <filter id="emblem-star-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="24" result="blur1" />
          <feGaussianBlur stdDeviation="48" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        ` : ''}
      </defs>

      <g stroke="${strokeColor}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round">
        <!-- Top Central Spire -->
        <path d="M 430 160 L 570 160 L 570 240 L 500 320 L 430 240 Z" fill="${spireFill}" />

        <!-- Central Rhombus Diamond -->
        <path d="M 500 320 L 680 500 L 500 680 L 320 500 Z" fill="${diamondFill}" stroke-width="36" />

        <!-- Left Wing Sweep -->
        <path d="M 320 500 C 230 550 170 480 155 390 L 135 160 L 220 160 C 250 260 295 365 375 445" />

        <!-- Right Wing Sweep -->
        <path d="M 680 500 C 770 550 830 480 845 390 L 865 160 L 780 160 C 750 260 705 365 625 445" />

        <!-- Lower Pediment Base -->
        <path d="M 460 680 L 460 760 L 360 840 L 640 840 L 540 760 L 540 680" />
        <line x1="360" y1="840" x2="640" y2="840" stroke-width="38" />
      </g>

      <!-- Refined High-Contrast Core Star -->
      <polygon points="500,385 516,484 615,500 516,516 500,615 484,516 385,500 484,484" fill="${starFill}" ${glowFilter} />
      <circle cx="500" cy="500" r="6" fill="${pipFill}" />
    </g>
  `;
}

// 1. Build Banner Dark (1920x1080)
function buildBannerDarkSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bg-glow" cx="24%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#0E172E" />
      <stop offset="40%" stop-color="#070C1A" />
      <stop offset="100%" stop-color="#04060C" />
    </radialGradient>

    <!-- Star Radiant Ambient Aura -->
    <radialGradient id="orb-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.42" />
      <stop offset="35%" stop-color="#00DDEB" stop-opacity="0.20" />
      <stop offset="70%" stop-color="#4263EB" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#080C18" stop-opacity="0" />
    </radialGradient>

    <!-- Blueprint Grid Pattern -->
    <pattern id="cad-grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0, 221, 235, 0.07)" stroke-width="1" />
    </pattern>
    <pattern id="cad-grid-major" width="240" height="240" patternUnits="userSpaceOnUse">
      <rect width="240" height="240" fill="url(#cad-grid)" />
      <path d="M 240 0 L 0 0 0 240" fill="none" stroke="rgba(66, 99, 235, 0.16)" stroke-width="1.5" />
    </pattern>
  </defs>

  <!-- Deep Canvas Background -->
  <rect width="1920" height="1080" fill="url(#bg-glow)" />

  <!-- Blueprint CAD Overlay -->
  <rect width="1920" height="1080" fill="url(#cad-grid-major)" />

  <!-- Technical Construction Guides -->
  <g stroke="#00DDEB" stroke-opacity="0.22" stroke-width="1" stroke-dasharray="4,4">
    <line x1="80" y1="200" x2="840" y2="200" />
    <line x1="80" y1="880" x2="840" y2="880" />
    <line x1="450" y1="120" x2="450" y2="960" />
    <path d="M 100 180 L 100 220 M 800 180 L 800 220" stroke="#00DDEB" stroke-opacity="0.35" stroke-width="1.5" />
  </g>

  <!-- Technical Dimension Labels -->
  <g fill="#00DDEB" fill-opacity="0.45" font-family="'Space Grotesk', 'JetBrains Mono', monospace" font-size="11" letter-spacing="2">
    <text x="110" y="195">SYS.COORD // LAT-450:540</text>
    <text x="110" y="875">SCALE: 1:1 METRIC SPEC</text>
    <text x="460" y="150">AXIS: BILATERAL 500px</text>
  </g>

  <!-- Orb Glow behind Star -->
  <circle cx="450" cy="540" r="320" fill="url(#orb-ambient)" />

  <!-- EXACT Emblem Placement (Left Center at 450, 540) -->
  <g transform="translate(110, 200)">
    ${generateExactEmblemSvg(true, 680)}
  </g>

  <!-- Brand Typography Lockup (Right Side) -->
  <g transform="translate(900, 430)">
    <!-- Main Studio Title -->
    <text x="0" y="0" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="140" font-weight="800" letter-spacing="-2">PsyCodes</text>
    
    <!-- STUDIO Sub-word -->
    <text x="590" y="65" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="44" font-weight="700" letter-spacing="18" text-anchor="end">STUDIO</text>

    <!-- Dividing Technical Rule -->
    <line x1="0" y1="110" x2="840" y2="110" stroke="#00DDEB" stroke-opacity="0.25" stroke-width="1.5" />

    <!-- Tagline: CODE. CREATE. AUTOMATE. -->
    <text x="2" y="170" fill="#FFFFFF" font-family="'Space Grotesk', 'Inter', sans-serif" font-size="34" font-weight="700" letter-spacing="4">CODE. CREATE. AUTOMATE.</text>

    <!-- Sub-tagline: Disciplines -->
    <text x="2" y="225" fill="#8E9CB8" font-family="'Space Grotesk', 'Inter', sans-serif" font-size="20" font-weight="600" letter-spacing="3">AI ARCHITECTURE • MOBILE &amp; WEB PLATFORMS • INTERACTIVE 3D LABS</text>
  </g>
</svg>`;
}

// 2. Build Banner Light (1920x1080)
function buildBannerLightSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <!-- Blueprint Grid Pattern Light -->
    <pattern id="cad-grid-light" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0, 0, 0, 0.035)" stroke-width="1" />
    </pattern>
    <pattern id="cad-grid-major-light" width="240" height="240" patternUnits="userSpaceOnUse">
      <rect width="240" height="240" fill="url(#cad-grid-light)" />
      <path d="M 240 0 L 0 0 0 240" fill="none" stroke="rgba(0, 0, 0, 0.06)" stroke-width="1.5" />
    </pattern>
  </defs>

  <!-- Crisp White Canvas Background -->
  <rect width="1920" height="1080" fill="#FFFFFF" />

  <!-- Blueprint CAD Overlay Light -->
  <rect width="1920" height="1080" fill="url(#cad-grid-major-light)" />

  <!-- Technical Construction Guides -->
  <g stroke="#00B8D9" stroke-opacity="0.25" stroke-width="1" stroke-dasharray="4,4">
    <line x1="80" y1="200" x2="840" y2="200" />
    <line x1="80" y1="880" x2="840" y2="880" />
    <line x1="450" y1="120" x2="450" y2="960" />
    <path d="M 100 180 L 100 220 M 800 180 L 800 220" stroke="#00B8D9" stroke-opacity="0.4" stroke-width="1.5" />
  </g>

  <!-- Technical Dimension Labels -->
  <g fill="#00838F" fill-opacity="0.55" font-family="'Space Grotesk', 'JetBrains Mono', monospace" font-size="11" letter-spacing="2">
    <text x="110" y="195">SYS.COORD // LAT-450:540</text>
    <text x="110" y="875">SCALE: 1:1 METRIC SPEC</text>
    <text x="460" y="150">AXIS: BILATERAL 500px</text>
  </g>

  <!-- EXACT Emblem Placement (Left Center at 450, 540) -->
  <g transform="translate(110, 200)">
    ${generateExactEmblemSvg(false, 680)}
  </g>

  <!-- Brand Typography Lockup (Right Side) -->
  <g transform="translate(900, 430)">
    <!-- Main Studio Title -->
    <text x="0" y="0" fill="#080C18" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="140" font-weight="800" letter-spacing="-2">PsyCodes</text>
    
    <!-- STUDIO Sub-word -->
    <text x="590" y="65" fill="#080C18" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="44" font-weight="700" letter-spacing="18" text-anchor="end">STUDIO</text>

    <!-- Dividing Technical Rule -->
    <line x1="0" y1="110" x2="840" y2="110" stroke="#00B8D9" stroke-opacity="0.3" stroke-width="1.5" />

    <!-- Tagline: CODE. CREATE. AUTOMATE. -->
    <text x="2" y="170" fill="#080C18" font-family="'Space Grotesk', 'Inter', sans-serif" font-size="34" font-weight="700" letter-spacing="4">CODE. CREATE. AUTOMATE.</text>

    <!-- Sub-tagline: Disciplines -->
    <text x="2" y="225" fill="#4A5568" font-family="'Space Grotesk', 'Inter', sans-serif" font-size="20" font-weight="600" letter-spacing="3">AI ARCHITECTURE • MOBILE &amp; WEB PLATFORMS • INTERACTIVE 3D LABS</text>
  </g>
</svg>`;
}

// 3. Build HTML Render Pages for Headless Chrome Rasterization
function createRenderHtml(title, bg, content, width, height) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: ${width}px;
      height: ${height}px;
      overflow: hidden;
      background: ${bg};
    }
    .wrapper {
      width: ${width}px;
      height: ${height}px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    ${content}
  </div>
</body>
</html>`;
}

// 4. Build Standalone Avatar SVGs
function buildAvatarSvg(isDark) {
  const bg = isDark ? '#080C18' : '#FFFFFF';
  const border = isDark ? 'rgba(0, 221, 235, 0.25)' : 'rgba(0, 0, 0, 0.08)';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" fill="${bg}" />
  ${isDark ? `
    <radialGradient id="av-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.35" />
      <stop offset="50%" stop-color="#00DDEB" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#080C18" stop-opacity="0" />
    </radialGradient>
    <circle cx="512" cy="512" r="380" fill="url(#av-glow)" />
  ` : ''}
  <rect x="32" y="32" width="960" height="960" rx="200" fill="none" stroke="${border}" stroke-width="4" />
  <g transform="translate(162, 162)">
    ${generateExactEmblemSvg(isDark, 700)}
  </g>
</svg>`;
}

// Write SVG assets
console.log('Writing Banner & Avatar SVGs...');
fs.writeFileSync(path.join(bannerDir, 'psycodes_banner_dark.svg'), buildBannerDarkSvg());
fs.writeFileSync(path.join(bannerDir, 'psycodes_banner_light.svg'), buildBannerLightSvg());
fs.writeFileSync(path.join(brandingDir, 'psycodes_avatar.svg'), buildAvatarSvg(true));
fs.writeFileSync(path.join(brandingDir, 'psycodes_avatar_light.svg'), buildAvatarSvg(false));

// Prepare HTML files for pixel-perfect Chrome rendering
fs.writeFileSync(
  path.join(scratchDir, 'render_banner_dark.html'),
  createRenderHtml('Banner Dark', '#04060C', buildBannerDarkSvg(), 1920, 1080)
);

fs.writeFileSync(
  path.join(scratchDir, 'render_banner_light.html'),
  createRenderHtml('Banner Light', '#FFFFFF', buildBannerLightSvg(), 1920, 1080)
);

fs.writeFileSync(
  path.join(scratchDir, 'render_avatar_dark.html'),
  createRenderHtml('Avatar Dark', '#080C18', buildAvatarSvg(true), 1024, 1024)
);

fs.writeFileSync(
  path.join(scratchDir, 'render_avatar_light.html'),
  createRenderHtml('Avatar Light', '#FFFFFF', buildAvatarSvg(false), 1024, 1024)
);

// Transparent Logo PNG render HTML with EXACT SVG
const transparentLogoDarkSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="900" height="900" fill="none">
  ${generateExactEmblemSvg(true, 900)}
</svg>`;

const transparentLogoLightSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="900" height="900" fill="none">
  ${generateExactEmblemSvg(false, 900)}
</svg>`;

fs.writeFileSync(
  path.join(scratchDir, 'render_logo_trans_dark.html'),
  createRenderHtml('Transparent Logo Dark', 'transparent', transparentLogoDarkSvg, 1024, 1024)
);

fs.writeFileSync(
  path.join(scratchDir, 'render_logo_trans_light.html'),
  createRenderHtml('Transparent Logo Light', 'transparent', transparentLogoLightSvg, 1024, 1024)
);

console.log('SVG and Render HTML pages successfully created with exact SVG emblem!');
