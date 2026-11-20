-- ==============================================================================
-- PSYCODES STUDIO // SEED DATA
-- Populate initial portfolio projects, arcade games, services, and settings
-- ==============================================================================

-- 1. SEED SERVICES
INSERT INTO public.services (slug, title, short_description, full_description, icon_name, timeline_estimate, pricing_tier, deliverables, tech_stack, featured, order_index)
VALUES
(
  'autonomous-ai-workflows',
  'Autonomous AI Workflows & Multi-Agent Swarms',
  'Deterministic agents, retrieval systems, and self-healing vector pipelines that execute complex operations with zero human babysitting.',
  'We architect multi-agent swarms using LangChain, LangGraph, and modern LLM orchestration layers. Every agent is bounded by deterministic state machines, ensuring 100% predictable workflows and zero destructive edge cases.',
  'BrainCircuit',
  '2–4 Weeks Sprint',
  '$4,500 – $9,000',
  ARRAY['Multi-Agent Orchestration Engine', 'Custom Vector Database (Pinecone/pgvector)', 'Tool Calling & API Gateways', 'Zero-Hallucination Evaluation Suite'],
  ARRAY['Python 3.11', 'LangChain', 'FastAPI', 'Pinecone', 'Docker'],
  true,
  1
),
(
  'unity-game-development',
  'Unity 6 High-Performance Game Engineering',
  'Multiplatform games, deterministic 2D/3D physics, URP shaders, and instant-play WebGL browser streaming.',
  'Engineering fluid, 60fps arcade and narrative gameplay experiences in Unity 6 and C#. Optimized for rapid loading, custom render pipelines, and zero-latency input handling across WebGL, mobile, and desktop.',
  'Gamepad2',
  '3–6 Weeks Sprint',
  '$5,500 – $12,000',
  ARRAY['Playable WebGL & Desktop Builds', 'Custom URP Shader Graph Effects', 'Deterministic Physics & Game State Loop', 'Full C# Source Repository'],
  ARRAY['Unity 6', 'C#', 'URP', 'WebGL 2.0', 'Blender 3D'],
  true,
  2
),
(
  'flutter-cross-platform-mobile',
  'Offline-First Cross-Platform Mobile Apps',
  'Zero-lag native compiled UIs built with Flutter & Dart, backed by local SQLite/Isar sync and hardware-accelerated rendering.',
  'We build high-octane iOS and Android apps using Flutter. Architected from day one for offline capability with conflict-free replicated data types (CRDTs), biometrics, and reactive state management.',
  'Smartphone',
  '4–6 Weeks Sprint',
  '$6,000 – $14,000',
  ARRAY['Production iOS & Android Binaries', 'Offline-First SQLite / Isar Sync Engine', 'Custom Motion & Micro-interaction Suite', 'CI/CD Fastlane Build Automation'],
  ARRAY['Flutter 3.x', 'Dart 3', 'Riverpod 2', 'Isar DB', 'SQLite'],
  true,
  3
),
(
  'modern-web-saas-platforms',
  'Modern Web & High-Velocity SaaS Platforms',
  'Next.js 14, React, TypeScript, and Tailwind CSS web platforms achieving 100/100 Core Web Vitals and infinite scalability.',
  'Architecting web platforms with sub-second page transitions, server-side rendering, and resilient database layers with Supabase and PostgreSQL.',
  'Server',
  '3–5 Weeks Sprint',
  '$5,000 – $11,000',
  ARRAY['Complete Next.js / React Production Repo', 'Supabase Auth & PostgreSQL Schema with RLS', 'Stripe / LemonSqueezy Billing Integration', 'Tailwind Design System & Component Library'],
  ARRAY['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  true,
  4
),
(
  'bespoke-ui-ux-design-systems',
  'Bespoke Cyber-Luxe UI/UX & Design Systems',
  'Token-accurate Figma architectures and Tailwind design systems engineered with dark futuristic precision.',
  'Bridging Figma directly into code with mathematical precision. We establish complete design systems with color tokens, typography scales, glassmorphism layers, and responsive primitives.',
  'Layers',
  '1–3 Weeks Sprint',
  '$3,000 – $6,500',
  ARRAY['Master Figma Design Tokens & UI Kit', 'Production Tailwind Config & CSS Theme', 'Interactive Prototyping & Motion Specs', 'WCAG AA Accessibility Audit'],
  ARRAY['Figma', 'Tailwind CSS', 'Design Tokens', 'Framer Motion'],
  true,
  5
),
(
  'codebase-modernization-audit',
  'Codebase & Architecture Modernization Audit',
  'Deep architectural reviews, bottleneck elimination, dependency de-risking, and automated test pipelines.',
  'We audit legacy codebases, eliminate technical debt, optimize database indices and queries, and transition monolithic bottlenecks into maintainable, scalable architectures.',
  'Zap',
  '1–2 Weeks Sprint',
  '$2,500 Fixed Fee',
  ARRAY['Comprehensive Architectural Audit Dossier', 'Performance Profiling & Bottleneck Map', 'Remediation Pull Requests for Hotspots', 'Automated CI/CD Test Pipeline Matrix'],
  ARRAY['Docker', 'GitHub Actions', 'PostgreSQL', 'Jest / Vitest', 'Lighthouse'],
  false,
  6
),
(
  'hardware-iot-embedded-dashboards',
  'Real-Time Telemetry & IoT Dashboards',
  'WebSocket-powered command centers, live sensor graphs, and low-latency hardware control interfaces.',
  'High-throughput WebSockets and streaming dashboards for IoT devices, industrial sensors, and hardware telemetry.',
  'Cpu',
  '3–5 Weeks Sprint',
  '$5,000 – $10,000',
  ARRAY['Real-Time WebSocket Streaming Gateway', 'Interactive Time-Series Telemetry Charts', 'Device Authentication & Token Rotation', 'Hardware Simulator for Testing'],
  ARRAY['TypeScript', 'WebSockets', 'Chart.js', 'Redis', 'MQTT'],
  false,
  7
)
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED PROJECTS
INSERT INTO public.projects (slug, title, tagline, description, full_story, category, client, year, duration, role, metrics, tech_stack, deliverables, live_url, repo_url, featured, order_index)
VALUES
(
  'fitlyfe',
  'FitLyfe // Adaptive Biometric Fitness Suite',
  'Offline-first workout architecture with real-time biometric telemetry, localized SQLite sync, and zero cloud latency.',
  'FitLyfe was engineered to eliminate loading spinners from health tracking. Built with Flutter, Dart, and local Isar database sync, it offers instantaneous set logging, volume progression tracking, and offline data privacy.',
  'Modern fitness apps suffer from network dependency, sluggish screen loads, and bloated subscriptions. FitLyfe was commissioned to be an offline-first powerhouse: local database persistence with instant UI response, zero loading states, and transparent user data ownership. We engineered custom volume progression curves and integrated hardware sensor tracking without draining battery life.',
  'Mobile Apps',
  'FitLyfe Global Inc.',
  '2026',
  '6 Weeks',
  'Lead Mobile Architect & Systems Engineer',
  '[{"label": "Cold App Launch", "value": "180ms"}, {"label": "Offline Data Sync", "value": "100%"}, {"label": "Active Users", "value": "14.2k"}, {"label": "Memory Footprint", "value": "32MB"}]'::jsonb,
  ARRAY['Flutter 3.x', 'Dart 3', 'Riverpod 2', 'Isar Database', 'SQLite', 'HealthKit / Google Fit API'],
  ARRAY['iOS & Android Production Binaries', 'Offline-First Sync Engine', 'Custom Metric Charting Engine', 'Encrypted Local Storage Vault'],
  'https://fitlyfe.app',
  'https://github.com/psycode-labs/fitlyfe',
  true,
  1
),
(
  'hot-cocoa-run',
  'Hot Cocoa Run // 60FPS WebGL Endless Runner',
  'Flagship studio arcade title running at deterministic 60fps in WebGL, featuring winter physics, dynamic hurdles, and score multiplier engines.',
  'An homage to retro winter arcade runners built with Unity 6. Features custom particle snow systems, responsive touch/keyboard input, and instant browser streaming with under 8MB compressed memory budget.',
  'Hot Cocoa Run was conceived as an interactive showcase of PsyCodes Studio''s game engineering discipline. Built in Unity 6 and exported to WebGL 2.0 with Brotli compression, the game streams directly inside modern mobile and desktop browsers with zero installation and instant 60fps execution.',
  'Unity Games',
  'PsyCodes Arcade Division',
  '2026',
  '4 Weeks',
  'Lead Game Developer & Technical Artist',
  '[{"label": "Target Frame Rate", "value": "60 FPS"}, {"label": "Compressed Payload", "value": "7.8 MB"}, {"label": "Shader Compilation", "value": "Zero Stutter"}, {"label": "Browser Compatibility", "value": "99.4%"}]'::jsonb,
  ARRAY['Unity 6', 'C# Scripting', 'URP 2D', 'WebGL 2.0', 'Blender 3D', 'WebAudio API'],
  ARRAY['Universal WebGL Browser Build', 'Windows / macOS Standalone Binaries', 'Original Sound Design & Chiptune Audio', 'Custom Particle Weather System'],
  'https://arcade.psycodes.dev/hot-cocoa-run',
  'https://github.com/psycode-labs/hot-cocoa-run',
  true,
  2
),
(
  'digital-engine',
  'Digital Engine // Enterprise SaaS Orchestrator',
  'Next-generation enterprise management platform with reactive real-time telemetry, automated RBAC, and multi-tenant isolation.',
  'Engineered for a hyper-growth logistics network to manage distributed operational nodes, fleet tracking, and automated task dispatching.',
  'Digital Engine transformed an outdated ERP into a responsive Next.js 14 and Supabase platform. We implemented row-level security across 40+ operational entities, reducing query latency by 82% and automating report generation with serverless edge functions.',
  'Web & SaaS',
  'Digital Fleet Logistics',
  '2026',
  '8 Weeks',
  'Full Stack Systems Architect',
  '[{"label": "Query Latency Reduction", "value": "82%"}, {"label": "Concurrent Sockets", "value": "50,000+"}, {"label": "Lighthouse Score", "value": "99/100"}, {"label": "Dispatched Tasks", "value": "1.2M/mo"}]'::jsonb,
  ARRAY['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL RLS', 'Docker'],
  ARRAY['Full Next.js Web Application', 'Multi-tenant PostgreSQL Schema', 'Real-Time WebSocket Gateway', 'Stripe Billing System'],
  'https://engine.psycodes.dev',
  'https://github.com/psycode-labs/digital-engine',
  true,
  3
),
(
  'autonomous-agent-pipeline',
  'Autonomous Multi-Agent Intelligence Swarm',
  'Multi-agent RAG workflow pipeline operating across enterprise knowledge graphs with zero hallucination rate.',
  'A fault-tolerant swarm of specialized LangChain agents handling market intelligence aggregation, document synthesis, and automated executive reporting.',
  'Enterprise research analysts spent hundreds of hours weekly collating disparate industry disclosures. PsyCodes Studio engineered an autonomous multi-agent pipeline that ingests thousands of SEC filings, transforms unstructured text into vector embeddings, and outputs verified executive intelligence summaries.',
  'AI & Automation',
  'Vanguard Intelligence Group',
  '2026',
  '5 Weeks',
  'AI Systems Engineer',
  '[{"label": "Analyst Hours Saved", "value": "85%"}, {"label": "Vector Search Latency", "value": "24ms"}, {"label": "Hallucination Rate", "value": "0.00%"}, {"label": "Ingested Filings", "value": "250k+"}]'::jsonb,
  ARRAY['Python 3.11', 'FastAPI', 'LangChain', 'Pinecone Vector DB', 'OpenAI API', 'Docker'],
  ARRAY['Autonomous Agent Execution Cluster', 'Semantic Vector Search API', 'Executive Markdown Report Generator', 'Automated Guardrail Evaluator'],
  'https://ai.psycodes.dev',
  'https://github.com/psycode-labs/agent-swarm',
  true,
  4
)
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED GAMES
INSERT INTO public.games (slug, title, genre, engine, platform, release_date, status, short_description, full_description, thumbnail_url, banner_url, playable_url, orientation, controls_scheme, features, specs, telemetry, order_index)
VALUES
(
  'hot-cocoa-run',
  'Hot Cocoa Run',
  'Retro Arcade Endless Runner',
  'Unity 6',
  'WebGL / Browser & Desktop',
  'Q2 2026',
  'In Development',
  'Dash through snowy winter chalets, leap over festive hazards, collect marshmallows, and maintain your cocoa steam multiplier at deterministic 60fps.',
  'Hot Cocoa Run is PsyCodes Studio''s flagship arcade production. Built on a deterministic tick engine in Unity 6, it pairs nostalgic 16-bit aesthetic charms with modern fluid physics, sensory audio feedback, and competitive leaderboard telemetry.',
  '/assets/banner/banner_2.png',
  '/assets/banner/banner_2.png',
  '',
  'Landscape',
  '[{"key": "SPACE / TAP", "action": "Jump / Double Jump"}, {"key": "DOWN ARROW", "action": "Slide Under Obstacles"}, {"key": "P", "action": "Pause Game"}, {"key": "M", "action": "Mute Audio"}]'::jsonb,
  ARRAY['Deterministic 60 FPS Engine', 'Dynamic Marshmallow Multiplier', 'Procedurally Seeded Winter Terrains', 'Brotli Compressed < 8MB Payload'],
  '{"engine": "Unity 6000.0.2f1", "resolution": "1920x1080 Native", "audio": "WebAudio API Stereo", "target_fps": "60 FPS"}'::jsonb,
  '{"total_runs": "142,850", "high_score": "98,420", "avg_session": "4m 12s", "browser_rating": "4.9/5.0"}'::jsonb,
  1
),
(
  'cyber-drift-2088',
  'Cyber Drift 2088',
  'Synthwave Time-Attack Racer',
  'Unity 6',
  'WebGL / Browser',
  'Q3 2026',
  'Concept Staging',
  'High-speed futuristic drifting through neon canyon grids with reactive synthwave audio and ray-traced ambient lighting.',
  'Cyber Drift 2088 pushes the envelope of WebGL racing mechanics. Engineered with custom drift slip physics and dynamic audio-reactive course generators.',
  '/assets/banner/banner_2.png',
  '/assets/banner/banner_2.png',
  '',
  'Landscape',
  '[{"key": "W / UP ARROW", "action": "Accelerate"}, {"key": "S / DOWN ARROW", "action": "Brake / Reverse"}, {"key": "A/D / LEFT/RIGHT", "action": "Steer"}, {"key": "SHIFT", "action": "Drift Boost"}]'::jsonb,
  ARRAY['Drift Slip Mechanics', 'Audio-Reactive Neon Tracks', 'Ghost Car Replay System', 'Zero-Lag Input Loop'],
  '{"engine": "Unity 6 URP", "physics": "Custom Wheel Collider Matrix", "target_fps": "60/120 FPS"}'::jsonb,
  '{"status": "Shader Prototyping", "concept_review": "Passed"}'::jsonb,
  2
)
ON CONFLICT (slug) DO NOTHING;

-- 4. SEED SITE SETTINGS
INSERT INTO public.site_settings (key, value, description)
VALUES
(
  'studio_identity',
  '{
    "brand_name": "PsyCodes Studio",
    "tagline": "Code. Create. Automate.",
    "founder": "Bilawal Feroze",
    "founder_role": "Lead Systems Architect & Founder",
    "location": "Karachi, Pakistan",
    "established": 2026,
    "contact_email": "psycodestech@gmail.com",
    "primary_channels": {
      "github": "https://github.com/bilawalferoze",
      "linkedin": "https://linkedin.com/in/bilawalferoze",
      "instagram": "https://instagram.com/psycodestudio"
    }
  }'::jsonb,
  'Global PsyCodes Studio metadata and operational endpoints'
),
(
  'intake_parameters',
  '{
    "accepting_commissions": true,
    "sla_first_response_hours": 12,
    "sla_initial_roadmap_hours": 48,
    "nda_standard": "Mutual Bilateral NDA",
    "typical_sprint_weeks": "2 to 8 Weeks"
  }'::jsonb,
  'Client transmission and project intake configuration'
)
ON CONFLICT (key) DO NOTHING;

