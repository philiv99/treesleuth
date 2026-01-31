/**
 * Title Scene
 * 
 * Main menu with game mode selection.
 */

import { useGameState } from '../useGameState'
import './TitleScene.css'

export function TitleScene() {
  const { goToScene, goToHowToPlay } = useGameState()

  return (
    <div className="title-scene">
      <header className="title-header">
        <h1 className="game-title">TreeSleuth</h1>
        <p className="tagline">Crack the case. Know your trees.</p>
      </header>

      <div className="mode-selection">
        <button 
          className="mode-card"
          onClick={() => goToScene('mode-select')}
        >
          <span className="mode-icon">📅</span>
          <span className="mode-name">Daily Grove</span>
          <span className="mode-desc">One tree per day. Build your streak!</span>
        </button>

        <button 
          className="mode-card"
          onClick={() => goToScene('mode-select')}
        >
          <span className="mode-icon">🏃</span>
          <span className="mode-name">Expedition Run</span>
          <span className="mode-desc">10 trees. Race the clock!</span>
        </button>

        <button 
          className="mode-card"
          onClick={() => goToScene('mode-select')}
        >
          <span className="mode-icon">🔬</span>
          <span className="mode-name">Practice Lab</span>
          <span className="mode-desc">Learn at your own pace</span>
        </button>
      </div>

      <div className="title-actions">
        <button 
          className="btn-secondary"
          onClick={goToHowToPlay}
        >
          How to Play
        </button>
      </div>

      <footer className="title-footer">
        <p>🌳 25 Northeast US species to discover</p>
      </footer>
    </div>
  )
}
