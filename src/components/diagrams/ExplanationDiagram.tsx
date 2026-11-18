import React from 'react';
import type { DiagramKind } from '../../types/quiz';

interface ExplanationDiagramProps {
  kind: DiagramKind;
}

const TEAL = '#0F766E';
const RED = '#DC2626';
const BLUE = '#0284C7';
const AMBER = '#B45309';
const SLATE = '#0F172A';
const MUTED = '#64748B';

/**
 * Free Body Diagram (FBD) dan Diagram Analisis Geometris khusus Pembahasan Guru.
 * Menampilkan penguraian komponen gaya, lengan momen tegak lurus, arah rotasi,
 * serta jarak pergeseran sumbu sejajar d secara ilmiah.
 */
export const ExplanationDiagram: React.FC<ExplanationDiagramProps> = ({ kind }) => {
  return (
    <div className="rounded-xl border border-teal-200 bg-teal-50/30 p-3 sm:p-4">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-xs font-semibold text-teal-900">
          Free Body Diagram &amp; Diagram Analisis Fisika
        </span>
        <span className="text-[11px] text-teal-700">Analisis Vektor &amp; Lengan Momen</span>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-3 flex justify-center">
        {renderExplanationSvg(kind)}
      </div>
    </div>
  );
};

function renderExplanationSvg(kind: DiagramKind) {
  switch (kind) {
    case 'q1-rod-torque':
      return (
        <svg viewBox="0 0 600 280" className="w-full max-w-[600px] h-auto" role="img" aria-label="FBD Soal 1">
          <defs>
            <marker id="ex-red" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,1 L7,3.5 L0,6 Z" fill={RED} />
            </marker>
            <marker id="ex-teal" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,1 L7,3.5 L0,6 Z" fill={TEAL} />
            </marker>
            <marker id="ex-blue" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,1 L7,3.5 L0,6 Z" fill={BLUE} />
            </marker>
          </defs>
          {/* Batang */}
          <rect x="80" y="140" width="440" height="10" rx="2" fill="#E2E8F0" stroke={SLATE} strokeWidth="1.5" />
          <circle cx="190" cy="145" r="5" fill={TEAL} />
          <text x="172" y="132" fontSize="11.5" fontWeight="700" fill={TEAL}>Poros P</text>

          {/* F1 di A -> CW (-) */}
          <line x1="80" y1="140" x2="80" y2="68" stroke={RED} strokeWidth="2.2" markerEnd="url(#ex-red)" />
          <text x="24" y="62" fontSize="11" fontWeight="700" fill={RED}>F₁=20 N (CW: -20)</text>
          <path d="M 105 90 A 30 30 0 0 1 135 110" fill="none" stroke={RED} strokeWidth="1.5" markerEnd="url(#ex-red)" />

          {/* F3 di P -> 0 */}
          <line x1="190" y1="150" x2="190" y2="215" stroke={MUTED} strokeWidth="2" markerEnd="url(#ex-blue)" />
          <text x="150" y="230" fontSize="11" fontWeight="600" fill={MUTED}>F₃=25 N (r=0 → τ=0)</text>

          {/* F2 di C -> komponen F2 sin 37 */}
          <line x1="300" y1="150" x2="358" y2="194" stroke={RED} strokeWidth="1.6" strokeDasharray="3 3" />
          <line x1="300" y1="150" x2="300" y2="194" stroke={RED} strokeWidth="2.4" markerEnd="url(#ex-red)" />
          <line x1="300" y1="150" x2="358" y2="150" stroke={MUTED} strokeWidth="1.3" strokeDasharray="3 3" />
          <text x="262" y="212" fontSize="11" fontWeight="700" fill={RED}>F₂ sin37° = 9 N (CW: -9)</text>

          {/* F4 di B -> komponen F4 sin 30 */}
          <line x1="520" y1="140" x2="435" y2="90" stroke={TEAL} strokeWidth="1.6" strokeDasharray="3 3" />
          <line x1="520" y1="140" x2="520" y2="88" stroke={TEAL} strokeWidth="2.4" markerEnd="url(#ex-teal)" />
          <text x="415" y="76" fontSize="11" fontWeight="700" fill={TEAL}>F₄ sin30° = 15 N (CCW: +45)</text>
          <path d="M 480 112 A 30 30 0 0 0 462 88" fill="none" stroke={TEAL} strokeWidth="1.6" markerEnd="url(#ex-teal)" />

          {/* Lengan momen dari P */}
          <text x="122" y="264" fontSize="11.5" fontWeight="700" fill={SLATE}>
            r₁ = 1,0 m (kiri P) · r₂ = 1,0 m (kanan P) · r₄ = 3,0 m (kanan P)
          </text>
        </svg>
      );

    case 'q2-square-torque':
      return (
        <svg viewBox="0 0 540 280" className="w-full max-w-[540px] h-auto" role="img" aria-label="FBD Soal 2">
          <defs>
            <marker id="ex2-teal" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,1 L7,3.5 L0,6 Z" fill={TEAL} />
            </marker>
            <marker id="ex2-red" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,1 L7,3.5 L0,6 Z" fill={RED} />
            </marker>
          </defs>
          <rect x="150" y="75" width="150" height="150" fill="#F8FAFC" stroke={SLATE} strokeWidth="2" />
          <line x1="150" y1="225" x2="300" y2="75" stroke={TEAL} strokeWidth="1.4" strokeDasharray="4 3" />
          <text x="200" y="168" fontSize="11" fontWeight="700" fill={TEAL}>AC = 2√2 m</text>
          <circle cx="150" cy="225" r="6" fill={TEAL} />
          <text x="115" y="242" fontSize="11.5" fontWeight="700" fill={TEAL}>Poros A</text>

          {/* F1 di B */}
          <line x1="300" y1="225" x2="300" y2="155" stroke={TEAL} strokeWidth="2.2" markerEnd="url(#ex2-teal)" />
          <text x="308" y="175" fontSize="11" fontWeight="700" fill={TEAL}>F₁=10 N (+20)</text>

          {/* F2 di D */}
          <line x1="150" y1="75" x2="225" y2="75" stroke={RED} strokeWidth="2.2" markerEnd="url(#ex2-red)" />
          <text x="148" y="64" fontSize="11" fontWeight="700" fill={RED}>F₂=20 N (-40)</text>

          {/* F3 di C diuraikan */}
          <line x1="300" y1="75" x2="245" y2="75" stroke={TEAL} strokeWidth="2.2" markerEnd="url(#ex2-teal)" />
          <line x1="300" y1="75" x2="300" y2="20" stroke={TEAL} strokeWidth="2.2" markerEnd="url(#ex2-teal)" />
          <line x1="300" y1="75" x2="248" y2="23" stroke={AMBER} strokeWidth="1.6" strokeDasharray="3 3" />
          <text x="308" y="34" fontSize="11" fontWeight="700" fill={TEAL}>F₃ᵧ=15 N (+30)</text>
          <text x="195" y="94" fontSize="11" fontWeight="700" fill={TEAL}>F₃ₓ=15 N (+30)</text>

          {/* F4 di B */}
          <line x1="300" y1="225" x2="380" y2="225" stroke={MUTED} strokeWidth="2" markerEnd="url(#ex2-red)" />
          <text x="310" y="242" fontSize="11" fontWeight="600" fill={MUTED}>F₄=25 N (r⊥=0 → τ=0)</text>
        </svg>
      );

    case 'q3-wrench-context':
      return (
        <svg viewBox="0 0 540 200" className="w-full max-w-[540px] h-auto" role="img" aria-label="FBD Kunci Pas">
          <defs>
            <marker id="ex3-teal" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,1 L7,3.5 L0,6 Z" fill={TEAL} />
            </marker>
            <marker id="ex3-red" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,1 L7,3.5 L0,6 Z" fill={RED} />
            </marker>
          </defs>
          <line x1="90" y1="100" x2="430" y2="100" stroke={SLATE} strokeWidth="6" strokeLinecap="round" />
          <circle cx="90" cy="100" r="8" fill={TEAL} />
          <text x="72" y="82" fontSize="11.5" fontWeight="700" fill={TEAL}>Poros O</text>
          <circle cx="270" cy="100" r="4.5" fill={BLUE} />
          <text x="255" y="122" fontSize="11" fontWeight="700" fill={BLUE}>Q (0,30 m)</text>
          <circle cx="430" cy="100" r="4.5" fill={RED} />
          <text x="415" y="122" fontSize="11" fontWeight="700" fill={RED}>P (0,50 m)</text>

          {/* Gaya miring di P (53 deg) */}
          <line x1="430" y1="100" x2="430" y2="165" stroke={RED} strokeWidth="2.2" markerEnd="url(#ex3-red)" />
          <text x="360" y="182" fontSize="11" fontWeight="700" fill={RED}>F sin 53° = 48 N → τ = 24 N·m (CW)</text>

          {/* Gaya berlawanan di Q untuk S3 */}
          <line x1="270" y1="100" x2="270" y2="42" stroke={TEAL} strokeWidth="2.2" markerEnd="url(#ex3-teal)" />
          <text x="175" y="34" fontSize="11" fontWeight="700" fill={TEAL}>F sin 30° = 20 N → τ = +6 N·m (CCW)</text>
        </svg>
      );

    case 'q4-3d-particles':
      return (
        <svg viewBox="0 0 540 240" className="w-full max-w-[540px] h-auto" role="img" aria-label="Diagram proyeksi jarak tegak lurus 3D">
          {/* Proyeksi bidang YZ untuk analisis sumbu X dan L1 */}
          <line x1="60" y1="180" x2="240" y2="180" stroke={SLATE} strokeWidth="1.5" />
          <line x1="110" y1="210" x2="110" y2="30" stroke={SLATE} strokeWidth="1.5" />
          <text x="242" y="184" fontSize="11.5" fontWeight="700" fill={SLATE}>z (m)</text>
          <text x="102" y="22" fontSize="11.5" fontWeight="700" fill={SLATE}>y (m)</text>
          <text x="48" y="22" fontSize="11.5" fontWeight="700" fill={TEAL}>Proyeksi Bidang YZ (Poros ⊥ Bidang)</text>

          {/* Sumbu X di (0,0) -> x=110, y=180 */}
          <circle cx="110" cy="180" r="6" fill={RED} />
          <text x="72" y="198" fontSize="11" fontWeight="700" fill={RED}>Sumbu X (0,0)</text>

          {/* Poros L1 di (y=0, z=2) -> x=170, y=180 */}
          <circle cx="170" cy="180" r="6" fill={AMBER} />
          <text x="155" y="198" fontSize="11" fontWeight="700" fill={AMBER}>L₁ (0,2)</text>

          {/* Pusat massa CM (y=0.6, z=1.0) -> x=140, y=162 */}
          <circle cx="140" cy="162" r="5" fill={TEAL} />
          <line x1="110" y1="180" x2="140" y2="162" stroke={TEAL} strokeWidth="1.4" strokeDasharray="3 2" />
          <line x1="170" y1="180" x2="140" y2="162" stroke={TEAL} strokeWidth="1.4" strokeDasharray="3 2" />
          <text x="122" y="148" fontSize="10.5" fontWeight="700" fill={TEAL}>PM (y=0,6; z=1,0)</text>

          {/* Penjelasan ringkas simetri */}
          <rect x="285" y="42" width="235" height="150" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
          <text x="298" y="68" fontSize="11.5" fontWeight="700" fill={SLATE}>Jarak ke proyeksi PM:</text>
          <text x="298" y="92" fontSize="11" fill={SLATE}>d²(X → PM) = 0,6² + 1,0² = 1,36 m²</text>
          <text x="298" y="114" fontSize="11" fill={SLATE}>d²(L₁ → PM) = 0,6² + (2-1,0)² = 1,36 m²</text>
          <text x="298" y="142" fontSize="11" fontWeight="700" fill={TEAL}>Karena jarak ke PM sama,</text>
          <text x="298" y="160" fontSize="11" fontWeight="700" fill={TEAL}>maka I_L1 = I_x = 92 kg·m²!</text>
        </svg>
      );

    case 'q5-rigid-bodies':
      return (
        <svg viewBox="0 0 540 160" className="w-full max-w-[540px] h-auto" role="img" aria-label="Perbandingan faktor k benda tegar">
          <rect x="20" y="20" width="150" height="115" rx="8" fill="#F0FDFA" stroke={TEAL} />
          <text x="42" y="46" fontSize="12" fontWeight="700" fill={SLATE}>Silinder Pejal</text>
          <text x="48" y="72" fontSize="11.5" fill={TEAL}>I = (1/2) M R²</text>
          <text x="36" y="96" fontSize="11" fill={MUTED}>M = 8,0 kg, R = 0,5 m</text>
          <text x="48" y="118" fontSize="12" fontWeight="700" fill={SLATE}>I = 1,0 kg·m²</text>

          <rect x="195" y="20" width="150" height="115" rx="8" fill="#F0FDFA" stroke={TEAL} />
          <text x="225" y="46" fontSize="12" fontWeight="700" fill={SLATE}>Cincin Tipis</text>
          <text x="226" y="72" fontSize="11.5" fill={TEAL}>I = (1) M R²</text>
          <text x="211" y="96" fontSize="11" fill={MUTED}>M = 4,0 kg, R = 0,5 m</text>
          <text x="223" y="118" fontSize="12" fontWeight="700" fill={SLATE}>I = 1,0 kg·m²</text>

          <rect x="370" y="20" width="150" height="115" rx="8" fill="#F0FDFA" stroke={TEAL} />
          <text x="405" y="46" fontSize="12" fontWeight="700" fill={SLATE}>Bola Pejal</text>
          <text x="398" y="72" fontSize="11.5" fill={TEAL}>I = (2/5) M R²</text>
          <text x="383" y="96" fontSize="11" fill={MUTED}>M = 10,0 kg, R = 0,5 m</text>
          <text x="398" y="118" fontSize="12" fontWeight="700" fill={SLATE}>I = 1,0 kg·m²</text>
        </svg>
      );

    case 'q6-hollow-sphere':
      return (
        <svg viewBox="0 0 460 190" className="w-full max-w-[460px] h-auto" role="img" aria-label="Diagram jari-jari bola berongga">
          <line x1="160" y1="15" x2="160" y2="175" stroke={TEAL} strokeWidth="2" strokeDasharray="5 3" />
          <circle cx="160" cy="95" r="60" fill="#CCFBF1" stroke={TEAL} strokeWidth="2.5" />
          <circle cx="160" cy="95" r="50" fill="#FFFFFF" stroke={TEAL} strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="160" y1="95" x2="220" y2="95" stroke={RED} strokeWidth="2.2" />
          <circle cx="160" cy="95" r="4" fill={SLATE} />
          <text x="168" y="88" fontSize="11.5" fontWeight="700" fill={RED}>R = D/2 = 0,60 m</text>
          <text x="255" y="82" fontSize="12" fontWeight="700" fill={SLATE}>I_pm = (2/3) M R²</text>
          <text x="255" y="106" fontSize="11.5" fill={TEAL}>= (2/3)(6,0)(0,60)²</text>
          <text x="255" y="128" fontSize="12" fontWeight="700" fill={TEAL}>= 1,44 kg·m²</text>
        </svg>
      );

    case 'q7-parallel-axis-rod':
      return (
        <svg viewBox="0 0 500 185" className="w-full max-w-[500px] h-auto" role="img" aria-label="Diagram Teorema Sumbu Sejajar Batang">
          <rect x="70" y="85" width="320" height="16" rx="3" fill="#CCFBF1" stroke={TEAL} strokeWidth="2" />
          <line x1="230" y1="22" x2="230" y2="150" stroke={SLATE} strokeWidth="2" strokeDasharray="4 3" />
          <text x="180" y="18" fontSize="11" fontWeight="700" fill={SLATE}>Poros PM (I_pm = 1,0)</text>
          <line x1="310" y1="22" x2="310" y2="150" stroke={RED} strokeWidth="2" />
          <text x="295" y="18" fontSize="11" fontWeight="700" fill={RED}>Poros P (I_P = 1,75)</text>
          <line x1="230" y1="55" x2="310" y2="55" stroke={AMBER} strokeWidth="2" />
          <text x="236" y="48" fontSize="11" fontWeight="700" fill={AMBER}>d = 0,50 m</text>
          <text x="140" y="170" fontSize="11.5" fontWeight="700" fill={TEAL}>
            I_P = I_pm + Md² = 1,0 + (3,0)(0,50)² = 1,75 kg·m²
          </text>
        </svg>
      );

    case 'q8-composite-rod-disc':
      return (
        <svg viewBox="0 0 540 210" className="w-full max-w-[540px] h-auto" role="img" aria-label="Diagram Sumbu Sejajar Sistem Gabungan">
          <circle cx="350" cy="95" r="72" fill="#CCFBF1" stroke={TEAL} strokeWidth="2" />
          <rect x="100" y="89" width="250" height="12" fill="#E2E8F0" stroke={SLATE} strokeWidth="1.6" />
          <circle cx="100" cy="95" r="7" fill={RED} />
          <circle cx="225" cy="95" r="4" fill={BLUE} />
          <circle cx="350" cy="95" r="4" fill={TEAL} />
          <text x="80" y="76" fontSize="11" fontWeight="700" fill={RED}>Poros O</text>
          <text x="198" y="76" fontSize="11" fontWeight="700" fill={BLUE}>PM Batang</text>
          <text x="322" y="76" fontSize="11" fontWeight="700" fill={TEAL}>PM Cakram</text>
          <line x1="100" y1="130" x2="225" y2="130" stroke={BLUE} strokeWidth="1.5" />
          <text x="122" y="146" fontSize="10.5" fontWeight="600" fill={BLUE}>d_b = 0,75 m</text>
          <line x1="100" y1="162" x2="350" y2="162" stroke={TEAL} strokeWidth="1.5" />
          <text x="180" y="178" fontSize="10.5" fontWeight="700" fill={TEAL}>d_c = L = 1,5 m (I_2 = ½m_c R² + m_c d_c²)</text>
        </svg>
      );

    case 'q9-rectangular-plate-corner':
      return (
        <svg viewBox="0 0 460 210" className="w-full max-w-[460px] h-auto" role="img" aria-label="Diagram Pythagoras Pergeseran Sudut Pelat">
          <rect x="90" y="35" width="240" height="120" fill="#F0FDFA" stroke={TEAL} strokeWidth="2" />
          <circle cx="90" cy="155" r="7" fill={RED} />
          <circle cx="210" cy="95" r="5" fill={SLATE} />
          <line x1="90" y1="155" x2="210" y2="95" stroke={AMBER} strokeWidth="2.4" />
          <line x1="90" y1="155" x2="210" y2="155" stroke={BLUE} strokeWidth="2" strokeDasharray="4 3" />
          <line x1="210" y1="155" x2="210" y2="95" stroke={BLUE} strokeWidth="2" strokeDasharray="4 3" />
          <text x="122" y="170" fontSize="11" fontWeight="700" fill={BLUE}>a/2 = 1,0 m</text>
          <text x="218" y="130" fontSize="11" fontWeight="700" fill={BLUE}>b/2 = 0,5 m</text>
          <text x="115" y="114" fontSize="11" fontWeight="700" fill={AMBER}>d² = 1,25 m²</text>
          <text x="115" y="196" fontSize="11.5" fontWeight="700" fill={TEAL}>I_sudut = 5,0 + 12(1,25) = 20 kg·m²</text>
        </svg>
      );

    case 'q10-combined-rod-particles':
      return (
        <svg viewBox="0 0 520 190" className="w-full max-w-[520px] h-auto" role="img" aria-label="Ringkasan Pergeseran Konfigurasi I ke II">
          <rect x="20" y="20" width="225" height="145" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
          <text x="34" y="44" fontSize="12" fontWeight="700" fill={TEAL}>Konfigurasi I (Poros Tengah)</text>
          <text x="34" y="70" fontSize="11" fill={SLATE}>I_batang = 1/12 (6)(2)² = 2,0</text>
          <text x="34" y="92" fontSize="11" fill={SLATE}>I_partikel = 1(1)² + 1(1)² = 2,0</text>
          <text x="34" y="122" fontSize="12" fontWeight="700" fill={TEAL}>I_I = 4,0 kg·m²</text>

          <rect x="275" y="20" width="225" height="145" rx="8" fill="#FFF7ED" stroke="#FDBA74" />
          <text x="289" y="44" fontSize="12" fontWeight="700" fill={RED}>Konfigurasi II (Poros Ujung A)</text>
          <text x="289" y="70" fontSize="11" fill={SLATE}>I_batang = 2,0 + 6(1)² = 8,0</text>
          <text x="289" y="92" fontSize="11" fill={SLATE}>I_partikel = 0 + 1(1,5)² = 2,25</text>
          <text x="289" y="122" fontSize="12" fontWeight="700" fill={RED}>I_II = 10,25 kg·m²</text>
          <text x="289" y="146" fontSize="11.5" fontWeight="700" fill={AMBER}>ΔI = 10,25 - 4,0 = 6,25 kg·m²</text>
        </svg>
      );

    default:
      return null;
  }
}
