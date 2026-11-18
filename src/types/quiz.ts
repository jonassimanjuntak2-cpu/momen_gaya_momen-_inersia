export type QuestionType =
  | 'single-choice'
  | 'complex-choice'
  | 'true-false'
  | 'numeric';

export type DiagramKind =
  | 'q1-rod-torque'
  | 'q2-square-torque'
  | 'q3-wrench-context'
  | 'q4-3d-particles'
  | 'q5-rigid-bodies'
  | 'q6-hollow-sphere'
  | 'q7-parallel-axis-rod'
  | 'q8-composite-rod-disc'
  | 'q9-rectangular-plate-corner'
  | 'q10-combined-rod-particles';

export interface ChoiceOption {
  id: string;
  label: string;
  text: string;
}

export interface TrueFalseStatement {
  id: string;
  text: string;
  correct: boolean;
  reason: string;
}

export interface OptionAnalysisItem {
  label: string;
  isCorrect: boolean;
  analysis: string;
}

export interface ExplanationData {
  competencyIndicator: string;
  problemIdentification: string;
  theoreticalBasis: string;
  knownData: string[];
  askedQuantity: string;
  basicEquations: string[];
  physicsAnalysis: string;
  mathematicalSteps: string[];
  finalCalculationSummary: string;
  optionAnalyses: OptionAnalysisItem[];
  conclusion: string;
  answerVerification: {
    dimensionCheck: string;
    unitCheck: string;
    reasonablenessCheck: string;
    signAndGeometryCheck: string;
  };
}

export interface PhysicsQuestion {
  id: number;
  number: number;
  title: string;
  topicTag: string;
  type: QuestionType;
  maxPoints: number;
  stimulus: string;
  questionPrompt: string;
  diagramKind: DiagramKind;
  diagramCaption: string;
  // Single choice (Q1, Q2)
  options?: ChoiceOption[];
  correctOptionId?: string;
  // Complex choice (Q3, Q4)
  statements?: ChoiceOption[];
  correctStatementIds?: string[];
  // True/False (Q5)
  tfStatements?: TrueFalseStatement[];
  // Numeric (Q6-Q10)
  expectedNumeric?: number;
  tolerance?: number;
  unitLabel?: string;
  numericPlaceholder?: string;
  // Complete scientific & mathematical explanation
  explanation: ExplanationData;
}

export type StudentAnswer =
  | { type: 'single-choice'; selectedId: string | null }
  | { type: 'complex-choice'; selectedIds: string[] }
  | { type: 'true-false'; selections: Record<string, boolean | null> }
  | { type: 'numeric'; rawValue: string };

export type AnswersMap = Record<number, StudentAnswer>;

export interface StudentProfile {
  fullName: string;
  className: string;
}

export type AssessmentStatus = 'in-progress' | 'submitted';

export interface QuestionEvaluation {
  questionId: number;
  questionNumber: number;
  isAnswered: boolean;
  isCorrect: boolean;
  pointsEarned: number;
  maxPoints: number;
  tfBreakdown?: {
    correctCount: number;
    wrongCount: number;
    unansweredCount: number;
    rawScore: number;
  };
}

export type AchievementTier =
  | 'Sangat Baik'
  | 'Baik'
  | 'Cukup'
  | 'Perlu Peningkatan';

export interface AssessmentResult {
  totalScore: number;
  maxScore: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  achievementTier: AchievementTier;
  evaluations: Record<number, QuestionEvaluation>;
}

export interface StoredProgressState {
  profile: StudentProfile | null;
  currentQuestionIndex: number;
  answers: AnswersMap;
  status: AssessmentStatus;
  startedAt: number | null;
  submittedAt: number | null;
  elapsedSeconds: number;
  lastSavedAt: number | null;
  finalResult: AssessmentResult | null;
}
