import type { PhysicsQuestion } from '../types/quiz';

/**
 * Mengubah teks soal/pembahasan yang mengandung notasi LaTeX atau simbol Fisika
 * menjadi kalimat Bahasa Indonesia yang alami saat dibacakan oleh TTS Mr Jo.
 */
export function toSpokenIndonesianPhysics(input: string): string {
  let text = input;

  // Hapus pembatas display/inline LaTeX
  text = text.replace(/\$\$/g, ' ').replace(/\$/g, ' ');

  // Pecahan LaTeX: \frac{a}{b} -> a per b
  text = text.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1 per $2');
  // Akar LaTeX: \sqrt{x} -> akar x
  text = text.replace(/\\sqrt\{([^{}]+)\}/g, 'akar $1');
  text = text.replace(/√(\d+)/g, 'akar $1');

  // Penggantian simbol Fisika & Matematika
  const replacements: Array<[RegExp, string]> = [
    [/\\Sigma|\\sum|Σ/g, 'sigma '],
    [/\\Delta|Δ/g, 'delta '],
    [/\\tau|τ/g, 'torsi '],
    [/\\theta|θ/g, 'teta '],
    [/\\sin/g, 'sinus '],
    [/\\cos/g, 'kosinus '],
    [/\\tan/g, 'tangen '],
    [/\\cdot|·/g, ' kali '],
    [/\\times|×/g, ' kali '],
    [/\\ge|≥/g, ' lebih besar atau sama dengan '],
    [/\\le|≤/g, ' lebih kecil atau sama dengan '],
    [/\\approx|≈/g, ' mendekati '],
    [/\\Rightarrow|⇒|→/g, ' sehingga '],
    [/\\perp|⊥/g, ' tegak lurus '],
    [/\\parallel|\/\//g, ' sejajar '],
    [/I_\{?pm\}?|Iₚₘ/g, 'momen inersia pusat massa '],
    [/I_\{?total\}?/g, 'momen inersia total '],
    [/I_\{?x\}?|Iₓ/g, 'momen inersia terhadap sumbu X '],
    [/I_\{?y\}?|Iᵧ/g, 'momen inersia terhadap sumbu Y '],
    [/I_\{?z\}?/g, 'momen inersia terhadap sumbu Z '],
    [/I_\{?L1\}?|I_\{L_1\}/g, 'momen inersia terhadap poros L satu '],
    [/I_\{?L2\}?|I_\{L_2\}/g, 'momen inersia terhadap poros L dua '],
    [/I_\{?\\text\{I\}\}/g, 'momen inersia keadaan satu '],
    [/I_\{?\\text\{II\}\}/g, 'momen inersia keadaan dua '],
    [/r_\{?\\perp\}?/g, 'lengan momen tegak lurus '],
    [/kg\s*(?:kali|\*|·)?\s*m\^\{?2\}?|kg·m²/gi, 'kilogram meter kuadrat '],
    [/N\s*(?:kali|\*|·)?\s*m\b|N·m/g, 'newton meter '],
    [/([A-Za-z0-9])\^2|\^\{2\}|²/g, '$1 kuadrat '],
    [/([A-Za-z0-9])\^\{\\circ\}|°/g, '$1 derajat '],
    [/\\text\{([^{}]+)\}/g, '$1'],
    [/\\mathbf\{([^{}]+)\}/g, '$1'],
    [/\\vec\{([^{}]+)\}/g, 'vektor $1'],
    [/m_\{?1\}?|m₁/g, 'massa satu '],
    [/m_\{?2\}?|m₂/g, 'massa dua '],
    [/m_\{?3\}?|m₃/g, 'massa tiga '],
    [/m_\{?4\}?|m₄/g, 'massa empat '],
    [/m_\{?b\}?/g, 'massa batang '],
    [/m_\{?c\}?/g, 'massa cakram '],
    [/m_\{?p\}?/g, 'massa partikel '],
    [/F_\{?1\}?/g, 'gaya F satu '],
    [/F_\{?2\}?/g, 'gaya F dua '],
    [/F_\{?3\}?/g, 'gaya F tiga '],
    [/F_\{?4\}?/g, 'gaya F empat '],
    [/L_\{?1\}?|L₁/g, 'L satu '],
    [/L_\{?2\}?|L₂/g, 'L dua '],
    [/P_\{?1\}?/g, 'P satu '],
    [/P_\{?2\}?/g, 'P dua '],
    [/P_\{?3\}?/g, 'P tiga '],
    [/P_\{?4\}?/g, 'P empat '],
    [/\\left|\\right/g, ' '],
    [/[{}\\]/g, ' '],
  ];

  for (const [pattern, replacement] of replacements) {
    text = text.replace(pattern, replacement);
  }

  // Koma desimal Indonesia (mis. 1,44 -> 1 koma 44) agar pelafalan alami
  text = text.replace(/(\d),(\d)/g, '$1 koma $2');
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

export function buildStudentQuestionSpeech(question: PhysicsQuestion): string {
  const parts: string[] = [
    `Soal nomor ${question.number}. ${question.title}.`,
    toSpokenIndonesianPhysics(question.stimulus),
    `Pertanyaan. ${toSpokenIndonesianPhysics(question.questionPrompt)}`,
  ];

  if (question.type === 'single-choice' && question.options) {
    parts.push('Pilihan jawaban:');
    for (const opt of question.options) {
      parts.push(`Pilihan ${opt.label}. ${toSpokenIndonesianPhysics(opt.text)}.`);
    }
  } else if (question.type === 'complex-choice' && question.statements) {
    parts.push('Analisis pernyataan berikut dan pilih seluruh pernyataan yang benar:');
    for (const stmt of question.statements) {
      parts.push(`Pernyataan ${stmt.label}. ${toSpokenIndonesianPhysics(stmt.text)}.`);
    }
  } else if (question.type === 'true-false' && question.tfStatements) {
    parts.push('Tentukan Benar atau Salah untuk setiap pernyataan berikut:');
    question.tfStatements.forEach((stmt, idx) => {
      parts.push(`Pernyataan ${idx + 1}. ${toSpokenIndonesianPhysics(stmt.text)}.`);
    });
  } else if (question.type === 'numeric') {
    parts.push(
      `Petunjuk pengisian soal matematis: masukkan hanya angka hasil akhir dalam satuan ${toSpokenIndonesianPhysics(
        question.unitLabel ?? 'SI',
      )}, tanpa mengetik satuan pada kolom isian. Gunakan titik atau koma untuk bilangan desimal.`,
    );
  }

  return parts.join(' ');
}

export function buildTeacherExplanationSpeech(question: PhysicsQuestion): string {
  const exp = question.explanation;
  const parts: string[] = [
    `Pembahasan lengkap soal nomor ${question.number}. ${question.title}.`,
    `Identifikasi masalah. ${toSpokenIndonesianPhysics(exp.problemIdentification)}`,
    `Landasan teori. ${toSpokenIndonesianPhysics(exp.theoreticalBasis)}`,
    `Analisis Fisika. ${toSpokenIndonesianPhysics(exp.physicsAnalysis)}`,
    `Penyelesaian matematis. ${exp.mathematicalSteps
      .map((s) => toSpokenIndonesianPhysics(s))
      .join(' ')}`,
    `Hasil akhir: ${toSpokenIndonesianPhysics(exp.finalCalculationSummary)}.`,
    `Kesimpulan. ${toSpokenIndonesianPhysics(exp.conclusion)}`,
  ];
  return parts.join(' ');
}
