# TreeSleuth Theme Documentation

## Game Identity

- **Game Name:** TreeSleuth
- **Repo Slug:** `treesleuth`
- **Storage Prefix:** `treesleuth:`
- **Display Title:** TreeSleuth
- **Tagline:** *"Crack the case. Know your trees."*

---

## Color Palette

TreeSleuth uses the **LinkittyDo** brand palette: playful mid-century/retro with bold colors, geometric shapes, and strong visual hierarchy.

### Primary Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--ld-cream` | `#FDEC92` | Primary background, warm and inviting |
| `--ld-mint` | `#A9EAD2` | Secondary background, panels, evidence tiles |
| `--ld-ink` | `#161813` | Primary text, borders, shadows |
| `--ld-pop` | `#FB2B57` | CTAs, highlights, confidence penalties |
| `--ld-paper` | `#EEEDE5` | Neutral cards, modals |

### Supporting Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--ld-forest` | `#5E6554` | Muted text, secondary labels |
| `--ld-moss` | `#A29A61` | Subtle borders, hints |
| `--ld-bark` | `#8B7355` | Tree-themed warm accent |
| `--ld-leaf` | `#4A7C59` | Success, correct answers |
| `--ld-peach` | `#E7A790` | Warning, low confidence |

### Functional Colors

| State | Color | Usage |
|-------|-------|-------|
| Success | `--ld-leaf` | Correct identification |
| Warning | `--ld-peach` | Low confidence, hint usage |
| Error | `--ld-pop` | Wrong answer, penalties |
| Info | `--ld-mint` | Neutral information |

---

## Typography

### Font Stack

| Purpose | Font | Fallback |
|---------|------|----------|
| Display/Headlines | `Bungee` | Impact, sans-serif |
| Body/UI | `Nunito` | Segoe UI, sans-serif |
| Monospace (stats) | `JetBrains Mono` | Consolas, monospace |

### Scale

| Token | Size | Usage |
|-------|------|-------|
| `xs` | 0.75rem (12px) | Tiny labels |
| `sm` | 0.875rem (14px) | Secondary text |
| `md` | 1rem (16px) | Body text |
| `lg` | 1.25rem (20px) | Emphasis |
| `xl` | 1.5rem (24px) | Subheadings |
| `2xl` | 2rem (32px) | Section titles |
| `3xl` | 2.5rem (40px) | Page titles |
| `4xl` | 3rem (48px) | Hero text |

---

## Visual Style

### Shadows

Characteristic "chunky" drop shadows for the retro aesthetic:

- **Small:** `2px 2px 0px var(--ld-ink)` — buttons, small cards
- **Medium:** `4px 4px 0px var(--ld-ink)` — panels, modals
- **Large:** `6px 6px 0px var(--ld-ink)` — hero elements
- **Soft:** `0 4px 12px rgba(22, 24, 19, 0.15)` — subtle elevation

### Borders

- **Thin:** `2px solid var(--ld-ink)` — standard elements
- **Thick:** `4px solid var(--ld-ink)` — emphasis, hero cards

### Border Radius

| Size | Value | Usage |
|------|-------|-------|
| `sm` | 4px | Subtle rounding |
| `md` | 8px | Buttons, inputs |
| `lg` | 16px | Cards, panels |
| `xl` | 24px | Large containers |
| `full` | 9999px | Badges, pills |

---

## Component Patterns

### Primary Button

```css
.btn-primary {
  background-color: var(--ld-pop);
  color: white;
  font-family: var(--font-body);
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border: var(--border-thick);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}

.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--ld-ink);
}

.btn-primary:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px var(--ld-ink);
}
```

### Evidence Tile (Face Down)

```css
.evidence-tile {
  background: var(--ld-mint);
  border: var(--border-thick);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  aspect-ratio: 1;
  cursor: pointer;
}
```

### Card Panel

```css
.card {
  background: var(--ld-paper);
  border: var(--border-thick);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
}
```

---

## Layout Principles

1. **Frame structure:** Top header (title), centered play area, footer (help/settings)
2. **Chunky elements:** Thick borders, bold shadows, generous padding
3. **Clear hierarchy:** Display font for titles, body font for everything else
4. **Consistent spacing:** Use the spacing scale (xs/sm/md/lg/xl/2xl)

---

## Accessibility

- Maintain WCAG AA contrast ratios (ink on cream, paper, mint all pass)
- All interactive elements have visible focus states (3px pop outline)
- Respect `prefers-reduced-motion` for animations
- All icons paired with text labels or aria-labels

---

## File Locations

- Theme tokens: `src/theme/linkittydoTheme.ts`
- Global CSS: `src/theme/global.css`
- This doc: `docs/theme.md`
