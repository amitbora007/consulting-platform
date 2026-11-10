---
name: Consult Inc.
description: Executive Luxury & High-Finance Strategy Design System
colors:
  primary: "#E2E2E2"
  secondary: "#C0A062"
  neutral-bg: "#050505"
  neutral-paper: "#0A0A0A"
  neutral-surface: "#121212"
  neutral-text: "#EDEDED"
  neutral-muted: "#A1A1AA"
  neutral-subtle: "#52525B"
  neutral-border: "rgba(255,255,255,0.08)"
  neutral-border-strong: "rgba(255,255,255,0.15)"
  white: "#FFFFFF"
  black: "#000000"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "2.5rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.15em"
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  2xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.black}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "48px"
  card:
    backgroundColor: "rgba(255,255,255,0.05)"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.none}"
    padding: "32px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "16px 0"
---

# Design System: Consult Inc.

## Overview

**Creative North Star: "The Midnight Executive"**

The Consult Inc. design system synthesizes high-finance institutional authority, cinematic dark minimalism, and architectural rigor. Built specifically for C-suite decision-makers and board-level executives, every interaction is engineered to feel deliberate, heavy, and composed. The interface operates as a digital extension of an executive boardroom: austere obsidian backgrounds, razor-sharp hairlines, generous negative space, and luminous metallic accents.

Rather than relying on sterile corporate templates or casual SaaS aesthetics, the design language treats whitespace as a luxury material. Surfaces remain disciplined and calm, avoiding clutter, noisy banners, or gratuitous color bursts. The visual cadence alternates between commanding editorial serif statements and dense, high-precision monospace data points.

**Key Characteristics:**
- **Monochrome Foundation:** Native deep midnight canvas (`#050505`) with deliberate grayscale tonal layering.
- **Precious Accent Rarity:** Burnished Bronze (`#C0A062`) is strictly rationed for active calendar slots and verified indicators.
- **Architectural Geometry:** Predominantly 0px corner radiuses with razor-sharp planar precision.
- **Filmic Physicality:** Continuous 3% fixed SVG noise layer over the viewport providing tangible physical grain.
- **Typographic Polarity:** Playfair Display for authoritative editorial headlines contrasted against JetBrains Mono for clinical operational metrics.

## Colors

The palette is rooted in refined executive metals and obsidian depths, balancing severe low-luminance grounds with surgical platinum and bronze highlights.

### Primary
- **Polished Platinum** (`#E2E2E2`): Primary interactive accent and high-contrast text highlight. Used for primary CTA surfaces, high-level indicators, and strong visual focal points.

### Secondary
- **Burnished Bronze** (`#C0A062`): Muted warm metallic accent used with strict discipline. Reserved exclusively for selected dates, time-slot selection badges, active indicators, and rare focal emphasis.

### Neutral
- **Deep Midnight** (`#050505`): Default background canvas across all pages, setting an immersive low-luminance floor.
- **Obsidian Paper** (`#0A0A0A`): Elevated container and dialog background for card structures and appointment panels.
- **Elevated Surface** (`#121212`): Secondary surface level for nested panels, table headers, and input backdrops.
- **Pure White** (`#FFFFFF`): Dominant text color for primary headings, primary button fills, and high-emphasis elements.
- **Soft Platinum** (`#EDEDED`): High-legibility body text providing soft contrast without eye strain.
- **Zinc Subtext** (`#A1A1AA`): Secondary text for subtitles, metadata descriptions, and inactive states.
- **Hairline Border** (`rgba(255,255,255,0.08)`): Standard structural boundary separating sections, grid cells, and cards.
- **Strong Hairline** (`rgba(255,255,255,0.15)`): Highlight boundary for hovered cards, active containers, and key dividers.

### Named Rules
**The Bronze Restraint Rule.** Burnished Bronze is reserved strictly for active states, selected calendar dates, and high-value indicators (≤5% visual presence; its rarity preserves impact and luxury).

**The Native Dark Rule.** The application operates natively in dark mode without light-mode switching; luxury is defined by controlled luminance on deep obsidian backgrounds.

## Typography

**Display Font:** Playfair Display (fallback: Georgia, serif)  
**Body Font:** Manrope (fallback: -apple-system, BlinkMacSystemFont, sans-serif)  
**Label/Mono Font:** JetBrains Mono (fallback: ui-monospace, SFMono-Regular, monospace)  

**Character:** An unapologetic juxtaposition of editorial prestige and mathematical precision. Playfair Display conveys established institutional gravitas, Manrope delivers effortless executive legibility, and JetBrains Mono anchors the data & execution positioning with analytical rigor.

### Hierarchy
- **Display** (700, 4.5rem to 6rem, line-height 0.95): Used exclusively for primary Hero headline statements. Tracking tight (-0.02em).
- **Headline** (600, 2.25rem to 3rem, line-height 1.1): Used for major section titles and case study titles. Tracking tight (-0.01em).
- **Title** (600, 1.5rem to 1.75rem, line-height 1.25): Card headings, dialog modal titles, and sub-service headers.
- **Body** (300/400, 1rem to 1.125rem, line-height 1.6): Narrative body paragraphs, value propositions, and service descriptions. Max line length 65–75ch.
- **Label** (400, 0.75rem, line-height 1.4, tracking 0.15em, uppercase): Section pre-headers, dates, time slots, category badges, and technical metrics.

### Named Rules
**The Monospace Provenance Rule.** All metrics, dates, categories, and administrative sub-labels must render in JetBrains Mono uppercase with wide tracking (0.15em) to impart institutional data rigor.

**The Editorial Heading Rule.** All major headings (H1–H3) must utilize Playfair Display with tight letter-spacing; sans-serif is strictly forbidden for top-level titles.

## Layout

The spatial model relies on dramatic architectural scales and asymmetrical rhythm, avoiding the predictable uniformity of generic web templates.

- **Container Spacing:** Section padding spans `p-6 md:p-12 lg:p-20` to ensure abundant negative space.
- **Section Rhythm:** Gaps between vertical blocks range from `gap-12` on mobile to `gap-24` on desktop displays.
- **Grid Strategy:**
  - **Marketing / Showcase:** Asymmetric 12-column grid ("Tetris" layout), dedicating 8 columns to commanding editorial text and 4 columns to interactive panels or structured media.
  - **Dashboard / Admin:** Dense 4-column analytical grid with structured tabular data and compact card modules.
- **Alignment:** Strongly left-aligned text throughout. Centered alignment is reserved solely for dramatic, isolated hero statements.

### Named Rules
**The Asymmetric Tetris Rule.** Marketing and showcase hero sections favor 12-column asymmetric grids (8-column statement, 4-column interactive unit) over generic centered card stacks.

**The Abundance Spacing Rule.** Spacing favors generous breathing room; where standard SaaS layouts deploy 16px padding, executive luxury employs 48px to 80px.

## Elevation & Depth

Depth is established strictly through planar layering, translucent glassmorphism, and hairline borders, completely rejecting muddy drop shadows.

- **Surface Tiers:** Three distinct ground levels—`#050505` (canvas), `#0A0A0A` (panels), and `#121212` (sub-panels).
- **Glassmorphism:** Translucent glass cards use `backdrop-blur-xl bg-black/40 border border-white/10` to suggest layered sheets of dark architectural glass.
- **Luminous Glow:** Ambient illumination (`box-shadow: 0 0 50px -12px rgba(255, 255, 255, 0.1)`) is applied subtly to focused elements and hovered cards to create a soft halo rather than an artificial shadow.

### Shadow Vocabulary
- **Ambient Glow** (`box-shadow: 0 0 50px -12px rgba(255, 255, 255, 0.1)`): Applied on card hover states, active time-slot selection, and focal interactive containers.

### Named Rules
**The No-Drop-Shadow Rule.** Heavy, murky drop shadows are prohibited; depth is achieved exclusively through translucent glass layering, hairline borders, and subtle luminous ambient glow.

**The Filmic Texture Rule.** A fixed 3% opacity fractal noise overlay runs continuously across the viewport to add cinematic physical grain to dark digital surfaces.

## Shapes

The form language is disciplined, angular, and razor-sharp.

- **Primary Geometry:** 0px radius (`rounded-none`) across all prominent containers, buttons, cards, dialogs, calendar grids, and input elements.
- **Hairline Definition:** Structural edges are defined by 1px borders in `rgba(255,255,255,0.08)` or `rgba(255,255,255,0.15)`.
- **Permitted Radii:** Minimal 2px to 4px radius (`rounded-sm` / `rounded-md`) is strictly confined to small data chips, category tags, or status badges. Large rounded corners (>4px) are prohibited.

### Named Rules
**The Razor Form Rule.** Structural containers, buttons, cards, dialogs, and inputs adhere strictly to 0px border radius (sharp rectangular geometry).

## Components

### Buttons
All buttons measure 48px in height with sharp 0px corners, wide uppercase typography, and high-contrast transitions.

- **Shape:** Razor sharp (0px radius), height 48px (`h-12`).
- **Primary:** Solid White background (`#FFFFFF`) with deep black text (`#000000`), uppercase tracking-widest (0.15em), text-xs, font-bold, padding `0 32px` (`px-8`). Transitions to platinum (`#E2E2E2`) on hover.
- **Secondary:** Transparent background with hairline border (`border border-white/20`), crisp white text, uppercase tracking-widest text-xs, padding `0 32px`. Transitions to `bg-white/10` on hover.
- **Ghost:** Transparent background, muted text (`rgba(255,255,255,0.6)`), uppercase tracking-widest text-[10px], zero horizontal padding. Transitions to pure white on hover.

### Cards / Containers
- **Corner Style:** 0px radius (`rounded-none`).
- **Background:** Subtle translucent black (`bg-white/5` or `bg-black/40` with `backdrop-blur-md`).
- **Border:** 1px hairline border (`border-white/10`).
- **Internal Padding:** Generous `p-6 md:p-8` for standard cards; `p-12` for showcase features.
- **Hover:** Transitions border to `border-white/20` and background to `bg-white/10` over 500ms ease.

### Inputs / Fields
- **Style:** Understated architectural baseline. Transparent background with a solitary bottom border (`border-b border-white/20`), 0px radius, padding `16px 0` (`py-4 px-0`).
- **Focus:** Underline shifts to solid white (`border-white`) with zero ring glow (`ring-0`).
- **Placeholder:** Subdued platinum at 30% opacity (`placeholder:text-white/30`).

### Calendar (Appointment Picker)
- **Grid:** Clean dark architectural grid with 1px hairline borders (`border-white/10`).
- **Selected Date:** High-contrast solid Burnished Bronze fill (`bg-bronze-500` / `#C0A062`) with deep black text.
- **Today Indicator:** Underlined with soft bronze hairline.
- **Time Slots:** Minimalist rectangular blocks; inactive states show translucent border (`border-white/10`), active slot snaps to solid Bronze fill.

### Dialog / Modal
- **Overlay:** High-blur dark scrim (`backdrop-blur-xl bg-black/80`).
- **Container:** Obsidian paper background (`#0A0A0A`), 0px radius, 1px border (`border-white/10`), internal dual-column grid dividing interactive appointment details from calendar selection.

## Do's and Don'ts

### Do:
- **Do** use `Playfair Display` for all H1, H2, and H3 titles with tight letter-spacing.
- **Do** format technical metrics, dates, and category pills in uppercase `JetBrains Mono` with wide tracking (`tracking-widest`).
- **Do** reserve `Burnished Bronze (#C0A062)` strictly for active states, selected dates, and rare high-value signals.
- **Do** maintain generous negative space, favoring `p-12` to `p-20` on key sections.
- **Do** keep primary buttons and interactive containers razor-sharp with `rounded-none`.
- **Do** use targeted CSS transitions (`transition-colors duration-300` or `transition-transform duration-500 ease-out`).

### Don't:
- **Don't** introduce rounded corners (>4px) on cards, inputs, dialogs, or buttons.
- **Don't** use multi-color gradient fills (e.g., purple-to-blue or cyan-to-violet "AI-slop" aesthetics).
- **Don't** use heavy black drop shadows; depth must come from tonal layering and hairline borders.
- **Don't** use `transition-all`; always specify individual transitioning properties.
- **Don't** center-align narrative paragraphs or body copy.
- **Don't** add a light-mode toggle; the design system is native dark mode by definition.
