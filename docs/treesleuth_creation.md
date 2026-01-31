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

## Phase 1: Foundation ✅ COMPLETE

### 1.1 Project Setup
- [x] Create repo folder at `C:\development\repos\treesleuth`
- [x] Initialize git with `main` branch
- [x] Scaffold Vite + React + TypeScript
- [x] Install dependencies (react, vitest, testing-library)
- [x] Create project folder structure
- [x] Configure vitest
- [x] Create LinkittyDo theme (`src/theme/`)
- [x] Create `docs/theme.md`
- [x] Create `README.md` with game identity
- [x] Create `.github/copilot-instructions.md`
- [x] Create GitHub repo and push initial commit

### 1.2 Core Game Types & Constants
- [x] Define `TreeSpecies` type with all evidence fields
- [x] Define `Evidence` types (Leaf, Bark, Seed, Bud, Silhouette, Range, Habitat)
- [x] Define `GameState` type (scene, progress, score, timer)
- [x] Define `ConfidenceLevel` type (50%, 75%, 90%)
- [x] Create `src/game/constants.ts` with scoring rules
- [x] Create `src/game/types.ts` with all type definitions

---

## Phase 2: State Machine & Scene System ✅ COMPLETE

### 2.1 Scene/State Machine
- [x] Create `GameScene` type: boot, title, how-to-play, mode-select, playing, results, game-over
- [x] Implement `useGameState` hook for scene transitions
- [x] Create `SceneManager` component that renders active scene

### 2.2 Basic Scenes
- [x] `TitleScene`: Logo, Play button, mode selection
- [x] `HowToPlayScene`: Rules explanation overlay
- [x] `ModeSelectScene`: Quick play mode selection
- [x] `PlayingScene`: Main game container with evidence tiles
- [x] `ResultsScene`: Score reveal, explanation, lookalikes

---

## Phase 3: Core Gameplay Logic ✅ COMPLETE

### 3.1 Evidence System
- [x] Evidence tile state tracking in game state
- [x] Implement evidence reveal logic
- [x] Create evidence tile data structure
- [x] Evidence grid UI with reveal animation

### 3.2 Scoring System
- [x] Implement base scoring (+100 correct, 0 wrong)
- [x] Implement evidence penalty (-10 per tile, first free)
- [x] Implement speed bonus (0-50 points)
- [x] Implement confidence multipliers (1.0x, 1.3x, 1.7x)
- [x] Implement wrong-with-high-confidence penalty (-80)
- [x] Unit tests for all scoring scenarios (28 tests passing)

### 3.3 Tree Identification Logic
- [x] Species matching by ID
- [x] Lookalike species tracking
- [x] Answer validation in state machine

---

## Phase 4: Tree Database ✅ COMPLETE (17 species)

### 4.1 Data Structure
- [x] Define complete `TreeSpecies` schema
- [x] Create `src/game/data/species.ts`
- [x] Define evidence content types (descriptions, key features)

### 4.2 Initial Species Set (17 of 25 Northeast US)
- [x] Maples: Red, Sugar, Silver (3)
- [x] Oaks: White, Red, Pin (3)
- [x] Birches: Paper, River (2)
- [x] Conifers: Eastern White Pine, Norway Spruce, Balsam Fir, Eastern Hemlock (4)
- [x] Others: American Beech, Sycamore, Tuliptree, Black Walnut, Shagbark Hickory, White Ash (6)
- [ ] Additional: Sweetgum, Black Cherry, Sassafras, Dogwood, Redbud, Eastern Redcedar, American Elm (7) - Future

### 4.3 Evidence Content
- [x] Leaf descriptions for all species
- [x] Bark descriptions for all species
- [x] Seed/fruit descriptions for all species
- [x] Bud/twig descriptions for all species
- [x] Silhouette descriptions for all species
- [x] Range info (simplified regions)
- [x] Habitat info for all species
- [x] "Why it's tricky" notes for lookalikes
- [x] Fun facts for all species

---

## Phase 5: UI Components ✅ MOSTLY COMPLETE

### 5.1 Common Components
- [x] Button styles (primary, secondary)
- [x] Card panels
- [x] Timer display
- [ ] Standalone Badge component
- [ ] Standalone Modal component

### 5.2 Game-Specific Components
- [x] `TreeProfileCard` (silhouette + initial clue)
- [x] `EvidenceTile` (face-down, revealed states)
- [x] `EvidenceGrid` (layout of all evidence tiles)
- [x] `SpeciesSearch` (searchable species list)
- [x] `ConfidenceSelector` (50%/75%/90% picker)
- [x] `ResultsCard` (shows correct answer + explanation)
- [x] Lookalikes display

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

