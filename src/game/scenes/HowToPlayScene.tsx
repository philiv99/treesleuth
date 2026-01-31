/**
 * How To Play Scene
 * 
 * Game rules and instructions overlay.
 */

import { useGameState } from '../useGameState'
import './HowToPlayScene.css'

export function HowToPlayScene() {
  const { goToTitle } = useGameState()

  return (
    <div className="how-to-play-scene">
      <div className="how-to-play-card">
        <header className="htp-header">
          <h2>How to Play</h2>
          <button 
            className="close-btn"
            onClick={goToTitle}
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        <div className="htp-content">
          <section className="htp-section">
            <h3>🎯 Goal</h3>
            <p>Identify the mystery tree species using field evidence. The fewer clues you need, the higher your score!</p>
          </section>

          <section className="htp-section">
            <h3>🔍 Gameplay</h3>
            <ol className="htp-steps">
              <li>
                <strong>Case Opens:</strong> You see a tree silhouette with one initial clue (leaf type)
              </li>
              <li>
                <strong>Collect Evidence:</strong> Click tiles to reveal clues: leaf, bark, seeds, buds, silhouette, range, habitat
              </li>
              <li>
                <strong>Make Your Call:</strong> Select a species from the candidates
              </li>
              <li>
                <strong>Confidence Bet:</strong> Choose 50%, 75%, or 90% confidence
              </li>
              <li>
                <strong>Learn:</strong> See the explanation and similar species
              </li>
            </ol>
          </section>

          <section className="htp-section">
            <h3>📊 Scoring</h3>
            <ul className="htp-scoring">
              <li><span className="score-label">Base Score:</span> <span className="score-value">+100</span> for correct ID</li>
              <li><span className="score-label">Evidence Penalty:</span> <span className="score-value">-10</span> per clue revealed</li>
              <li><span className="score-label">Speed Bonus:</span> <span className="score-value">+0–50</span> for quick solves</li>
            </ul>
            
            <div className="confidence-table">
              <h4>Confidence Multipliers</h4>
              <div className="confidence-row">
                <span className="conf-level">50%</span>
                <span className="conf-mult">×1.0</span>
                <span className="conf-risk">Safe bet</span>
              </div>
              <div className="confidence-row">
                <span className="conf-level">75%</span>
                <span className="conf-mult">×1.3</span>
                <span className="conf-risk">Moderate risk</span>
              </div>
              <div className="confidence-row highlight">
                <span className="conf-level">90%</span>
                <span className="conf-mult">×1.7</span>
                <span className="conf-risk">Wrong = -80 penalty!</span>
              </div>
            </div>
          </section>

          <section className="htp-section">
            <h3>🌳 Evidence Types</h3>
            <div className="evidence-types-grid">
              <div className="evidence-type">🍂 Leaf shape & margin</div>
              <div className="evidence-type">🪵 Bark texture</div>
              <div className="evidence-type">🌰 Seeds & fruit</div>
              <div className="evidence-type">🌱 Buds & twigs</div>
              <div className="evidence-type">🌳 Winter silhouette</div>
              <div className="evidence-type">🗺️ Range map</div>
              <div className="evidence-type">🏞️ Habitat</div>
            </div>
          </section>
        </div>

        <footer className="htp-footer">
          <button 
            className="btn-primary"
            onClick={goToTitle}
          >
            Got it!
          </button>
        </footer>
      </div>
    </div>
  )
}
