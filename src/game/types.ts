/**
 * TreeSleuth Game Types
 * 
 * Core type definitions for the tree identification game.
 */

// ============================================================================
// EVIDENCE TYPES
// ============================================================================

/** Types of evidence that can be revealed during gameplay */
export type EvidenceType = 
  | 'leaf'
  | 'bark'
  | 'seed'
  | 'bud'
  | 'silhouette'
  | 'range'
  | 'habitat'

/** Display names for evidence types */
export const EvidenceTypeLabels: Record<EvidenceType, string> = {
  leaf: 'Leaf',
  bark: 'Bark',
  seed: 'Seed/Fruit',
  bud: 'Buds & Twigs',
  silhouette: 'Silhouette',
  range: 'Range Map',
  habitat: 'Habitat',
}

/** Icons/emojis for evidence types */
export const EvidenceTypeIcons: Record<EvidenceType, string> = {
  leaf: '🍂',
  bark: '🪵',
  seed: '🌰',
  bud: '🌱',
  silhouette: '🌳',
  range: '🗺️',
  habitat: '🏞️',
}

/** A single piece of evidence about a tree */
export interface Evidence {
  type: EvidenceType
  title: string
  description: string
  /** Optional image URL (for future use) */
  imageUrl?: string
  /** Key identifying features to highlight */
  keyFeatures: string[]
}

// ============================================================================
// TREE SPECIES
// ============================================================================

/** Leaf type classification */
export type LeafType = 'simple' | 'compound' | 'needle' | 'scale'

/** Leaf arrangement on stem */
export type LeafArrangement = 'opposite' | 'alternate' | 'whorled'

/** General habitat categories */
export type HabitatType = 
  | 'wetland'
  | 'upland'
  | 'forest'
  | 'forest-edge'
  | 'riparian'
  | 'urban'
  | 'mixed'

/** Geographic regions (Northeast US for starter pack) */
export type Region = 
  | 'northeast'
  | 'southeast'
  | 'midwest'
  | 'northwest'
  | 'southwest'

/** Tree family for grouping similar species */
export type TreeFamily = 
  | 'maple'      // Aceraceae
  | 'oak'        // Fagaceae
  | 'birch'      // Betulaceae
  | 'pine'       // Pinaceae
  | 'beech'      // Fagaceae
  | 'walnut'     // Juglandaceae
  | 'elm'        // Ulmaceae
  | 'ash'        // Oleaceae
  | 'cherry'     // Rosaceae
  | 'magnolia'   // Magnoliaceae
  | 'cypress'    // Cupressaceae
  | 'other'

/** Complete tree species definition */
export interface TreeSpecies {
  /** Unique identifier (slug) */
  id: string
  /** Common name */
  commonName: string
  /** Scientific name (Latin) */
  scientificName: string
  /** Tree family */
  family: TreeFamily
  /** Basic leaf type (shown as initial clue) */
  leafType: LeafType
  /** Leaf arrangement */
  leafArrangement: LeafArrangement
  /** Primary habitat */
  habitat: HabitatType
  /** Regions where found */
  regions: Region[]
  
  /** Evidence content for each type */
  evidence: {
    leaf: Evidence
    bark: Evidence
    seed: Evidence
    bud: Evidence
    silhouette: Evidence
    range: Evidence
    habitat: Evidence
  }
  
  /** IDs of species that are commonly confused with this one */
  lookalikes: string[]
  /** Explanation of key differentiators from lookalikes */
  whyItsTricky?: string
  /** Fun fact or memorable detail */
  funFact?: string
  /** Difficulty rating 1-5 */
  difficulty: 1 | 2 | 3 | 4 | 5
}

// ============================================================================
// GAME STATE
// ============================================================================

/** Game scenes/screens */
export type GameScene = 
  | 'boot'
  | 'title'
  | 'how-to-play'
  | 'mode-select'
  | 'playing'
  | 'results'
  | 'game-over'

/** Game modes */
export type GameMode = 
  | 'daily'       // Daily Grove - one tree per day
  | 'expedition'  // Expedition Run - 10 trees, timed
  | 'practice'    // Practice Lab - category-based learning
  | 'versus'      // Park Ranger Duel (future)

/** Confidence levels for guesses */
export type ConfidenceLevel = 50 | 75 | 90

/** State of a single evidence tile */
export interface EvidenceTileState {
  type: EvidenceType
  isRevealed: boolean
  revealedAt?: number // timestamp when revealed
}

/** Player's guess */
export interface PlayerGuess {
  speciesId: string
  confidence: ConfidenceLevel
  timestamp: number
}

/** State for a single tree case/round */
export interface CaseState {
  /** The tree species to identify */
  targetSpecies: TreeSpecies
  /** State of each evidence tile */
  evidenceTiles: EvidenceTileState[]
  /** Number of evidence tiles revealed */
  evidenceRevealed: number
  /** Time remaining in seconds (if timed) */
  timeRemaining: number
  /** Time when case started */
  startTime: number
  /** Player's guess (if made) */
  guess: PlayerGuess | null
  /** Whether the case is complete */
  isComplete: boolean
  /** Whether the guess was correct */
  isCorrect: boolean | null
  /** Score earned for this case */
  score: number
}

/** State for an expedition run (multiple trees) */
export interface ExpeditionState {
  /** Total trees in this expedition */
  totalTrees: number
  /** Current tree index (0-based) */
  currentTreeIndex: number
  /** All cases in this expedition */
  cases: CaseState[]
  /** Total score accumulated */
  totalScore: number
  /** Total time remaining for the run */
  runTimeRemaining: number
  /** Region filter for this expedition */
  region: Region
  /** Whether expedition is complete */
  isComplete: boolean
}

/** Daily challenge state */
export interface DailyState {
  /** Date string (YYYY-MM-DD) */
  date: string
  /** The daily case */
  case: CaseState
  /** Whether already completed today */
  isCompleted: boolean
  /** Current streak */
  streak: number
}

/** Root game state */
export interface GameState {
  /** Current scene */
  scene: GameScene
  /** Current game mode */
  mode: GameMode | null
  /** Daily grove state */
  daily: DailyState | null
  /** Expedition state */
  expedition: ExpeditionState | null
  /** Current active case (for practice mode) */
  currentCase: CaseState | null
  /** Practice mode category filter */
  practiceCategory: string | null
}

// ============================================================================
// SCORING
// ============================================================================

/** Result of calculating a score */
export interface ScoreBreakdown {
  baseScore: number
  evidencePenalty: number
  speedBonus: number
  confidenceMultiplier: number
  wrongHighConfidencePenalty: number
  totalScore: number
}

// ============================================================================
// PERSISTENCE
// ============================================================================

/** Player progress stored in localStorage */
export interface PlayerProgress {
  /** Species mastery: speciesId -> { attempts, correct, bestScore } */
  herbarium: Record<string, SpeciesMastery>
  /** Daily streaks */
  dailyStreak: number
  /** Longest daily streak */
  longestStreak: number
  /** Last daily completion date (YYYY-MM-DD) */
  lastDailyDate: string | null
  /** Total games played */
  totalGames: number
  /** Total correct identifications */
  totalCorrect: number
  /** Unlocked tools */
  unlockedTools: string[]
  /** High scores by mode */
  highScores: {
    daily: number
    expedition: number
  }
}

/** Mastery data for a single species */
export interface SpeciesMastery {
  /** Total attempts */
  attempts: number
  /** Correct identifications */
  correct: number
  /** Best score achieved */
  bestScore: number
  /** First identification date */
  firstIdentified: string | null
  /** Last attempt date */
  lastAttempt: string
}

/** User settings stored in localStorage */
export interface UserSettings {
  /** Sound effects enabled */
  soundEnabled: boolean
  /** Music enabled */
  musicEnabled: boolean
  /** Preferred difficulty (affects candidate list size) */
  difficulty: 'easy' | 'normal' | 'hard'
  /** Preferred region */
  preferredRegion: Region
  /** Reduced motion preference */
  reducedMotion: boolean
}
