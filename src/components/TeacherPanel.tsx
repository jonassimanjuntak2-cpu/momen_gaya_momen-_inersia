import React, { useMemo, useState } from 'react';
import { ArrowLeft, Atom, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { APP_CONFIG } from '../config/quizConfig';
import type {
  AnswersMap,
  AssessmentResult,
  PhysicsQuestion,
  StudentProfile,
} from '../types/quiz';
import { buildTeacherExplanationSpeech } from '../utils/speechText';
import { MathText } from './MathText';
import { NarratorBar } from './NarratorBar';
import { ExplanationDiagram } from './diagrams/ExplanationDiagram';

interface TeacherPanelProps {
  profile: StudentProfile;
  questions: PhysicsQuestion[];
  answers: AnswersMap;
  result: AssessmentResult;
  onBackToResult: () => void;
}

export const TeacherPanel: React.FC<TeacherPanelProps> = ({
  profile,
  questions,
  answers,
  result,
  onBackToResult,
}) => {
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number>(0);

  const activeQuestion = questions[selectedQuestionIdx] ?? questions[0];
  const activeEval = result.evaluations[activeQuestion.id];
  const activeAnswer = answers[activeQuestion.id];

  const teacherSpeechText = useMemo(
    () => buildTeacherExplanationSpeech(activeQuestion),
    [activeQuestion],
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header & Kontrol Navigasi Mode Guru HANYA di Bagian Atas */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0">
              <Atom className="w-4 h-4" aria-hidden="true" />
            </div>
            <span className="font-display font-bold text-sm sm:text-base text-slate-900 whitespace-nowrap truncate">
              Mode Guru · {APP_CONFIG.appName}
            </span>
          </div>

          <button
            type="button"
            onClick={onBackToResult}
            className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-teal-700 text-white hover:bg-teal-800 text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>KEMBALI KE HASIL MURID</span>
          </button>
        </div>
      </header>

      {/* Panel Pilih Soal 1-10 di Bagian Atas */}
      <nav
        aria-label="Navigasi Pembahasan Soal Guru"
        className="max-w-6xl mx-auto px-3 sm:px-6 pt-4"
      >
        <div className="rounded-2xl bg-white border border-slate-200 p-3 sm:p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
              <span className="font-semibold text-slate-900">
                Analisis Hasil: {profile.fullName} ({profile.className})
              </span>
            </div>
            <span className="font-mono-num font-bold text-teal-800">
              Nilai Akhir: {result.totalScore} / {result.maxScore} ({result.achievementTier})
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {questions.map((q, idx) => {
              const ev = result.evaluations[q.id];
              const isSelected = idx === selectedQuestionIdx;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setSelectedQuestionIdx(idx)}
                  aria-current={isSelected ? 'step' : undefined}
                  className={`min-w-[68px] h-[40px] px-2.5 rounded-xl text-xs font-bold tabular-nums inline-flex items-center justify-center gap-1.5 shrink-0 border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-800'
                      : ev?.isCorrect
                        ? 'bg-teal-50 text-teal-900 border-teal-300 hover:bg-teal-100'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>#{q.number}</span>
                  <span className="text-[11px] opacity-85">
                    ({ev?.pointsEarned ?? 0}/{q.maxPoints})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Pembahasan Ilmiah & Matematis Lengkap (10 Bagian Baku Buku Teks) */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-4 pb-36 space-y-5">
        <article className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-7 space-y-6">
          <div className="pb-4 border-b border-slate-100 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
              <span>
                Soal {activeQuestion.number} · {activeQuestion.topicTag}
              </span>
              <span className="font-mono-num font-bold text-teal-800">
                Skor Murid: {activeEval?.pointsEarned ?? 0} / {activeQuestion.maxPoints} Poin
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {activeQuestion.title}
            </h1>
            <p className="text-xs sm:text-sm text-teal-800 font-medium">
              Indikator Kompetensi: {activeQuestion.explanation.competencyIndicator}
            </p>
          </div>

          {/* Narator MR JO untuk Pembahasan Lengkap */}
          <NarratorBar
            title={`BIMBINGAN MR JO — Pembahasan Soal ${activeQuestion.number}`}
            speechText={teacherSpeechText}
            autoStopKey={`teacher-${activeQuestion.id}`}
          />

          {/* Ringkasan Jawaban Murid vs Kunci Jawaban */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4">
              <div className="text-xs font-bold text-teal-900 mb-1">KUNCI JAWABAN RESMI</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 font-mono-num">
                {activeQuestion.explanation.finalCalculationSummary}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-bold text-slate-700 mb-1">JAWABAN MURID</div>
              <div className="text-sm font-semibold text-slate-900 font-mono-num">
                {formatStudentAnswerSummary(activeQuestion, activeAnswer)}
              </div>
            </div>
          </div>

          {/* 1. Identifikasi Masalah */}
          <SectionBlock number="1" title="IDENTIFIKASI MASALAH">
            <MathText text={activeQuestion.explanation.problemIdentification} />
          </SectionBlock>

          {/* 2. Landasan Teori */}
          <SectionBlock number="2" title="LANDASAN TEORI">
            <MathText text={activeQuestion.explanation.theoreticalBasis} />
          </SectionBlock>

          {/* 3. Data yang Diketahui */}
          <SectionBlock number="3" title="DATA YANG DIKETAHUI">
            <ul className="list-disc pl-5 space-y-1.5">
              {activeQuestion.explanation.knownData.map((item, idx) => (
                <li key={idx}>
                  <MathText text={item} />
                </li>
              ))}
            </ul>
          </SectionBlock>

          {/* 4. Besaran yang Ditanyakan */}
          <SectionBlock number="4" title="BESARAN YANG DITANYAKAN">
            <MathText text={activeQuestion.explanation.askedQuantity} />
          </SectionBlock>

          {/* 5. Persamaan Dasar */}
          <SectionBlock number="5" title="PERSAMAAN DASAR">
            <div className="space-y-1">
              {activeQuestion.explanation.basicEquations.map((eq, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
                  <MathText text={eq} />
                </div>
              ))}
            </div>
          </SectionBlock>

          {/* 6. Analisis Fisika */}
          <SectionBlock number="6" title="ANALISIS FISIKA">
            <MathText text={activeQuestion.explanation.physicsAnalysis} />
          </SectionBlock>

          {/* 7. Penyelesaian Matematis */}
          <SectionBlock number="7" title="PENYELESAIAN MATEMATIS">
            <ol className="list-decimal pl-5 space-y-3">
              {activeQuestion.explanation.mathematicalSteps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  <MathText text={step} />
                </li>
              ))}
            </ol>
          </SectionBlock>

          {/* 8. Free Body Diagram & Diagram Analisis */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-teal-900">
              8. FREE BODY DIAGRAM DAN DIAGRAM ANALISIS
            </h2>
            <ExplanationDiagram kind={activeQuestion.diagramKind} />
          </section>

          {/* Analisis Setiap Opsi / Pernyataan */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-teal-900">
              ANALISIS SETIAP OPSI &amp; PENGECOH
            </h2>
            <div className="space-y-2">
              {activeQuestion.explanation.optionAnalyses.map((opt, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl border p-3.5 flex items-start gap-2.5 text-xs sm:text-sm ${
                    opt.isCorrect
                      ? 'bg-teal-50/70 border-teal-300 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {opt.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                  <div>
                    <span className="font-bold mr-1.5">{opt.label}:</span>
                    <MathText text={opt.analysis} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 9. Kesimpulan */}
          <SectionBlock number="9" title="KESIMPULAN">
            <div className="rounded-xl bg-teal-50 border border-teal-200 p-4 font-medium text-slate-900">
              <MathText text={activeQuestion.explanation.conclusion} />
            </div>
          </SectionBlock>

          {/* 10. Pemeriksaan Jawaban */}
          <SectionBlock number="10" title="PEMERIKSAAN JAWABAN">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
                <span className="font-bold text-slate-900 block mb-1">Pemeriksaan Dimensi</span>
                <MathText text={activeQuestion.explanation.answerVerification.dimensionCheck} />
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
                <span className="font-bold text-slate-900 block mb-1">Pemeriksaan Satuan SI</span>
                <MathText text={activeQuestion.explanation.answerVerification.unitCheck} />
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
                <span className="font-bold text-slate-900 block mb-1">Kewajaran Nilai</span>
                <MathText text={activeQuestion.explanation.answerVerification.reasonablenessCheck} />
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
                <span className="font-bold text-slate-900 block mb-1">Konsistensi Tanda &amp; Geometri</span>
                <MathText text={activeQuestion.explanation.answerVerification.signAndGeometryCheck} />
              </div>
            </div>
          </SectionBlock>
        </article>
      </main>
    </div>
  );
};

const SectionBlock: React.FC<{
  number: string;
  title: string;
  children: React.ReactNode;
}> = ({ number, title, children }) => (
  <section className="space-y-2">
    <h2 className="text-sm sm:text-base font-bold text-teal-900">
      {number}. {title}
    </h2>
    <div className="text-sm sm:text-base text-slate-800 leading-relaxed">{children}</div>
  </section>
);

function formatStudentAnswerSummary(
  q: PhysicsQuestion,
  ans: AnswersMap[number] | undefined,
): string {
  if (!ans) return 'Tidak dijawab';
  if (ans.type === 'single-choice') {
    return ans.selectedId ? `Opsi ${ans.selectedId}` : 'Tidak dijawab';
  }
  if (ans.type === 'complex-choice') {
    return ans.selectedIds.length > 0 ? ans.selectedIds.join(', ') : 'Tidak dijawab';
  }
  if (ans.type === 'true-false') {
    const entries = (q.tfStatements ?? []).map((stmt, idx) => {
      const v = ans.selections[stmt.id];
      return `${idx + 1}: ${v === true ? 'BENAR' : v === false ? 'SALAH' : 'Kosong'}`;
    });
    return entries.join(' · ');
  }
  if (ans.type === 'numeric') {
    return ans.rawValue.trim() ? `${ans.rawValue.trim()} ${q.unitLabel ?? ''}` : 'Tidak dijawab';
  }
  return 'Tidak dijawab';
}
