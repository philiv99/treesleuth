/**
 * Scene Manager
 * 
 * Renders the appropriate scene based on current game state.
 */

import { useGameState } from '../useGameState'
import { TitleScene } from './TitleScene'
import { HowToPlayScene } from './HowToPlayScene'
import { PlayingScene } from './PlayingScene'
import { ResultsScene } from './ResultsScene'
import { ModeSelectScene } from './ModeSelectScene'

export function SceneManager() {
  const { state } = useGameState()

  switch (state.scene) {
    case 'title':
      return <TitleScene />
    case 'how-to-play':
      return <HowToPlayScene />
    case 'mode-select':
      return <ModeSelectScene />
    case 'playing':
      return <PlayingScene />
    case 'results':
      return <ResultsScene />
    case 'game-over':
      return <TitleScene /> // Fallback for now
    default:
      return <TitleScene />
  }
}
