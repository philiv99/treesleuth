/**
 * Results Scene
 * 
 * Shows the outcome of a guess with explanation and score breakdown.
 */

import { useEffect } from 'react'
import { useGameState } from '../useGameState'
import { calculateScore, formatScore } from '../logic/scoring'
import { getSpeciesById } from '../data/species'
import { audioManager } from '../../engine'
import './ResultsScene.css'

export function ResultsScene() {
  const { state, goToTitle, nextTree } = useGameState()
  const currentCase = state.currentCase

  // Play correct/wrong sound on mount
  useEffect(() => {
    if (currentCase?.isCorrect) {
      audioManager.play('correct')
    } else {
      audioManager.play('wrong')
    }
  }, [])

  if (!currentCase) {
    return (
      <div className="results-scene">
        <p>No results to display.</p>
        <button onClick={goToTitle}>Back to Title</button>
      </div>
    )
  }

  const { targetSpecies, guess, isCorrect, evidenceRevealed, timeRemaining } = currentCase
  
  // Calculate score breakdown
  const scoreBreakdown = guess 
    ? calculateScore(
        isCorrect ?? false,
        evidenceRevealed,
        timeRemaining,
        guess.confidence
      )
    : null

  // Get guessed species info if they made a guess
  const guessedSpecies = guess ? getSpeciesById(guess.speciesId) : null

  const handleGoToTitle = () => {
    audioManager.play('click')
    goToTitle()
  }

  const handleNextTree = () => {
    audioManager.play('click')
    nextTree()
  }

  return (
    <div className="results-scene">
      <div className="results-card">
        {/* Result Header */}
        <header className={`results-header ${isCorrect ? 'correct' : 'incorrect'}`}>
          <span className="result-icon">{isCorrect ? '✅' : '❌'}</span>
          <h2 className="result-title">
            {isCorrect ? 'Correct!' : guess ? 'Not Quite!' : "Time's Up!"}
          </h2>
        </header>

        {/* The Answer */}
        <section className="answer-section">
          <div className="answer-card">
            <span className="answer-icon">🌳</span>
            <div className="answer-info">
              <h3 className="answer-name">{targetSpecies.commonName}</h3>
              <p className="answer-scientific">{targetSpecies.scientificName}</p>
              <span className="answer-family">{targetSpecies.family}</span>
            </div>
          </div>
          
          {guessedSpecies && !isCorrect && (
            <div className="your-guess">
              <span className="guess-label">You guessed:</span>
              <span className="guess-name">{guessedSpecies.commonName}</span>
            </div>
          )}
        </section>

        {/* Score Breakdown */}
        {scoreBreakdown && guess && (
          <section className="score-section">
            <h4>Score Breakdown</h4>
            <div className="score-breakdown">
              <div className="score-row">
                <span className="score-label">Base Score</span>
                <span className="score-value">{formatScore(scoreBreakdown.baseScore)}</span>
              </div>
              {scoreBreakdown.evidencePenalty > 0 && (
                <div className="score-row penalty">
                  <span className="score-label">Evidence Penalty ({evidenceRevealed - 1} clues)</span>
                  <span className="score-value">-{scoreBreakdown.evidencePenalty}</span>
                </div>
              )}
              {scoreBreakdown.speedBonus > 0 && (
                <div className="score-row bonus">
                  <span className="score-label">Speed Bonus</span>
                  <span className="score-value">+{scoreBreakdown.speedBonus}</span>
                </div>
              )}
              <div className="score-row">
                <span className="score-label">Confidence ({guess.confidence}%)</span>
                <span className="score-value">×{scoreBreakdown.confidenceMultiplier}</span>
              </div>
              {scoreBreakdown.wrongHighConfidencePenalty > 0 && (
                <div className="score-row penalty">
                  <span className="score-label">High Confidence Penalty</span>
                  <span className="score-value">-{scoreBreakdown.wrongHighConfidencePenalty}</span>
                </div>
              )}
              <div className="score-row total">
                <span className="score-label">Total Score</span>
                <span className="score-value">{formatScore(scoreBreakdown.totalScore)}</span>
              </div>
            </div>
          </section>
        )}

        {/* Explanation */}
        <section className="explanation-section">
          <h4>Key Identifiers</h4>
          <div className="key-features">
            {targetSpecies.evidence.leaf.keyFeatures.slice(0, 3).map((feature, i) => (
              <span key={i} className="feature-tag">🍂 {feature}</span>
            ))}
            {targetSpecies.evidence.bark.keyFeatures.slice(0, 2).map((feature, i) => (
              <span key={i} className="feature-tag">🪵 {feature}</span>
            ))}
          </div>
          
          {targetSpecies.whyItsTricky && (
            <div className="tricky-note">
              <span className="tricky-icon">💡</span>
              <p>{targetSpecies.whyItsTricky}</p>
            </div>
          )}

          {targetSpecies.funFact && (
            <div className="fun-fact">
              <span className="fact-icon">🎓</span>
              <p>{targetSpecies.funFact}</p>
            </div>
          )}
        </section>

        {/* Lookalikes */}
        {targetSpecies.lookalikes.length > 0 && (
          <section className="lookalikes-section">
            <h4>Similar Species</h4>
            <div className="lookalikes-list">
              {targetSpecies.lookalikes.map(id => {
                const lookalike = getSpeciesById(id)
                return lookalike ? (
                  <div key={id} className="lookalike-item">
                    <span className="lookalike-icon">🌳</span>
                    <span className="lookalike-name">{lookalike.commonName}</span>
                  </div>
                ) : null
              })}
            </div>
          </section>
        )}

        {/* Actions */}
        <footer className="results-actions">
          <button className="btn-primary" onClick={handleGoToTitle}>
            Back to Menu
          </button>
          <button className="btn-secondary" onClick={handleNextTree}>
            Next Tree
          </button>
        </footer>
      </div>
    </div>
  )
}
