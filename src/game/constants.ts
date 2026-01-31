/**
 * TreeSleuth Game Constants
 * 
 * Scoring rules, timing, and gameplay parameters.
 */

import type { ConfidenceLevel, EvidenceType } from './types'

// ============================================================================
// SCORING CONSTANTS
// ============================================================================

/** Base score for a correct identification */
export const BASE_SCORE = 100

/** Penalty per evidence tile revealed */
export const EVIDENCE_PENALTY = 10

/** Maximum speed bonus available */
export const MAX_SPEED_BONUS = 50

/** Confidence level multipliers */
export const CONFIDENCE_MULTIPLIERS: Record<ConfidenceLevel, number> = {
  50: 1.0,
  75: 1.3,
  90: 1.7,
}

/** Penalty for being wrong with high confidence (90%) */
export const WRONG_HIGH_CONFIDENCE_PENALTY = 80

/** Minimum score possible (floor) */
export const MIN_SCORE = 0

// ============================================================================
// TIMING CONSTANTS
// ============================================================================

/** Time per case in seconds (single tree) */
export const CASE_TIME_LIMIT = 120 // 2 minutes

/** Time per expedition run in seconds (10 trees) */
export const EXPEDITION_TIME_LIMIT = 600 // 10 minutes

/** Speed bonus calculation threshold (seconds remaining for max bonus) */
export const SPEED_BONUS_THRESHOLD = 60 // Full bonus if solved in under 60s

// ============================================================================
// EVIDENCE CONSTANTS
// ============================================================================

/** All evidence types in display order */
export const EVIDENCE_TYPES: EvidenceType[] = [
  'leaf',
  'bark',
  'seed',
  'bud',
  'silhouette',
  'range',
  'habitat',
]

/** Number of evidence tiles per case */
export const EVIDENCE_TILE_COUNT = 7

/** Initial evidence revealed at case start (always 1) */
export const INITIAL_EVIDENCE_COUNT = 1

// ============================================================================
// EXPEDITION CONSTANTS
// ============================================================================

/** Number of trees in an expedition run */
export const EXPEDITION_TREE_COUNT = 10

// ============================================================================
// DIFFICULTY SETTINGS
// ============================================================================

/** Number of candidate species shown by difficulty */
export const CANDIDATE_COUNT: Record<'easy' | 'normal' | 'hard', number> = {
  easy: 4,    // 4 choices
  normal: 8,  // 8 choices
  hard: 0,    // Searchable field guide (all species)
}

// ============================================================================
// PRACTICE CATEGORIES
// ============================================================================

/** Predefined practice categories */
export const PRACTICE_CATEGORIES = [
  { id: 'oaks-maples', name: 'Oaks vs Maples', families: ['oak', 'maple'] },
  { id: 'conifers', name: 'Conifers', families: ['pine', 'cypress'] },
  { id: 'birches-beeches', name: 'Birches & Beeches', families: ['birch', 'beech'] },
  { id: 'winter-id', name: 'Winter ID (Buds & Bark)', families: [] }, // Uses bud/bark evidence
  { id: 'street-trees', name: 'Street Trees', families: [] }, // Urban habitat filter
  { id: 'all', name: 'All Species', families: [] },
] as const

export type PracticeCategoryId = typeof PRACTICE_CATEGORIES[number]['id']

// ============================================================================
// STORAGE KEYS
// ============================================================================

/** localStorage key prefix */
export const STORAGE_PREFIX = 'treesleuth:'

/** Storage keys */
export const STORAGE_KEYS = {
  PROGRESS: `${STORAGE_PREFIX}progress`,
  SETTINGS: `${STORAGE_PREFIX}settings`,
  DAILY_STATE: `${STORAGE_PREFIX}daily`,
} as const

// ============================================================================
// DEFAULT VALUES
// ============================================================================

/** Default user settings */
export const DEFAULT_SETTINGS = {
  soundEnabled: true,
  musicEnabled: false,
  difficulty: 'normal' as const,
  preferredRegion: 'northeast' as const,
  reducedMotion: false,
}

/** Default player progress */
export const DEFAULT_PROGRESS = {
  herbarium: {},
  dailyStreak: 0,
  longestStreak: 0,
  lastDailyDate: null,
  totalGames: 0,
  totalCorrect: 0,
  unlockedTools: [],
  highScores: {
    daily: 0,
    expedition: 0,
  },
}
