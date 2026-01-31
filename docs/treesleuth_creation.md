# TreeSleuth Development Plan

> **"Crack the case. Know your trees."**

A web-based mystery/spotting game where players identify tree species by collecting field evidence under time and uncertainty pressure—like Wordle meets a nature walk.

---

## Game Identity

- **Game Name:** TreeSleuth
- **Repo Slug:** `treesleuth`
- **Storage Prefix:** `treesleuth:`
- **Display Title:** TreeSleuth
- **Short ID:** `treesleuth`

---

## Phase 1: Foundation ✅ IN PROGRESS

### 1.1 Project Setup
- [x] Create repo folder at `C:\development\repos\treesleuth`
- [x] Initialize git with `main` branch
- [x] Scaffold Vite + React + TypeScript
- [x] Install dependencies (react, vitest, testing-library)
- [x] Create project folder structure
- [x] Configure vitest
- [x] Create LinkittyDo theme (`src/theme/`)
- [x] Create `docs/theme.md`
- [ ] Create `README.md` with game identity
- [ ] Create `.github/copilot-instructions.md`
- [ ] Create GitHub repo and push initial commit

### 1.2 Core Game Types & Constants
- [ ] Define `TreeSpecies` type with all evidence fields
- [ ] Define `Evidence` types (Leaf, Bark, Seed, Bud, Silhouette, Range, Habitat)
- [ ] Define `GameState` type (scene, progress, score, timer)
- [ ] Define `ConfidenceLevel` enum (50%, 75%, 90%)
- [ ] Create `src/game/constants.ts` with scoring rules
- [ ] Create `src/game/types.ts` with all type definitions

---

## Phase 2: State Machine & Scene System

### 2.1 Scene/State Machine
- [ ] Create `GameScene` enum: BOOT, TITLE, HOW_TO_PLAY, PLAYING, RESULTS, GAME_OVER
- [ ] Implement `useGameState` hook for scene transitions
- [ ] Create `SceneManager` component that renders active scene

### 2.2 Basic Scenes (Shells)
- [ ] `TitleScene`: Logo, Play button, mode selection
- [ ] `HowToPlayScene`: Rules explanation overlay
- [ ] `PlayingScene`: Main game container
- [ ] `ResultsScene`: Score reveal, explanation, share
- [ ] `GameOverScene`: Run summary (for Expedition mode)

---

## Phase 3: Core Gameplay Logic

### 3.1 Evidence System
- [ ] Create `EvidenceManager` for tracking revealed evidence
- [ ] Implement evidence reveal logic (spend Focus/Time)
- [ ] Create evidence tile data structure
- [ ] Unit tests for evidence reveal mechanics

### 3.2 Scoring System
- [ ] Implement base scoring (+100 correct, 0 wrong)
- [ ] Implement evidence penalty (-10 per tile)
- [ ] Implement speed bonus (0-50 points)
- [ ] Implement confidence multipliers (1.0x, 1.3x, 1.7x)
- [ ] Implement wrong-with-high-confidence penalty (-80)
- [ ] Unit tests for all scoring scenarios

### 3.3 Tree Identification Logic
- [ ] Create species matching function
- [ ] Create "lookalike" detection for similar species
- [ ] Create answer validation
- [ ] Unit tests for identification logic

---

## Phase 4: Tree Database

### 4.1 Data Structure
- [ ] Define complete `TreeSpecies` schema
- [ ] Create `src/game/data/species.ts`
- [ ] Define evidence content types (images, descriptions)

### 4.2 Initial Species Set (25 Northeast US)
- [ ] Maples: Red, Sugar, Silver (3)
- [ ] Oaks: White, Red, Pin (3)
- [ ] Birches: Paper, River (2)
- [ ] Conifers: Eastern White Pine, Spruce, Fir, Hemlock (4)
- [ ] Others: American Beech, Sycamore, Tuliptree, Black Walnut, Shagbark Hickory, White Ash (6)
- [ ] Additional: Sweetgum, Black Cherry, Sassafras, Dogwood, Redbud, Eastern Redcedar, American Elm (7)

### 4.3 Evidence Content
- [ ] Leaf descriptions for all species
- [ ] Bark descriptions for all species
- [ ] Seed/fruit descriptions for all species
- [ ] Bud/twig descriptions for all species
- [ ] Silhouette descriptions for all species
- [ ] Range info (simplified regions)
- [ ] Habitat info for all species
- [ ] "Why it's tricky" notes for lookalikes

---

## Phase 5: UI Components

### 5.1 Common Components
- [ ] `Button` (primary, secondary, ghost variants)
- [ ] `Card` (standard panel)
- [ ] `Badge` (points, confidence levels)
- [ ] `Timer` display
- [ ] `ScoreDisplay`
- [ ] `Modal` overlay base

### 5.2 Game-Specific Components
- [ ] `TreeProfileCard` (main display with silhouette/image)
- [ ] `EvidenceTile` (face-down, revealed states)
- [ ] `EvidenceGrid` (layout of all evidence tiles)
- [ ] `SpeciesList` (candidate species to choose from)
- [ ] `SpeciesSearch` (searchable field guide)
- [ ] `ConfidenceSelector` (50%/75%/90% picker)
- [ ] `ResultsCard` (shows correct answer + explanation)
- [ ] `LookalikeCarousel` (similar species comparison)

### 5.3 Overlays
- [ ] `HowToPlayOverlay`
- [ ] `SettingsOverlay`
- [ ] `ShareResultsOverlay`
- [ ] `ConfirmExitOverlay`

---

## Phase 6: Daily Grove Mode

### 6.1 Daily Case System
- [ ] Implement date-based seed for daily tree selection
- [ ] Create `getDailyTree()` function
- [ ] Persist daily completion in localStorage
- [ ] Track daily streaks

### 6.2 Daily Grove UI
- [ ] Daily mode entry from title screen
- [ ] "Already completed today" state
- [ ] Share results formatting (emoji grid style)

---

## Phase 7: Expedition Run Mode

### 7.1 Run Mechanics
- [ ] Generate 10-tree run from region/season
- [ ] Implement "daylight" timer (global run timer)
- [ ] Track run progress (trees completed, total score)
- [ ] Handle run completion

### 7.2 Expedition UI
- [ ] Region/season selector
- [ ] Progress indicator (tree 3/10)
- [ ] Run timer display
- [ ] End-of-run summary

---

## Phase 8: Practice Lab Mode

### 8.1 Category Selection
- [ ] Create category definitions (Oaks vs Maples, Conifers, etc.)
- [ ] Implement filtered tree selection by category
- [ ] No scoring pressure (learning mode)

### 8.2 Practice UI
- [ ] Category picker grid
- [ ] "Learn more" links on results
- [ ] Compare mode for similar species

---

## Phase 9: Progression & Collection

### 9.1 Herbarium (Collection Book)
- [ ] Track identified species per player
- [ ] Track mastery level per species (attempts, accuracy)
- [ ] Persist in localStorage

### 9.2 Field Tools (Unlocks)
- [ ] Define tool list: Hand Lens, Bark Scraper, Range Overlay, Compare View
- [ ] Implement unlock conditions (species mastered, runs completed)
- [ ] Tool effects on gameplay

### 9.3 Progression UI
- [ ] Herbarium grid view
- [ ] Species detail card (stats, first ID date)
- [ ] Tool belt display

---

## Phase 10: Polish & Accessibility

### 10.1 Audio (Optional)
- [ ] UI sound effects (reveal, correct, wrong)
- [ ] Background ambient sounds (optional)
- [ ] Mute toggle in settings

### 10.2 Accessibility
- [ ] Keyboard navigation for all interactions
- [ ] Screen reader labels for evidence
- [ ] Reduced motion mode
- [ ] High contrast option (if needed)

### 10.3 Responsive Design
- [ ] Mobile-friendly layout
- [ ] Touch-friendly tile interactions
- [ ] Tablet optimization

---

## Phase 11: Versus Mode (Stretch Goal)

### 11.1 Park Ranger Duel
- [ ] Two-player same-device mode
- [ ] Lock-in racing mechanic
- [ ] Point stealing for faster correct answers
- [ ] Turn-based alternative

---

## Future Enhancements (Post-MVP)

- [ ] Additional regions (Southeast, Pacific Northwest, etc.)
- [ ] Seasonal variants (spring buds, fall colors)
- [ ] User-submitted photo cases ("Neighborhood Scan")
- [ ] Achievements system
- [ ] Leaderboards (requires backend)
- [ ] Additional tree species packs

---

## Notes & Decisions

### Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rendering | DOM/React | Turn-based puzzle; no 60fps needed |
| State management | React hooks + context | Simple enough for this scope |
| Data storage | localStorage | No backend requirement |
| Testing | Vitest + Testing Library | Modern, fast, React-friendly |

### Key Dates

| Date | Milestone |
|------|-----------|
| 2026-01-31 | Project initialized |
| TBD | Phase 1-3 complete (playable core loop) |
| TBD | MVP (Daily Grove + Practice Lab) |
| TBD | Full release |

### Open Questions

1. Image assets: Use illustrations, photos, or AI-generated? (Start with text descriptions, add images later)
2. Difficulty scaling: How does Easy mode shortlist work? (Show 4-6 candidates instead of full search)
3. Season system: Implement now or later? (Later - keep initial version simpler)

---

## Resources

- Theme documentation: `docs/theme.md`
- Tree identification references: [TBD]
- Similar games for inspiration: Wordle, Geoguessr, iNaturalist

