import test from 'node:test';
import assert from 'node:assert/strict';
import { PHYSICS_QUESTIONS } from '../data/questions';
import {
  calculateAssessmentResult,
  createInitialAnswers,
  evaluateQuestion,
  getAchievementTier,
  parseNumericInput,
} from './scoring';
import { toSpokenIndonesianPhysics } from './speechText';
import type { AnswersMap } from '../types/quiz';

test('exact 10 HOTS questions exist with total max score 100', () => {
  assert.equal(PHYSICS_QUESTIONS.length, 10);
  const totalMax = PHYSICS_QUESTIONS.reduce((acc, q) => acc + q.maxPoints, 0);
  assert.equal(totalMax, 100);
});

test('3D particle inertia math for Question 4 matches exact perpendicular distances', () => {
  const particles = [
    { m: 2, x: 3, y: 0, z: 4 },
    { m: 3, x: 0, y: 2, z: -2 },
    { m: 1, x: -2, y: 4, z: 0 },
    { m: 4, x: 1, y: -1, z: 2 },
  ];

  const Ix = particles.reduce((s, p) => s + p.m * (p.y ** 2 + p.z ** 2), 0);
  const Iy = particles.reduce((s, p) => s + p.m * (p.x ** 2 + p.z ** 2), 0);
  const Iz = particles.reduce((s, p) => s + p.m * (p.x ** 2 + p.y ** 2), 0);
  // Shifted parallel to X through (y=0, z=2)
  const IL1 = particles.reduce((s, p) => s + p.m * ((p.y - 0) ** 2 + (p.z - 2) ** 2), 0);
  // Shifted parallel to Y through (x=1, z=0)
  const IL2 = particles.reduce((s, p) => s + p.m * ((p.x - 1) ** 2 + (p.z - 0) ** 2), 0);

  assert.equal(Ix, 92);
  assert.equal(Iy, 86);
  assert.equal(Iz, 58);
  assert.equal(IL1, 92);
  assert.equal(IL2, 80);
});

test('parseNumericInput handles decimals, commas, scientific notation, and rejects invalid strings', () => {
  assert.equal(parseNumericInput('1.44'), 1.44);
  assert.equal(parseNumericInput('1,44'), 1.44);
  assert.equal(parseNumericInput('  17,25 '), 17.25);
  assert.equal(parseNumericInput('2.5e3'), 2500);
  assert.equal(parseNumericInput('2,5e-1'), 0.25);
  assert.equal(parseNumericInput('20'), 20);
  assert.equal(parseNumericInput(''), null);
  assert.equal(parseNumericInput('1.44 kg'), null);
  assert.equal(parseNumericInput('abc'), null);
  assert.equal(parseNumericInput('1.2.3'), null);
});

test('perfect answers score 100/100 (Sangat Baik)', () => {
  const answers: AnswersMap = {
    1: { type: 'single-choice', selectedId: 'B' },
    2: { type: 'single-choice', selectedId: 'D' },
    3: { type: 'complex-choice', selectedIds: ['S1', 'S3', 'S5'] },
    4: { type: 'complex-choice', selectedIds: ['S1', 'S3', 'S5'] },
    5: {
      type: 'true-false',
      selections: { TF1: true, TF2: false, TF3: true, TF4: false },
    },
    6: { type: 'numeric', rawValue: '1,44' },
    7: { type: 'numeric', rawValue: '1.75' },
    8: { type: 'numeric', rawValue: '17.25' },
    9: { type: 'numeric', rawValue: '20' },
    10: { type: 'numeric', rawValue: '6.25' },
  };

  const result = calculateAssessmentResult(PHYSICS_QUESTIONS, answers);
  assert.equal(result.totalScore, 100);
  assert.equal(result.correctCount, 10);
  assert.equal(result.wrongCount, 0);
  assert.equal(result.unansweredCount, 0);
  assert.equal(result.achievementTier, 'Sangat Baik');
});

test('complex-choice (Q3, Q4) awards 0 if partial or extra wrong selection', () => {
  const q3 = PHYSICS_QUESTIONS[2];
  assert.equal(
    evaluateQuestion(q3, { type: 'complex-choice', selectedIds: ['S1', 'S3'] }).pointsEarned,
    0,
  );
  assert.equal(
    evaluateQuestion(q3, { type: 'complex-choice', selectedIds: ['S1', 'S2', 'S3', 'S5'] })
      .pointsEarned,
    0,
  );
  assert.equal(
    evaluateQuestion(q3, { type: 'complex-choice', selectedIds: ['S5', 'S1', 'S3'] })
      .pointsEarned,
    10,
  );
});

test('true-false (Q5) scores +2.5 correct, -1 wrong, 0 blank, clamped at minimum 0', () => {
  const q5 = PHYSICS_QUESTIONS[4];

  // 2 correct, 1 wrong, 1 blank -> 5 - 1 = 4
  const ev1 = evaluateQuestion(q5, {
    type: 'true-false',
    selections: { TF1: true, TF2: true, TF3: true, TF4: null },
  });
  assert.equal(ev1.pointsEarned, 4);

  // All 4 wrong -> -4 clamped to 0
  const ev2 = evaluateQuestion(q5, {
    type: 'true-false',
    selections: { TF1: false, TF2: true, TF3: false, TF4: true },
  });
  assert.equal(ev2.pointsEarned, 0);
  assert.equal(ev2.tfBreakdown?.rawScore, -4);

  // 1 correct, 3 wrong -> 2.5 - 3 = -0.5 clamped to 0
  const ev3 = evaluateQuestion(q5, {
    type: 'true-false',
    selections: { TF1: true, TF2: true, TF3: false, TF4: true },
  });
  assert.equal(ev3.pointsEarned, 0);
});

test('numeric validation enforces strict tolerance and rejects close misconceptions', () => {
  const q6 = PHYSICS_QUESTIONS[5]; // expected 1.44 +/- 0.02
  assert.equal(
    evaluateQuestion(q6, { type: 'numeric', rawValue: '1.44' }).pointsEarned,
    10,
  );
  // Common misconception: using diameter 1.2 as R -> 5.76
  assert.equal(
    evaluateQuestion(q6, { type: 'numeric', rawValue: '5.76' }).pointsEarned,
    0,
  );
  // Common misconception: solid sphere 2/5 -> 0.864
  assert.equal(
    evaluateQuestion(q6, { type: 'numeric', rawValue: '0.864' }).pointsEarned,
    0,
  );
});

test('initial answers start completely unanswered with score 0', () => {
  const initial = createInitialAnswers(PHYSICS_QUESTIONS);
  const result = calculateAssessmentResult(PHYSICS_QUESTIONS, initial);
  assert.equal(result.totalScore, 0);
  assert.equal(result.unansweredCount, 10);
  assert.equal(getAchievementTier(89), 'Baik');
  assert.equal(getAchievementTier(70), 'Cukup');
  assert.equal(getAchievementTier(69.5), 'Perlu Peningkatan');
});

test('toSpokenIndonesianPhysics removes LaTeX and verbalizes symbols cleanly', () => {
  const spoken = toSpokenIndonesianPhysics('Gunakan $\\tau = rF\\sin\\theta$ dan $I_x = \\Sigma m_i d^2$.');
  assert.ok(!spoken.includes('$'));
  assert.ok(!spoken.includes('\\'));
  assert.ok(spoken.includes('torsi'));
  assert.ok(spoken.includes('sinus'));
  assert.ok(spoken.includes('teta'));
  assert.ok(spoken.includes('sumbu X'));
});
