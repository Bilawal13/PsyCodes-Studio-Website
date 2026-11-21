const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '../../');
const bannerDir = path.resolve(rootDir, 'public/assets/banner');
const brandingDir = path.resolve(rootDir, 'public/assets/branding');
const logoDir = path.resolve(rootDir, 'public/assets/logo');
const scratchDir = __dirname;

[bannerDir, brandingDir, logoDir, scratchDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Paths from mathematical grid (1000x1000 coordinate system)
const PSI_OUTER_PATH = 'M 60 160 C 90 280 120 420 180 540 C 230 640 280 690 380 720 L 380 790 L 320 850 L 680 850 L 620 790 L 620 720 C 720 690 770 640 820 540 C 880 420 910 280 940 160 C 890 190 840 250 800 340 C 760 430 720 500 650 540 C 630 460 630 310 630 160 L 370 160 C 370 310 370 460 350 540 C 280 500 240 430 200 340 C 160 250 110 190 60 160 Z';
const DIAMOND_PATH = 'M 500 370 L 630 500 L 500 630 L 370 500 Z';
const STAR_PATH = 'M 500 420 Q 500 475 525 475 Q 525 500 580 500 Q 525 500 525 525 Q 500 525 500 580 Q 500 525 475 525 Q 475 500 420 500 Q 475 500 475 475 Q 500 475 500 420 Z';

const FACET_LINES = [
  'M 370 160 L 500 230 L 630 160',
  'M 500 230 L 500 370',
  'M 370 160 L 500 370 L 630 160',
  'M 500 630 L 500 790',
  'M 380 720 L 500 630 L 620 720',
  'M 380 790 L 500 850 L 620 790',
  'M 60 160 L 200 340',
  'M 940 160 L 800 340',
  'M 200 340 L 350 540',
  'M 800 340 L 650 540',
  'M 180 540 L 370 500',
  'M 820 540 L 630 500',
  'M 280 690 L 500 630',
  'M 720 690 L 500 630'
];

// Helper to generate the emblem SVG snippet
function generateEmblemSvg(isDark, size = 600, strokeWidth = 18, facetWidth = 8) {
  const outerStroke = isDark ? '#FFFFFF' : '#080C18';
  const facetStroke = isDark ? '#FFFFFF' : '#080C18';
  const facetOpacity = isDark ? '0.45' : '0.40';
  const glowFilter = isDark ? 'filter="url(#dark-core-glow)"' : '';

  return `
    <g transform="scale(${size / 1000})">
      <defs>
        ${isDark ? `
        <filter id="dark-core-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="35" result="blur1" />
          <feGaussianBlur stdDeviation="70" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="star-radial-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#00F2FE" stop-opacity="1" />
          <stop offset="70%" stop-color="#00DDEB" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#00B8D9" stop-opacity="0.75" />
        </radialGradient>
        ` : `
        <radialGradient id="star-radial-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#00DDEB" stop-opacity="1" />
          <stop offset="100%" stop-color="#00B8D9" stop-opacity="0.85" />
        </radialGradient>
        `}
      </defs>

      <!-- Outer Psi Architectural Contour -->
      <path d="${PSI_OUTER_PATH}" fill="none" stroke="${outerStroke}" stroke-width="${strokeWidth}" stroke-linejoin="round" stroke-linecap="round" />

      <!-- Internal Engineering Facets -->
      <g stroke="${facetStroke}" stroke-width="${facetWidth}" stroke-linecap="round" stroke-linejoin="round" opacity="${facetOpacity}">
        ${FACET_LINES.map(line => `<path d="${line}" fill="none" />`).join('\n        ')}
      </g>

      <!-- Central Diamond Structure -->
      <path d="${DIAMOND_PATH}" fill="none" stroke="${outerStroke}" stroke-width="${strokeWidth}" stroke-linejoin="round" />

      <!-- Glowing Radiant Cyan Star -->
      <path d="${STAR_PATH}" fill="url(#star-radial-core)" stroke="#00DDEB" stroke-width="3" ${glowFilter} />
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
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.38" />
      <stop offset="35%" stop-color="#00DDEB" stop-opacity="0.18" />
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

  <!-- Technical Dimension / Construction Schematic Overlay -->
  <g stroke="#00DDEB" stroke-opacity="0.22" stroke-width="1" stroke-dasharray="4,4">
    <!-- Top & Bottom bounds for emblem -->
    <line x1="80" y1="200" x2="840" y2="200" />
    <line x1="80" y1="880" x2="840" y2="880" />
    <!-- Vertical center line -->
    <line x1="450" y1="120" x2="450" y2="960" />
    <!-- Dimension arrows / tick marks -->
    <path d="M 100 180 L 100 220 M 800 180 L 800 220" stroke="#00DDEB" stroke-opacity="0.35" stroke-width="1.5" />
  </g>

  <!-- Subtle CAD Technical Labels -->
  <g fill="#00DDEB" fill-opacity="0.45" font-family="'Space Grotesk', 'JetBrains Mono', monospace" font-size="11" letter-spacing="2">
    <text x="110" y="195">SYS.COORD // LAT-450:540</text>
    <text x="110" y="875">SCALE: 1:1 METRIC SPEC</text>
    <text x="460" y="150">AXIS: BILATERAL 500px</text>
  </g>

  <!-- Orb Glow behind Star -->
  <circle cx="450" cy="540" r="320" fill="url(#orb-ambient)" />

  <!-- Emblem Placement (Left Center at 450, 540) -->
  <g transform="translate(110, 200)">
    ${generateEmblemSvg(true, 680, 16, 7)}
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

  <!-- Subtle CAD Technical Labels -->
  <g fill="#00838F" fill-opacity="0.55" font-family="'Space Grotesk', 'JetBrains Mono', monospace" font-size="11" letter-spacing="2">
    <text x="110" y="195">SYS.COORD // LAT-450:540</text>
    <text x="110" y="875">SCALE: 1:1 METRIC SPEC</text>
    <text x="460" y="150">AXIS: BILATERAL 500px</text>
  </g>

  <!-- Emblem Placement (Left Center at 450, 540) -->
  <g transform="translate(110, 200)">
    ${generateEmblemSvg(false, 680, 16, 7)}
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
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.3" />
      <stop offset="50%" stop-color="#00DDEB" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#080C18" stop-opacity="0" />
    </radialGradient>
    <circle cx="512" cy="512" r="380" fill="url(#av-glow)" />
  ` : ''}
  <rect x="32" y="32" width="960" height="960" rx="200" fill="none" stroke="${border}" stroke-width="4" />
  <g transform="translate(162, 162)">
    ${generateEmblemSvg(isDark, 700, 18, 8)}
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

// Transparent Logo PNG render HTML
const transparentLogoDarkSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="900" height="900">
  ${generateEmblemSvg(true, 900, 18, 8)}
</svg>`;

const transparentLogoLightSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="900" height="900">
  ${generateEmblemSvg(false, 900, 18, 8)}
</svg>`;

fs.writeFileSync(
  path.join(scratchDir, 'render_logo_trans_dark.html'),
  createRenderHtml('Transparent Logo Dark', 'transparent', transparentLogoDarkSvg, 1024, 1024)
);

fs.writeFileSync(
  path.join(scratchDir, 'render_logo_trans_light.html'),
  createRenderHtml('Transparent Logo Light', 'transparent', transparentLogoLightSvg, 1024, 1024)
);

console.log('SVG and Render HTML pages successfully created!');
