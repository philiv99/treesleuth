/**
 * Title Scene
 * 
 * Main menu with game mode selection.
 */

import { useState, useEffect } from 'react'
import { useGameState } from '../useGameState'
import { audioManager } from '../../engine'
import './TitleScene.css'

export function TitleScene() {
  const { goToScene, goToHowToPlay } = useGameState()
  const [isMuted, setIsMuted] = useState(audioManager.muted)

  // Unlock audio on first click
  useEffect(() => {
    const unlock = () => audioManager.unlock()
    document.addEventListener('click', unlock, { once: true })
    return () => document.removeEventListener('click', unlock)
  }, [])

  const handleModeClick = () => {
    audioManager.play('click')
    goToScene('mode-select')
  }

  const handleHowToPlay = () => {
    audioManager.play('click')
    goToHowToPlay()
  }

  const handleToggleMute = () => {
    const newMuted = audioManager.toggleMute()
    setIsMuted(newMuted)
    if (!newMuted) {
      audioManager.play('click')
    }
  }

  return (
    <div className="title-scene">
      {/* Sound Toggle */}
      <button 
        className="sound-toggle"
        onClick={handleToggleMute}
        aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      <header className="title-header">
        <h1 className="game-title">TreeSleuth</h1>
        <p className="tagline">Crack the case. Know your trees.</p>
      </header>

      <div className="mode-selection">
        <button 
          className="mode-card"
          onClick={handleModeClick}
        >
          <span className="mode-icon">📅</span>
          <span className="mode-name">Daily Grove</span>
          <span className="mode-desc">One tree per day. Build your streak!</span>
        </button>

        <button 
          className="mode-card"
          onClick={handleModeClick}
        >
          <span className="mode-icon">🏃</span>
          <span className="mode-name">Expedition Run</span>
          <span className="mode-desc">10 trees. Race the clock!</span>
        </button>

        <button 
          className="mode-card"
          onClick={handleModeClick}
        >
          <span className="mode-icon">🔬</span>
          <span className="mode-name">Practice Lab</span>
          <span className="mode-desc">Learn at your own pace</span>
        </button>
      </div>

      <div className="title-actions">
        <button 
          className="btn-secondary"
          onClick={handleHowToPlay}
        >
          How to Play
        </button>
      </div>

      <footer className="title-footer">
        <p>🌳 17 Northeast US species to discover</p>
      </footer>
    </div>
  )
}
