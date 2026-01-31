# TreeSleuth - Copilot Instructions

## Game Identity

- **Game Name:** TreeSleuth
- **Repo Slug:** `treesleuth`
- **Storage Prefix:** `treesleuth:`
- **Tagline:** "Crack the case. Know your trees."

## Project Overview

TreeSleuth is a web-based tree identification mystery game where players collect evidence to identify tree species. It's a frontend-only React application with no backend.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Testing:** Vitest + React Testing Library
- **Styling:** CSS (LinkittyDo theme)

## Project Structure

```
src/
├── engine/          # Optional: rendering utilities
├── game/
│   ├── logic/       # Pure game rules (scoring, validation, matching)
│   ├── scenes/      # Scene components (Title, Playing, Results)
│   ├── data/        # Tree species database
│   ├── constants.ts # Game constants
│   └── types.ts     # Type definitions
├── theme/
│   ├── linkittydoTheme.ts  # Theme tokens
│   └── global.css          # Global styles + CSS vars
├── ui/
│   ├── components/  # Reusable UI (Button, Card, etc.)
│   └── overlays/    # Modals (HowToPlay, Settings)
├── utils/           # Helper functions
├── test/            # Test setup
├── App.tsx          # Root component
└── main.tsx         # Entry point
```

## Key Conventions

### Code Style
- Functional components with hooks
- Named exports for components
- Barrel exports (index.ts) for each directory
- Pure functions for game logic (testable, no side effects)
- CSS Modules or styled-components pattern (not inline styles)

### Naming
- Components: PascalCase (`EvidenceTile.tsx`)
- Hooks: `use` prefix (`useGameState.ts`)
- Types: PascalCase (`TreeSpecies`, `GameState`)
- Constants: SCREAMING_SNAKE_CASE (`BASE_SCORE`, `MAX_EVIDENCE`)
- CSS classes: kebab-case (`.evidence-tile`, `.btn-primary`)

### State Management
- React Context for global state (game state, settings)
- Local state for component-specific UI
- localStorage for persistence (prefix all keys with `treesleuth:`)

### Testing
- Test all pure logic functions in `src/game/logic/`
- Use descriptive test names: `it('should apply 1.7x multiplier for 90% confidence')`
- Mock localStorage in tests when needed

## Theme (LinkittyDo)

### Colors
- `--ld-cream`: #FDEC92 (primary background)
- `--ld-mint`: #A9EAD2 (secondary/panels)
- `--ld-ink`: #161813 (text/borders)
- `--ld-pop`: #FB2B57 (CTAs/highlights)
- `--ld-paper`: #EEEDE5 (cards)
- `--ld-leaf`: #4A7C59 (success)

### Fonts
- Display: `Bungee`
- Body: `Nunito`
- Mono: `JetBrains Mono`

### Style
- Thick borders (2-4px solid ink)
- Chunky drop shadows (offset, no blur)
- Generous border-radius (8-16px)
- Bold, playful aesthetic

## Game Mechanics Reference

### Scoring
- Base: +100 correct, 0 wrong
- Evidence: -10 per tile revealed
- Speed: +0 to +50 based on time remaining
- Confidence:
  - 50%: 1.0x
  - 75%: 1.3x
  - 90%: 1.7x (wrong = -80 penalty)

### Evidence Types
1. Leaf (shape + margin)
2. Bark (texture close-up)
3. Seed/Fruit (acorn, samara, cone, nut)
4. Buds/Twigs
5. Winter Silhouette
6. Range Map
7. Habitat Photo

### Scenes
BOOT → TITLE → HOW_TO_PLAY → PLAYING → RESULTS → GAME_OVER

## Development Workflow

1. Check `docs/treesleuth_creation.md` for current phase
2. Implement next incomplete tasks
3. Write tests for logic changes
4. Run `npm test` before committing
5. Update plan checkboxes
6. Commit with conventional commits (`feat:`, `fix:`, `test:`, etc.)

## Common Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm test         # Run tests
npm run lint     # Lint code
```

## Documentation

- Master plan: `docs/treesleuth_creation.md`
- Theme guide: `docs/theme.md`
