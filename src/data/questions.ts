import type { PhysicsQuestion } from '../types/quiz';

export const PHYSICS_QUESTIONS: PhysicsQuestion[] = [
  {
    id: 1,
    number: 1,
    title: 'Momen Gaya pada Batang dengan Poros Tetap',
    topicTag: 'Momen Gaya (Torsi)',
    type: 'single-choice',
    maxPoints: 10,
    diagramKind: 'q1-rod-torque',
    diagramCaption:
      'Diagram batang AB sepanjang 4,0 m dengan titik poros P dan empat gaya F₁, F₂, F₃, F₄ dalam satu bidang vertikal.',
    stimulus:
      'Sebuah batang homogen $AB$ yang massanya diabaikan memiliki panjang total $L = 4{,}0\\text{ m}$ dan dipasang pada titik poros tetap di titik $P$ sejauh $1{,}0\\text{ m}$ dari ujung kiri $A$. Empat buah gaya bekerja pada batang dalam satu bidang vertikal seperti ditunjukkan pada diagram: gaya $F_1 = 20\\text{ N}$ berarah vertikal ke atas tepat di ujung $A$; gaya $F_2 = 15\\text{ N}$ bekerja di titik $C$ (berjarak $2{,}0\\text{ m}$ dari ujung $A$) dengan arah miring ke kanan bawah membentuk sudut $37^\\circ$ terhadap batang; gaya $F_3 = 25\\text{ N}$ berarah vertikal ke bawah tepat di titik poros $P$; dan gaya $F_4 = 30\\text{ N}$ bekerja di ujung kanan $B$ dengan arah miring ke kiri atas membentuk sudut $30^\\circ$ terhadap batang. Diketahui $\\sin 37^\\circ = 0{,}6$, $\\cos 37^\\circ = 0{,}8$, dan $\\sin 30^\\circ = 0{,}5$.',
    questionPrompt:
      'Berdasarkan analisis momen gaya terhadap titik poros $P$, besar dan arah resultan momen gaya yang bekerja pada batang tersebut adalah ...',
    options: [
      { id: 'A', label: 'A', text: '$16\\text{ N}\\cdot\\text{m}$ searah jarum jam' },
      { id: 'B', label: 'B', text: '$16\\text{ N}\\cdot\\text{m}$ berlawanan arah jarum jam' },
      { id: 'C', label: 'C', text: '$31\\text{ N}\\cdot\\text{m}$ berlawanan arah jarum jam' },
      { id: 'D', label: 'D', text: '$56\\text{ N}\\cdot\\text{m}$ berlawanan arah jarum jam' },
      { id: 'E', label: 'E', text: '$74\\text{ N}\\cdot\\text{m}$ berlawanan arah jarum jam' },
    ],
    correctOptionId: 'B',
    explanation: {
      competencyIndicator:
        'Menganalisis resultan momen gaya dari beberapa gaya sebidang yang bekerja pada jarak dan sudut berbeda terhadap suatu titik poros tetap.',
      problemIdentification:
        'Menentukan besar dan arah resultan momen gaya ($\\Sigma \\tau_P$) pada batang $AB$ terhadap titik poros $P$ dengan memperhatikan posisi titik tangkap gaya terhadap $P$, sudut kerja gaya terhadap vektor posisi, serta arah kecenderungan rotasi tiap gaya.',
      theoreticalBasis:
        'Momen gaya (torsi) merupakan besaran vektor yang menyatakan ukuran kecenderungan suatu gaya untuk memutar benda tegar terhadap poros tertentu. Secara skalar pada satu bidang, besar torsi dirumuskan sebagai $\\tau = rF\\sin\\theta = r_\\perp F$, dengan $r$ adalah jarak dari titik poros ke titik tangkap gaya, dan $\\theta$ adalah sudut terkecil antara vektor posisi $\\vec{r}$ dan vektor gaya $\\vec{F}$. Berdasarkan konvensi tanda standar, torsi yang memutar benda berlawanan arah jarum jam (CCW) bertanda positif ($+$), sedangkan torsi yang memutar searah jarum jam (CW) bertanda negatif ($-$).',
      knownData: [
        'Panjang batang $L = AB = 4{,}0\\text{ m}$ dengan poros $P$ pada posisi $x_P = 1{,}0\\text{ m}$ dari ujung $A$.',
        '$F_1 = 20\\text{ N}$ di titik $A$ ($x_A = 0\\text{ m}$), arah vertikal ke atas ($\\theta_1 = 90^\\circ$).',
        '$F_2 = 15\\text{ N}$ di titik $C$ ($x_C = 2{,}0\\text{ m}$), arah kanan bawah, sudut $\\theta_2 = 37^\\circ$ terhadap batang.',
        '$F_3 = 25\\text{ N}$ di titik $P$ ($x_P = 1{,}0\\text{ m}$), arah vertikal ke bawah.',
        '$F_4 = 30\\text{ N}$ di titik $B$ ($x_B = 4{,}0\\text{ m}$), arah kiri atas, sudut $\\theta_4 = 30^\\circ$ terhadap batang.',
        '$\\sin 37^\\circ = 0{,}6$, $\\sin 30^\\circ = 0{,}5$, $\\sin 90^\\circ = 1$.',
      ],
      askedQuantity: 'Resultan momen gaya terhadap poros $P$ ($\\Sigma\\tau_P$) beserta arah rotasinya.',
      basicEquations: [
        '$$\\tau_i = \\pm r_i F_i \\sin\\theta_i$$',
        '$$\\Sigma\\tau_P = \\tau_1 + \\tau_2 + \\tau_3 + \\tau_4$$',
      ],
      physicsAnalysis:
        'Kesalahan paling umum terletak pada penentuan jarak $r_i$ (harus diukur dari poros $P$, bukan dari ujung $A$) dan penentuan tanda rotasi (gaya ke atas tidak selalu menghasilkan torsi positif). Gaya $F_1$ mendorong ke atas di sebelah kiri poros $P$, sehingga memutar batang searah jarum jam ($-$). Gaya $F_2$ mendorong ke bawah di sebelah kanan poros $P$, sehingga juga memutar searah jarum jam ($-$). Gaya $F_3$ garis kerjanya tepat melewati poros $P$ ($r_3 = 0$), sehingga tidak menghasilkan momen gaya. Gaya $F_4$ menarik ke atas di sebelah kanan poros $P$, sehingga memutar berlawanan arah jarum jam ($+$).',
      mathematicalSteps: [
        'Tentukan jarak setiap titik tangkap gaya terhadap titik poros $P$ ($x_P = 1{,}0\\text{ m}$): $r_1 = |0 - 1{,}0| = 1{,}0\\text{ m}$; $r_2 = |2{,}0 - 1{,}0| = 1{,}0\\text{ m}$; $r_3 = |1{,}0 - 1{,}0| = 0\\text{ m}$; $r_4 = |4{,}0 - 1{,}0| = 3{,}0\\text{ m}$.',
        'Hitung torsi akibat $F_1$ (arah rotasi searah jarum jam / negatif): $$\\tau_1 = -r_1 F_1 \\sin 90^\\circ = -(1{,}0)(20)(1) = -20\\text{ N}\\cdot\\text{m}$$',
        'Hitung torsi akibat $F_2$ (komponen tegak lurus ke bawah di kanan $P$, memutar searah jarum jam / negatif): $$\\tau_2 = -r_2 F_2 \\sin 37^\\circ = -(1{,}0)(15)(0{,}6) = -9\\text{ N}\\cdot\\text{m}$$',
        'Hitung torsi akibat $F_3$ (melalui poros $P$): $$\\tau_3 = (0)(25) = 0\\text{ N}\\cdot\\text{m}$$',
        'Hitung torsi akibat $F_4$ (komponen tegak lurus ke atas di kanan $P$, memutar berlawanan arah jarum jam / positif): $$\\tau_4 = +r_4 F_4 \\sin 30^\\circ = +(3{,}0)(30)(0{,}5) = +45\\text{ N}\\cdot\\text{m}$$',
        'Jumlahkan seluruh momen gaya: $$\\Sigma\\tau_P = -20 + (-9) + 0 + 45 = +16\\text{ N}\\cdot\\text{m}$$',
      ],
      finalCalculationSummary: '+16 N·m (16 N·m berlawanan arah jarum jam)',
      optionAnalyses: [
        {
          label: 'A',
          isCorrect: false,
          analysis: 'Besar $16\\text{ N}\\cdot\\text{m}$ benar, tetapi arah rotasinya terbalik (seharusnya berlawanan arah jarum jam karena hasil positif).',
        },
        {
          label: 'B',
          isCorrect: true,
          analysis: 'Tepat. Resultan bernilai $+16\\text{ N}\\cdot\\text{m}$ yang berarti $16\\text{ N}\\cdot\\text{m}$ berlawanan arah jarum jam.',
        },
        {
          label: 'C',
          isCorrect: false,
          analysis: 'Terjadi jika keliru mengukur jarak $F_4$ dari ujung $A$ ($4{,}0\\text{ m}$) alih-alih dari poros $P$ ($3{,}0\\text{ m}$), menghasilkan $-20 - 9 + 60 = +31\\text{ N}\\cdot\\text{m}$.',
        },
        {
          label: 'D',
          isCorrect: false,
          analysis: 'Terjadi jika keliru menganggap $F_1$ yang berarah ke atas menghasilkan torsi positif ($+20 - 9 + 45 = +56\\text{ N}\\cdot\\text{m}$).',
        },
        {
          label: 'E',
          isCorrect: false,
          analysis: 'Terjadi jika seluruh magnitudo torsi dijumlahkan tanpa membedakan arah rotasi ($20 + 9 + 45 = 74\\text{ N}\\cdot\\text{m}$).',
        },
      ],
      conclusion:
        'Resultan momen gaya pada batang terhadap titik poros $P$ adalah $16\\text{ N}\\cdot\\text{m}$ dengan arah berlawanan arah jarum jam.',
      answerVerification: {
        dimensionCheck: '$[\\tau] = [r][F] = \\text{L} \\cdot \\text{M}\\text{L}\\text{T}^{-2} = \\text{M}\\text{L}^2\\text{T}^{-2}$ (sesuai dimensi torsi).',
        unitCheck: 'Satuan $\\text{m} \\times \\text{N} = \\text{N}\\cdot\\text{m}$ (Satuan SI).',
        reasonablenessCheck: 'Kontribusi $\\tau_4 = +45\\text{ N}\\cdot\\text{m}$ lebih besar dari gabungan torsi negatif ($29\\text{ N}\\cdot\\text{m}$), sehingga selisih $16\\text{ N}\\cdot\\text{m}$ sangat wajar.',
        signAndGeometryCheck: 'Titik $A$ berada di kiri poros sehingga gaya ke atas memutar CW ($-$), sedangkan titik $C$ dan $B$ berada di kanan poros.',
      },
    },
  },
  {
    id: 2,
    number: 2,
    title: 'Momen Gaya pada Pelat Persegi ABCD',
    topicTag: 'Momen Gaya Bidang 2D',
    type: 'single-choice',
    maxPoints: 10,
    diagramKind: 'q2-square-torque',
    diagramCaption:
      'Pelat persegi ABCD dengan panjang sisi a = 2,0 m, poros rotasi di titik sudut A, serta gaya-gaya F₁, F₂, F₃, dan F₄.',
    stimulus:
      'Sebuah pelat persegi tipis $ABCD$ dengan panjang sisi $a = 2{,}0\\text{ m}$ dapat berotasi bebas pada bidangnya dengan titik poros tepat di sudut $A$ (kiri bawah). Pada keempat sudut pelat bekerja gaya-gaya sebidang sebagai berikut: gaya $F_1 = 10\\text{ N}$ di sudut $B$ (kanan bawah) berarah vertikal ke atas sepanjang sisi $BC$; gaya $F_2 = 20\\text{ N}$ di sudut $D$ (kiri atas) berarah horizontal ke kanan sepanjang sisi $DC$; gaya $F_3 = 15\\sqrt{2}\\text{ N}$ di sudut $C$ (kanan atas) berarah miring ke kiri atas membentuk sudut $45^\\circ$ terhadap garis horizontal ke kiri; dan gaya $F_4 = 25\\text{ N}$ di sudut $B$ berarah horizontal ke kanan searah perpanjangan sisi $AB$.',
    questionPrompt:
      'Resultan momen gaya total yang bekerja pada pelat persegi $ABCD$ terhadap titik poros $A$ adalah ...',
    options: [
      { id: 'A', label: 'A', text: '$10\\text{ N}\\cdot\\text{m}$ berlawanan arah jarum jam' },
      { id: 'B', label: 'B', text: '$20\\text{ N}\\cdot\\text{m}$ searah jarum jam' },
      { id: 'C', label: 'C', text: '$40\\text{ N}\\cdot\\text{m}$ searah jarum jam' },
      { id: 'D', label: 'D', text: '$40\\text{ N}\\cdot\\text{m}$ berlawanan arah jarum jam' },
      { id: 'E', label: 'E', text: '$120\\text{ N}\\cdot\\text{m}$ berlawanan arah jarum jam' },
    ],
    correctOptionId: 'D',
    explanation: {
      competencyIndicator:
        'Menentukan resultan momen gaya pada benda bidang dua dimensi dengan menguraikan vektor gaya atau menentukan lengan momen tegak lurus secara geometris.',
      problemIdentification:
        'Menghitung resultan torsi $\\Sigma \\tau_A$ pada pelat persegi $ABCD$ ketika gaya bekerja di berbagai sudut termasuk gaya miring di sudut $C$ yang vektor posisinya merupakan diagonal persegi.',
      theoreticalBasis:
        'Pada bidang $xy$ dengan titik poros $A(0,0)$, momen gaya dari suatu gaya $\\vec{F} = (F_x, F_y)$ yang bekerja di titik $(x, y)$ dapat dihitung melalui penguraian komponen: $\\tau_A = x F_y - y F_x$, atau secara geometris menggunakan $\\tau_A = \\pm r_\\perp F$. Kedua metode menghasilkan nilai yang identik asalkan lengan momen tegak lurus terhadap garis kerja gaya ditentukan secara presisi.',
      knownData: [
        'Sisi persegi $a = 2{,}0\\text{ m}$ dengan koordinat sudut $A(0,0)$, $B(2,0)$, $C(2,2)$, dan $D(0,2)$.',
        '$F_1 = 10\\text{ N}$ di $B(2,0)$ ke atas ($+y$).',
        '$F_2 = 20\\text{ N}$ di $D(0,2)$ ke kanan ($+x$).',
        '$F_3 = 15\\sqrt{2}\\text{ N}$ di $C(2,2)$ membentuk sudut $45^\\circ$ ke kiri atas: $F_{3x} = -15\\text{ N}$ dan $F_{3y} = +15\\text{ N}$.',
        '$F_4 = 25\\text{ N}$ di $B(2,0)$ ke kanan ($+x$).',
      ],
      askedQuantity: 'Resultan momen gaya terhadap poros $A$ ($\\Sigma\\tau_A$).',
      basicEquations: [
        '$$\\tau = r F \\sin\\theta = r_\\perp F$$',
        '$$\\tau_A = x F_y - y F_x$$',
      ],
      physicsAnalysis:
        'Garis kerja gaya $F_4$ memanjang tepat melalui poros $A$, sehingga lengan momennya nol ($\\tau_4 = 0$). Gaya $F_1$ berjarak tegak lurus $2{,}0\\text{ m}$ di kanan $A$ dan mendorong ke atas sehingga memutar CCW ($+$). Gaya $F_2$ berjarak tegak lurus $2{,}0\\text{ m}$ di atas $A$ dan mendorong ke kanan sehingga memutar CW ($-$). Untuk $F_3$ di sudut $C$, arah gaya ke kiri atas dengan sudut $45^\\circ$ tepat tegak lurus terhadap diagonal $AC$ (yang panjangnya $2\\sqrt{2}\\text{ m}$ dan bersudut $45^\\circ$ ke kanan atas). Baik komponen horizontalnya ke kiri maupun komponen vertikalnya ke atas sama-sama memutar persegi berlawanan arah jarum jam ($+$) terhadap $A$.',
      mathematicalSteps: [
        'Torsi akibat $F_1$ di $B$ ($r_{\\perp 1} = AB = 2{,}0\\text{ m}$, arah CCW): $$\\tau_1 = +(2{,}0)(10) = +20\\text{ N}\\cdot\\text{m}$$',
        'Torsi akibat $F_2$ di $D$ ($r_{\\perp 2} = AD = 2{,}0\\text{ m}$, arah CW): $$\\tau_2 = -(2{,}0)(20) = -40\\text{ N}\\cdot\\text{m}$$',
        'Torsi akibat $F_3$ di $C$ dengan penguraian komponen ($F_{3x} = 15\\sqrt{2}\\cos 45^\\circ = 15\\text{ N}$ ke kiri; $F_{3y} = 15\\sqrt{2}\\sin 45^\\circ = 15\\text{ N}$ ke atas): kedua komponen memiliki lengan $a = 2{,}0\\text{ m}$ dan memutar CCW: $$\\tau_3 = +(2{,}0)(15) + (2{,}0)(15) = +30 + 30 = +60\\text{ N}\\cdot\\text{m}$$ (Atau via diagonal $AC = 2\\sqrt{2}\\text{ m}$ tegak lurus $F_3$: $\\tau_3 = (2\\sqrt{2})(15\\sqrt{2}) = +60\\text{ N}\\cdot\\text{m}$).',
        'Torsi akibat $F_4$ di $B$ (garis kerja melewati $A$, $r_{\\perp 4} = 0$): $$\\tau_4 = 0\\text{ N}\\cdot\\text{m}$$',
        'Resultan momen gaya total terhadap poros $A$: $$\\Sigma\\tau_A = +20 - 40 + 60 + 0 = +40\\text{ N}\\cdot\\text{m}$$',
      ],
      finalCalculationSummary: '+40 N·m (40 N·m berlawanan arah jarum jam)',
      optionAnalyses: [
        {
          label: 'A',
          isCorrect: false,
          analysis: 'Muncul jika keliru menghitung $\\tau_3 = a \\cdot F_3 \\sin 45^\\circ = 30\\text{ N}\\cdot\\text{m}$ sehingga hanya memperhitungkan satu komponen ($20 - 40 + 30 = +10\\text{ N}\\cdot\\text{m}$).',
        },
        {
          label: 'B',
          isCorrect: false,
          analysis: 'Muncul jika keliru menganggap garis kerja $F_3$ melewati poros $A$ ($\\tau_3 = 0$), menghasilkan $20 - 40 = -20\\text{ N}\\cdot\\text{m}$.',
        },
        {
          label: 'C',
          isCorrect: false,
          analysis: 'Besar $40\\text{ N}\\cdot\\text{m}$ benar, tetapi arah rotasi terbalik.',
        },
        {
          label: 'D',
          isCorrect: true,
          analysis: 'Tepat. Resultan bernilai $+40\\text{ N}\\cdot\\text{m}$ berlawanan arah jarum jam.',
        },
        {
          label: 'E',
          isCorrect: false,
          analysis: 'Terjadi jika keliru memberi tanda positif pada $\\tau_2$ ($+20 + 40 + 60 = +120\\text{ N}\\cdot\\text{m}$).',
        },
      ],
      conclusion:
        'Resultan momen gaya pada pelat persegi $ABCD$ terhadap sudut $A$ adalah $40\\text{ N}\\cdot\\text{m}$ berlawanan arah jarum jam.',
      answerVerification: {
        dimensionCheck: 'Dimensi momen gaya $[\\tau] = \\text{M}\\text{L}^2\\text{T}^{-2}$.',
        unitCheck: 'Satuan $\\text{N}\\cdot\\text{m}$ konsisten pada seluruh suku.',
        reasonablenessCheck: 'Komponen terbesar berasal dari $F_3$ karena bekerja pada jarak diagonal terjauh $2\\sqrt{2}\\text{ m}$ dan tegak lurus diagonal.',
        signAndGeometryCheck: 'Pemeriksaan determinan $\\vec{r} \\times \\vec{F}$ di $C(2,2)$ untuk $\\vec{F}_3 = (-15, 15)$ menghasilkan $(2)(15) - (2)(-15) = +60\\text{ N}\\cdot\\text{m}$, konsisten dengan CCW.',
      },
    },
  },
  {
    id: 3,
    number: 3,
    title: 'Analisis Momen Gaya Kontekstual pada Kunci Pas',
    topicTag: 'Aplikasi Momen Gaya',
    type: 'complex-choice',
    maxPoints: 10,
    diagramKind: 'q3-wrench-context',
    diagramCaption:
      'Skema kunci pas panjang L = 0,50 m dari pusat baut O ke ujung pegangan P, dengan titik Q berjarak 0,30 m dari O.',
    stimulus:
      'Seorang teknisi bengkel hendak mengencangkan baut roda menggunakan kunci pas bermulut panjang $L = 0{,}50\\text{ m}$ (diukur dari pusat baut $O$ hingga ujung pegangan $P$). Titik $Q$ terletak pada lengan kunci pas sejauh $0{,}30\\text{ m}$ dari pusat baut $O$. Agar baut dapat mengencang dengan aman, diperlukan momen gaya (torsi) minimum sebesar $24\\text{ N}\\cdot\\text{m}$ dengan arah putaran **searah jarum jam**. Diketahui $\\sin 53^\\circ = 0{,}8$; $\\cos 53^\\circ = 0{,}6$; dan $\\sin 30^\\circ = 0{,}5$.',
    questionPrompt:
      'Analisislah lima pernyataan berikut secara matematis dan fisis. Pilihlah **SELURUH pernyataan yang benar** (jawaban bisa lebih dari satu):',
    statements: [
      {
        id: 'S1',
        label: '1',
        text: 'Jika teknisi menarik ujung pegangan $P$ dengan gaya $60\\text{ N}$ membentuk sudut $53^\\circ$ terhadap lengan kunci pas sedemikian rupa sehingga memutar searah jarum jam, besar torsi yang dihasilkan tepat memenuhi batas minimum pengencangan baut.',
      },
      {
        id: 'S2',
        label: '2',
        text: 'Jika gaya sebesar $60\\text{ N}$ diberikan tegak lurus lengan kunci pas pada titik $Q$ ($r = 0{,}30\\text{ m}$), momen gaya yang dihasilkan lebih besar daripada saat gaya $60\\text{ N}$ diberikan di ujung $P$ pada sudut $53^\\circ$.',
      },
      {
        id: 'S3',
        label: '3',
        text: 'Jika dua gaya bekerja bersamaan—gaya $30\\text{ N}$ tegak lurus di $P$ memutar searah jarum jam dan gaya $40\\text{ N}$ di $Q$ membentuk sudut $30^\\circ$ berlawanan arah jarum jam—maka resultan torsi total tetap memutar baut searah jarum jam sebesar $9\\text{ N}\\cdot\\text{m}$.',
      },
      {
        id: 'S4',
        label: '4',
        text: 'Memperpanjang pegangan kunci pas menggunakan pipa sambungan hingga panjang efektif $1{,}0\\text{ m}$ memungkinkan baut dikencangkan ($\\tau \\ge 24\\text{ N}\\cdot\\text{m}$) dengan gaya tarik $30\\text{ N}$ yang sejajar sumbu batang kunci pas.',
      },
      {
        id: 'S5',
        label: '5',
        text: 'Untuk menghasilkan torsi tepat $24\\text{ N}\\cdot\\text{m}$ dengan arah gaya tegak lurus lengan di titik $Q$ ($r = 0{,}30\\text{ m}$), diperlukan gaya sebesar $80\\text{ N}$.',
      },
    ],
    correctStatementIds: ['S1', 'S3', 'S5'],
    explanation: {
      competencyIndicator:
        'Mengevaluasi pengaruh besar gaya, lengan momen, sudut aplikasi gaya, dan superposisi torsi dalam konteks mekanika teknik.',
      problemIdentification:
        'Menguji kelima skenario pembebanan pada kunci pas secara kuantitatif menggunakan definisi torsi $\\tau = rF\\sin\\theta$ serta membandingkan efektivitas jarak titik tangkap dan arah gaya.',
      theoreticalBasis:
        'Efektivitas gaya dalam menghasilkan rotasi bergantung pada tiga faktor: besar gaya ($F$), jarak titik tangkap gaya dari poros ($r$), dan sinus sudut antara arah gaya dan lengan ($\\sin\\theta$). Nilai torsi maksimum untuk besar gaya dan posisi tertentu tercapai ketika $\\theta = 90^\\circ$ ($\\sin 90^\\circ = 1$), sedangkan gaya yang sejajar lengan ($\\theta = 0^\\circ$ atau $180^\\circ$) menghasilkan torsi nol karena garis kerjanya melewati poros.',
      knownData: [
        'Jarak $OP = L = 0{,}50\\text{ m}$.',
        'Jarak $OQ = 0{,}30\\text{ m}$.',
        'Torsi minimum pengencangan baut: $\\tau_{\\min} = 24\\text{ N}\\cdot\\text{m}$ (searah jarum jam / CW).',
        '$\\sin 53^\\circ = 0{,}8$, $\\sin 30^\\circ = 0{,}5$, $\\sin 90^\\circ = 1$.',
      ],
      askedQuantity: 'Kebenaran masing-masing dari kelima pernyataan mekanis (S1–S5).',
      basicEquations: [
        '$$\\tau = r F \\sin\\theta$$',
        '$$\\Sigma\\tau = \\tau_{\\text{CCW}} - \\tau_{\\text{CW}}$$',
      ],
      physicsAnalysis:
        'Setiap pernyataan diuji langsung dengan menghitung torsi aktualnya lalu membandingkannya dengan syarat batas $24\\text{ N}\\cdot\\text{m}$ atau antar kondisi. Perhatikan terutama pernyataan 4 yang menjebak intuisi tentang pipa sambungan: meskipun $r$ diperpanjang menjadi $1{,}0\\text{ m}$, arah gaya sejajar batang membuat $\\sin 0^\\circ = 0$.',
      mathematicalSteps: [
        'Uji Pernyataan 1: $\\tau_1 = r_P F \\sin 53^\\circ = (0{,}50)(60)(0{,}8) = 24\\text{ N}\\cdot\\text{m}$ (searah jarum jam). Tepat memenuhi batas minimum $\\rightarrow$ **BENAR**.',
        'Uji Pernyataan 2: $\\tau_Q = r_Q F \\sin 90^\\circ = (0{,}30)(60)(1) = 18\\text{ N}\\cdot\\text{m}$. Karena $18\\text{ N}\\cdot\\text{m} < 24\\text{ N}\\cdot\\text{m}$, pernyataan "lebih besar" keliru $\\rightarrow$ **SALAH**.',
        'Uji Pernyataan 3: $\\tau_{\\text{CW}} = -(0{,}50)(30)(1) = -15\\text{ N}\\cdot\\text{m}$ dan $\\tau_{\\text{CCW}} = +(0{,}30)(40)(0{,}5) = +6\\text{ N}\\cdot\\text{m}$. Resultan $\\Sigma\\tau = -15 + 6 = -9\\text{ N}\\cdot\\text{m}$ ($9\\text{ N}\\cdot\\text{m}$ searah jarum jam) $\\rightarrow$ **BENAR**.',
        'Uji Pernyataan 4: Gaya sejajar sumbu batang memiliki sudut $\\theta = 0^\\circ$ atau $180^\\circ$, sehingga $\\tau = (1{,}0)(30)\\sin 0^\\circ = 0\\text{ N}\\cdot\\text{m}$ $\\rightarrow$ **SALAH**.',
        'Uji Pernyataan 5: $\\tau = r_Q F \\sin 90^\\circ \\Rightarrow 24 = (0{,}30) F (1) \\Rightarrow F = \\frac{24}{0{,}30} = 80\\text{ N}$ $\\rightarrow$ **BENAR**.',
      ],
      finalCalculationSummary: 'Pernyataan benar: 1, 3, dan 5',
      optionAnalyses: [
        { label: 'Pernyataan 1', isCorrect: true, analysis: 'Benar karena $(0{,}50)(60)(0{,}8) = 24\\text{ N}\\cdot\\text{m}$.' },
        { label: 'Pernyataan 2', isCorrect: false, analysis: 'Salah karena $(0{,}30)(60) = 18\\text{ N}\\cdot\\text{m} < 24\\text{ N}\\cdot\\text{m}$.' },
        { label: 'Pernyataan 3', isCorrect: true, analysis: 'Benar karena $-15 + 6 = -9\\text{ N}\\cdot\\text{m}$ (searah jarum jam).' },
        { label: 'Pernyataan 4', isCorrect: false, analysis: 'Salah karena gaya sejajar batang menghasilkan $\\sin\\theta = 0$ sehingga torsinya $0$.' },
        { label: 'Pernyataan 5', isCorrect: true, analysis: 'Benar karena $F = 24 / 0{,}30 = 80\\text{ N}$.' },
      ],
      conclusion:
        'Pernyataan yang benar adalah 1, 3, dan 5. Momen gaya maksimum dicapai dengan lengan efektif terbesar dan sudut tegak lurus, sedangkan gaya sejajar poros selalu menghasilkan torsi nol.',
      answerVerification: {
        dimensionCheck: 'Seluruh suku torsi memiliki dimensi $\\text{M}\\text{L}^2\\text{T}^{-2}$, dan gaya berdimensi $\\text{M}\\text{L}\\text{T}^{-2}$.',
        unitCheck: 'Jarak dalam meter ($\\text{m}$), gaya dalam newton ($\\text{N}$), menghasilkan torsi dalam $\\text{N}\\cdot\\text{m}$.',
        reasonablenessCheck: 'Pada jarak lebih pendek ($0{,}30\\text{ m}$ vs $0{,}50\\text{ m}$), gaya yang diperlukan meningkat menjadi $80\\text{ N}$ (masuk akal secara mekanika tuas).',
        signAndGeometryCheck: 'Arah putaran CW dan CCW berlawanan tanda sehingga saling mengurangi pada Pernyataan 3.',
      },
    },
  },
  {
    id: 4,
    number: 4,
    title: 'Momen Inersia Sistem Partikel 3 Dimensi',
    topicTag: 'Momen Inersia Benda Diskrit 3D',
    type: 'complex-choice',
    maxPoints: 10,
    diagramKind: 'q4-3d-particles',
    diagramCaption:
      'Visualisasi 3D interaktif koordinat Kartesius (x, y, z) dalam meter. Putar model 3D, perbesar/perkecil, dan aktifkan poros untuk mengamati jarak tegak lurus tiap partikel.',
    stimulus:
      'Suatu sistem benda diskrit dalam ruang koordinat Kartesius tiga dimensi $(x, y, z)$ terdiri atas empat buah partikel bermassa titik (koordinat dalam satuan meter): $m_1 = 2\\text{ kg}$ di $(3, 0, 4)$; $m_2 = 3\\text{ kg}$ di $(0, 2, -2)$; $m_3 = 1\\text{ kg}$ di $(-2, 4, 0)$; dan $m_4 = 4\\text{ kg}$ di $(1, -1, 2)$. Selain sumbu koordinat utama ($X$, $Y$, dan $Z$), dianalisis pula dua poros sejajar yang bergeser dari titik asal: poros $L_1$ yang sejajar sumbu $X$ melalui garis $(y = 0,\\; z = 2\\text{ m})$, dan poros $L_2$ yang sejajar sumbu $Y$ melalui garis $(x = 1\\text{ m},\\; z = 0)$.',
    questionPrompt:
      'Gunakan model 3D di atas dan persamaan momen inersia sistem partikel untuk menganalisis lima pernyataan berikut. Pilihlah **SELURUH pernyataan yang benar**:',
    statements: [
      {
        id: 'S1',
        label: '1',
        text: 'Nilai momen inersia sistem terhadap ketiga sumbu koordinat utama memenuhi urutan $I_x > I_y > I_z$ dengan selisih antara $I_x$ dan $I_z$ sebesar $34\\text{ kg}\\cdot\\text{m}^2$.',
      },
      {
        id: 'S2',
        label: '2',
        text: 'Dalam menghitung $I_x$, koordinat $x$ tiap partikel menentukan jarak tegak lurus ke sumbu $X$, sehingga menggeser partikel $m_1$ ke $(5, 0, 4)$ akan memperbesar nilai $I_x$.',
      },
      {
        id: 'S3',
        label: '3',
        text: 'Momen inersia sistem terhadap poros $L_1$ (sejajar sumbu $X$ melalui garis $y = 0,\\; z = 2\\text{ m}$) bernilai sama persis dengan $I_x$, yaitu $92\\text{ kg}\\cdot\\text{m}^2$.',
      },
      {
        id: 'S4',
        label: '4',
        text: 'Momen inersia sistem terhadap poros $L_2$ (sejajar sumbu $Y$ melalui garis $x = 1\\text{ m},\\; z = 0$) lebih besar daripada $I_y$ karena poros $L_2$ bergeser menjauhi titik asal $(0,0,0)$.',
      },
      {
        id: 'S5',
        label: '5',
        text: 'Jika partikel $m_2$ dipindahkan tepat ke titik asal $(0, 0, 0)$ sementara tiga partikel lainnya tetap, maka momen inersia sistem terhadap sumbu $Z$ ($I_z$) berkurang sebesar $12\\text{ kg}\\cdot\\text{m}^2$.',
      },
    ],
    correctStatementIds: ['S1', 'S3', 'S5'],
    explanation: {
      competencyIndicator:
        'Menentukan momen inersia sistem partikel 3 dimensi terhadap sumbu koordinat utama maupun sumbu sejajar yang bergeser berdasarkan jarak tegak lurus sebenarnya.',
      problemIdentification:
        'Menghitung $I_x$, $I_y$, $I_z$, $I_{L_1}$, dan $I_{L_2}$ dari empat partikel diskrit 3D serta memahami bahwa pergeseran poros tidak selalu memperbesar momen inersia apabila poros baru justru mendekati pusat massa sistem.',
      theoreticalBasis:
        'Momen inersia sistem partikel diskrit adalah $I = \\sum m_i r_{\\perp, i}^2$, dengan $r_{\\perp, i}$ adalah **jarak tegak lurus** partikel ke garis sumbu rotasi. Dalam ruang 3D: terhadap sumbu $X$ ($y=0, z=0$), $r_\\perp^2 = y_i^2 + z_i^2$; terhadap sumbu $Y$ ($x=0, z=0$), $r_\\perp^2 = x_i^2 + z_i^2$; dan terhadap sumbu $Z$ ($x=0, y=0$), $r_\\perp^2 = x_i^2 + y_i^2$. Untuk poros sejajar sumbu $X$ pada garis $(y=y_0, z=z_0)$, jarak kuadrat tegak lurusnya adalah $(y_i - y_0)^2 + (z_i - z_0)^2$.',
      knownData: [
        '$m_1 = 2\\text{ kg}$ di $(3, 0, 4)$.',
        '$m_2 = 3\\text{ kg}$ di $(0, 2, -2)$.',
        '$m_3 = 1\\text{ kg}$ di $(-2, 4, 0)$.',
        '$m_4 = 4\\text{ kg}$ di $(1, -1, 2)$.',
        'Poros $L_1$: sejajar sumbu $X$ melalui $(y=0, z=2)$.',
        'Poros $L_2$: sejajar sumbu $Y$ melalui $(x=1, z=0)$.',
      ],
      askedQuantity: 'Nilai $I_x$, $I_y$, $I_z$, $I_{L_1}$, $I_{L_2}$, dan kebenaran pernyataan S1–S5.',
      basicEquations: [
        '$$I_x = \\sum m_i(y_i^2 + z_i^2), \\quad I_y = \\sum m_i(x_i^2 + z_i^2), \\quad I_z = \\sum m_i(x_i^2 + y_i^2)$$',
        '$$I_{L_1} = \\sum m_i\\left[(y_i - 0)^2 + (z_i - 2)^2\\right], \\quad I_{L_2} = \\sum m_i\\left[(x_i - 1)^2 + (z_i - 0)^2\\right]$$',
      ],
      physicsAnalysis:
        'Hal paling krusial dalam ruang 3D adalah menyadari bahwa koordinat sepanjang arah poros rotasi TIDAK memengaruhi jarak tegak lurus ke poros tersebut. Selain itu, nilai momen inersia minimum terjadi jika poros melewati pusat massa ($I_{\\text{pm}}$). Karena sumbu koordinat belum tentu melewati pusat massa, menggeser poros menjauhi $(0,0,0)$ dapat membuat momen inersia tetap sama (jika sama jauh dari pusat massa, seperti $L_1$) atau bahkan mengecil (jika mendekati pusat massa, seperti $L_2$).',
      mathematicalSteps: [
        'Hitung $I_x = \\sum m_i(y_i^2 + z_i^2)$: $$I_x = 2(0^2 + 4^2) + 3(2^2 + (-2)^2) + 1(4^2 + 0^2) + 4((-1)^2 + 2^2) = 32 + 24 + 16 + 20 = 92\\text{ kg}\\cdot\\text{m}^2$$',
        'Hitung $I_y = \\sum m_i(x_i^2 + z_i^2)$: $$I_y = 2(3^2 + 4^2) + 3(0^2 + (-2)^2) + 1((-2)^2 + 0^2) + 4(1^2 + 2^2) = 50 + 12 + 4 + 20 = 86\\text{ kg}\\cdot\\text{m}^2$$',
        'Hitung $I_z = \\sum m_i(x_i^2 + y_i^2)$: $$I_z = 2(3^2 + 0^2) + 3(0^2 + 2^2) + 1((-2)^2 + 4^2) + 4(1^2 + (-1)^2) = 18 + 12 + 20 + 8 = 58\\text{ kg}\\cdot\\text{m}^2$$ Maka $I_x > I_y > I_z$ ($92 > 86 > 58$) dan $I_x - I_z = 92 - 58 = 34\\text{ kg}\\cdot\\text{m}^2$ (S1 **BENAR**).',
        'Hitung $I_{L_1}$ terhadap garis $(y=0, z=2)$: $$I_{L_1} = 2(0^2 + (4-2)^2) + 3(2^2 + (-2-2)^2) + 1(4^2 + (0-2)^2) + 4((-1)^2 + (2-2)^2) = 8 + 60 + 20 + 4 = 92\\text{ kg}\\cdot\\text{m}^2$$ (Terbukti $I_{L_1} = I_x = 92\\text{ kg}\\cdot\\text{m}^2$ karena proyeksi pusat massa pada bidang $yz$ adalah $(y_{\\text{pm}} = 0{,}6,\\; z_{\\text{pm}} = 1{,}0)$ yang berjarak sama dari $(0,0)$ dan $(0,2)$! Maka S3 **BENAR**).',
        'Hitung $I_{L_2}$ terhadap garis $(x=1, z=0)$: $$I_{L_2} = 2((3-1)^2 + 4^2) + 3((0-1)^2 + (-2)^2) + 1((-2-1)^2 + 0^2) + 4((1-1)^2 + 2^2) = 40 + 15 + 9 + 16 = 80\\text{ kg}\\cdot\\text{m}^2$$ Karena $80 < 86$, ternyata $I_{L_2} < I_y$ (S4 **SALAH**).',
        'Jika $m_2$ dipindah ke $(0,0,0)$, kontribusi $m_2$ terhadap $I_z$ yang semula $3(0^2 + 2^2) = 12\\text{ kg}\\cdot\\text{m}^2$ menjadi $0$, sehingga $I_z$ berkurang $12\\text{ kg}\\cdot\\text{m}^2$ (S5 **BENAR**).',
      ],
      finalCalculationSummary: 'Iₓ = 92, Iᵧ = 86, I_z = 58, I_L1 = 92, I_L2 = 80 kg·m²; pernyataan benar: 1, 3, dan 5',
      optionAnalyses: [
        { label: 'Pernyataan 1', isCorrect: true, analysis: 'Benar: $I_x = 92 > I_y = 86 > I_z = 58$, selisih $92 - 58 = 34\\text{ kg}\\cdot\\text{m}^2$.' },
        { label: 'Pernyataan 2', isCorrect: false, analysis: 'Salah: $I_x$ tidak bergantung pada koordinat $x$; menggeser $x$ dari $3$ ke $5$ hanya menggeser massa sejajar sumbu $X$.' },
        { label: 'Pernyataan 3', isCorrect: true, analysis: 'Benar: perhitungan langsung dan teorema sumbu sejajar memberi $I_{L_1} = 92\\text{ kg}\\cdot\\text{m}^2 = I_x$.' },
        { label: 'Pernyataan 4', isCorrect: false, analysis: 'Salah: $I_{L_2} = 80\\text{ kg}\\cdot\\text{m}^2 < I_y = 86\\text{ kg}\\cdot\\text{m}^2$ karena garis $(1, 0)$ lebih dekat ke proyeksi pusat massa $(0{,}8,\\; 1{,}0)$.' },
        { label: 'Pernyataan 5', isCorrect: true, analysis: 'Benar: kontribusi awal $m_2$ pada $I_z$ adalah $3(2^2) = 12\\text{ kg}\\cdot\\text{m}^2$ menjadi $0$.' },
      ],
      conclusion:
        'Pernyataan yang benar adalah 1, 3, dan 5. Penentuan jarak tegak lurus terhadap garis poros yang sebenarnya merupakan kunci utama analisis momen inersia 3 dimensi.',
      answerVerification: {
        dimensionCheck: '$[I] = [m][r]^2 = \\text{M}\\text{L}^2$.',
        unitCheck: 'Satuan $\\text{kg}\\cdot\\text{m}^2$ pada semua hasil.',
        reasonablenessCheck: 'Pemeriksaan via pusat massa ($M = 10\\text{ kg}$, $x_{\\text{pm}} = 0{,}8$, $y_{\\text{pm}} = 0{,}6$, $z_{\\text{pm}} = 1{,}0$): $I_{y,\\text{pm}} = 86 - 10(0{,}64+1) = 69{,}6$, lalu $I_{L_2} = 69{,}6 + 10(0{,}04+1) = 80{,}0\\text{ kg}\\cdot\\text{m}^2$. Cocok persis!',
        signAndGeometryCheck: 'Semua jarak kuadrat bernilai non-negatif dan simetris terhadap koordinat masing-masing.',
      },
    },
  },
  {
    id: 5,
    number: 5,
    title: 'Perbandingan Momen Inersia Benda Tegar',
    topicTag: 'Momen Inersia Benda Tegar',
    type: 'true-false',
    maxPoints: 10,
    diagramKind: 'q5-rigid-bodies',
    diagramCaption:
      'Tiga benda tegar homogen berjari-jari sama R = 0,50 m yang berotasi terhadap sumbu simetri melalui pusat massanya masing-masing.',
    stimulus:
      'Tiga buah benda tegar homogen berbentuk simetris memiliki jari-jari yang sama persis, yaitu $R = 0{,}50\\text{ m}$, dan masing-masing diputar terhadap sumbu simetrinya yang melalui pusat massa: (1) **silinder pejal** ($I_{\\text{pm}} = \\frac{1}{2}MR^2$) bermassa $M_s = 8{,}0\\text{ kg}$; (2) **cincin tipis** ($I_{\\text{pm}} = MR^2$) bermassa $M_c = 4{,}0\\text{ kg}$; dan (3) **bola pejal** ($I_{\\text{pm}} = \\frac{2}{5}MR^2$) bermassa $M_b = 10{,}0\\text{ kg}$.',
    questionPrompt:
      'Tentukan apakah masing-masing pernyataan berikut **BENAR** atau **SALAH** berdasarkan analisis fisis dan matematis benda tegar:',
    tfStatements: [
      {
        id: 'TF1',
        text: 'Momen inersia silinder pejal terhadap sumbu simetri pusat massanya bernilai tepat $1{,}0\\text{ kg}\\cdot\\text{m}^2$.',
        correct: true,
        reason: '$I_s = \\frac{1}{2}(8{,}0)(0{,}50)^2 = 4{,}0 \\times 0{,}25 = 1{,}0\\text{ kg}\\cdot\\text{m}^2$.',
      },
      {
        id: 'TF2',
        text: 'Karena massa cincin tipis hanya setengah dari massa silinder pejal pada jari-jari yang sama, momen inersia cincin tipis terhadap poros pusat massanya pasti lebih kecil daripada silinder pejal.',
        correct: false,
        reason: '$I_c = (4{,}0)(0{,}50)^2 = 1{,}0\\text{ kg}\\cdot\\text{m}^2$, tepat sama besar dengan silinder pejal karena seluruh massa cincin terkonsentrasi di tepi $r = R$.',
      },
      {
        id: 'TF3',
        text: 'Bola pejal bermassa $10{,}0\\text{ kg}$ memiliki momen inersia yang sama besar dengan cincin tipis bermassa $4{,}0\\text{ kg}$ pada jari-jari tersebut karena proporsi distribusi massa bola lebih banyak berada di dekat sumbu rotasi.',
        correct: true,
        reason: '$I_b = \\frac{2}{5}(10{,}0)(0{,}50)^2 = 4{,}0 \\times 0{,}25 = 1{,}0\\text{ kg}\\cdot\\text{m}^2 = I_c$. Koefisien bentuk $\\frac{2}{5} < 1$ mencerminkan massa yang lebih terkonsentrasi dekat poros.',
      },
      {
        id: 'TF4',
        text: 'Jika jari-jari silinder pejal diperbesar menjadi dua kali lipat ($1{,}0\\text{ m}$) dengan massa tetap $8{,}0\\text{ kg}$, maka momen inersianya terhadap sumbu simetri menjadi dua kali lipat ($2{,}0\\text{ kg}\\cdot\\text{m}^2$).',
        correct: false,
        reason: 'Karena $I \\propto R^2$, menggandakan jari-jari ($2R$) menyebabkan momen inersia meningkat $2^2 = 4$ kali lipat menjadi $4{,}0\\text{ kg}\\cdot\\text{m}^2$.',
      },
    ],
    explanation: {
      competencyIndicator:
        'Membandingkan momen inersia berbagai benda tegar homogen berdasarkan faktor distribusi massa ($k$) dan ketergantungan kuadratik terhadap jari-jari ($R^2$).',
      problemIdentification:
        'Menganalisis tiga benda tegar dengan massa berbeda dan geometri distribusi massa berbeda pada jari-jari yang sama, serta menguji pemahaman penskalaan $I \\propto R^2$.',
      theoreticalBasis:
        'Momen inersia benda tegar terhadap sumbu melalui pusat massanya ditulis dalam bentuk umum $I_{\\text{pm}} = k M R^2$, dengan $k$ adalah konstanta bentuk tak berdimensi yang menggambarkan seberapa jauh massa tersebar dari sumbu putar. Semakin besar porsi massa di dekat tepi luar, semakin besar nilai $k$: cincin tipis ($k=1$) $>$ silinder pejal ($k=1/2$) $>$ bola pejal ($k=2/5$).',
      knownData: [
        'Jari-jari ketiga benda sama: $R = 0{,}50\\text{ m}$.',
        'Silinder pejal: $M_s = 8{,}0\\text{ kg}$, $k_s = 1/2$.',
        'Cincin tipis: $M_c = 4{,}0\\text{ kg}$, $k_c = 1$.',
        'Bola pejal: $M_b = 10{,}0\\text{ kg}$, $k_b = 2/5$.',
      ],
      askedQuantity: 'Nilai kebenaran (Benar/Salah) empat pernyataan tentang benda tegar tersebut.',
      basicEquations: [
        '$$I_{\\text{silinder}} = \\frac{1}{2}M_s R^2, \\quad I_{\\text{cincin}} = M_c R^2, \\quad I_{\\text{bola}} = \\frac{2}{5}M_b R^2$$',
      ],
      physicsAnalysis:
        'Meskipun massa ketiga benda berturut-turut adalah $8\\text{ kg}$, $4\\text{ kg}$, dan $10\\text{ kg}$, hasil kali $k \\cdot M$ untuk ketiganya bernilai sama persis yaitu $4{,}0\\text{ kg}$! Akibatnya, pada jari-jari yang sama, ketiga benda memiliki inersia rotasi yang identik. Pada pernyataan ke-4, perubahan $R \\to 2R$ mempengaruhi $R^2$ sehingga faktor pengalinya adalah $4$, bukan $2$.',
      mathematicalSteps: [
        'Hitung momen inersia silinder pejal: $$I_s = \\frac{1}{2}(8{,}0)(0{,}50)^2 = 4{,}0 \\times 0{,}25 = 1{,}0\\text{ kg}\\cdot\\text{m}^2$$ (Pernyataan 1 **BENAR**).',
        'Hitung momen inersia cincin tipis: $$I_c = (1)(4{,}0)(0{,}50)^2 = 4{,}0 \\times 0{,}25 = 1{,}0\\text{ kg}\\cdot\\text{m}^2$$ Karena $I_c = I_s$, pernyataan bahwa $I_c < I_s$ keliru (Pernyataan 2 **SALAH**).',
        'Hitung momen inersia bola pejal: $$I_b = \\frac{2}{5}(10{,}0)(0{,}50)^2 = 4{,}0 \\times 0{,}25 = 1{,}0\\text{ kg}\\cdot\\text{m}^2$$ Nilai ini sama dengan $I_c$ karena massa bola yang lebih besar dikompensasi oleh distribusi massa yang lebih dekat ke pusat/sumbu (Pernyataan 3 **BENAR**).',
        'Uji penskalaan jari-jari silinder menjadi $R\' = 1{,}0\\text{ m}$: $$I_s\' = \\frac{1}{2}(8{,}0)(1{,}0)^2 = 4{,}0\\text{ kg}\\cdot\\text{m}^2 = 4 I_s$$ (Pernyataan 4 **SALAH**).',
      ],
      finalCalculationSummary: '1: BENAR, 2: SALAH, 3: BENAR, 4: SALAH',
      optionAnalyses: [
        { label: 'Pernyataan 1', isCorrect: true, analysis: 'Benar: $I_s = 1{,}0\\text{ kg}\\cdot\\text{m}^2$.' },
        { label: 'Pernyataan 2', isCorrect: false, analysis: 'Salah: $I_c = 1{,}0\\text{ kg}\\cdot\\text{m}^2 = I_s$, bukan lebih kecil.' },
        { label: 'Pernyataan 3', isCorrect: true, analysis: 'Benar: $I_b = 1{,}0\\text{ kg}\\cdot\\text{m}^2 = I_c$ akibat kompensasi faktor distribusi massa.' },
        { label: 'Pernyataan 4', isCorrect: false, analysis: 'Salah: karena $I \\propto R^2$, hasilnya menjadi $4{,}0\\text{ kg}\\cdot\\text{m}^2$ (4 kali lipat).' },
      ],
      conclusion:
        'Momen inersia tidak hanya ditentukan oleh massa total benda, tetapi sangat ditentukan oleh bagaimana massa tersebut terdistribusi relatif terhadap sumbu rotasi ($k$ dan $R^2$).',
      answerVerification: {
        dimensionCheck: '$[k M R^2] = \\text{M}\\text{L}^2$ karena $k$ tak berdimensi.',
        unitCheck: 'Satuan $\\text{kg}\\cdot\\text{m}^2$ konsisten.',
        reasonablenessCheck: 'Ketiga nilai $1{,}0\\text{ kg}\\cdot\\text{m}^2$ berasal dari $4{,}0 \\times 0{,}25$.',
        signAndGeometryCheck: 'Sumbu putar melalui pusat massa dan berimpit dengan sumbu simetri utama masing-masing benda.',
      },
    },
  },
  {
    id: 6,
    number: 6,
    title: 'Momen Inersia Bola Berongga pada Pusat Massa',
    topicTag: 'Momen Inersia Pusat Massa',
    type: 'numeric',
    maxPoints: 10,
    diagramKind: 'q6-hollow-sphere',
    diagramCaption:
      'Bola berongga tipis homogen berdiameter D = 1,2 m dan massa M = 6,0 kg berotasi terhadap poros pusat massanya.',
    stimulus:
      'Sebuah **bola berongga tipis homogen** (kulit bola tipis) bermassa $M = 6{,}0\\text{ kg}$ memiliki **diameter** $D = 1{,}2\\text{ m}$. Bola tersebut diputar terhadap sumbu rotasi yang tepat melalui pusat massanya ($I_{\\text{pm}} = \\frac{2}{3}MR^2$).',
    questionPrompt:
      'Hitunglah besar momen inersia bola berongga tersebut terhadap sumbu pusat massanya!',
    expectedNumeric: 1.44,
    tolerance: 0.02,
    unitLabel: 'kg·m²',
    numericPlaceholder: 'Contoh: 1.44',
    explanation: {
      competencyIndicator:
        'Menghitung momen inersia benda tegar simetris terhadap sumbu melalui pusat massanya dengan mengonversi parameter geometri (diameter ke jari-jari) secara tepat.',
      problemIdentification:
        'Menentukan momen inersia bola berongga terhadap sumbu pusat massa ketika data geometri yang diberikan adalah diameter ($D$), bukan jari-jari ($R$).',
      theoreticalBasis:
        'Pada kulit bola tipis berongga yang seluruh massanya tersebar merata di permukaan berjarak $R$ dari pusat, integrasi elemen massa menghasilkan momen inersia terhadap diameter yang melalui pusat massa sebesar $I_{\\text{pm}} = \\frac{2}{3}MR^2$. Nilai koefisien $\\frac{2}{3}$ lebih besar daripada bola pejal ($\\frac{2}{5}$) karena tidak ada massa di bagian dalam dekat pusat.',
      knownData: [
        'Bentuk benda: bola berongga tipis homogen ($k = 2/3$).',
        'Massa total $M = 6{,}0\\text{ kg}$.',
        'Diameter bola $D = 1{,}2\\text{ m}$.',
      ],
      askedQuantity: 'Momen inersia bola berongga terhadap pusat massanya ($I_{\\text{pm}}$).',
      basicEquations: [
        '$$R = \\frac{D}{2}$$',
        '$$I_{\\text{pm}} = \\frac{2}{3} M R^2$$',
      ],
      physicsAnalysis:
        'Langkah penting adalah mengonversi diameter menjadi jari-jari terlebih dahulu ($R = D/2 = 0{,}60\\text{ m}$), kemudian menerapkan rumus khusus bola berongga ($\\frac{2}{3}MR^2$). Kekeliruan memasukkan $D = 1{,}2\\text{ m}$ sebagai $R$ akan membuat nilai momen inersia membesar $4$ kali lipat.',
      mathematicalSteps: [
        'Tentukan jari-jari bola berongga: $$R = \\frac{D}{2} = \\frac{1{,}2}{2} = 0{,}60\\text{ m}$$',
        'Substitusikan nilai $M$ dan $R$ ke persamaan momen inersia bola berongga: $$I_{\\text{pm}} = \\frac{2}{3} (6{,}0) (0{,}60)^2$$',
        'Hitung bertahap: $$I_{\\text{pm}} = 4{,}0 \\times 0{,}36 = 1{,}44\\text{ kg}\\cdot\\text{m}^2$$',
      ],
      finalCalculationSummary: '1.44 kg·m²',
      optionAnalyses: [
        {
          label: 'Kunci Numerik',
          isCorrect: true,
          analysis: 'Nilai eksak adalah $1{,}44\\text{ kg}\\cdot\\text{m}^2$ (diterima pada rentang $1{,}42$ hingga $1{,}46$).',
        },
      ],
      conclusion:
        'Momen inersia bola berongga tipis terhadap sumbu yang melalui pusat massanya adalah $1{,}44\\text{ kg}\\cdot\\text{m}^2$.',
      answerVerification: {
        dimensionCheck: '$[I] = \\text{M}\\text{L}^2$.',
        unitCheck: 'Satuan $\\text{kg}\\cdot\\text{m}^2$ sesuai.',
        reasonablenessCheck: 'Jika dibandingkan dengan cincin bermassa dan berjari-jari sama ($6 \\times 0{,}36 = 2{,}16\\text{ kg}\\cdot\\text{m}^2$), nilai $1{,}44$ tepat berada di $2/3$-nya.',
        signAndGeometryCheck: 'Momen inersia selalu bernilai positif dan $R = 0{,}60\\text{ m}$ konsisten dengan diameter $1{,}2\\text{ m}$.',
      },
    },
  },
  {
    id: 7,
    number: 7,
    title: 'Teorema Sumbu Sejajar pada Batang Homogen',
    topicTag: 'Teorema Sumbu Sejajar',
    type: 'numeric',
    maxPoints: 10,
    diagramKind: 'q7-parallel-axis-rod',
    diagramCaption:
      'Batang homogen panjang L = 2,0 m dengan poros awal melalui pusat massa (PM) dan poros baru P yang bergeser sejajar sejauh d = 0,50 m.',
    stimulus:
      'Sebuah batang homogen bermassa $M = 3{,}0\\text{ kg}$ dan panjang $L = 2{,}0\\text{ m}$ mula-mula diputar terhadap sumbu yang tegak lurus batang dan melalui pusat massanya ($I_{\\text{pm}} = \\frac{1}{12}ML^2$). Selanjutnya, poros rotasi digeser sejajar ke titik $P$ yang berjarak $d = 0{,}50\\text{ m}$ dari pusat massa batang.',
    questionPrompt:
      'Tentukan momen inersia batang terhadap poros rotasi baru $P$ tersebut!',
    expectedNumeric: 1.75,
    tolerance: 0.02,
    unitLabel: 'kg·m²',
    numericPlaceholder: 'Contoh: 1.75',
    explanation: {
      competencyIndicator:
        'Menerapkan Teorema Sumbu Sejajar untuk menentukan momen inersia benda tegar ketika sumbu putar digeser sejajar sejauh d dari pusat massanya.',
      problemIdentification:
        'Menghitung momen inersia batang homogen pada poros yang tidak terletak di pusat massa maupun di ujung batang, melainkan pada jarak $d = 0{,}50\\text{ m}$ dari pusat massa.',
      theoreticalBasis:
        'Teorema Sumbu Sejajar (Parallel Axis Theorem) menyatakan bahwa momen inersia suatu benda tegar bermassa $M$ terhadap sembarang sumbu yang sejajar dengan sumbu melalui pusat massanya dan berjarak tegak lurus $d$ dari pusat massa adalah $I = I_{\\text{pm}} + M d^2$. Suku tambahan $Md^2$ selalu bernilai positif karena momen inersia terhadap pusat massa adalah nilai minimum di antara seluruh poros sejajar.',
      knownData: [
        'Massa batang $M = 3{,}0\\text{ kg}$.',
        'Panjang batang $L = 2{,}0\\text{ m}$.',
        'Jarak pergeseran sejajar dari pusat massa ke poros $P$: $d = 0{,}50\\text{ m}$.',
        'Momen inersia pusat massa batang: $I_{\\text{pm}} = \\frac{1}{12}ML^2$.',
      ],
      askedQuantity: 'Momen inersia batang terhadap poros baru $P$ ($I_P$).',
      basicEquations: [
        '$$I_{\\text{pm}} = \\frac{1}{12} M L^2$$',
        '$$I_P = I_{\\text{pm}} + M d^2$$',
      ],
      physicsAnalysis:
        'Karena poros baru $P$ sejajar dengan poros pusat massa batang dan berjarak $d = 0{,}50\\text{ m}$ (berada di tengah-tengah antara pusat massa dan salah satu ujung batang), kita cukup menjumlahkan $I_{\\text{pm}}$ batang dengan suku pergeseran $M d^2$.',
      mathematicalSteps: [
        'Hitung momen inersia batang terhadap pusat massanya: $$I_{\\text{pm}} = \\frac{1}{12}(3{,}0)(2{,}0)^2 = \\frac{12}{12} = 1{,}0\\text{ kg}\\cdot\\text{m}^2$$',
        'Hitung suku pergeseran Teorema Sumbu Sejajar: $$M d^2 = (3{,}0)(0{,}50)^2 = 3{,}0 \\times 0{,}25 = 0{,}75\\text{ kg}\\cdot\\text{m}^2$$',
        'Jumlahkan kedua suku untuk memperoleh $I_P$: $$I_P = 1{,}0 + 0{,}75 = 1{,}75\\text{ kg}\\cdot\\text{m}^2$$',
      ],
      finalCalculationSummary: '1.75 kg·m²',
      optionAnalyses: [
        {
          label: 'Kunci Numerik',
          isCorrect: true,
          analysis: 'Nilai eksak adalah $1{,}75\\text{ kg}\\cdot\\text{m}^2$ (diterima pada rentang $1{,}73$ hingga $1{,}77$).',
        },
      ],
      conclusion:
        'Momen inersia batang homogen terhadap poros sejajar pada jarak $0{,}50\\text{ m}$ dari pusat massanya adalah $1{,}75\\text{ kg}\\cdot\\text{m}^2$.',
      answerVerification: {
        dimensionCheck: 'Baik $\\frac{1}{12}ML^2$ maupun $Md^2$ memiliki dimensi $\\text{M}\\text{L}^2$.',
        unitCheck: 'Satuan $\\text{kg}\\cdot\\text{m}^2$.',
        reasonablenessCheck: 'Nilai $1{,}75$ berada di antara $I_{\\text{pm}} = 1{,}0$ dan $I_{\\text{ujung}} = \\frac{1}{3}(3)(2)^2 = 4{,}0\\text{ kg}\\cdot\\text{m}^2$, sangat wajar.',
        signAndGeometryCheck: 'Titik $P$ berjarak $0{,}50\\text{ m} < L/2 = 1{,}0\\text{ m}$, sehingga masih berada pada batang.',
      },
    },
  },
  {
    id: 8,
    number: 8,
    title: 'Momen Inersia Sistem Gabungan Batang dan Cakram',
    topicTag: 'Momen Inersia Sistem Gabungan',
    type: 'numeric',
    maxPoints: 10,
    diagramKind: 'q8-composite-rod-disc',
    diagramCaption:
      'Sistem gabungan batang homogen (panjang L = 1,5 m) berporos di ujung kiri O dan cakram pejal (R = 0,50 m) terpasang kaku di ujung kanan batang.',
    stimulus:
      'Suatu komponen mesin gabungan tersusun atas sebuah **batang homogen** bermassa $m_b = 4{,}0\\text{ kg}$ dan panjang $L = 1{,}5\\text{ m}$ yang salah satu ujungnya ($O$) menjadi poros rotasi tetap, serta sebuah **cakram pejal homogen** bermassa $m_c = 6{,}0\\text{ kg}$ dan jari-jari $R = 0{,}50\\text{ m}$ ($I_{\\text{pm,c}} = \\frac{1}{2}m_c R^2$). Cakram dipasang secara kaku di ujung batang lainnya sehingga pusat massa cakram berada tepat pada jarak $L = 1{,}5\\text{ m}$ dari poros $O$, dengan sumbu rotasi di $O$ sejajar terhadap sumbu simetri cakram (tegak lurus bidang cakram).',
    questionPrompt:
      'Hitunglah momen inersia total sistem gabungan tersebut terhadap poros $O$!',
    expectedNumeric: 17.25,
    tolerance: 0.03,
    unitLabel: 'kg·m²',
    numericPlaceholder: 'Contoh: 17.25',
    explanation: {
      competencyIndicator:
        'Menghitung momen inersia total sistem benda tegar gabungan dengan menerapkan superposisi momen inersia dan Teorema Sumbu Sejajar pada komponen yang pusat massanya tidak berada di poros.',
      problemIdentification:
        'Menentukan $I_{\\text{total}}$ dari sistem gabungan batang + cakram terhadap poros di ujung $O$, di mana pusat massa kedua benda tidak terletak pada poros $O$.',
      theoreticalBasis:
        'Karena momen inersia bersifat aditif terhadap suatu poros yang sama, momen inersia total sistem gabungan adalah $I_{\\text{total}} = I_1 + I_2 + \\dots$. Untuk setiap benda tegar yang poros rotasinya tidak melalui pusat massanya, wajib diterapkan Teorema Sumbu Sejajar $I_i = I_{\\text{pm}, i} + m_i d_i^2$ sebelum dijumlahkan.',
      knownData: [
        'Batang homogen: $m_b = 4{,}0\\text{ kg}$, $L = 1{,}5\\text{ m}$, berporos di salah satu ujungnya $O$ ($d_b = L/2 = 0{,}75\\text{ m}$).',
        'Cakram pejal: $m_c = 6{,}0\\text{ kg}$, $R = 0{,}50\\text{ m}$, pusat massanya berjarak $d_c = L = 1{,}5\\text{ m}$ dari poros $O$.',
      ],
      askedQuantity: 'Momen inersia total sistem gabungan terhadap poros $O$ ($I_{\\text{total}}$).',
      basicEquations: [
        '$$I_1 = \\frac{1}{3} m_b L^2$$',
        '$$I_2 = \\frac{1}{2} m_c R^2 + m_c d_c^2$$',
        '$$I_{\\text{total}} = I_1 + I_2$$',
      ],
      physicsAnalysis:
        'Perhatikan bahwa cakram pejal merupakan benda tegar berdimensi (bukan massa titik), sehingga kontribusinya tidak hanya $m_c L^2$ melainkan harus ditambah dengan momen inersia intrinsik terhadap pusat massanya ($\\frac{1}{2}m_c R^2$). Sementara untuk batang homogen yang berporos di ujungnya, momen inersianya adalah $\\frac{1}{3} m_b L^2$ (setara $\\frac{1}{12}m_b L^2 + m_b(L/2)^2$).',
      mathematicalSteps: [
        'Hitung momen inersia batang terhadap ujung $O$: $$I_1 = \\frac{1}{3}(4{,}0)(1{,}5)^2 = \\frac{1}{3}(4{,}0)(2{,}25) = 4{,}0 \\times 0{,}75 = 3{,}0\\text{ kg}\\cdot\\text{m}^2$$',
        'Hitung momen inersia cakram terhadap pusat massanya sendiri: $$I_{\\text{pm,c}} = \\frac{1}{2}(6{,}0)(0{,}50)^2 = 3{,}0 \\times 0{,}25 = 0{,}75\\text{ kg}\\cdot\\text{m}^2$$',
        'Terapkan Teorema Sumbu Sejajar untuk cakram dengan $d_c = 1{,}5\\text{ m}$: $$I_2 = I_{\\text{pm,c}} + m_c d_c^2 = 0{,}75 + (6{,}0)(1{,}5)^2 = 0{,}75 + 13{,}5 = 14{,}25\\text{ kg}\\cdot\\text{m}^2$$',
        'Jumlahkan seluruh momen inersia komponen: $$I_{\\text{total}} = I_1 + I_2 = 3{,}0 + 14{,}25 = 17{,}25\\text{ kg}\\cdot\\text{m}^2$$',
      ],
      finalCalculationSummary: '17.25 kg·m²',
      optionAnalyses: [
        {
          label: 'Kunci Numerik',
          isCorrect: true,
          analysis: 'Nilai eksak adalah $17{,}25\\text{ kg}\\cdot\\text{m}^2$ (diterima pada rentang $17{,}22$ hingga $17{,}28$).',
        },
      ],
      conclusion:
        'Momen inersia total sistem gabungan batang dan cakram pejal terhadap poros di ujung $O$ adalah $17{,}25\\text{ kg}\\cdot\\text{m}^2$.',
      answerVerification: {
        dimensionCheck: 'Seluruh komponen ($\\frac{1}{3}m_b L^2$, $\\frac{1}{2}m_c R^2$, dan $m_c d_c^2$) berdimensi $\\text{M}\\text{L}^2$.',
        unitCheck: 'Satuan $\\text{kg}\\cdot\\text{m}^2$.',
        reasonablenessCheck: 'Cakram bermassa $6\\text{ kg}$ di ujung $1{,}5\\text{ m}$ mendominasi total momen inersia ($14{,}25$ dari $17{,}25$).',
        signAndGeometryCheck: 'Sumbu di $O$ sejajar sumbu simetri cakram sehingga rumus $I_{\\text{pm,c}} = \\frac{1}{2}m_c R^2$ berlaku tepat.',
      },
    },
  },
  {
    id: 9,
    number: 9,
    title: 'Pelat Persegi Panjang dengan Poros di Titik Sudut',
    topicTag: 'Benda Tegar & Poros Bergeser',
    type: 'numeric',
    maxPoints: 10,
    diagramKind: 'q9-rectangular-plate-corner',
    diagramCaption:
      'Pelat persegi panjang homogen berukuran a = 2,0 m × b = 1,0 m dengan poros awal di pusat massa (PM) dan poros baru di titik sudut O.',
    stimulus:
      'Sebuah **pelat persegi panjang homogen** bermassa $M = 12\\text{ kg}$ memiliki panjang $a = 2{,}0\\text{ m}$ dan lebar $b = 1{,}0\\text{ m}$. Diketahui momen inersia pelat terhadap sumbu yang tegak lurus bidang pelat melalui pusat massanya adalah $I_{\\text{pm}} = \\frac{1}{12}M(a^2 + b^2)$. Pelat tersebut kemudian dipasang pada suatu poros rotasi baru yang tegak lurus bidang pelat dan menembus tepat di salah satu **titik sudutnya**.',
    questionPrompt:
      'Hitunglah momen inersia pelat persegi panjang tersebut terhadap poros di titik sudutnya!',
    expectedNumeric: 20,
    tolerance: 0.05,
    unitLabel: 'kg·m²',
    numericPlaceholder: 'Contoh: 20',
    explanation: {
      competencyIndicator:
        'Menggabungkan rumus momen inersia pelat bidang 2D dengan geometri jarak pergeseran pusat massa ke titik sudut menggunakan Teorema Sumbu Sejajar.',
      problemIdentification:
        'Menentukan momen inersia pelat persegi panjang ketika poros rotasi digeser secara diagonal dalam dua dimensi (horizontal dan vertikal) dari pusat massa ke salah satu sudut pelat.',
      theoreticalBasis:
        'Pusat massa pelat persegi panjang homogen berukuran $a \\times b$ terletak tepat di titik potong kedua diagonalnya, yakni pada koordinat $(a/2,\\; b/2)$ relatif terhadap salah satu titik sudut. Oleh karena itu, kuadrat jarak pergeseran poros dari pusat massa ke titik sudut memenuhi Teorema Pythagoras: $d^2 = (a/2)^2 + (b/2)^2 = \\frac{a^2 + b^2}{4}$.',
      knownData: [
        'Massa pelat $M = 12\\text{ kg}$.',
        'Panjang pelat $a = 2{,}0\\text{ m}$, lebar pelat $b = 1{,}0\\text{ m}$.',
        '$I_{\\text{pm}} = \\frac{1}{12}M(a^2 + b^2)$.',
      ],
      askedQuantity: 'Momen inersia pelat terhadap poros di titik sudut ($I_{\\text{sudut}}$).',
      basicEquations: [
        '$$d^2 = \\left(\\frac{a}{2}\\right)^2 + \\left(\\frac{b}{2}\\right)^2$$',
        '$$I_{\\text{sudut}} = I_{\\text{pm}} + M d^2$$',
      ],
      physicsAnalysis:
        'Banyak pelajar keliru mengambil jarak $d$ hanya sebagai $a/2$ atau $b/2$. Padahal, pergeseran dari pusat pelat ke titik sudut bersifat dua dimensi mengikuti setengah panjang diagonal pelat.',
      mathematicalSteps: [
        'Hitung momen inersia pelat terhadap pusat massanya: $$I_{\\text{pm}} = \\frac{1}{12}(12)\\left(2{,}0^2 + 1{,}0^2\\right) = 1 \\times (4 + 1) = 5{,}0\\text{ kg}\\cdot\\text{m}^2$$',
        'Hitung kuadrat jarak pusat massa ke titik sudut pelat: $$d^2 = (1{,}0)^2 + (0{,}5)^2 = 1{,}0 + 0{,}25 = 1{,}25\\text{ m}^2$$',
        'Hitung suku Teorema Sumbu Sejajar: $$M d^2 = 12 \\times 1{,}25 = 15{,}0\\text{ kg}\\cdot\\text{m}^2$$',
        'Jumlahkan untuk memperoleh $I_{\\text{sudut}}$: $$I_{\\text{sudut}} = 5{,}0 + 15{,}0 = 20\\text{ kg}\\cdot\\text{m}^2$$',
      ],
      finalCalculationSummary: '20 kg·m²',
      optionAnalyses: [
        {
          label: 'Kunci Numerik',
          isCorrect: true,
          analysis: 'Nilai eksak adalah $20\\text{ kg}\\cdot\\text{m}^2$ (diterima pada rentang $19{,}95$ hingga $20{,}05$).',
        },
      ],
      conclusion:
        'Momen inersia pelat persegi panjang terhadap sumbu tegak lurus bidang di salah satu titik sudutnya adalah $20\\text{ kg}\\cdot\\text{m}^2$.',
      answerVerification: {
        dimensionCheck: 'Dimensi $[M][a^2+b^2] = \\text{M}\\text{L}^2$.',
        unitCheck: 'Satuan $\\text{kg}\\cdot\\text{m}^2$.',
        reasonablenessCheck: 'Pemeriksaan rumus analitik langsung $I_{\\text{sudut}} = \\frac{1}{3}M(a^2+b^2) = \\frac{1}{3}(12)(4+1) = 20\\text{ kg}\\cdot\\text{m}^2$, tepat sama!',
        signAndGeometryCheck: 'Sumbu tegak lurus bidang pelat sehingga kedua dimensi $a$ dan $b$ ikut berkontribusi.',
      },
    },
  },
  {
    id: 10,
    number: 10,
    title: 'Sintesis dan Perubahan Momen Inersia Sistem Konfigurasi',
    topicTag: 'Analisis & Kesimpulan Komprehensif',
    type: 'numeric',
    maxPoints: 10,
    diagramKind: 'q10-combined-rod-particles',
    diagramCaption:
      'Perbandingan Konfigurasi I (poros di tengah O) dan Konfigurasi II (poros digeser ke ujung A serta partikel kedua digeser ke jarak r₂ = 1,5 m dari A).',
    stimulus:
      'Sebuah batang homogen $AB$ bermassa $m_b = 6{,}0\\text{ kg}$ dan panjang $L = 2{,}0\\text{ m}$ membawa dua bola kecil (dianggap partikel titik) bermassa sama $m_p = 1{,}0\\text{ kg}$. Pada **Konfigurasi I**, poros rotasi terletak tepat di titik tengah batang ($O$, pusat massa batang) dan kedua partikel titik berada tepat di ujung $A$ dan ujung $B$ (masing-masing berjarak $1{,}0\\text{ m}$ dari $O$). Selanjutnya pada **Konfigurasi II**, poros rotasi digeser ke ujung $A$ (sehingga partikel pertama di $A$ tepat berada pada poros), sedangkan partikel kedua digeser mendekat hingga berjarak $r_2 = 1{,}5\\text{ m}$ dari poros $A$.',
    questionPrompt:
      'Tentukan besar selisih perubahan momen inersia sistem dari Konfigurasi I ke Konfigurasi II ($\\Delta I = I_{\\text{II}} - I_{\\text{I}}$)!',
    expectedNumeric: 6.25,
    tolerance: 0.02,
    unitLabel: 'kg·m²',
    numericPlaceholder: 'Contoh: 6.25',
    explanation: {
      competencyIndicator:
        'Mengintegrasikan konsep momen inersia benda diskrit, benda tegar, teorema sumbu sejajar, dan sistem gabungan untuk mengevaluasi perubahan inersia antar dua konfigurasi.',
      problemIdentification:
        'Menghitung momen inersia total pada dua konfigurasi berbeda ($I_{\\text{I}}$ dan $I_{\\text{II}}$), kemudian menentukan selisihnya ($\\Delta I = I_{\\text{II}} - I_{\\text{I}}$) untuk menyimpulkan efek bersih pergeseran poros terhadap pergeseran massa partikel.',
      theoreticalBasis:
        'Pada sistem gabungan benda tegar dan partikel titik, momen inersia total adalah penjumlahan $I_{\\text{batang}} + \\sum m_i r_i^2$. Ketika poros dipindahkan dari pusat massa batang ke ujung $A$ ($d = L/2$), momen inersia batang bertambah sebesar $m_b(L/2)^2$ sesuai Teorema Sumbu Sejajar, sementara kontribusi setiap partikel mengikuti kuadrat jarak barunya terhadap poros baru $A$.',
      knownData: [
        'Batang homogen: $m_b = 6{,}0\\text{ kg}$, $L = 2{,}0\\text{ m}$ ($I_{\\text{pm}} = \\frac{1}{12}m_b L^2$).',
        'Dua partikel titik: $m_{p1} = m_{p2} = 1{,}0\\text{ kg}$.',
        'Konfigurasi I (poros di tengah $O$): jarak kedua partikel $r_{1,\\text{I}} = r_{2,\\text{I}} = 1{,}0\\text{ m}$.',
        'Konfigurasi II (poros di ujung $A$): jarak pergeseran batang $d = 1{,}0\\text{ m}$; jarak partikel di $A$ adalah $0\\text{ m}$; jarak partikel kedua dari $A$ adalah $r_2 = 1{,}5\\text{ m}$.',
      ],
      askedQuantity: 'Selisih momen inersia $\\Delta I = I_{\\text{II}} - I_{\\text{I}}$.',
      basicEquations: [
        '$$I_{\\text{I}} = \\frac{1}{12} m_b L^2 + m_{p1} r_{1,\\text{I}}^2 + m_{p2} r_{2,\\text{I}}^2$$',
        '$$I_{\\text{II}} = \\left(\\frac{1}{12} m_b L^2 + m_b d^2\\right) + m_{p1}(0)^2 + m_{p2} r_2^2$$',
        '$$\\Delta I = I_{\\text{II}} - I_{\\text{I}}$$',
      ],
      physicsAnalysis:
        'Secara intuitif, menaruh satu partikel di poros (nol kontribusi) dan menarik partikel kedua lebih dekat ke pusat batang cenderung menurunkan inersia; namun memindahkan poros batang bermassa $6\\text{ kg}$ dari tengah ke ujung menghasilkan lonjakan $m_b d^2 = 6{,}0\\text{ kg}\\cdot\\text{m}^2$ yang jauh lebih dominan. Hasil akhir $\\Delta I$ akan tetap bernilai positif besar.',
      mathematicalSteps: [
        'Hitung momen inersia Konfigurasi I (poros di tengah $O$): $$I_{b,\\text{I}} = \\frac{1}{12}(6{,}0)(2{,}0)^2 = 2{,}0\\text{ kg}\\cdot\\text{m}^2$$ $$I_{p,\\text{I}} = (1{,}0)(1{,}0)^2 + (1{,}0)(1{,}0)^2 = 2{,}0\\text{ kg}\\cdot\\text{m}^2$$ $$I_{\\text{I}} = 2{,}0 + 2{,}0 = 4{,}0\\text{ kg}\\cdot\\text{m}^2$$',
        'Hitung momen inersia Konfigurasi II (poros di ujung $A$, $d = 1{,}0\\text{ m}$): $$I_{b,\\text{II}} = I_{\\text{pm}} + m_b d^2 = 2{,}0 + (6{,}0)(1{,}0)^2 = 8{,}0\\text{ kg}\\cdot\\text{m}^2$$ $$I_{p,\\text{II}} = (1{,}0)(0)^2 + (1{,}0)(1{,}5)^2 = 0 + 2{,}25 = 2{,}25\\text{ kg}\\cdot\\text{m}^2$$ $$I_{\\text{II}} = 8{,}0 + 2{,}25 = 10{,}25\\text{ kg}\\cdot\\text{m}^2$$',
        'Hitung selisih momen inersia: $$\\Delta I = I_{\\text{II}} - I_{\\text{I}} = 10{,}25 - 4{,}0 = 6{,}25\\text{ kg}\\cdot\\text{m}^2$$',
      ],
      finalCalculationSummary: '6.25 kg·m²',
      optionAnalyses: [
        {
          label: 'Kunci Numerik',
          isCorrect: true,
          analysis: 'Nilai eksak adalah $6{,}25\\text{ kg}\\cdot\\text{m}^2$ (diterima pada rentang $6{,}23$ hingga $6{,}27$).',
        },
      ],
      conclusion:
        'Perubahan momen inersia dari Konfigurasi I ke Konfigurasi II adalah $+6{,}25\\text{ kg}\\cdot\\text{m}^2$. Pergeseran poros batang bermassa besar ke ujung mendominasi peningkatan kelembaman rotasi sistem secara keseluruhan.',
      answerVerification: {
        dimensionCheck: 'Seluruh suku berdimensi $\\text{M}\\text{L}^2$.',
        unitCheck: 'Satuan $\\text{kg}\\cdot\\text{m}^2$.',
        reasonablenessCheck: 'Pemeriksaan batang di ujung: $\\frac{1}{3}(6{,}0)(2{,}0)^2 = 8{,}0\\text{ kg}\\cdot\\text{m}^2$, cocok dengan Teorema Sumbu Sejajar $2{,}0 + 6{,}0 = 8{,}0$.',
        signAndGeometryCheck: 'Karena $I_{\\text{II}} > I_{\\text{I}}$, tanda $\\Delta I = +6{,}25\\text{ kg}\\cdot\\text{m}^2$ konsisten positif.',
      },
    },
  },
];
