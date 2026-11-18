import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Info, CheckSquare, Square, AlertCircle } from 'lucide-react';
import { APP_CONFIG, ASSESSMENT_INSTRUCTIONS } from '../config/quizConfig';
import type { PhysicsQuestion, StudentAnswer, StudentProfile } from '../types/quiz';
import { parseNumericInput } from '../utils/scoring';
import { buildStudentQuestionSpeech, toSpokenIndonesianPhysics } from '../utils/speechText';
import { MathText } from './MathText';
import { NarratorBar } from './NarratorBar';
import { StimulusDiagram } from './diagrams/StimulusDiagram';
import { Particle3DScene } from './diagrams/Particle3DScene';

interface QuizViewProps {
  profile: StudentProfile;
  question: PhysicsQuestion;
  totalQuestions: number;
  answer: StudentAnswer;
  onChangeAnswer: (questionId: number, nextAnswer: StudentAnswer) => void;
}

const QUESTION_TYPE_LABELS: Record<PhysicsQuestion['type'], string> = {
  'single-choice': 'Pilihan Ganda Biasa',
  'complex-choice': 'Pilihan Ganda Kompleks',
  'true-false': 'Benar / Salah',
  numeric: 'Isian Singkat Matematis',
};

export const QuizView: React.FC<QuizViewProps> = ({
  profile,
  question,
  totalQuestions,
  answer,
  onChangeAnswer,
}) => {
  const [showBriefing, setShowBriefing] = useState(false);

  const studentSpeechText = useMemo(
    () => buildStudentQuestionSpeech(question),
    [question],
  );

  const instructionsSpeechText = useMemo(
    () =>
      `Halo ${profile.fullName} dari kelas ${profile.className}. Selamat datang di ${APP_CONFIG.appName} bersama ${APP_CONFIG.teacherName}. Berikut petunjuk pengerjaan: ` +
      ASSESSMENT_INSTRUCTIONS.map((item, idx) => `Poin ${idx + 1}. ${toSpokenIndonesianPhysics(item)}`).join(' '),
    [profile.fullName, profile.className],
  );

  const numericValidationHint = useMemo(() => {
    if (question.type !== 'numeric' || answer.type !== 'numeric') return null;
    const raw = answer.rawValue.trim();
    if (!raw) return null;
    const parsed = parseNumericInput(raw);
    if (parsed === null) {
      return 'Format belum valid: masukkan hanya angka (gunakan titik atau koma desimal, atau format 2.5e3) tanpa mengetik satuan atau huruf.';
    }
    return null;
  }, [question.type, answer]);

  const handleSingleChoice = (optionId: string) => {
    onChangeAnswer(question.id, {
      type: 'single-choice',
      selectedId: optionId,
    });
  };

  const handleComplexToggle = (statementId: string) => {
    const current = answer.type === 'complex-choice' ? answer.selectedIds : [];
    const exists = current.includes(statementId);
    const nextIds = exists
      ? current.filter((id) => id !== statementId)
      : [...current, statementId];
    onChangeAnswer(question.id, {
      type: 'complex-choice',
      selectedIds: nextIds,
    });
  };

  const handleTrueFalse = (statementId: string, val: boolean) => {
    const current = answer.type === 'true-false' ? answer.selections : {};
    onChangeAnswer(question.id, {
      type: 'true-false',
      selections: {
        ...current,
        [statementId]: val,
      },
    });
  };

  const handleNumericChange = (rawValue: string) => {
    onChangeAnswer(question.id, {
      type: 'numeric',
      rawValue,
    });
  };

  return (
    <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-4 pb-36 space-y-4">
      {/* Informasi Murid & Petunjuk Pengerjaan (dapat dibuka/tutup di bagian atas) */}
      <section className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowBriefing((prev) => !prev)}
          aria-expanded={showBriefing}
          className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Info className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <span className="block text-xs sm:text-sm font-semibold text-slate-900 truncate">
                Identitas, Petunjuk Pengerjaan &amp; Sistem Penilaian
              </span>
              <span className="block text-xs text-slate-500 truncate">
                {profile.fullName} · Kelas {profile.className} · {totalQuestions} Soal · Pengajar {APP_CONFIG.teacherName}
              </span>
            </div>
          </div>
          {showBriefing ? (
            <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
          )}
        </button>

        {showBriefing && (
          <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div>
                <span className="text-slate-500 block">Nama Murid</span>
                <span className="font-semibold text-slate-900">{profile.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Kelas</span>
                <span className="font-semibold text-slate-900">{profile.className}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Materi Penilaian</span>
                <span className="font-semibold text-teal-800">{APP_CONFIG.subtitle}</span>
              </div>
            </div>

            <NarratorBar
              title="BIMBINGAN MR JO — Petunjuk Pengerjaan"
              speechText={instructionsSpeechText}
              autoStopKey="instructions"
            />

            <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {ASSESSMENT_INSTRUCTIONS.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ol>
          </div>
        )}
      </section>

      {/* Kartu Soal Utama */}
      <article
        aria-labelledby={`question-title-${question.id}`}
        className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-7 space-y-5"
      >
        {/* Metadata header tanpa pill */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-bold text-teal-800 tabular-nums">
              Soal {question.number} dari {totalQuestions}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-slate-700">{question.topicTag}</span>
            <span aria-hidden="true">·</span>
            <span>{QUESTION_TYPE_LABELS[question.type]}</span>
          </div>
          <span className="text-xs font-semibold text-slate-700 tabular-nums">
            Bobot Maks: {question.maxPoints} poin
          </span>
        </div>

        <h1
          id={`question-title-${question.id}`}
          className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight [text-wrap:balance]"
        >
          {question.title}
        </h1>

        {/* Narator Suara MR JO untuk soal aktif */}
        <NarratorBar
          title={`BIMBINGAN MR JO — Soal ${question.number}`}
          speechText={studentSpeechText}
          autoStopKey={question.id}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
          {/* Kolom Kiri (Desktop) / Atas (Mobile): Stimulus & Visualisasi Presisi */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-sm sm:text-[15px] text-slate-800 leading-relaxed">
              <MathText text={question.stimulus} />
            </div>

            {question.diagramKind === 'q4-3d-particles' ? (
              <Particle3DScene />
            ) : (
              <StimulusDiagram kind={question.diagramKind} caption={question.diagramCaption} />
            )}
          </div>

          {/* Kolom Kanan (Desktop) / Bawah (Mobile): Pertanyaan & Area Jawaban */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl bg-teal-50/60 border border-teal-200/80 p-3.5 sm:p-4 text-sm sm:text-[15px] font-medium text-slate-900 leading-relaxed">
              <MathText text={question.questionPrompt} />
            </div>

        {/* Area Interaksi Jawaban sesuai Bentuk Soal */}
        {question.type === 'single-choice' && question.options && (
          <fieldset className="space-y-2.5">
            <legend className="sr-only">Pilihan jawaban soal {question.number}</legend>
            {question.options.map((opt) => {
              const isSelected =
                answer.type === 'single-choice' && answer.selectedId === opt.id;
              return (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border transition-colors cursor-pointer min-h-[52px] ${
                    isSelected
                      ? 'bg-teal-50 border-teal-700 text-slate-950'
                      : 'bg-white border-slate-200 hover:border-teal-300 hover:bg-slate-50/70 text-slate-800'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={opt.id}
                    checked={isSelected}
                    onChange={() => handleSingleChoice(opt.id)}
                    className="mt-1 w-4 h-4 accent-teal-700 shrink-0"
                  />
                  <span className="font-bold text-sm text-teal-900 shrink-0 mt-0.5">
                    {opt.label}.
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed">
                    <MathText text={opt.text} />
                  </span>
                </label>
              );
            })}
          </fieldset>
        )}

        {question.type === 'complex-choice' && question.statements && (
          <fieldset className="space-y-3">
            <legend className="text-xs sm:text-sm font-semibold text-teal-800 mb-1">
              Pilih seluruh pernyataan yang benar menggunakan kotak centang (bisa lebih dari satu):
            </legend>
            {question.statements.map((stmt) => {
              const selectedIds =
                answer.type === 'complex-choice' ? answer.selectedIds : [];
              const isChecked = selectedIds.includes(stmt.id);
              return (
                <label
                  key={stmt.id}
                  className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border transition-colors cursor-pointer min-h-[54px] ${
                    isChecked
                      ? 'bg-teal-50 border-teal-700 text-slate-950'
                      : 'bg-white border-slate-200 hover:border-teal-300 hover:bg-slate-50/70 text-slate-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleComplexToggle(stmt.id)}
                    className="sr-only"
                  />
                  <span className="mt-0.5 text-teal-700 shrink-0" aria-hidden="true">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </span>
                  <span className="font-bold text-sm text-teal-900 shrink-0 mt-0.5">
                    ({stmt.label})
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed">
                    <MathText text={stmt.text} />
                  </span>
                </label>
              );
            })}
          </fieldset>
        )}

        {question.type === 'true-false' && question.tfStatements && (
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-slate-600">
              Skor pernyataan independen: Benar (+2,5 poin), Salah (-1 poin), Tidak dijawab (0 poin),
              nilai minimum soal 0.
            </p>
            {question.tfStatements.map((stmt, idx) => {
              const currentSelection =
                answer.type === 'true-false' ? answer.selections[stmt.id] : null;
              return (
                <div
                  key={stmt.id}
                  className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-sm text-teal-800 shrink-0 tabular-nums">
                      {idx + 1}.
                    </span>
                    <div className="text-sm sm:text-base text-slate-900 leading-relaxed">
                      <MathText text={stmt.text} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pl-5">
                    <button
                      type="button"
                      onClick={() => handleTrueFalse(stmt.id, true)}
                      aria-pressed={currentSelection === true}
                      className={`min-h-[42px] px-4 py-2 rounded-lg text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                        currentSelection === true
                          ? 'bg-teal-700 text-white border-teal-800'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      BENAR
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTrueFalse(stmt.id, false)}
                      aria-pressed={currentSelection === false}
                      className={`min-h-[42px] px-4 py-2 rounded-lg text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                        currentSelection === false
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      SALAH
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {question.type === 'numeric' && (
          <div className="space-y-4">
            {/* Tutorial Pengisian Format Matematis (TIDAK membocorkan rumus/langkah/jawaban) */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 sm:p-4 space-y-2">
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-wide">
                PETUNJUK PENGISIAN:
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li>Masukkan hanya angka hasil akhir perhitungan Anda.</li>
                <li>Jangan mengetik satuan karena satuan sudah disediakan pada kolom terpisah.</li>
                <li>Gunakan titik sebagai tanda desimal (tanda koma juga didukung otomatis).</li>
                <li>Jika hasil berupa bilangan bulat, masukkan tanpa angka desimal.</li>
                <li>Jika diperlukan, gunakan notasi ilmiah dengan format seperti 2.5e3.</li>
                <li>Jangan memasukkan simbol rumus, tanda sama dengan, atau penjelasan panjang.</li>
              </ul>
            </div>

            <div>
              <label
                htmlFor={`numeric-input-${question.id}`}
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Jawaban Numerik Akhir (Soal {question.number})
              </label>
              <div className="flex items-stretch gap-2 max-w-md">
                <input
                  id={`numeric-input-${question.id}`}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={answer.type === 'numeric' ? answer.rawValue : ''}
                  onChange={(e) => handleNumericChange(e.target.value)}
                  placeholder={question.numericPlaceholder ?? 'Masukkan angka'}
                  className="flex-1 min-w-0 min-h-[48px] px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-mono-num text-base sm:text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-teal-700"
                />
                <div className="min-h-[48px] px-3.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-800 font-semibold text-sm flex items-center justify-center shrink-0">
                  {question.unitLabel ?? 'SI'}
                </div>
              </div>

              {numericValidationHint && (
                <p
                  role="alert"
                  className="mt-2 text-xs text-amber-800 flex items-start gap-1.5"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" aria-hidden="true" />
                  <span>{numericValidationHint}</span>
                </p>
              )}
            </div>
          </div>
        )}
          </div>
        </div>
      </article>
    </main>
  );
};
