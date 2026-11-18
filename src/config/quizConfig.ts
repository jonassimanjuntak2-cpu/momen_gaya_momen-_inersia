/**
 * Konfigurasi utama aplikasi Quiz Arena Fisika.
 * Pengajar dapat menyesuaikan daftar kelas dan parameter asesmen di berkas ini.
 */

export const APP_CONFIG = {
  appName: 'QUIZ ARENA FISIKA',
  subtitle: 'MOMEN GAYA & MOMEN INERSIA',
  teacherName: 'MR JO',
  subjectTopic: 'Momen Gaya (Torsi), Momen Inersia Benda Diskrit & Benda Tegar, Teorema Sumbu Sejajar, dan Sistem Gabungan',
  totalQuestions: 10,
  maxScore: 100,
  storageKey: 'quiz_arena_fisika_mr_jo_v1',
} as const;

/**
 * Daftar pilihan kelas yang tampil pada halaman login murid.
 * Ubah array ini untuk menambah atau mengganti nama kelas.
 */
export const CLASS_OPTIONS: string[] = [
  'X-1',
  'X-2',
  'XI-1',
  'XI-2',
  'XII-1',
  'XII-2',
];

/**
 * Konfigurasi penguncian Mode Guru & Pembahasan.
 * CATATAN KEAMANAN:
 * Aplikasi ini berjalan sepenuhnya di sisi browser (client-side) dengan penyimpanan localStorage.
 * Password ini berfungsi sebagai kunci antarmuka (UI lock) agar kunci jawaban dan pembahasan
 * tidak tampil di halaman murid sebelum guru memasukkan kode akses. Mekanisme client-side
 * tidak menggantikan otentikasi server terhadap pemeriksaan kode sumber secara langsung.
 */
export const TEACHER_ACCESS_CONFIG = {
  password: 'ABC',
  securityNote:
    'Kunci Mode Guru berjalan di sisi browser untuk membatasi akses antarmuka murid; tidak menggunakan server otentikasi terpusat.',
} as const;

export const ASSESSMENT_INSTRUCTIONS: string[] = [
  'Baca setiap stimulus kasus dan amati diagram teknis atau model 3D dengan cermat sebelum memilih atau menghitung jawaban.',
  'Gunakan konvensi tanda standar: rotasi berlawanan arah jarum jam (CCW) bernilai positif (+), sedangkan searah jarum jam (CW) bernilai negatif (-).',
  'Soal 1–2 berupa Pilihan Ganda Biasa (10 poin/soal). Soal 3–4 berupa Pilihan Ganda Kompleks dengan lebih dari satu pernyataan benar (10 poin jika seluruh pilihan tepat tanpa kesalahan).',
  'Soal 5 berupa Benar/Salah pada 4 pernyataan independen (+2,5 poin tiap benar, -1 poin tiap salah, 0 jika tidak dijawab, skor minimum soal 0).',
  'Soal 6–10 berupa Isian Singkat Matematis (10 poin/soal). Gunakan titik atau koma sebagai pemisah desimal secara konsisten tanpa menuliskan satuan.',
  'Progres pengerjaan tersimpan otomatis di browser pada perangkat ini (localStorage). Gunakan tombol navigasi di bagian atas halaman.',
];
