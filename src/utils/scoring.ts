import type {
  AchievementTier,
  AnswersMap,
  AssessmentResult,
  PhysicsQuestion,
  QuestionEvaluation,
  StoredProgressState,
  StudentAnswer,
} from '../types/quiz';

/**
 * Mengurai masukan numerik murid secara ketat.
 * Mendukung titik desimal, koma desimal Indonesia (satu koma), dan notasi ilmiah (mis. 2.5e3).
 * Menolak teks non-numerik, satuan yang ikut diketik, atau karakter liar.
 */
export function parseNumericInput(raw: string): number | null {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Tolak jika mengandung spasi di tengah atau huruf selain e/E untuk notasi ilmiah
  const normalized = trimmed.replace(/,/g, '.');
  // Pastikan hanya memiliki paling banyak satu tanda titik dan format angka ilmiah valid
  const scientificRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;
  if (!scientificRegex.test(normalized)) {
    return null;
  }

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return parsed;
}

export function createInitialAnswers(questions: PhysicsQuestion[]): AnswersMap {
  const answers: AnswersMap = {};
  for (const q of questions) {
    if (q.type === 'single-choice') {
      answers[q.id] = { type: 'single-choice', selectedId: null };
    } else if (q.type === 'complex-choice') {
      answers[q.id] = { type: 'complex-choice', selectedIds: [] };
    } else if (q.type === 'true-false') {
      const selections: Record<string, boolean | null> = {};
      for (const stmt of q.tfStatements ?? []) {
        selections[stmt.id] = null;
      }
      answers[q.id] = { type: 'true-false', selections };
    } else {
      answers[q.id] = { type: 'numeric', rawValue: '' };
    }
  }
  return answers;
}

export function createInitialProgress(questions: PhysicsQuestion[]): StoredProgressState {
  return {
    profile: null,
    currentQuestionIndex: 0,
    answers: createInitialAnswers(questions),
    status: 'in-progress',
    startedAt: null,
    submittedAt: null,
    elapsedSeconds: 0,
    lastSavedAt: null,
    finalResult: null,
  };
}

export function isQuestionAnswered(
  question: PhysicsQuestion,
  answer: StudentAnswer | undefined,
): boolean {
  if (!answer) return false;
  if (question.type === 'single-choice' && answer.type === 'single-choice') {
    return answer.selectedId !== null && answer.selectedId !== '';
  }
  if (question.type === 'complex-choice' && answer.type === 'complex-choice') {
    return answer.selectedIds.length > 0;
  }
  if (question.type === 'true-false' && answer.type === 'true-false') {
    return Object.values(answer.selections).some((val) => val !== null);
  }
  if (question.type === 'numeric' && answer.type === 'numeric') {
    return answer.rawValue.trim().length > 0;
  }
  return false;
}

export function evaluateQuestion(
  question: PhysicsQuestion,
  answer: StudentAnswer | undefined,
): QuestionEvaluation {
  const answered = isQuestionAnswered(question, answer);

  if (!answered || !answer) {
    return {
      questionId: question.id,
      questionNumber: question.number,
      isAnswered: false,
      isCorrect: false,
      pointsEarned: 0,
      maxPoints: question.maxPoints,
    };
  }

  // Soal 1 & 2: Pilihan Ganda Biasa (10 poin tepat, 0 salah)
  if (question.type === 'single-choice' && answer.type === 'single-choice') {
    const isCorrect = answer.selectedId === question.correctOptionId;
    return {
      questionId: question.id,
      questionNumber: question.number,
      isAnswered: true,
      isCorrect,
      pointsEarned: isCorrect ? question.maxPoints : 0,
      maxPoints: question.maxPoints,
    };
  }

  // Soal 3 & 4: Pilihan Ganda Kompleks (all-or-nothing, 10 poin hanya jika persis sama)
  if (question.type === 'complex-choice' && answer.type === 'complex-choice') {
    const expectedSet = new Set(question.correctStatementIds ?? []);
    const selectedSet = new Set(answer.selectedIds);
    const isExactMatch =
      expectedSet.size === selectedSet.size &&
      [...expectedSet].every((id) => selectedSet.has(id));

    return {
      questionId: question.id,
      questionNumber: question.number,
      isAnswered: true,
      isCorrect: isExactMatch,
      pointsEarned: isExactMatch ? question.maxPoints : 0,
      maxPoints: question.maxPoints,
    };
  }

  // Soal 5: Benar/Salah 4 pernyataan independen (+2.5 benar, -1 salah, 0 kosong, min 0)
  if (question.type === 'true-false' && answer.type === 'true-false') {
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    for (const stmt of question.tfStatements ?? []) {
      const val = answer.selections[stmt.id];
      if (val === null || val === undefined) {
        unansweredCount += 1;
      } else if (val === stmt.correct) {
        correctCount += 1;
      } else {
        wrongCount += 1;
      }
    }

    const rawScore = correctCount * 2.5 - wrongCount * 1;
    const pointsEarned = Math.max(0, rawScore);
    const isFullCorrect =
      correctCount === (question.tfStatements?.length ?? 4) && wrongCount === 0;

    return {
      questionId: question.id,
      questionNumber: question.number,
      isAnswered: true,
      isCorrect: isFullCorrect,
      pointsEarned,
      maxPoints: question.maxPoints,
      tfBreakdown: {
        correctCount,
        wrongCount,
        unansweredCount,
        rawScore,
      },
    };
  }

  // Soal 6-10: Isian Singkat Matematis (10 poin dalam toleransi numerik)
  if (question.type === 'numeric' && answer.type === 'numeric') {
    const parsed = parseNumericInput(answer.rawValue);
    const expected = question.expectedNumeric ?? 0;
    const tolerance = question.tolerance ?? 0.01;
    const isCorrect =
      parsed !== null && Math.abs(parsed - expected) <= tolerance;

    return {
      questionId: question.id,
      questionNumber: question.number,
      isAnswered: true,
      isCorrect,
      pointsEarned: isCorrect ? question.maxPoints : 0,
      maxPoints: question.maxPoints,
    };
  }

  return {
    questionId: question.id,
    questionNumber: question.number,
    isAnswered: false,
    isCorrect: false,
    pointsEarned: 0,
    maxPoints: question.maxPoints,
  };
}

export function getAchievementTier(score: number): AchievementTier {
  if (score >= 90) return 'Sangat Baik';
  if (score >= 80) return 'Baik';
  if (score >= 70) return 'Cukup';
  return 'Perlu Peningkatan';
}

export function calculateAssessmentResult(
  questions: PhysicsQuestion[],
  answers: AnswersMap,
): AssessmentResult {
  const evaluations: Record<number, QuestionEvaluation> = {};
  let totalScore = 0;
  let maxScore = 0;
  let answeredCount = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  for (const q of questions) {
    const evaluation = evaluateQuestion(q, answers[q.id]);
    evaluations[q.id] = evaluation;
    totalScore += evaluation.pointsEarned;
    maxScore += evaluation.maxPoints;

    if (!evaluation.isAnswered) {
      unansweredCount += 1;
    } else {
      answeredCount += 1;
      if (evaluation.isCorrect) {
        correctCount += 1;
      } else {
        wrongCount += 1;
      }
    }
  }

  // Bulatkan hingga 2 desimal untuk menghindari floating-point artifacts
  const roundedTotal = Math.round(totalScore * 100) / 100;

  return {
    totalScore: roundedTotal,
    maxScore,
    answeredCount,
    correctCount,
    wrongCount,
    unansweredCount,
    achievementTier: getAchievementTier(roundedTotal),
    evaluations,
  };
}

export function formatDuration(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
