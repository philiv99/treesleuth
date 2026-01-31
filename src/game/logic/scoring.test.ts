/**
 * Scoring Logic Tests
 */

import { describe, it, expect } from 'vitest'
import {
  calculateSpeedBonus,
  calculateEvidencePenalty,
  getConfidenceMultiplier,
  calculateScore,
  formatScore,
  calculateExpectedValue,
} from './scoring'
import {
  BASE_SCORE,
  EVIDENCE_PENALTY,
  MAX_SPEED_BONUS,
  WRONG_HIGH_CONFIDENCE_PENALTY,
  CASE_TIME_LIMIT,
  SPEED_BONUS_THRESHOLD,
} from '../constants'

describe('calculateSpeedBonus', () => {
  it('should return max bonus when solved within threshold', () => {
    // Solved in 30 seconds (threshold is 60)
    const timeRemaining = CASE_TIME_LIMIT - 30
    expect(calculateSpeedBonus(timeRemaining)).toBe(MAX_SPEED_BONUS)
  })

  it('should return max bonus when solved exactly at threshold', () => {
    const timeRemaining = CASE_TIME_LIMIT - SPEED_BONUS_THRESHOLD
    expect(calculateSpeedBonus(timeRemaining)).toBe(MAX_SPEED_BONUS)
  })

  it('should return 0 when no time remaining', () => {
    expect(calculateSpeedBonus(0)).toBe(0)
  })

  it('should return 0 when time is negative', () => {
    expect(calculateSpeedBonus(-10)).toBe(0)
  })

  it('should decrease linearly after threshold', () => {
    // Halfway between threshold and end
    const halfwayTime = (CASE_TIME_LIMIT - SPEED_BONUS_THRESHOLD) / 2
    const timeRemaining = CASE_TIME_LIMIT - SPEED_BONUS_THRESHOLD - halfwayTime
    const bonus = calculateSpeedBonus(timeRemaining)
    expect(bonus).toBe(Math.round(MAX_SPEED_BONUS / 2))
  })

  it('should return 0 at the very end', () => {
    expect(calculateSpeedBonus(1)).toBeLessThan(5) // Very small bonus
  })
})

describe('calculateEvidencePenalty', () => {
  it('should return 0 for first tile (free clue)', () => {
    expect(calculateEvidencePenalty(1)).toBe(0)
  })

  it('should return penalty for each tile after the first', () => {
    expect(calculateEvidencePenalty(2)).toBe(EVIDENCE_PENALTY)
    expect(calculateEvidencePenalty(3)).toBe(EVIDENCE_PENALTY * 2)
    expect(calculateEvidencePenalty(4)).toBe(EVIDENCE_PENALTY * 3)
  })

  it('should return 0 for 0 tiles', () => {
    expect(calculateEvidencePenalty(0)).toBe(0)
  })

  it('should handle all 7 evidence tiles', () => {
    expect(calculateEvidencePenalty(7)).toBe(EVIDENCE_PENALTY * 6) // 60 points
  })
})

describe('getConfidenceMultiplier', () => {
  it('should return 1.0 for 50% confidence', () => {
    expect(getConfidenceMultiplier(50)).toBe(1.0)
  })

  it('should return 1.3 for 75% confidence', () => {
    expect(getConfidenceMultiplier(75)).toBe(1.3)
  })

  it('should return 1.7 for 90% confidence', () => {
    expect(getConfidenceMultiplier(90)).toBe(1.7)
  })
})

describe('calculateScore', () => {
  describe('correct answers', () => {
    it('should calculate base score for correct answer with 50% confidence', () => {
      const result = calculateScore(true, 1, CASE_TIME_LIMIT, 50)
      expect(result.baseScore).toBe(BASE_SCORE)
      expect(result.evidencePenalty).toBe(0) // First tile is free
      expect(result.speedBonus).toBe(MAX_SPEED_BONUS) // Max time remaining
      expect(result.confidenceMultiplier).toBe(1.0)
      expect(result.wrongHighConfidencePenalty).toBe(0)
      expect(result.totalScore).toBe(150) // (100 + 50) * 1.0
    })

    it('should apply 1.3x multiplier for 75% confidence', () => {
      const result = calculateScore(true, 1, CASE_TIME_LIMIT, 75)
      expect(result.confidenceMultiplier).toBe(1.3)
      expect(result.totalScore).toBe(195) // (100 + 50) * 1.3 = 195
    })

    it('should apply 1.7x multiplier for 90% confidence', () => {
      const result = calculateScore(true, 1, CASE_TIME_LIMIT, 90)
      expect(result.confidenceMultiplier).toBe(1.7)
      expect(result.totalScore).toBe(255) // (100 + 50) * 1.7 = 255
    })

    it('should subtract evidence penalty', () => {
      // Revealed 4 tiles (3 penalties)
      const result = calculateScore(true, 4, CASE_TIME_LIMIT, 50)
      expect(result.evidencePenalty).toBe(30)
      expect(result.totalScore).toBe(120) // (100 - 30 + 50) * 1.0
    })

    it('should calculate reduced speed bonus for slower solve', () => {
      // Solved with only 30 seconds remaining (90 seconds elapsed)
      const result = calculateScore(true, 1, 30, 50)
      expect(result.speedBonus).toBeLessThan(MAX_SPEED_BONUS)
      expect(result.speedBonus).toBeGreaterThan(0)
    })

    it('should not go below minimum score', () => {
      // Extreme case: all evidence revealed, no time left
      const result = calculateScore(true, 7, 0, 50)
      expect(result.totalScore).toBeGreaterThanOrEqual(0)
    })
  })

  describe('incorrect answers', () => {
    it('should return 0 for wrong answer with 50% confidence', () => {
      const result = calculateScore(false, 3, 60, 50)
      expect(result.totalScore).toBe(0)
      expect(result.wrongHighConfidencePenalty).toBe(0)
    })

    it('should return 0 for wrong answer with 75% confidence', () => {
      const result = calculateScore(false, 3, 60, 75)
      expect(result.totalScore).toBe(0)
      expect(result.wrongHighConfidencePenalty).toBe(0)
    })

    it('should apply penalty for wrong answer with 90% confidence', () => {
      const result = calculateScore(false, 3, 60, 90)
      expect(result.totalScore).toBe(-WRONG_HIGH_CONFIDENCE_PENALTY)
      expect(result.wrongHighConfidencePenalty).toBe(WRONG_HIGH_CONFIDENCE_PENALTY)
    })
  })
})

describe('formatScore', () => {
  it('should add + prefix for positive scores', () => {
    expect(formatScore(100)).toBe('+100')
    expect(formatScore(1)).toBe('+1')
  })

  it('should show negative scores with - prefix', () => {
    expect(formatScore(-80)).toBe('-80')
  })

  it('should show zero as "0"', () => {
    expect(formatScore(0)).toBe('0')
  })
})

describe('calculateExpectedValue', () => {
  it('should favor 50% confidence when unsure', () => {
    // 50% chance of being right
    const ev50 = calculateExpectedValue(0.5, 50, 100)
    const ev90 = calculateExpectedValue(0.5, 90, 100)
    
    // 50%: 0.5 * 100 * 1.0 = 50
    // 90%: 0.5 * 100 * 1.7 - 0.5 * 80 = 85 - 40 = 45
    expect(ev50).toBeGreaterThan(ev90)
  })

  it('should favor 90% confidence when very confident', () => {
    // 90% chance of being right
    const ev50 = calculateExpectedValue(0.9, 50, 100)
    const ev90 = calculateExpectedValue(0.9, 90, 100)
    
    // 50%: 0.9 * 100 * 1.0 = 90
    // 90%: 0.9 * 100 * 1.7 - 0.1 * 80 = 153 - 8 = 145
    expect(ev90).toBeGreaterThan(ev50)
  })

  it('should return 0 when 0% accuracy', () => {
    const ev = calculateExpectedValue(0, 50, 100)
    expect(ev).toBe(0)
  })
})
