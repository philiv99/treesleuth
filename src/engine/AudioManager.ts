/**
 * Audio Manager
 * 
 * Handles all game sound effects using Web Audio API.
 * Generates simple synth sounds for a retro game feel.
 */

import { STORAGE_KEYS } from '../game/constants'

type SoundEffect = 
  | 'click'
  | 'reveal'
  | 'correct'
  | 'wrong'
  | 'select'
  | 'timerWarning'
  | 'timerTick'
  | 'submit'

class AudioManager {
  private audioContext: AudioContext | null = null
  private isMuted: boolean = false
  private isInitialized: boolean = false

  constructor() {
    this.loadMutePreference()
  }

  private loadMutePreference() {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS)
      if (settings) {
        const parsed = JSON.parse(settings)
        this.isMuted = !parsed.soundEnabled
      }
    } catch {
      this.isMuted = false
    }
  }

  private saveMutePreference() {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS)
      const parsed = settings ? JSON.parse(settings) : {}
      parsed.soundEnabled = !this.isMuted
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed))
    } catch {
      // Ignore storage errors
    }
  }

  private initAudioContext() {
    if (this.isInitialized) return
    
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      this.isInitialized = true
    } catch {
      console.warn('Web Audio API not supported')
    }
  }

  /**
   * Must be called from a user interaction (click) to enable audio
   */
  unlock() {
    this.initAudioContext()
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume()
    }
  }

  get muted(): boolean {
    return this.isMuted
  }

  setMuted(muted: boolean) {
    this.isMuted = muted
    this.saveMutePreference()
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted
    this.saveMutePreference()
    return this.isMuted
  }

  play(sound: SoundEffect) {
    if (this.isMuted || !this.audioContext) return

    try {
      switch (sound) {
        case 'click':
          this.playClick()
          break
        case 'reveal':
          this.playReveal()
          break
        case 'correct':
          this.playCorrect()
          break
        case 'wrong':
          this.playWrong()
          break
        case 'select':
          this.playSelect()
          break
        case 'timerWarning':
          this.playTimerWarning()
          break
        case 'timerTick':
          this.playTimerTick()
          break
        case 'submit':
          this.playSubmit()
          break
      }
    } catch {
      // Ignore audio errors
    }
  }

  // Simple click sound
  private playClick() {
    const ctx = this.audioContext!
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.frequency.value = 800
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.1)
  }

  // Evidence reveal - ascending tone
  private playReveal() {
    const ctx = this.audioContext!
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.type = 'sine'
    osc.frequency.setValueAtTime(400, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.15)
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.setTargetAtTime(0.01, ctx.currentTime + 0.1, 0.05)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.2)
  }

  // Correct answer - happy ascending arpeggio
  private playCorrect() {
    const ctx = this.audioContext!
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.type = 'sine'
      osc.frequency.value = freq
      
      const startTime = ctx.currentTime + i * 0.1
      gain.gain.setValueAtTime(0.15, startTime)
      gain.gain.setTargetAtTime(0.01, startTime + 0.15, 0.05)
      
      osc.start(startTime)
      osc.stop(startTime + 0.25)
    })
  }

  // Wrong answer - descending sad tone
  private playWrong() {
    const ctx = this.audioContext!
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(400, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.3)
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    gain.gain.setTargetAtTime(0.01, ctx.currentTime + 0.2, 0.1)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.4)
  }

  // Selection sound
  private playSelect() {
    const ctx = this.audioContext!
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.type = 'sine'
    osc.frequency.value = 600
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.setTargetAtTime(0.01, ctx.currentTime + 0.05, 0.02)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.08)
  }

  // Timer warning - urgent beep
  private playTimerWarning() {
    const ctx = this.audioContext!
    
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.type = 'square'
      osc.frequency.value = 880
      
      const startTime = ctx.currentTime + i * 0.15
      gain.gain.setValueAtTime(0.08, startTime)
      gain.gain.setTargetAtTime(0.01, startTime + 0.08, 0.02)
      
      osc.start(startTime)
      osc.stop(startTime + 0.1)
    }
  }

  // Soft timer tick
  private playTimerTick() {
    const ctx = this.audioContext!
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.type = 'sine'
    osc.frequency.value = 1000
    
    gain.gain.setValueAtTime(0.03, ctx.currentTime)
    gain.gain.setTargetAtTime(0.001, ctx.currentTime + 0.02, 0.01)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.03)
  }

  // Submit button sound
  private playSubmit() {
    const ctx = this.audioContext!
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.type = 'sine'
    osc.frequency.setValueAtTime(500, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(700, ctx.currentTime + 0.1)
    
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.setTargetAtTime(0.01, ctx.currentTime + 0.1, 0.05)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  }
}

// Singleton instance
export const audioManager = new AudioManager()
