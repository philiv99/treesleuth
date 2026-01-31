/**
 * Game State Hook
 * 
 * Central state management for TreeSleuth using React Context.
 */

import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react'
import type {
  GameState,
  GameScene,
  GameMode,
  CaseState,
  EvidenceTileState,
  TreeSpecies,
  ConfidenceLevel,
  PlayerGuess,
} from './types'
import { EVIDENCE_TYPES, CASE_TIME_LIMIT } from './constants'
import { calculateScore } from './logic/scoring'

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialGameState: GameState = {
  scene: 'title',
  mode: null,
  daily: null,
  expedition: null,
  currentCase: null,
  practiceCategory: null,
}

// ============================================================================
// ACTIONS
// ============================================================================

type GameAction =
  | { type: 'SET_SCENE'; scene: GameScene }
  | { type: 'START_GAME'; mode: GameMode; species: TreeSpecies }
  | { type: 'REVEAL_EVIDENCE'; evidenceType: string }
  | { type: 'MAKE_GUESS'; speciesId: string; confidence: ConfidenceLevel }
  | { type: 'TICK_TIMER' }
  | { type: 'COMPLETE_CASE' }
  | { type: 'NEXT_TREE' }
  | { type: 'RESET_GAME' }
  | { type: 'SET_PRACTICE_CATEGORY'; categoryId: string }

// ============================================================================
// HELPERS
// ============================================================================

function createInitialEvidenceTiles(): EvidenceTileState[] {
  return EVIDENCE_TYPES.map((type, index) => ({
    type,
    isRevealed: index === 0, // First tile (leaf) is revealed as initial clue
  }))
}

function createCaseState(species: TreeSpecies): CaseState {
  return {
    targetSpecies: species,
    evidenceTiles: createInitialEvidenceTiles(),
    evidenceRevealed: 1, // Initial clue
    timeRemaining: CASE_TIME_LIMIT,
    startTime: Date.now(),
    guess: null,
    isComplete: false,
    isCorrect: null,
    score: 0,
  }
}

// ============================================================================
// REDUCER
// ============================================================================

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_SCENE':
      return { ...state, scene: action.scene }

    case 'START_GAME': {
      const newCase = createCaseState(action.species)
      return {
        ...state,
        scene: 'playing',
        mode: action.mode,
        currentCase: newCase,
      }
    }

    case 'REVEAL_EVIDENCE': {
      if (!state.currentCase) return state
      
      const updatedTiles = state.currentCase.evidenceTiles.map(tile =>
        tile.type === action.evidenceType && !tile.isRevealed
          ? { ...tile, isRevealed: true, revealedAt: Date.now() }
          : tile
      )
      
      const newRevealed = updatedTiles.filter(t => t.isRevealed).length
      
      return {
        ...state,
        currentCase: {
          ...state.currentCase,
          evidenceTiles: updatedTiles,
          evidenceRevealed: newRevealed,
        },
      }
    }

    case 'MAKE_GUESS': {
      if (!state.currentCase || state.currentCase.isComplete) return state
      
      const guess: PlayerGuess = {
        speciesId: action.speciesId,
        confidence: action.confidence,
        timestamp: Date.now(),
      }
      
      const isCorrect = action.speciesId === state.currentCase.targetSpecies.id
      
      const scoreBreakdown = calculateScore(
        isCorrect,
        state.currentCase.evidenceRevealed,
        state.currentCase.timeRemaining,
        action.confidence
      )
      
      return {
        ...state,
        currentCase: {
          ...state.currentCase,
          guess,
          isCorrect,
          isComplete: true,
          score: scoreBreakdown.totalScore,
        },
        scene: 'results',
      }
    }

    case 'TICK_TIMER': {
      if (!state.currentCase || state.currentCase.isComplete) return state
      
      const newTimeRemaining = Math.max(0, state.currentCase.timeRemaining - 1)
      
      // Time's up - auto-complete with no guess
      if (newTimeRemaining === 0) {
        return {
          ...state,
          currentCase: {
            ...state.currentCase,
            timeRemaining: 0,
            isComplete: true,
            isCorrect: false,
            score: 0,
          },
          scene: 'results',
        }
      }
      
      return {
        ...state,
        currentCase: {
          ...state.currentCase,
          timeRemaining: newTimeRemaining,
        },
      }
    }

    case 'COMPLETE_CASE':
      return {
        ...state,
        scene: 'results',
      }

    case 'NEXT_TREE':
      // For expedition mode, move to next tree
      // For now, just go back to title
      return {
        ...state,
        scene: 'title',
        currentCase: null,
      }

    case 'RESET_GAME':
      return initialGameState

    case 'SET_PRACTICE_CATEGORY':
      return {
        ...state,
        practiceCategory: action.categoryId,
      }

    default:
      return state
  }
}

// ============================================================================
// CONTEXT
// ============================================================================

interface GameContextValue {
  state: GameState
  
  // Scene navigation
  goToScene: (scene: GameScene) => void
  goToTitle: () => void
  goToHowToPlay: () => void
  
  // Game actions
  startGame: (mode: GameMode, species: TreeSpecies) => void
  revealEvidence: (evidenceType: string) => void
  makeGuess: (speciesId: string, confidence: ConfidenceLevel) => void
  tickTimer: () => void
  nextTree: () => void
  resetGame: () => void
  
  // Practice mode
  setPracticeCategory: (categoryId: string) => void
}

const GameContext = createContext<GameContextValue | null>(null)

// ============================================================================
// PROVIDER
// ============================================================================

interface GameProviderProps {
  children: ReactNode
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  // Scene navigation
  const goToScene = useCallback((scene: GameScene) => {
    dispatch({ type: 'SET_SCENE', scene })
  }, [])

  const goToTitle = useCallback(() => {
    dispatch({ type: 'SET_SCENE', scene: 'title' })
  }, [])

  const goToHowToPlay = useCallback(() => {
    dispatch({ type: 'SET_SCENE', scene: 'how-to-play' })
  }, [])

  // Game actions
  const startGame = useCallback((mode: GameMode, species: TreeSpecies) => {
    dispatch({ type: 'START_GAME', mode, species })
  }, [])

  const revealEvidence = useCallback((evidenceType: string) => {
    dispatch({ type: 'REVEAL_EVIDENCE', evidenceType })
  }, [])

  const makeGuess = useCallback((speciesId: string, confidence: ConfidenceLevel) => {
    dispatch({ type: 'MAKE_GUESS', speciesId, confidence })
  }, [])

  const tickTimer = useCallback(() => {
    dispatch({ type: 'TICK_TIMER' })
  }, [])

  const nextTree = useCallback(() => {
    dispatch({ type: 'NEXT_TREE' })
  }, [])

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' })
  }, [])

  const setPracticeCategory = useCallback((categoryId: string) => {
    dispatch({ type: 'SET_PRACTICE_CATEGORY', categoryId })
  }, [])

  const value: GameContextValue = {
    state,
    goToScene,
    goToTitle,
    goToHowToPlay,
    startGame,
    revealEvidence,
    makeGuess,
    tickTimer,
    nextTree,
    resetGame,
    setPracticeCategory,
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

// ============================================================================
// HOOK
// ============================================================================

export function useGameState(): GameContextValue {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGameState must be used within a GameProvider')
  }
  return context
}
