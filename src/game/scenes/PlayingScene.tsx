/**
 * Playing Scene
 * 
 * Main gameplay screen with tree profile, evidence tiles, and guess interface.
 */

import { useEffect } from 'react'
import { useGameState } from '../useGameState'
import { EvidenceTypeLabels, EvidenceTypeIcons } from '../types'
import type { EvidenceType, ConfidenceLevel } from '../types'
import './PlayingScene.css'

export function PlayingScene() {
  const { state, revealEvidence, makeGuess, tickTimer, goToTitle } = useGameState()
  const currentCase = state.currentCase

  // Timer effect
  useEffect(() => {
    if (!currentCase || currentCase.isComplete) return

    const timer = setInterval(() => {
      tickTimer()
    }, 1000)

    return () => clearInterval(timer)
  }, [currentCase, tickTimer])

  if (!currentCase) {
    return (
      <div className="playing-scene">
        <p>No active case. Return to title.</p>
        <button onClick={goToTitle}>Back to Title</button>
      </div>
    )
  }

  const { targetSpecies, evidenceTiles, timeRemaining, evidenceRevealed } = currentCase

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleRevealEvidence = (type: string) => {
    revealEvidence(type)
  }

  const handleMakeGuess = (speciesId: string, confidence: ConfidenceLevel) => {
    makeGuess(speciesId, confidence)
  }

  // Get initial clue text
  const getInitialClueText = () => {
    const leafType = targetSpecies.leafType
    const habitat = targetSpecies.habitat
    return `Leaf type: ${leafType} • Habitat: ${habitat}`
  }

  return (
    <div className="playing-scene">
      {/* Header with timer and score info */}
      <header className="playing-header">
        <button className="back-btn" onClick={goToTitle}>✕</button>
        <div className="timer">
          <span className="timer-icon">⏱️</span>
          <span className="timer-value">{formatTime(timeRemaining)}</span>
        </div>
        <div className="evidence-count">
          <span className="evidence-icon">🔍</span>
          <span className="evidence-value">{evidenceRevealed}/7</span>
        </div>
      </header>

      {/* Tree Profile Card */}
      <div className="tree-profile">
        <div className="tree-silhouette">
          <span className="tree-icon">🌳</span>
          <span className="mystery-label">Mystery Tree</span>
        </div>
        <div className="initial-clue">
          <span className="clue-label">Initial Clue:</span>
          <span className="clue-text">{getInitialClueText()}</span>
        </div>
      </div>

      {/* Evidence Grid */}
      <div className="evidence-section">
        <h3>Collect Evidence</h3>
        <div className="evidence-grid">
          {evidenceTiles.map((tile) => (
            <EvidenceTile
              key={tile.type}
              type={tile.type}
              isRevealed={tile.isRevealed}
              evidence={targetSpecies.evidence[tile.type]}
              onReveal={() => handleRevealEvidence(tile.type)}
            />
          ))}
        </div>
      </div>

      {/* Guess Section */}
      <div className="guess-section">
        <h3>Make Your Call</h3>
        <GuessInterface 
          targetSpecies={targetSpecies}
          onGuess={handleMakeGuess}
        />
      </div>
    </div>
  )
}

// ============================================================================
// EVIDENCE TILE COMPONENT
// ============================================================================

interface EvidenceTileProps {
  type: EvidenceType
  isRevealed: boolean
  evidence: {
    title: string
    description: string
    keyFeatures: string[]
  }
  onReveal: () => void
}

function EvidenceTile({ type, isRevealed, evidence, onReveal }: EvidenceTileProps) {
  const icon = EvidenceTypeIcons[type]
  const label = EvidenceTypeLabels[type]

  if (!isRevealed) {
    return (
      <button className="evidence-tile face-down" onClick={onReveal}>
        <span className="tile-icon">{icon}</span>
        <span className="tile-label">{label}</span>
        <span className="tile-hint">-10 pts</span>
      </button>
    )
  }

  return (
    <div className="evidence-tile revealed">
      <div className="tile-header">
        <span className="tile-icon">{icon}</span>
        <span className="tile-label">{label}</span>
      </div>
      <p className="tile-description">{evidence.description}</p>
      <ul className="tile-features">
        {evidence.keyFeatures.slice(0, 2).map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}

// ============================================================================
// GUESS INTERFACE COMPONENT
// ============================================================================

import { useState } from 'react'
import { treeSpecies } from '../data/species'

interface GuessInterfaceProps {
  targetSpecies: { id: string }
  onGuess: (speciesId: string, confidence: ConfidenceLevel) => void
}

function GuessInterface({ onGuess }: GuessInterfaceProps) {
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<ConfidenceLevel>(75)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSpecies = treeSpecies.filter(s => 
    s.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = () => {
    if (selectedSpecies) {
      onGuess(selectedSpecies, confidence)
    }
  }

  return (
    <div className="guess-interface">
      {/* Species Search/Select */}
      <div className="species-selector">
        <input
          type="text"
          className="species-search"
          placeholder="Search species..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="species-list">
          {filteredSpecies.slice(0, 8).map(species => (
            <button
              key={species.id}
              className={`species-option ${selectedSpecies === species.id ? 'selected' : ''}`}
              onClick={() => setSelectedSpecies(species.id)}
            >
              <span className="species-name">{species.commonName}</span>
              <span className="species-family">{species.family}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Confidence Selector */}
      <div className="confidence-selector">
        <span className="confidence-label">Confidence:</span>
        <div className="confidence-options">
          {([50, 75, 90] as ConfidenceLevel[]).map(level => (
            <button
              key={level}
              className={`confidence-btn ${confidence === level ? 'selected' : ''} ${level === 90 ? 'risky' : ''}`}
              onClick={() => setConfidence(level)}
            >
              <span className="conf-percent">{level}%</span>
              <span className="conf-mult">×{level === 50 ? '1.0' : level === 75 ? '1.3' : '1.7'}</span>
            </button>
          ))}
        </div>
        {confidence === 90 && (
          <p className="risk-warning">⚠️ Wrong = -80 penalty!</p>
        )}
      </div>

      {/* Submit Button */}
      <button 
        className="submit-guess-btn"
        disabled={!selectedSpecies}
        onClick={handleSubmit}
      >
        Submit Guess
      </button>
    </div>
  )
}
