const fs = require('fs');
const path = require('path');

// We will construct mathematical vectors for the refined PsyCodes Studio emblem
// Canvas size: 1000 x 1000, Center: (500, 500)

function generateSVGs() {
  const outputDir = path.resolve(__dirname, '../../public/assets/logo');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // --- MATHEMATICAL GEOMETRY DEFINITIONS ---
  // Center: 500, 500
  // Central Diamond Outer:
  // Top: (500, 320), Right: (680, 500), Bottom: (500, 680), Left: (320, 500)
  // Central Diamond Inner (Knockout/Frame):
  // Top: (500, 350), Right: (650, 500), Bottom: (500, 650), Left: (350, 500)
  
  // Star geometry (Center 500, 500):
  // Vertices: Top (500, 385), Right (615, 500), Bottom (500, 615), Left (385, 500)
  // Inward waist: (484, 484), (516, 484), (516, 516), (484, 516) - creates elegant hyper-sharp curvature
  const starPolygon = "500,385 515,485 615,500 515,515 500,615 485,515 385,500 485,485";
  
  // The Refined Architectural Psi Silhouette:
  // Central Top Pillar: (430, 160) to (570, 160), down to diamond top (500, 320)
  // Central Bottom Pediment: (450, 680) down to (450, 780), flaring to (360, 840) to (640, 840)
  // Left Wing: rises from diamond waist (320, 500) -> base (220, 560) -> curve up (170, 440) -> wingtip (150, 160) -> inner crown (220, 190) -> down (300, 260) -> joins diamond (370, 450)
  // Right Wing: mathematically mirrored across x = 500

  // 1. VERSION A: PRIMARY EMBLEM (Architectural Precision, Clean Internal Facets, Radiant Cyan Star)
  // High-hierarchy strokes & filled facet planes that communicate Swiss engineering.
  const svgVersionA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="100%" height="100%" fill="none">
  <defs>
    <filter id="star-glow-primary" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feFlood floodColor="#00DDEB" floodOpacity="0.8" result="glowColor" />
      <feComposite in="glowColor" in2="blur" operator="in" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <linearGradient id="cyan-facet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00DDEB" />
      <stop offset="100%" stop-color="#4263EB" />
    </linearGradient>
  </defs>

  <!-- Outer Architectural Psi Structure (Primary Line Weight: 20px) -->
  <g stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" stroke-linejoin="round">
    <!-- Top Central Spire / Header -->
    <path d="M 420 160 L 580 160 L 580 230 L 500 310 L 420 230 Z" fill="none" />
    <line x1="500" y1="160" x2="500" y2="310" stroke-width="12" stroke="#FFFFFF" stroke-opacity="0.6" />
    
    <!-- Central Rhombus Frame (Housing) -->
    <path d="M 500 310 L 690 500 L 500 690 L 310 500 Z" fill="none" stroke-width="22" />

    <!-- Left Wing Outer Envelope -->
    <path d="M 310 500 C 230 520 180 470 170 380 L 150 160 L 230 200 C 260 260 290 340 370 440" fill="none" />
    
    <!-- Right Wing Outer Envelope (Symmetric) -->
    <path d="M 690 500 C 770 520 820 470 830 380 L 850 160 L 770 200 C 740 260 710 340 630 440" fill="none" />

    <!-- Lower Pediment & Stem Base -->
    <path d="M 450 690 L 450 780 L 360 840 L 640 840 L 550 780 L 550 690" fill="none" />
    <line x1="500" y1="690" x2="500" y2="840" stroke-width="12" stroke="#FFFFFF" stroke-opacity="0.6" />
    <line x1="360" y1="840" x2="640" y2="840" stroke-width="24" />
  </g>

  <!-- Clean Internal Engineering Facets (Secondary Hierarchy: 10px, 0.45 opacity) -->
  <g stroke="#FFFFFF" stroke-width="10" stroke-opacity="0.45" stroke-linecap="round" stroke-linejoin="round">
    <!-- Wing Structural Cross-Braces (Left) -->
    <line x1="150" y1="160" x2="260" y2="290" />
    <line x1="170" y1="380" x2="310" y2="500" />
    <line x1="230" y1="200" x2="170" y2="380" />

    <!-- Wing Structural Cross-Braces (Right) -->
    <line x1="850" y1="160" x2="740" y2="290" />
    <line x1="830" y1="380" x2="690" y2="500" />
    <line x1="770" y1="200" x2="830" y2="380" />

    <!-- Lower Pediment Triangular Facets -->
    <line x1="450" y1="780" x2="550" y2="780" />
    <line x1="500" y1="690" x2="360" y2="840" />
    <line x1="500" y1="690" x2="640" y2="840" />
  </g>

  <!-- Central Star Inner Breathing Margin (Negative Space Diamond) -->
  <path d="M 500 350 L 650 500 L 500 650 L 350 500 Z" fill="#080C18" stroke="rgba(0, 221, 235, 0.25)" stroke-width="4" />

  <!-- Radiant Cyan 4-Pointed Star (Focal Identity) -->
  <polygon points="${starPolygon}" fill="#00DDEB" filter="url(#star-glow-primary)" />
  <circle cx="500" cy="500" r="5" fill="#FFFFFF" />
</svg>`;

  fs.writeFileSync(path.join(outputDir, 'psycodes_emblem_primary.svg'), svgVersionA);
  console.log('Generated psycodes_emblem_primary.svg');
}

generateSVGs();
