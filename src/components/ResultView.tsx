import React, { useState } from 'react';
import { Atom, Lock, RotateCcw, Award, AlertCircle, AlertTriangle } from 'lucide-react';
import { APP_CONFIG, TEACHER_ACCESS_CONFIG } from '../config/quizConfig';
import type { AssessmentResult, StudentProfile } from '../types/quiz';
import { formatDuration } from '../utils/scoring';

interface ResultViewProps {
  profile: StudentProfile;
  result: AssessmentResult;
  elapsedSeconds: number;
  onUnlockTeacherMode: () => void;
  onResetProgress: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  profile,
  result,
  elapsedSeconds,
  onUnlockTeacherMode,
  onResetProgress,
}) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const scoreRatio = Math.max(0, Math.min(1, result.totalScore / result.maxScore));
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - scoreRatio);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === TEACHER_ACCESS_CONFIG.password) {
      setPasswordError('');
      setPasswordInput('');
      setShowPasswordModal(false);
      onUnlockTeacherMode();
    } else {
      setPasswordError('Password Mode Guru tidak tepat. Silakan periksa kembali.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header & Tombol Kontrol HANYA di Bagian Atas */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0">
              <Atom className="w-4 h-4" aria-hidden="true" />
            </div>
            <span className="font-display font-bold text-sm sm:text-base text-slate-900 whitespace-nowrap truncate">
              {APP_CONFIG.appName}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setPasswordError('');
                setPasswordInput('');
                setShowPasswordModal(true);
              }}
              className="min-h-[40px] px-3 py-1.5 rounded-xl bg-teal-700 text-white hover:bg-teal-800 text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>MODE GURU</span>
            </button>

            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="min-h-[40px] px-3 py-1.5 rounded-xl border border-red-200 bg-red-50/70 text-red-800 hover:bg-red-100 text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>RESET PROGRESS</span>
            </button>
          </div>
        </div>
      </header>

      {/* Dialog Password Mode Guru di BAGIAN ATAS */}
      {showPasswordModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="teacher-lock-title"
          className="fixed inset-0 z-50 bg-slate-900/45 flex items-start justify-center pt-6 sm:pt-10 px-3 sm:px-4"
        >
          <form
            onSubmit={handlePasswordSubmit}
            className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-xl p-5 sm:p-6 space-y-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 id="teacher-lock-title" className="text-base sm:text-lg font-bold text-slate-900">
                  Akses Mode Guru &amp; Pembahasan
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  Masukkan password guru untuk membuka kunci jawaban, pembahasan matematis, dan
                  analisis hasil penilaian.
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="teacher-password-input"
                className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
              >
                Password Mode Guru
              </label>
              <input
                id="teacher-password-input"
                type="password"
                autoFocus
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (passwordError) setPasswordError('');
                }}
                placeholder="Masukkan kode akses"
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>

            {passwordError && (
              <div
                role="alert"
                className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-800 flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" aria-hidden="true" />
                <span>{passwordError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="min-h-[42px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                BATAL
              </button>
              <button
                type="submit"
                className="min-h-[42px] px-4 py-2 rounded-xl bg-teal-700 text-white hover:bg-teal-800 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                BUKA MODE GURU
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Dialog Konfirmasi Reset Progres di BAGIAN ATAS */}
      {showResetModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="result-reset-title"
          className="fixed inset-0 z-50 bg-slate-900/45 flex items-start justify-center pt-6 sm:pt-10 px-3 sm:px-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 id="result-reset-title" className="text-base sm:text-lg font-bold text-slate-900">
                  Konfirmasi Reset Progres
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Seluruh jawaban dan progres penilaian yang tersimpan akan dihapus. Anda akan
                  memulai penilaian dari awal.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="min-h-[42px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                BATAL
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetModal(false);
                  onResetProgress();
                }}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                YA, RESET
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Konten Halaman Hasil Penilaian Murid (Tanpa Kunci & Tanpa Tombol Bawah) */}
      <main className="max-w-4xl mx-auto px-3 sm:px-6 pt-6 pb-36 space-y-6">
        <section className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-teal-800 tracking-wide">
                HASIL PENILAIAN FISIKA · STATUS: SELESAI
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {profile.fullName}
              </h1>
              <p className="text-sm text-slate-600">
                Kelas {profile.className} · {APP_CONFIG.subtitle} · Waktu: {formatDuration(elapsedSeconds)}
              </p>

              <div className="pt-2 inline-flex items-center gap-2 text-sm font-semibold text-teal-800">
                <Award className="w-5 h-5 text-teal-700 shrink-0" aria-hidden="true" />
                <span>Predikat Pencapaian: {result.achievementTier}</span>
              </div>
            </div>

            {/* Visual Nilai Ringkas */}
            <div className="flex items-center justify-center shrink-0">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-36 h-36 -rotate-90" viewBox="0 0 128 128" aria-hidden="true">
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    fill="none"
                    stroke="#0F766E"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold font-mono-num text-slate-900 tabular-nums">
                    {result.totalScore}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">dari {result.maxScore}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rincian Statistik Pengerjaan */}
          <div className="mt-7 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
              <span className="text-xs text-slate-500 block">Total Terisi</span>
              <span className="mt-1 text-xl font-bold font-mono-num text-slate-900 tabular-nums block">
                {result.answeredCount} / {APP_CONFIG.totalQuestions}
              </span>
            </div>
            <div className="rounded-xl bg-teal-50/70 border border-teal-200 p-3.5">
              <span className="text-xs text-teal-800 block">Soal Benar Penuh</span>
              <span className="mt-1 text-xl font-bold font-mono-num text-teal-900 tabular-nums block">
                {result.correctCount}
              </span>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
              <span className="text-xs text-slate-500 block">Soal Kurang Tepat</span>
              <span className="mt-1 text-xl font-bold font-mono-num text-slate-900 tabular-nums block">
                {result.wrongCount}
              </span>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
              <span className="text-xs text-slate-500 block">Tidak Dijawab</span>
              <span className="mt-1 text-xl font-bold font-mono-num text-slate-900 tabular-nums block">
                {result.unansweredCount}
              </span>
            </div>
          </div>
        </section>

        {/* Pesan Penutup Murid (Kunci & Pembahasan tetap terkunci untuk Mode Guru) */}
        <section className="rounded-2xl bg-teal-800 text-white p-5 sm:p-7 space-y-2">
          <p className="text-sm sm:text-base leading-relaxed font-medium">
            Terima kasih telah menyelesaikan penilaian Fisika. Tetap semangat belajar dan terus
            tingkatkan kemampuan analisis Fisika Anda.
          </p>
          <p className="text-xs text-teal-200">
            Kunci jawaban dan pembahasan lengkap hanya tersedia melalui Mode Guru di bagian atas
            halaman.
          </p>
        </section>
      </main>
    </div>
  );
};
