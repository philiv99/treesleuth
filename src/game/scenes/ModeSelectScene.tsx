/**
 * Mode Select Scene
 * 
 * Quick play mode - just start a practice game immediately.
 */

import { useGameState } from '../useGameState'
import { getRandomSpecies } from '../data/species'
import './ModeSelectScene.css'

export function ModeSelectScene() {
  const { startGame, goToTitle } = useGameState()

  const handleStartPractice = () => {
    const species = getRandomSpecies()
    startGame('practice', species)
  }

  return (
    <div className="mode-select-scene">
      <div className="mode-select-card">
        <header className="mode-header">
          <button className="back-btn" onClick={goToTitle}>← Back</button>
          <h2>Choose Your Mode</h2>
        </header>

        <div className="mode-options">
          <button 
            className="mode-option daily"
            onClick={handleStartPractice}
          >
            <span className="mode-icon">📅</span>
            <div className="mode-info">
              <h3>Daily Grove</h3>
              <p>One mystery tree per day</p>
            </div>
            <span className="mode-badge">Coming Soon</span>
          </button>

          <button 
            className="mode-option expedition"
            onClick={handleStartPractice}
          >
            <span className="mode-icon">🏃</span>
            <div className="mode-info">
              <h3>Expedition Run</h3>
              <p>10 trees, race the clock</p>
            </div>
            <span className="mode-badge">Coming Soon</span>
          </button>

          <button 
            className="mode-option practice active"
            onClick={handleStartPractice}
          >
            <span className="mode-icon">🔬</span>
            <div className="mode-info">
              <h3>Quick Practice</h3>
              <p>Start identifying trees now!</p>
            </div>
            <span className="mode-badge ready">Ready</span>
          </button>
        </div>
      </div>
    </div>
  )
}
