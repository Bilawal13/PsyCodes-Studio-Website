const fs = require('fs');
const path = require('path');

const outputDir = path.resolve(__dirname, '../../public/assets/logo');

// --- MATHEMATICAL GEOMETRIC SYSTEM FOR PSYCODES STUDIO ---
// Grid: 1000 x 1000. Center: (500, 500)
// Symmetry: Perfect bilateral reflection across axis x = 500

// 1. STAR GEOMETRY (The Luminous Core)
// 4-pointed star, 230px total span (from 385 to 615)
// Inner waist at r = 22px, tips at r = 115px
const STAR_POINTS = "500,385 516,484 615,500 516,516 500,615 484,516 385,500 484,484";

// 2. CENTRAL DIAMOND HOUSING
// Outer Diamond: (500,320) -> (680,500) -> (500,680) -> (320,500)
// Inner Aperture (Clean negative space ring around star):
// (500,355) -> (645,500) -> (500,645) -> (355,500)

// 3. WINGS (The Architectural Psi Arms)
// Left Wing Outer Contour:
// From diamond waist (320,500)
// sweeps down to (240,580), curves up through (180,460) to outer tip (140,160)
// Top horizontal cut: (140,160) to (210,160)
// Inner sweep: (210,160) -> (240,240) -> (310,380) -> joins diamond at (375,445)
// Right wing is exact mirror: x' = 1000 - x

// 4. VERTICAL PILLARS (Top Spire & Bottom Pediment)
// Top Spire: Horizontal cap (430,160) to (570,160), down sides (430,230) & (570,230) to diamond apex (500,320)
// Bottom Pediment: Stem from (460,680) & (540,680) down to (460,770) & (540,770)
// Flaring architectural base down to (360,840) to (640,840)

// =========================================================================
// VERSION A: PRIMARY EMBLEM (Architectural Precision, Clean Internal Facets)
// =========================================================================
function getVersionA(theme = 'dark') {
  const isLight = theme === 'light';
  const mainStroke = isLight ? '#0A0E1A' : '#FFFFFF';
  const facetStroke = isLight ? 'rgba(10, 14, 26, 0.4)' : 'rgba(255, 255, 255, 0.45)';
  const bgHousing = isLight ? '#FFFFFF' : '#080C18';
  const cyanColor = '#00DDEB';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="none">
  <defs>
    <filter id="star-glow-${theme}" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="${isLight ? '8' : '14'}" result="blur" />
      <feFlood floodColor="${cyanColor}" floodOpacity="${isLight ? '0.5' : '0.85'}" result="glowColor" />
      <feComposite in="glowColor" in2="blur" operator="in" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Ambient Glow Bloom in Dark Mode -->
  ${!isLight ? `<circle cx="500" cy="500" r="160" fill="${cyanColor}" opacity="0.12" filter="blur(30px)" />` : ''}

  <!-- LEVEL 1 HIERARCHY: Primary Architectural Silhouette (Stroke 18px) -->
  <g stroke="${mainStroke}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round">
    <!-- Top Central Spire Structure -->
    <path d="M 430 160 L 570 160 L 570 230 L 500 320 L 430 230 Z" />
    <line x1="500" y1="160" x2="500" y2="320" stroke-width="10" stroke-opacity="0.6" />

    <!-- Central Diamond Perimeter -->
    <path d="M 500 320 L 680 500 L 500 680 L 320 500 Z" stroke-width="22" />

    <!-- Left Lateral Wing Silhouette -->
    <path d="M 320 500 C 235 550 175 480 160 400 L 140 160 L 210 160 C 240 250 285 360 375 445" />

    <!-- Right Lateral Wing Silhouette (Mathematically Mirrored) -->
    <path d="M 680 500 C 765 550 825 480 840 400 L 860 160 L 790 160 C 760 250 715 360 625 445" />

    <!-- Lower Pediment & Foundation Base -->
    <path d="M 460 680 L 460 765 L 360 840 L 640 840 L 540 765 L 540 680" />
    <line x1="360" y1="840" x2="640" y2="840" stroke-width="24" />
    <line x1="500" y1="680" x2="500" y2="840" stroke-width="10" stroke-opacity="0.6" />
  </g>

  <!-- LEVEL 2 HIERARCHY: Engineered Internal Facets (Stroke 8px, 0.45 Opacity) -->
  <g stroke="${facetStroke}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
    <!-- Left Wing Triangulated Structural Vectors -->
    <line x1="140" y1="160" x2="250" y2="280" />
    <line x1="160" y1="400" x2="250" y2="280" />
    <line x1="160" y1="400" x2="320" y2="500" />
    <line x1="210" y1="160" x2="160" y2="400" />

    <!-- Right Wing Triangulated Structural Vectors (Mirrored) -->
    <line x1="860" y1="160" x2="750" y2="280" />
    <line x1="840" y1="400" x2="750" y2="280" />
    <line x1="840" y1="400" x2="680" y2="500" />
    <line x1="790" y1="160" x2="840" y2="400" />

    <!-- Pediment Cross-Braces -->
    <line x1="460" y1="765" x2="540" y2="765" />
    <line x1="500" y1="680" x2="360" y2="840" />
    <line x1="500" y1="680" x2="640" y2="840" />
  </g>

  <!-- Central Star Aperture Housing (Negative Space Margin) -->
  <path d="M 500 355 L 645 500 L 500 645 L 355 500 Z" fill="${bgHousing}" stroke="${cyanColor}" stroke-opacity="0.25" stroke-width="4" />

  <!-- The Radiant Cyan Star (Core Brand Identity) -->
  <polygon points="${STAR_POINTS}" fill="${cyanColor}" filter="url(#star-glow-${theme})" />
  <circle cx="500" cy="500" r="4.5" fill="#FFFFFF" />
</svg>`;
}

// =========================================================================
// VERSION B: MINIMAL EMBLEM (App Icon, Favicon 32x32, Scalable Reductive Mark)
// =========================================================================
function getVersionB(theme = 'dark') {
  const isLight = theme === 'light';
  const strokeColor = isLight ? '#0A0E1A' : '#FFFFFF';
  const cyanColor = '#00DDEB';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="none">
  <!-- Solid, Bold Architectural Silhouette with zero micro-facet noise (Perfect for 16-64px) -->
  <g stroke="${strokeColor}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round">
    <!-- Top Central Spire -->
    <path d="M 430 160 L 570 160 L 570 240 L 500 320 L 430 240 Z" fill="${isLight ? 'none' : 'rgba(255,255,255,0.03)'}" />

    <!-- Central Rhombus Diamond -->
    <path d="M 500 320 L 680 500 L 500 680 L 320 500 Z" fill="${isLight ? '#FFFFFF' : '#080C18'}" stroke-width="36" />

    <!-- Left Wing Sweep -->
    <path d="M 320 500 C 230 550 170 480 155 390 L 135 160 L 220 160 C 250 260 295 365 375 445" />

    <!-- Right Wing Sweep -->
    <path d="M 680 500 C 770 550 830 480 845 390 L 865 160 L 780 160 C 750 260 705 365 625 445" />

    <!-- Lower Pediment Base -->
    <path d="M 460 680 L 460 760 L 360 840 L 640 840 L 540 760 L 540 680" />
    <line x1="360" y1="840" x2="640" y2="840" stroke-width="38" />
  </g>

  <!-- Refined High-Contrast Core Star -->
  <polygon points="${STAR_POINTS}" fill="${cyanColor}" />
  <circle cx="500" cy="500" r="6" fill="#FFFFFF" />
</svg>`;
}

// =========================================================================
// VERSION C: MONOCHROME EMBLEM (Pure 1-Color Black or White for Print & Laser)
// =========================================================================
function getVersionC(mode = 'white') {
  const isWhite = mode === 'white';
  const fillColor = isWhite ? '#FFFFFF' : '#000000';
  const knockoutColor = isWhite ? '#000000' : '#FFFFFF';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="none">
  <!-- Monolithic Architectural Mark with Negative Space Knockout Star -->
  <g stroke="${fillColor}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round">
    <!-- Top Pillar -->
    <path d="M 430 160 L 570 160 L 570 230 L 500 320 L 430 230 Z" />
    
    <!-- Central Diamond (Solid Fill with Knockout Star Interior) -->
    <path d="M 500 320 L 680 500 L 500 680 L 320 500 Z" fill="${fillColor}" />

    <!-- Left Wing -->
    <path d="M 320 500 C 235 550 175 480 160 400 L 140 160 L 210 160 C 240 250 285 360 375 445" />

    <!-- Right Wing -->
    <path d="M 680 500 C 765 550 825 480 840 400 L 860 160 L 790 160 C 760 250 715 360 625 445" />

    <!-- Pediment -->
    <path d="M 460 680 L 460 765 L 360 840 L 640 840 L 540 765 L 540 680" />
    <line x1="360" y1="840" x2="640" y2="840" stroke-width="32" />
  </g>

  <!-- Knockout 4-Pointed Star (Crisply Cut Out of the Central Diamond Solid) -->
  <polygon points="${STAR_POINTS}" fill="${knockoutColor}" />
  <circle cx="500" cy="500" r="6" fill="${fillColor}" />
</svg>`;
}

// =========================================================================
// VERSION D: COMPLETE WORDMARK (Horizontal & Stacked Lockups)
// =========================================================================
function getVersionDHorizontal(theme = 'dark') {
  const isLight = theme === 'light';
  const textTitle = isLight ? '#0A0E1A' : '#FFFFFF';
  const textSub = isLight ? '#475569' : '#8E9BB0';
  const cyanColor = '#00DDEB';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2800 700" width="100%" height="100%" fill="none">
  <!-- Symbol Locked on Left (Scale: 600x600 placed at x=60, y=50) -->
  <g transform="translate(60, 50) scale(0.6)">
    <!-- Primary Emblem -->
    <g stroke="${textTitle}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 430 160 L 570 160 L 570 230 L 500 320 L 430 230 Z" />
      <line x1="500" y1="160" x2="500" y2="320" stroke-width="12" stroke-opacity="0.6" />
      <path d="M 500 320 L 680 500 L 500 680 L 320 500 Z" stroke-width="24" />
      <path d="M 320 500 C 235 550 175 480 160 400 L 140 160 L 210 160 C 240 250 285 360 375 445" />
      <path d="M 680 500 C 765 550 825 480 840 400 L 860 160 L 790 160 C 760 250 715 360 625 445" />
      <path d="M 460 680 L 460 765 L 360 840 L 640 840 L 540 765 L 540 680" />
      <line x1="360" y1="840" x2="640" y2="840" stroke-width="24" />
      <line x1="500" y1="680" x2="500" y2="840" stroke-width="12" stroke-opacity="0.6" />
    </g>
    <!-- Facets -->
    <g stroke="${isLight ? 'rgba(10,14,26,0.4)' : 'rgba(255,255,255,0.45)'}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
      <line x1="140" y1="160" x2="250" y2="280" />
      <line x1="160" y1="400" x2="250" y2="280" />
      <line x1="160" y1="400" x2="320" y2="500" />
      <line x1="210" y1="160" x2="160" y2="400" />
      <line x1="860" y1="160" x2="750" y2="280" />
      <line x1="840" y1="400" x2="750" y2="280" />
      <line x1="840" y1="400" x2="680" y2="500" />
      <line x1="790" y1="160" x2="840" y2="400" />
      <line x1="460" y1="765" x2="540" y2="765" />
      <line x1="500" y1="680" x2="360" y2="840" />
      <line x1="500" y1="680" x2="640" y2="840" />
    </g>
    <path d="M 500 355 L 645 500 L 500 645 L 355 500 Z" fill="${isLight ? '#FFFFFF' : '#080C18'}" stroke="${cyanColor}" stroke-opacity="0.3" stroke-width="4" />
    <polygon points="${STAR_POINTS}" fill="${cyanColor}" />
    <circle cx="500" cy="500" r="5" fill="#FFFFFF" />
  </g>

  <!-- Typography Lockup: Swiss Geometric Sans -->
  <!-- "PsyCodes" -->
  <text x="760" y="380" font-family="'Sora', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="230" font-weight="800" letter-spacing="-0.03em" fill="${textTitle}">PsyCodes</text>
  
  <!-- "STUDIO" with Wide Architectural Tracking -->
  <text x="770" y="490" font-family="'JetBrains Mono', 'Roboto Mono', monospace" font-size="70" font-weight="600" letter-spacing="0.38em" fill="${textSub}">STUDIO</text>

  <!-- Tagline Metadata Bullet -->
  <circle cx="770" cy="555" r="5" fill="${cyanColor}" />
  <text x="795" y="562" font-family="'JetBrains Mono', monospace" font-size="32" font-weight="500" letter-spacing="0.22em" fill="${cyanColor}">CODE. CREATE. AUTOMATE.</text>
</svg>`;
}

// Generate all standalone production files
fs.writeFileSync(path.join(outputDir, 'psycodes_emblem_primary_dark.svg'), getVersionA('dark'));
fs.writeFileSync(path.join(outputDir, 'psycodes_emblem_primary_light.svg'), getVersionA('light'));
fs.writeFileSync(path.join(outputDir, 'psycodes_emblem_minimal_dark.svg'), getVersionB('dark'));
fs.writeFileSync(path.join(outputDir, 'psycodes_emblem_minimal_light.svg'), getVersionB('light'));
fs.writeFileSync(path.join(outputDir, 'psycodes_emblem_monochrome_white.svg'), getVersionC('white'));
fs.writeFileSync(path.join(outputDir, 'psycodes_emblem_monochrome_black.svg'), getVersionC('black'));
fs.writeFileSync(path.join(outputDir, 'psycodes_wordmark_horizontal_dark.svg'), getVersionDHorizontal('dark'));
fs.writeFileSync(path.join(outputDir, 'psycodes_wordmark_horizontal_light.svg'), getVersionDHorizontal('light'));

// Also update the primary project assets
fs.writeFileSync(path.join(outputDir, 'psycodes_mark.svg'), getVersionA('dark'));
fs.writeFileSync(path.join(outputDir, 'psycodes_mark_light.svg'), getVersionA('light'));

console.log('Successfully generated all professional refined SVG marks in public/assets/logo/');
