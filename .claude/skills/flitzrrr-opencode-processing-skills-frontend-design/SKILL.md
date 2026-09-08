---
name: frontend-design
description: Creates distinctive, production-grade frontend interfaces with high design quality. Guides bold aesthetic decisions, creative typography, cohesive color palettes, and purposeful motion design. Avoids generic "AI slop" aesthetics.
license: MIT
compatibility: opencode
metadata:
  category: implementation
  phase: creation
  origin: anthropics/claude-code-plugins/frontend-design (adapted)
---

# Skill: Frontend Design

## What This Skill Does

Guides the creation of **distinctive, production-grade frontend interfaces** that avoid generic "AI slop" aesthetics. Instead of cookie-cutter components with predictable color schemes and default fonts, this skill enforces creative vision, bold aesthetic choices, and meticulous attention to visual detail.

The output is real, working code — not mockups or wireframes.

## When to Use

- When building web components, pages, or full applications
- When the user asks for a frontend that should look "premium", "award-winning", or "distinctive"
- When redesigning an existing interface for visual impact
- As part of `implement-phase` when a step involves UI creation
- When the user says "make it beautiful" or "it looks too generic"

Do NOT use this for backend-only work or non-visual tasks.

## Execution Model

- **Always**: the primary agent runs this skill directly.
- **Rationale**: frontend design requires iterative visual judgment and direct user dialogue for aesthetic direction.
- **Output**: HTML/CSS/JS source files, component files (React, Vue, etc.), or full page implementations.

## Workflow

### Step 1: Design Thinking

Before writing any code, understand the context and commit to a **BOLD aesthetic direction**:

1. **Purpose**: What problem does this interface solve? Who uses it?
2. **Tone**: Pick a clear direction — choose from flavors like:
   - Brutally minimal
   - Maximalist chaos
   - Retro-futuristic
   - Organic / natural
   - Luxury / refined
   - Playful / toy-like
   - Editorial / magazine
   - Brutalist / raw
   - Art deco / geometric
   - Soft / pastel
   - Industrial / utilitarian
   - Or invent your own — these are inspiration, not limits
3. **Constraints**: Technical requirements (framework, performance, accessibility)
4. **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is **intentionality**, not intensity.

### Step 2: Implement with Exceptional Aesthetics

Create working code (HTML/CSS/JS, React, Vue, etc.) that is:

- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

Follow the **Aesthetics Guidelines** below for every implementation.

### Step 3: Verify Visual Quality

Before presenting the result:

- Check that fonts load correctly and create the intended impression
- Verify color palette is cohesive (no accidental generic blues/greys)
- Test animations/transitions for smoothness
- Ensure spatial composition feels intentional, not default
- Run in browser to confirm the visual experience matches the vision

## Aesthetics Guidelines

### Typography

Choose fonts that are **beautiful, unique, and interesting**:

- **AVOID**: Arial, Inter, Roboto, system fonts, and overused choices like Space Grotesk
- **DO**: Select distinctive, characterful fonts that elevate the design
- **Pair**: A distinctive display font with a refined body font
- Use Google Fonts or similar CDNs for web delivery

### Color & Theme

Commit to a **cohesive aesthetic**:

- Use CSS variables for consistency
- **Dominant colors with sharp accents** outperform timid, evenly-distributed palettes
- Avoid clichéd color schemes (particularly purple gradients on white backgrounds)
- Vary between light and dark themes — never default to the same palette twice

### Motion & Animation

Use animations for effects and micro-interactions:

- Prioritize **CSS-only solutions** for HTML projects
- Use Motion library for React when available
- Focus on **high-impact moments**: one well-orchestrated page load with staggered reveals (`animation-delay`) creates more delight than scattered micro-interactions
- Use scroll-triggering and hover states that surprise

### Spatial Composition

Create unexpected layouts:

- Asymmetry, overlap, diagonal flow
- Grid-breaking elements
- Generous negative space OR controlled density
- No predictable component patterns

### Backgrounds & Visual Details

Create **atmosphere and depth** rather than flat solid colors:

- Gradient meshes, noise textures, geometric patterns
- Layered transparencies, dramatic shadows
- Decorative borders, custom cursors, grain overlays
- Contextual effects that match the overall aesthetic

## Rules

1. **Design-first thinking**: Always establish aesthetic direction before coding. Never jump straight into implementation without a visual concept.
2. **No AI slop**: Never use overused font families, clichéd color schemes, or cookie-cutter layouts. Every design must feel genuinely crafted.
3. **Intentional variety**: No two designs should look the same. Vary themes, fonts, aesthetics, and composition across generations.
4. **Match complexity to vision**: Maximalist designs need elaborate code with extensive animations. Minimalist designs need restraint, precision, and careful spacing. Elegance = executing the vision well.
5. **Production-grade output**: All code must be functional, not just visual. Interactions must work, links must resolve, responsive layouts must adapt.
6. **Context-specific character**: Interpret requirements creatively for the specific context. A fintech dashboard and a bakery homepage should look nothing alike.
7. **No built-in explore agent**: Do NOT use the built-in `explore` subagent type.
