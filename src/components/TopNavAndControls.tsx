import React, { useState } from 'react';
import {
  Atom,
  ChevronLeft,
  ChevronRight,
  Send,
  RotateCcw,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { APP_CONFIG } from '../config/quizConfig';
import type { AnswersMap, PhysicsQuestion, StudentProfile } from '../types/quiz';
import { formatDuration, isQuestionAnswered } from '../utils/scoring';

interface TopNavAndControlsProps {
  profile: StudentProfile;
  questions: PhysicsQuestion[];
  currentIndex: number;
  answers: AnswersMap;
  elapsedSeconds: number;
  lastSavedAt: number | null;
  onSelectQuestion: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onConfirmSubmit: () => void;
  onConfirmReset: () => void;
}

type ConfirmKind = 'submit' | 'reset' | null;

export const TopNavAndControls: React.FC<TopNavAndControlsProps> = ({
  profile,
  questions,
  currentIndex,
  answers,
  elapsedSeconds,
  lastSavedAt,
  onSelectQuestion,
  onPrev,
  onNext,
  onConfirmSubmit,
  onConfirmReset,
}) => {
  const [confirmKind, setConfirmKind] = useState<ConfirmKind>(null);

  const answeredCount = questions.filter((q) =>
    isQuestionAnswered(q, answers[q.id]),
  ).length;

  return (
    <>
      {/* Sticky Top Header (<= 54px on mobile so well within 15% mobile sticky cap) */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-13 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0">
              <Atom className="w-4 h-4" aria-hidden="true" />
            </div>
            <span className="font-display font-bold text-sm sm:text-base text-slate-900 whitespace-nowrap truncate">
              {APP_CONFIG.appName}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-600 shrink-0">
            <span className="hidden sm:inline truncate max-w-[180px] font-medium text-slate-800">
              {profile.fullName}
            </span>
            <span className="hidden sm:inline text-slate-300" aria-hidden="true">·</span>
            <span className="font-semibold text-teal-800">{profile.className}</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="font-mono-num text-slate-700" aria-label="Waktu pengerjaan">
              {formatDuration(elapsedSeconds)}
            </span>
            {lastSavedAt !== null && (
              <>
                <span className="hidden md:inline text-slate-300" aria-hidden="true">·</span>
                <span className="hidden md:inline text-[11px] font-semibold text-teal-700">
                  PROGRES TERSIMPAN
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Dialog Konfirmasi diletakkan di BAGIAN ATAS halaman (bukan bawah) */}
      {confirmKind !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="top-confirm-title"
          className="fixed inset-0 z-50 bg-slate-900/45 flex items-start justify-center pt-4 sm:pt-8 px-3 sm:px-4"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-xl p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  confirmKind === 'submit'
                    ? 'bg-teal-50 text-teal-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h2
                  id="top-confirm-title"
                  className="text-base sm:text-lg font-bold text-slate-900"
                >
                  {confirmKind === 'submit'
                    ? 'Konfirmasi Pengumpulan Jawaban'
                    : 'Konfirmasi Reset Progres'}
                </h2>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  {confirmKind === 'submit'
                    ? 'Apakah Anda yakin ingin mengumpulkan seluruh jawaban? Setelah dikumpulkan, jawaban tidak dapat diubah.'
                    : 'Seluruh jawaban, identitas sesi, dan progres pengerjaan yang tersimpan pada perangkat ini akan dihapus. Anda akan mengerjakan kembali dari awal.'}
                </p>
                {confirmKind === 'submit' && (
                  <p className="mt-2 text-xs font-medium text-teal-800 tabular-nums">
                    Terisi: {answeredCount} dari {questions.length} soal.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setConfirmKind(null)}
                className="min-h-[42px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer"
              >
                BATAL
              </button>
              {confirmKind === 'submit' ? (
                <button
                  type="button"
                  onClick={() => {
                    setConfirmKind(null);
                    onConfirmSubmit();
                  }}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-teal-700 text-white hover:bg-teal-800 text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer"
                >
                  YA, KUMPULKAN
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setConfirmKind(null);
                    onConfirmReset();
                  }}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer"
                >
                  YA, RESET
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Panel Navigasi Soal & Kontrol Aksi — HANYA di Bagian Atas Halaman */}
      <nav
        aria-label="Navigasi Nomor Soal dan Kontrol Penilaian"
        className="max-w-6xl mx-auto px-3 sm:px-6 pt-4"
      >
        <div className="rounded-2xl bg-white border border-slate-200 p-3 sm:p-4 space-y-3">
          {/* Baris status ringkas untuk mobile */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-semibold text-slate-800 truncate sm:hidden">
                {profile.fullName}
              </span>
              <span className="text-slate-400 sm:hidden" aria-hidden="true">·</span>
              <span className="tabular-nums font-medium">
                Progres: {answeredCount}/{questions.length} soal terisi
              </span>
            </div>
            {lastSavedAt !== null && (
              <span className="md:hidden text-[11px] font-semibold text-teal-700">
                PROGRES TERSIMPAN
              </span>
            )}
          </div>

          {/* Strip Nomor Soal 1-10 (horizontal scroll di HP >= 300px) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {questions.map((q, idx) => {
              const answered = isQuestionAnswered(q, answers[q.id]);
              const isActive = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => onSelectQuestion(idx)}
                  aria-label={`Soal ${q.number}${answered ? ' (Sudah dijawab)' : ' (Belum dijawab)'}`}
                  aria-current={isActive ? 'step' : undefined}
                  className={`min-w-[44px] h-[42px] px-2.5 rounded-xl text-xs font-bold tabular-nums inline-flex items-center justify-center gap-1 shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white border border-teal-800'
                      : answered
                        ? 'bg-teal-50 text-teal-900 border border-teal-300 hover:bg-teal-100'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{q.number}</span>
                  {answered && (
                    <Check
                      className={`w-3 h-3 ${isActive ? 'text-teal-100' : 'text-teal-700'}`}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tombol Aksi Navigasi di Bagian Atas */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-2 pt-1 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onPrev}
                disabled={currentIndex === 0}
                className="flex-1 sm:flex-initial min-w-[142px] min-h-[42px] px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>SOAL SEBELUMNYA</span>
              </button>

              <button
                type="button"
                onClick={onNext}
                disabled={currentIndex === questions.length - 1}
                className="flex-1 sm:flex-initial min-w-[142px] min-h-[42px] px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <span>SOAL BERIKUTNYA</span>
                <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setConfirmKind('reset')}
                className="flex-1 sm:flex-initial min-w-[142px] min-h-[42px] px-3 py-2 rounded-xl border border-red-200 bg-red-50/70 text-red-800 hover:bg-red-100 text-xs font-semibold inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>RESET PROGRESS</span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmKind('submit')}
                className="flex-1 sm:flex-initial min-w-[152px] min-h-[42px] px-3.5 py-2 rounded-xl bg-teal-700 text-white hover:bg-teal-800 text-xs font-semibold inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>KUMPULKAN JAWABAN</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
