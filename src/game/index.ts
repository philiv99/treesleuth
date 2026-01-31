/**
 * Game module exports
 */

// Types
export * from './types'

// Constants
export * from './constants'

// State management
export { GameProvider, useGameState } from './useGameState'

// Scenes
export { SceneManager } from './scenes'

// Logic
export * from './logic/scoring'

// Data
export { 
  treeSpecies, 
  getSpeciesById, 
  getRandomSpecies,
  getSpeciesByFamily,
  getSpeciesByRegion,
} from './data/species'
