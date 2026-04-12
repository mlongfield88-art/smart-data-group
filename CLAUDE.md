# Smart Data Group: Project Context

## Stack
- **Astro 5** static site generator (SSG)
- **GSAP** for animations
- **Lenis** for smooth scrolling
- **Cloudflare Pages** for deployment (auto-deploys on push)
- **GitHub**: `mlongfield88-art/smart-data-group`

## Dev Server
```bash
npm run dev --prefix smart-data-group
# Runs on port 4323
```

## Critical Animation Architecture

These decisions prevent ticker-stalling bugs. **Do not change this pattern:**

1. Animations use **IntersectionObserver + plain GSAP tweens**: NOT ScrollTrigger
2. Lenis runs on its **own rAF loop**, completely decoupled from GSAP's ticker
3. Initial hidden states are set via `gsap.set()` in JS, **never in CSS**
4. Lenis must NOT be connected to `gsap.ticker.add()`, this causes the ticker to freeze after HMR reloads

### Animation classes
`.reveal` `.clip-reveal` `.text-mask-reveal` `.stagger-reveal` `.line-grow` `.counter` `.parallax`

### Key files
- `src/scripts/animations.ts`, All animation logic (IntersectionObserver)
- `src/scripts/smooth-scroll.ts`, Lenis init with standalone rAF loop

## Design System
- **Palette**: Navy `#051a53` / Light `#f6f6f6` / Blue accent `#5b7bd4` (matches smartdatagroup.org branding)
- **Fonts**: Roboto (body, weights 100 to 900), Montserrat (headings, weights 600 to 700)
- **CSS variables**: All in `src/styles/global.css`
- **Style**: Corporate navy blue, modern professional aesthetic matching the real SDG website

## Pages
Home, About, News, Events, Contact, all using colored placeholder images (no real images yet)

## Deployment
Just `git push`, Cloudflare Pages auto-builds from `dist/`.

## Connected Projects
- **Part of**: Web Design (LX Sixty Group in-house capability, client site)
- **Root brain**: `../../CLAUDE.md` (full group structure and cross-connections)
- **The Vicky**: `../the-vicky/CLAUDE.md` (sister client site, same Astro 5 stack)
- **The Coffee Kitchen**: `../the-coffee-kitchen/CLAUDE.md` (sister client site, same Astro 5 stack)

## UI/UX Design Tools
- Use **Framer Motion** for React-based micro-interactions and page transitions
- Use **GSAP + ScrollTrigger** for scroll-driven animations and parallax
- Use **Lenis** for smooth scrolling
- Use **21st.dev Magic** MCP tools for component generation and inspiration
- Use **UI/UX Pro Max** skill for design system decisions (colors, typography, spacing, layouts)
- Use **CSS custom properties** for theming and design tokens
- Use **IntersectionObserver** for scroll-triggered reveals with staggered timing
