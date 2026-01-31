/**
 * TreeSleuth Scoring Logic
 * 
 * Pure functions for calculating scores based on game rules.
 */

import type { ConfidenceLevel, ScoreBreakdown } from '../types'
import {
  BASE_SCORE,
  EVIDENCE_PENALTY,
  MAX_SPEED_BONUS,
  CONFIDENCE_MULTIPLIERS,
  WRONG_HIGH_CONFIDENCE_PENALTY,
  MIN_SCORE,
  CASE_TIME_LIMIT,
  SPEED_BONUS_THRESHOLD,
} from '../constants'

/**
 * Calculate the speed bonus based on time remaining.
 * Full bonus if solved quickly, decreasing linearly after threshold.
 * 
 * @param timeRemaining - Seconds remaining when guess was made
 * @param totalTime - Total time allowed for the case
 * @returns Speed bonus points (0 to MAX_SPEED_BONUS)
 */
export function calculateSpeedBonus(
  timeRemaining: number,
  totalTime: number = CASE_TIME_LIMIT
): number {
  if (timeRemaining <= 0) return 0
  
  // Time elapsed since start
  const timeElapsed = totalTime - timeRemaining
  
  // Full bonus if solved within threshold
  if (timeElapsed <= SPEED_BONUS_THRESHOLD) {
    return MAX_SPEED_BONUS
  }
  
  // Linear decrease from threshold to total time
  const remainingWindow = totalTime - SPEED_BONUS_THRESHOLD
  const timeOverThreshold = timeElapsed - SPEED_BONUS_THRESHOLD
  const bonusRatio = Math.max(0, 1 - timeOverThreshold / remainingWindow)
  
  return Math.round(MAX_SPEED_BONUS * bonusRatio)
}

/**
 * Calculate the evidence penalty based on tiles revealed.
 * First tile is free (initial clue), penalty starts from second tile.
 * 
 * @param evidenceRevealed - Number of evidence tiles revealed
 * @returns Penalty points (negative impact on score)
 */
export function calculateEvidencePenalty(evidenceRevealed: number): number {
  // First tile is free (the initial clue)
  const penalizedTiles = Math.max(0, evidenceRevealed - 1)
  return penalizedTiles * EVIDENCE_PENALTY
}

/**
 * Get the confidence multiplier for a given confidence level.
 * 
 * @param confidence - The confidence level (50, 75, or 90)
 * @returns Multiplier value
 */
export function getConfidenceMultiplier(confidence: ConfidenceLevel): number {
  return CONFIDENCE_MULTIPLIERS[confidence]
}

/**
 * Calculate the complete score breakdown for a guess.
 * 
 * @param isCorrect - Whether the guess was correct
 * @param evidenceRevealed - Number of evidence tiles revealed
 * @param timeRemaining - Seconds remaining when guess was made
 * @param confidence - Confidence level of the guess
 * @param totalTime - Total time allowed (optional, defaults to CASE_TIME_LIMIT)
 * @returns Complete score breakdown
 */
export function calculateScore(
  isCorrect: boolean,
  evidenceRevealed: number,
  timeRemaining: number,
  confidence: ConfidenceLevel,
  totalTime: number = CASE_TIME_LIMIT
): ScoreBreakdown {
  const confidenceMultiplier = getConfidenceMultiplier(confidence)
  
  // Wrong answer
  if (!isCorrect) {
    // Apply penalty only for high confidence wrong answers
    const wrongHighConfidencePenalty = confidence === 90 
      ? WRONG_HIGH_CONFIDENCE_PENALTY 
      : 0
    
    return {
      baseScore: 0,
      evidencePenalty: 0,
      speedBonus: 0,
      confidenceMultiplier,
      wrongHighConfidencePenalty,
      totalScore: wrongHighConfidencePenalty > 0 ? -wrongHighConfidencePenalty : 0,
    }
  }
  
  // Correct answer
  const baseScore = BASE_SCORE
  const evidencePenalty = calculateEvidencePenalty(evidenceRevealed)
  const speedBonus = calculateSpeedBonus(timeRemaining, totalTime)
  
  // Calculate total: (base - penalty + speed) * multiplier
  const preMultiplierScore = baseScore - evidencePenalty + speedBonus
  const totalScore = Math.max(
    MIN_SCORE,
    Math.round(preMultiplierScore * confidenceMultiplier)
  )
  
  return {
    baseScore,
    evidencePenalty,
    speedBonus,
    confidenceMultiplier,
    wrongHighConfidencePenalty: 0,
    totalScore,
  }
}

/**
 * Format a score for display with sign.
 * 
 * @param score - The score value
 * @returns Formatted string (e.g., "+150", "-80", "0")
 */
export function formatScore(score: number): string {
  if (score > 0) return `+${score}`
  return score.toString()
}

/**
 * Calculate expected value for a given confidence level.
 * Useful for teaching players about confidence betting.
 * 
 * @param estimatedAccuracy - Player's estimated probability of being correct (0-1)
 * @param confidence - Confidence level to evaluate
 * @param baseScore - Expected base score if correct
 * @returns Expected value of choosing this confidence level
 */
export function calculateExpectedValue(
  estimatedAccuracy: number,
  confidence: ConfidenceLevel,
  baseScore: number = BASE_SCORE
): number {
  const multiplier = getConfidenceMultiplier(confidence)
  const penalty = confidence === 90 ? WRONG_HIGH_CONFIDENCE_PENALTY : 0
  
  const expectedCorrect = estimatedAccuracy * baseScore * multiplier
  const expectedWrong = (1 - estimatedAccuracy) * penalty
  
  return expectedCorrect - expectedWrong
}
