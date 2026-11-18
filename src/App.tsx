import { useEffect, useState } from 'react';
import { APP_CONFIG } from './config/quizConfig';
import { PHYSICS_QUESTIONS } from './data/questions';
import type {
  StoredProgressState,
  StudentAnswer,
  StudentProfile,
} from './types/quiz';
import {
  calculateAssessmentResult,
  createInitialAnswers,
  createInitialProgress,
} from './utils/scoring';
import { LoginView } from './components/LoginView';
import { TopNavAndControls } from './components/TopNavAndControls';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { TeacherPanel } from './components/TeacherPanel';

function loadStoredProgress(): StoredProgressState {
  const base = createInitialProgress(PHYSICS_QUESTIONS);
  try {
    const raw = window.localStorage.getItem(APP_CONFIG.storageKey);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoredProgressState>;
      const defaultAnswers = createInitialAnswers(PHYSICS_QUESTIONS);
      const mergedAnswers = {
        ...defaultAnswers,
        ...(parsed.answers ?? {}),
      };
      const safeIndex =
        typeof parsed.currentQuestionIndex === 'number' &&
        parsed.currentQuestionIndex >= 0 &&
        parsed.currentQuestionIndex < PHYSICS_QUESTIONS.length
          ? parsed.currentQuestionIndex
          : 0;

      return {
        profile: parsed.profile ?? null,
        currentQuestionIndex: safeIndex,
        answers: mergedAnswers,
        status: parsed.status === 'submitted' ? 'submitted' : 'in-progress',
        startedAt: parsed.startedAt ?? null,
        submittedAt: parsed.submittedAt ?? null,
        elapsedSeconds:
          typeof parsed.elapsedSeconds === 'number' && parsed.elapsedSeconds >= 0
            ? parsed.elapsedSeconds
            : 0,
        lastSavedAt: parsed.lastSavedAt ?? null,
        finalResult: parsed.finalResult ?? null,
      };
    }

    // Dukung ?autostart=1 untuk inspeksi langsung ke ruang kuis saat belum ada sesi tersimpan
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      return {
        ...base,
        profile: { fullName: 'Murid Simulasi', className: 'XI-1' },
        startedAt: Date.now(),
        lastSavedAt: Date.now(),
      };
    }
  } catch {
    // Fallback bersih jika storage tidak tersedia atau rusak
  }
  return base;
}

function saveProgressToStorage(state: StoredProgressState): void {
  try {
    window.localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(state));
  } catch {
    // Abaikan jika kuota penyimpanan browser penuh
  }
}

export default function App() {
  const [progress, setProgress] = useState<StoredProgressState>(() =>
    loadStoredProgress(),
  );
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);

  // Simpan progres otomatis ke localStorage setiap kali state berubah
  useEffect(() => {
    if (progress.profile) {
      saveProgressToStorage(progress);
    }
  }, [progress]);

  // Penghitung waktu pengerjaan selama penilaian berlangsung
  useEffect(() => {
    if (!progress.profile || progress.status !== 'in-progress') return;
    const timer = window.setInterval(() => {
      setProgress((prev) => {
        if (!prev.profile || prev.status !== 'in-progress') return prev;
        return {
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1,
        };
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [progress.profile, progress.status]);

  const handleLoginStart = (profile: StudentProfile) => {
    const now = Date.now();
    const fresh: StoredProgressState = {
      ...createInitialProgress(PHYSICS_QUESTIONS),
      profile,
      startedAt: now,
      lastSavedAt: now,
    };
    setTeacherUnlocked(false);
    setProgress(fresh);
    saveProgressToStorage(fresh);
  };

  const handleSelectQuestion = (index: number) => {
    const safeIdx = Math.max(0, Math.min(PHYSICS_QUESTIONS.length - 1, index));
    setProgress((prev) => ({
      ...prev,
      currentQuestionIndex: safeIdx,
      lastSavedAt: Date.now(),
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChangeAnswer = (questionId: number, nextAnswer: StudentAnswer) => {
    setProgress((prev) => {
      if (prev.status === 'submitted') return prev;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: nextAnswer,
        },
        lastSavedAt: Date.now(),
      };
    });
  };

  const handleSubmitAssessment = () => {
    setProgress((prev) => {
      const result = calculateAssessmentResult(PHYSICS_QUESTIONS, prev.answers);
      const now = Date.now();
      return {
        ...prev,
        status: 'submitted',
        submittedAt: now,
        lastSavedAt: now,
        finalResult: result,
      };
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetProgress = () => {
    try {
      window.localStorage.removeItem(APP_CONFIG.storageKey);
    } catch {
      // Abaikan
    }
    setTeacherUnlocked(false);
    setProgress(createInitialProgress(PHYSICS_QUESTIONS));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!progress.profile) {
    return <LoginView onStart={handleLoginStart} />;
  }

  if (progress.status === 'submitted') {
    const result =
      progress.finalResult ??
      calculateAssessmentResult(PHYSICS_QUESTIONS, progress.answers);

    if (teacherUnlocked) {
      return (
        <TeacherPanel
          profile={progress.profile}
          questions={PHYSICS_QUESTIONS}
          answers={progress.answers}
          result={result}
          onBackToResult={() => {
            setTeacherUnlocked(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      );
    }

    return (
      <ResultView
        profile={progress.profile}
        result={result}
        elapsedSeconds={progress.elapsedSeconds}
        onUnlockTeacherMode={() => {
          setTeacherUnlocked(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onResetProgress={handleResetProgress}
      />
    );
  }

  const activeQuestion =
    PHYSICS_QUESTIONS[progress.currentQuestionIndex] ?? PHYSICS_QUESTIONS[0];
  const activeAnswer = progress.answers[activeQuestion.id];

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <TopNavAndControls
        profile={progress.profile}
        questions={PHYSICS_QUESTIONS}
        currentIndex={progress.currentQuestionIndex}
        answers={progress.answers}
        elapsedSeconds={progress.elapsedSeconds}
        lastSavedAt={progress.lastSavedAt}
        onSelectQuestion={handleSelectQuestion}
        onPrev={() => handleSelectQuestion(progress.currentQuestionIndex - 1)}
        onNext={() => handleSelectQuestion(progress.currentQuestionIndex + 1)}
        onConfirmSubmit={handleSubmitAssessment}
        onConfirmReset={handleResetProgress}
      />

      <QuizView
        profile={progress.profile}
        question={activeQuestion}
        totalQuestions={PHYSICS_QUESTIONS.length}
        answer={activeAnswer}
        onChangeAnswer={handleChangeAnswer}
      />
    </div>
  );
}
