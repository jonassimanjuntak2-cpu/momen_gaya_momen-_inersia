import React, { useState } from 'react';
import { Atom, ArrowRight, AlertCircle } from 'lucide-react';
import { APP_CONFIG, CLASS_OPTIONS } from '../config/quizConfig';
import type { StudentProfile } from '../types/quiz';

interface LoginViewProps {
  onStart: (profile: StudentProfile) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onStart }) => {
  const [fullName, setFullName] = useState('');
  const [className, setClassName] = useState(CLASS_OPTIONS[0] ?? 'X-1');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedName = fullName.trim();
    if (!cleanedName) {
      setErrorMsg('Nama lengkap murid wajib diisi sebelum memulai penilaian.');
      return;
    }
    setErrorMsg('');
    onStart({
      fullName: cleanedName,
      className,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-start pt-8 sm:pt-14 px-4 pb-24">
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Identitas Aplikasi & Ringkasan Penilaian */}
        <section className="lg:col-span-6 rounded-2xl bg-teal-800 text-white p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Atom className="w-6 h-6 text-teal-100" aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold tracking-wide text-teal-100">
                {APP_CONFIG.appName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-white [text-wrap:balance]">
              {APP_CONFIG.subtitle}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-teal-100 leading-relaxed">
              Asesmen digital Fisika SMA berbasis penalaran tingkat tinggi (HOTS) dengan diagram
              teknis presisi dan model koordinat 3 dimensi interaktif.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-teal-700/80 space-y-2 text-xs sm:text-sm text-teal-100">
            <div className="flex items-center justify-between gap-2">
              <span className="text-teal-200">Pengajar</span>
              <span className="font-semibold text-white">{APP_CONFIG.teacherName}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-teal-200">Jumlah Soal</span>
              <span className="font-semibold text-white tabular-nums">
                {APP_CONFIG.totalQuestions} Soal HOTS
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-teal-200">Skor Maksimal</span>
              <span className="font-semibold text-white tabular-nums">
                {APP_CONFIG.maxScore} Poin
              </span>
            </div>
          </div>
        </section>

        {/* Formulir Login Murid */}
        <section className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Masuk Ruang Penilaian
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">
              Lengkapi identitas diri untuk mencatat progres pengerjaan di perangkat ini.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label
                htmlFor="student-fullname"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Nama Lengkap Murid <span className="text-red-600">*</span>
              </label>
              <input
                id="student-fullname"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Contoh: Nadira Putri Pratiwi"
                className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-teal-700"
              />
            </div>

            <div>
              <label
                htmlFor="student-class"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Pilihan Kelas
              </label>
              <select
                id="student-class"
                name="className"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-teal-700"
              >
                {CLASS_OPTIONS.map((cls) => (
                  <option key={cls} value={cls}>
                    Kelas {cls}
                  </option>
                ))}
              </select>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs sm:text-sm text-red-800 flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" aria-hidden="true" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm sm:text-base transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>MULAI PENILAIAN</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>

          <p className="mt-5 text-xs text-slate-500 leading-relaxed">
            Materi mencakup Momen Gaya (Torsi), Momen Inersia Benda Diskrit &amp; Tegar, Teorema
            Sumbu Sejajar, dan Sistem Gabungan.
          </p>
        </section>
      </div>
    </div>
  );
};
