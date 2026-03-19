export interface SRSItem {
  interval: number
  repetition: number
  easeFactor: number
}

export interface SRSResult extends SRSItem {
  nextReviewDate: Date
}

/**
 * Calculates the next review date and updated SRS parameters using the SM-2 algorithm.
 * @param item Current SRS data of the flashcard
 * @param grade Integer from 0 to 5 indicating the quality of the recall response
 * 0 - Total blackout
 * 1 - Incorrect response, but remembered the correct one upon seeing it
 * 2 - Incorrect response, but it seemed easy to recall
 * 3 - Correct response recalled with serious difficulty
 * 4 - Correct response recalled after a hesitation
 * 5 - Perfect response
 */
export function calculateNextReview(item: SRSItem, grade: number): SRSResult {
  let { interval, repetition, easeFactor } = item

  // Ensure grade is an integer between 0 and 5
  grade = Math.max(0, Math.min(5, Math.round(grade)))

  if (grade >= 3) {
    if (repetition === 0) {
      interval = 1
    } else if (repetition === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetition += 1
  } else {
    repetition = 0
    interval = 1
  }

  // Calculate new ease factor
  easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))

  // Ensure ease factor doesn't drop below 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3
  }

  // Calculate next review date
  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + interval)

  return {
    interval,
    repetition,
    easeFactor,
    nextReviewDate,
  }
}

export const calculateSRS = calculateNextReview
