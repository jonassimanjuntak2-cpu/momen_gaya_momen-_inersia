import React from 'react';
import type { DiagramKind } from '../../types/quiz';

interface StimulusDiagramProps {
  kind: DiagramKind;
  caption: string;
}

const TEAL_DARK = '#0F766E';
const TEAL_MID = '#0D9488';
const TEAL_LIGHT = '#CCFBF1';
const SLATE_DARK = '#0F172A';
const SLATE_MID = '#475569';
const FORCE_RED = '#DC2626';
const FORCE_BLUE = '#0284C7';
const FORCE_AMBER = '#B45309';

export const StimulusDiagram: React.FC<StimulusDiagramProps> = ({ kind, caption }) => {
  return (
    <figure className="w-full rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="bg-slate-50/70 px-3 py-2 border-b border-slate-200 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-slate-600">Diagram Stimulus Fisika</span>
        <span className="text-[11px] text-slate-500 tabular-nums">Skala Geometri Akurat</span>
      </div>
      <div className="p-3 sm:p-5 flex justify-center items-center bg-white">
        {renderSvg(kind)}
      </div>
      <figcaption className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
};

function renderSvg(kind: DiagramKind) {
  switch (kind) {
    case 'q1-rod-torque':
      return <RodTorqueSvg />;
    case 'q2-square-torque':
      return <SquareTorqueSvg />;
    case 'q3-wrench-context':
      return <WrenchContextSvg />;
    case 'q5-rigid-bodies':
      return <RigidBodiesSvg />;
    case 'q6-hollow-sphere':
      return <HollowSphereSvg />;
    case 'q7-parallel-axis-rod':
      return <ParallelAxisRodSvg />;
    case 'q8-composite-rod-disc':
      return <CompositeRodDiscSvg />;
    case 'q9-rectangular-plate-corner':
      return <RectangularPlateCornerSvg />;
    case 'q10-combined-rod-particles':
      return <CombinedRodParticlesSvg />;
    default:
      return null;
  }
}

/* ==================== SOAL 1: BATANG AB DENGAN 4 GAYA ==================== */
function RodTorqueSvg() {
  // Skala: 1.0 m = 110 px. A=90, P=200, C=310, B=530
  // F2: 37 deg down-right from C(310, 174): dx = 72*0.8 = 57.6, dy = 72*0.6 = 43.2 -> (367.6, 217.2)
  // F4: 30 deg up-left from B(530, 160): dx = -86*0.866 = -74.5, dy = -86*0.5 = -43 -> (455.5, 117)
  return (
    <svg
      viewBox="0 0 620 315"
      className="w-full max-w-[620px] h-auto"
      role="img"
      aria-label="Diagram batang AB sepanjang 4,0 m dengan poros di P dan gaya F1, F2, F3, F4"
    >
      <defs>
        <marker id="arr-red" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,1 L8,4 L0,7 Z" fill={FORCE_RED} />
        </marker>
        <marker id="arr-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,1 L8,4 L0,7 Z" fill={FORCE_BLUE} />
        </marker>
        <marker id="arr-teal" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,1 L8,4 L0,7 Z" fill={TEAL_DARK} />
        </marker>
        <marker id="dim-arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,1 L6,3 L0,5 Z" fill={SLATE_MID} />
        </marker>
      </defs>

      {/* Subtle grid */}
      <line x1="40" y1="167" x2="585" y2="167" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />

      {/* Batang AB */}
      <rect x="90" y="160" width="440" height="14" rx="3" fill="#E2E8F0" stroke={SLATE_DARK} strokeWidth="2" />

      {/* Penanda titik A, P, C, B */}
      <circle cx="90" cy="167" r="3.5" fill={SLATE_DARK} />
      <text x="80" y="152" fontSize="13" fontWeight="700" fill={SLATE_DARK}>A</text>

      <circle cx="310" cy="167" r="3.5" fill={SLATE_DARK} />
      <text x="305" y="152" fontSize="13" fontWeight="700" fill={SLATE_DARK}>C</text>

      <circle cx="530" cy="167" r="3.5" fill={SLATE_DARK} />
      <text x="536" y="160" fontSize="13" fontWeight="700" fill={SLATE_DARK}>B</text>

      {/* Poros P (segitiga tumpuan + pin) */}
      <polygon points="200,174 186,198 214,198" fill={TEAL_LIGHT} stroke={TEAL_DARK} strokeWidth="2" />
      <line x1="176" y1="198" x2="224" y2="198" stroke={TEAL_DARK} strokeWidth="2" />
      <circle cx="200" cy="167" r="5.5" fill={TEAL_DARK} stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="192" y="148" fontSize="13" fontWeight="700" fill={TEAL_DARK}>Poros P</text>

      {/* F1 = 20 N di A, vertikal ke atas */}
      <line x1="90" y1="160" x2="90" y2="70" stroke={FORCE_RED} strokeWidth="2.5" markerEnd="url(#arr-red)" />
      <rect x="90" y="148" width="12" height="12" fill="none" stroke={SLATE_MID} strokeWidth="1.2" />
      <text x="42" y="60" fontSize="13" fontWeight="700" fill={FORCE_RED}>F₁ = 20 N</text>

      {/* F3 = 25 N di P, vertikal ke bawah */}
      <line x1="200" y1="174" x2="200" y2="250" stroke={FORCE_BLUE} strokeWidth="2.5" markerEnd="url(#arr-blue)" />
      <text x="166" y="268" fontSize="13" fontWeight="700" fill={FORCE_BLUE}>F₃ = 25 N</text>

      {/* F2 = 15 N di C, 37 deg ke kanan bawah */}
      <line x1="310" y1="174" x2="382" y2="228" stroke={FORCE_RED} strokeWidth="2.5" markerEnd="url(#arr-red)" />
      {/* Busur sudut 37 deg */}
      <path d="M 350 174 A 40 40 0 0 1 342 198" fill="none" stroke={FORCE_AMBER} strokeWidth="1.8" />
      <text x="354" y="191" fontSize="12" fontWeight="700" fill={FORCE_AMBER}>37°</text>
      <text x="382" y="243" fontSize="13" fontWeight="700" fill={FORCE_RED}>F₂ = 15 N</text>

      {/* F4 = 30 N di B, 30 deg ke kiri atas */}
      <line x1="530" y1="160" x2="438" y2="107" stroke={TEAL_DARK} strokeWidth="2.5" markerEnd="url(#arr-teal)" />
      {/* Busur sudut 30 deg */}
      <path d="M 484 160 A 46 46 0 0 1 490 137" fill="none" stroke={FORCE_AMBER} strokeWidth="1.8" />
      <text x="454" y="150" fontSize="12" fontWeight="700" fill={FORCE_AMBER}>30°</text>
      <text x="415" y="96" fontSize="13" fontWeight="700" fill={TEAL_DARK}>F₄ = 30 N</text>

      {/* Garis dimensi jarak di bagian bawah */}
      <g stroke={SLATE_MID} strokeWidth="1.2">
        <line x1="90" y1="215" x2="90" y2="298" strokeDasharray="3 3" />
        <line x1="200" y1="274" x2="200" y2="298" strokeDasharray="3 3" />
        <line x1="310" y1="215" x2="310" y2="298" strokeDasharray="3 3" />
        <line x1="530" y1="185" x2="530" y2="298" strokeDasharray="3 3" />

        {/* Segment AP */}
        <line x1="94" y1="286" x2="196" y2="286" />
        <line x1="204" y1="286" x2="306" y2="286" />
        <line x1="314" y1="286" x2="526" y2="286" />
      </g>
      <text x="128" y="304" fontSize="12" fontWeight="600" fill={SLATE_DARK}>1,0 m</text>
      <text x="238" y="304" fontSize="12" fontWeight="600" fill={SLATE_DARK}>1,0 m</text>
      <text x="405" y="304" fontSize="12" fontWeight="600" fill={SLATE_DARK}>2,0 m</text>

      {/* Total L */}
      <line x1="90" y1="32" x2="530" y2="32" stroke={SLATE_MID} strokeWidth="1.3" />
      <line x1="90" y1="26" x2="90" y2="38" stroke={SLATE_MID} strokeWidth="1.5" />
      <line x1="530" y1="26" x2="530" y2="38" stroke={SLATE_MID} strokeWidth="1.5" />
      <rect x="266" y="21" width="88" height="20" fill="#FFFFFF" />
      <text x="275" y="36" fontSize="12.5" fontWeight="700" fill={SLATE_DARK}>L = 4,0 m</text>
    </svg>
  );
}

/* ==================== SOAL 2: PELAT PERSEGI ABCD ==================== */
function SquareTorqueSvg() {
  // Persegi A(170, 290), B(350, 290), C(350, 110), D(170, 110), sisi = 180 px = 2,0 m
  return (
    <svg
      viewBox="0 0 560 365"
      className="w-full max-w-[560px] h-auto"
      role="img"
      aria-label="Pelat persegi ABCD bersisi 2,0 m dengan poros di sudut A dan empat gaya"
    >
      <defs>
        <marker id="sq-red" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,1 L8,4 L0,7 Z" fill={FORCE_RED} />
        </marker>
        <marker id="sq-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,1 L8,4 L0,7 Z" fill={FORCE_BLUE} />
        </marker>
        <marker id="sq-teal" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,1 L8,4 L0,7 Z" fill={TEAL_DARK} />
        </marker>
      </defs>

      {/* Pelat persegi ABCD */}
      <rect x="170" y="110" width="180" height="180" fill="#F0FDFA" stroke={SLATE_DARK} strokeWidth="2.5" />

      {/* Diagonal bantu halus A-C */}
      <line x1="170" y1="290" x2="350" y2="110" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="5 5" />

      {/* Simbol siku-siku */}
      <polyline points="170,276 184,276 184,290" fill="none" stroke="#94A3B8" strokeWidth="1.2" />

      {/* Poros A di kiri bawah */}
      <circle cx="170" cy="290" r="9" fill={TEAL_LIGHT} stroke={TEAL_DARK} strokeWidth="2.2" />
      <circle cx="170" cy="290" r="3.5" fill={TEAL_DARK} />
      <text x="112" y="314" fontSize="13" fontWeight="700" fill={TEAL_DARK}>A (Poros)</text>

      {/* Label sudut B, C, D */}
      <circle cx="350" cy="290" r="4" fill={SLATE_DARK} />
      <text x="357" y="309" fontSize="13.5" fontWeight="700" fill={SLATE_DARK}>B</text>

      <circle cx="350" cy="110" r="4" fill={SLATE_DARK} />
      <text x="360" y="114" fontSize="13.5" fontWeight="700" fill={SLATE_DARK}>C</text>

      <circle cx="170" cy="110" r="4" fill={SLATE_DARK} />
      <text x="148" y="114" fontSize="13.5" fontWeight="700" fill={SLATE_DARK}>D</text>

      {/* Panjang sisi a = 2,0 m */}
      <text x="235" y="312" fontSize="12.5" fontWeight="600" fill={SLATE_MID}>a = 2,0 m</text>
      <text x="108" y="205" fontSize="12.5" fontWeight="600" fill={SLATE_MID}>a = 2,0 m</text>

      {/* F1 = 10 N di B ke atas sepanjang BC */}
      <line x1="350" y1="290" x2="350" y2="195" stroke={FORCE_RED} strokeWidth="2.8" markerEnd="url(#sq-red)" />
      <text x="362" y="218" fontSize="13" fontWeight="700" fill={FORCE_RED}>F₁ = 10 N</text>

      {/* F2 = 20 N di D ke kanan sepanjang DC */}
      <line x1="170" y1="110" x2="268" y2="110" stroke={FORCE_BLUE} strokeWidth="2.8" markerEnd="url(#sq-blue)" />
      <text x="195" y="96" fontSize="13" fontWeight="700" fill={FORCE_BLUE}>F₂ = 20 N</text>

      {/* F3 = 15√2 N di C miring 45 deg ke kiri atas */}
      <line x1="350" y1="110" x2="245" y2="110" stroke={SLATE_MID} strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1="350" y1="110" x2="282" y2="42" stroke={TEAL_DARK} strokeWidth="2.8" markerEnd="url(#sq-teal)" />
      <path d="M 308 110 A 42 42 0 0 1 320 80" fill="none" stroke={FORCE_AMBER} strokeWidth="1.8" />
      <text x="285" y="95" fontSize="12" fontWeight="700" fill={FORCE_AMBER}>45°</text>
      <text x="242" y="31" fontSize="13" fontWeight="700" fill={TEAL_DARK}>F₃ = 15√2 N</text>

      {/* F4 = 25 N di B ke kanan (perpanjangan AB) */}
      <line x1="350" y1="290" x2="455" y2="290" stroke={FORCE_RED} strokeWidth="2.8" markerEnd="url(#sq-red)" />
      <text x="392" y="278" fontSize="13" fontWeight="700" fill={FORCE_RED}>F₄ = 25 N</text>
    </svg>
  );
}

/* ==================== SOAL 3: KUNCI PAS KONTEKSTUAL ==================== */
function WrenchContextSvg() {
  return (
    <svg
      viewBox="0 0 560 220"
      className="w-full max-w-[560px] h-auto"
      role="img"
      aria-label="Skema kunci pas dengan pusat baut O, titik Q berjarak 0,30 m, dan ujung pegangan P berjarak 0,50 m"
    >
      <defs>
        <marker id="wr-teal" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,1 L7,3.5 L0,6 Z" fill={TEAL_DARK} />
        </marker>
      </defs>

      {/* Badan kunci pas (O=110, Q=290, P=410) */}
      <path
        d="M 85 82 A 30 30 0 1 1 85 118 L 118 110 L 420 110 A 10 10 0 0 1 420 90 L 118 90 Z"
        fill="#E2E8F0"
        stroke={SLATE_DARK}
        strokeWidth="2"
      />
      {/* Baut heksagonal di O */}
      <polygon
        points="110,85 123,92 123,108 110,115 97,108 97,92"
        fill={TEAL_LIGHT}
        stroke={TEAL_DARK}
        strokeWidth="2"
      />
      <circle cx="110" cy="100" r="4" fill={TEAL_DARK} />
      <text x="98" y="65" fontSize="13" fontWeight="700" fill={TEAL_DARK}>Baut O</text>

      {/* Panah arah kencang (searah jarum jam) */}
      <path d="M 65 72 A 48 48 0 0 1 142 64" fill="none" stroke={TEAL_DARK} strokeWidth="2" markerEnd="url(#wr-teal)" />
      <text x="35" y="42" fontSize="11.5" fontWeight="600" fill={TEAL_DARK}>Arah Kencang (CW)</text>

      {/* Titik Q (r = 0,30 m) */}
      <circle cx="290" cy="100" r="5" fill={FORCE_BLUE} stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="284" y="79" fontSize="13" fontWeight="700" fill={FORCE_BLUE}>Q</text>

      {/* Titik P (r = 0,50 m) */}
      <circle cx="410" cy="100" r="5" fill={FORCE_RED} stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="404" y="79" fontSize="13" fontWeight="700" fill={FORCE_RED}>P</text>

      {/* Sumbu batang */}
      <line x1="110" y1="100" x2="470" y2="100" stroke={SLATE_MID} strokeWidth="1" strokeDasharray="4 4" />

      {/* Dimensi OQ = 0,30 m */}
      <line x1="110" y1="118" x2="110" y2="188" stroke={SLATE_MID} strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="290" y1="112" x2="290" y2="155" stroke={SLATE_MID} strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="410" y1="112" x2="410" y2="188" stroke={SLATE_MID} strokeWidth="1.2" strokeDasharray="3 3" />

      <line x1="114" y1="145" x2="286" y2="145" stroke={SLATE_DARK} strokeWidth="1.5" />
      <rect x="165" y="134" width="72" height="18" fill="#FFFFFF" />
      <text x="172" y="148" fontSize="12" fontWeight="700" fill={FORCE_BLUE}>OQ = 0,30 m</text>

      <line x1="114" y1="178" x2="406" y2="178" stroke={SLATE_DARK} strokeWidth="1.5" />
      <rect x="215" y="167" width="90" height="18" fill="#FFFFFF" />
      <text x="220" y="181" fontSize="12" fontWeight="700" fill={SLATE_DARK}>L = OP = 0,50 m</text>
    </svg>
  );
}

/* ==================== SOAL 5: TIGA BENDA TEGAR ==================== */
function RigidBodiesSvg() {
  return (
    <svg
      viewBox="0 0 600 220"
      className="w-full max-w-[600px] h-auto"
      role="img"
      aria-label="Perbandingan silinder pejal, cincin tipis, dan bola pejal berjari-jari sama R = 0,50 m"
    >
      {/* 1. Silinder Pejal */}
      <g transform="translate(105, 110)">
        <line x1="0" y1="-88" x2="0" y2="85" stroke={TEAL_DARK} strokeWidth="2" strokeDasharray="5 3" />
        <ellipse cx="0" cy="-42" rx="52" ry="16" fill="#CCFBF1" stroke={TEAL_DARK} strokeWidth="2" />
        <path d="M -52 -42 L -52 42 A 52 16 0 0 0 52 42 L 52 -42" fill="#99F6E4" fillOpacity="0.5" stroke={TEAL_DARK} strokeWidth="2" />
        <ellipse cx="0" cy="-42" rx="52" ry="16" fill="#CCFBF1" stroke={TEAL_DARK} strokeWidth="2" />
        <line x1="0" y1="-42" x2="52" y2="-42" stroke={SLATE_DARK} strokeWidth="1.6" />
        <text x="16" y="-46" fontSize="11" fontWeight="700" fill={SLATE_DARK}>R</text>
        <text x="-46" y="88" fontSize="12" fontWeight="700" fill={SLATE_DARK}>Silinder Pejal</text>
        <text x="-38" y="104" fontSize="11" fill={SLATE_MID}>M = 8,0 kg</text>
      </g>

      {/* 2. Cincin Tipis */}
      <g transform="translate(300, 110)">
        <line x1="0" y1="-88" x2="0" y2="85" stroke={TEAL_DARK} strokeWidth="2" strokeDasharray="5 3" />
        <circle cx="0" cy="0" r="52" fill="none" stroke={TEAL_DARK} strokeWidth="9" />
        <circle cx="0" cy="0" r="56.5" fill="none" stroke={SLATE_DARK} strokeWidth="1.2" />
        <circle cx="0" cy="0" r="47.5" fill="none" stroke={SLATE_DARK} strokeWidth="1.2" />
        <circle cx="0" cy="0" r="3" fill={TEAL_DARK} />
        <line x1="0" y1="0" x2="48" y2="0" stroke={SLATE_DARK} strokeWidth="1.6" />
        <text x="18" y="-6" fontSize="11" fontWeight="700" fill={SLATE_DARK}>R</text>
        <text x="-38" y="88" fontSize="12" fontWeight="700" fill={SLATE_DARK}>Cincin Tipis</text>
        <text x="-35" y="104" fontSize="11" fill={SLATE_MID}>M = 4,0 kg</text>
      </g>

      {/* 3. Bola Pejal */}
      <g transform="translate(495, 110)">
        <defs>
          <radialGradient id="ballGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#CCFBF1" />
            <stop offset="100%" stopColor="#0F766E" stopOpacity="0.65" />
          </radialGradient>
        </defs>
        <line x1="0" y1="-88" x2="0" y2="85" stroke={TEAL_DARK} strokeWidth="2" strokeDasharray="5 3" />
        <circle cx="0" cy="0" r="52" fill="url(#ballGrad)" stroke={TEAL_DARK} strokeWidth="2" />
        <ellipse cx="0" cy="0" rx="52" ry="15" fill="none" stroke={TEAL_DARK} strokeWidth="1.2" strokeDasharray="4 3" />
        <line x1="0" y1="0" x2="52" y2="0" stroke={SLATE_DARK} strokeWidth="1.6" />
        <text x="18" y="-6" fontSize="11" fontWeight="700" fill={SLATE_DARK}>R</text>
        <text x="-34" y="88" fontSize="12" fontWeight="700" fill={SLATE_DARK}>Bola Pejal</text>
        <text x="-38" y="104" fontSize="11" fill={SLATE_MID}>M = 10,0 kg</text>
      </g>

      <text x="200" y="18" fontSize="12" fontWeight="600" fill={TEAL_DARK}>
        Ketiga benda berjari-jari sama R = 0,50 m
      </text>
    </svg>
  );
}

/* ==================== SOAL 6: BOLA BERONGGA ==================== */
function HollowSphereSvg() {
  return (
    <svg
      viewBox="0 0 420 240"
      className="w-full max-w-[420px] h-auto"
      role="img"
      aria-label="Penampang bola berongga tipis berdiameter 1,2 m dan massa 6,0 kg"
    >
      {/* Sumbu rotasi pusat massa */}
      <line x1="210" y1="20" x2="210" y2="220" stroke={TEAL_DARK} strokeWidth="2.2" strokeDasharray="6 4" />
      <path d="M 192 32 A 22 9 0 1 0 228 32" fill="none" stroke={TEAL_DARK} strokeWidth="1.8" />
      <text x="220" y="28" fontSize="12" fontWeight="700" fill={TEAL_DARK}>Poros PM</text>

      {/* Dinding kulit bola berongga */}
      <circle cx="210" cy="120" r="74" fill="#CCFBF1" stroke={TEAL_DARK} strokeWidth="2.5" />
      <circle cx="210" cy="120" r="62" fill="#FFFFFF" stroke={TEAL_MID} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="167" y="102" fontSize="11" fill={SLATE_MID}>Rongga dalam</text>

      {/* Titik pusat massa */}
      <circle cx="210" cy="120" r="4" fill={TEAL_DARK} />

      {/* Garis diameter D = 1,2 m */}
      <line x1="136" y1="208" x2="284" y2="208" stroke={SLATE_DARK} strokeWidth="1.6" />
      <line x1="136" y1="120" x2="136" y2="214" stroke={SLATE_MID} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="284" y1="120" x2="284" y2="214" stroke={SLATE_MID} strokeWidth="1" strokeDasharray="3 3" />
      <rect x="172" y="198" width="76" height="18" fill="#FFFFFF" />
      <text x="178" y="211" fontSize="12.5" fontWeight="700" fill={SLATE_DARK}>D = 1,2 m</text>

      <text x="304" y="114" fontSize="12.5" fontWeight="700" fill={SLATE_DARK}>M = 6,0 kg</text>
      <text x="304" y="132" fontSize="11.5" fill={SLATE_MID}>Kulit bola tipis</text>
    </svg>
  );
}

/* ==================== SOAL 7: TEOREMA SUMBU SEJAJAR BATANG ==================== */
function ParallelAxisRodSvg() {
  // Batang panjang 360 px = 2,0 m -> 180 px/m. PM di x=260, P di x=260 + 0.5*180 = 350.
  return (
    <svg
      viewBox="0 0 520 220"
      className="w-full max-w-[520px] h-auto"
      role="img"
      aria-label="Batang homogen 2,0 m dengan poros awal di PM dan poros baru P berjarak d = 0,50 m"
    >
      {/* Batang homogen dari x=80 sampai x=440 */}
      <rect x="80" y="102" width="360" height="18" rx="4" fill="#CCFBF1" stroke={TEAL_DARK} strokeWidth="2.2" />

      {/* Poros awal melalui PM (x=260) */}
      <line x1="260" y1="30" x2="260" y2="178" stroke={SLATE_MID} strokeWidth="2" strokeDasharray="5 4" />
      <circle cx="260" cy="111" r="4.5" fill={SLATE_DARK} />
      <text x="234" y="24" fontSize="12" fontWeight="700" fill={SLATE_DARK}>Poros PM</text>

      {/* Poros baru P (x=350) */}
      <line x1="350" y1="30" x2="350" y2="178" stroke={FORCE_RED} strokeWidth="2.2" />
      <circle cx="350" cy="111" r="5" fill={FORCE_RED} />
      <text x="326" y="24" fontSize="12" fontWeight="700" fill={FORCE_RED}>Poros Baru P</text>

      {/* Jarak pergeseran d = 0,50 m */}
      <line x1="264" y1="70" x2="346" y2="70" stroke={FORCE_AMBER} strokeWidth="2" />
      <line x1="260" y1="64" x2="260" y2="76" stroke={FORCE_AMBER} strokeWidth="2" />
      <line x1="350" y1="64" x2="350" y2="76" stroke={FORCE_AMBER} strokeWidth="2" />
      <text x="275" y="61" fontSize="12.5" fontWeight="700" fill={FORCE_AMBER}>d = 0,50 m</text>

      {/* Dimensi total batang L = 2,0 m */}
      <line x1="80" y1="194" x2="440" y2="194" stroke={SLATE_DARK} strokeWidth="1.6" />
      <line x1="80" y1="126" x2="80" y2="200" stroke={SLATE_MID} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="440" y1="126" x2="440" y2="200" stroke={SLATE_MID} strokeWidth="1" strokeDasharray="3 3" />
      <rect x="206" y="184" width="108" height="18" fill="#FFFFFF" />
      <text x="212" y="198" fontSize="12.5" fontWeight="700" fill={SLATE_DARK}>L = 2,0 m · M = 3,0 kg</text>
    </svg>
  );
}

/* ==================== SOAL 8: SISTEM GABUNGAN BATANG + CAKRAM ==================== */
function CompositeRodDiscSvg() {
  // Poros O di x=100, ujung batang di x=370 (L = 270 px = 1,5 m -> 180 px/m). Cakram R = 0,50 m -> r_px = 90 px!
  return (
    <svg
      viewBox="0 0 560 265"
      className="w-full max-w-[560px] h-auto"
      role="img"
      aria-label="Sistem gabungan batang homogen L = 1,5 m berporos di O dan cakram pejal R = 0,50 m di ujungnya"
    >
      {/* Cakram pejal (tampak bidang cakram, pusat di x=370, y=125, radius=90) */}
      <circle cx="370" cy="125" r="90" fill="#CCFBF1" stroke={TEAL_DARK} strokeWidth="2.5" />
      <line x1="370" y1="125" x2="434" y2="61" stroke={SLATE_DARK} strokeWidth="1.6" />
      <text x="394" y="84" fontSize="12" fontWeight="700" fill={SLATE_DARK}>R = 0,50 m</text>
      <text x="336" y="196" fontSize="12" fontWeight="700" fill={TEAL_DARK}>m_c = 6,0 kg</text>

      {/* Batang homogen dari O(100) ke pusat cakram(370) */}
      <rect x="100" y="118" width="270" height="14" rx="3" fill="#E2E8F0" stroke={SLATE_DARK} strokeWidth="2" />
      <circle cx="370" cy="125" r="4" fill={SLATE_DARK} />

      {/* Poros rotasi O (tegak lurus bidang) */}
      <circle cx="100" cy="125" r="10" fill="#FFFFFF" stroke={FORCE_RED} strokeWidth="2.4" />
      <circle cx="100" cy="125" r="3.5" fill={FORCE_RED} />
      <text x="58" y="102" fontSize="12.5" fontWeight="700" fill={FORCE_RED}>Poros O (⊥ bidang)</text>

      {/* Label massa batang */}
      <text x="180" y="108" fontSize="12" fontWeight="700" fill={SLATE_DARK}>Batang: m_b = 4,0 kg</text>

      {/* Garis dimensi L = 1,5 m */}
      <line x1="100" y1="242" x2="370" y2="242" stroke={SLATE_DARK} strokeWidth="1.6" />
      <line x1="100" y1="140" x2="100" y2="248" stroke={SLATE_MID} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="370" y1="125" x2="370" y2="248" stroke={SLATE_MID} strokeWidth="1" strokeDasharray="3 3" />
      <rect x="200" y="232" width="70" height="18" fill="#FFFFFF" />
      <text x="206" y="246" fontSize="12.5" fontWeight="700" fill={SLATE_DARK}>L = 1,5 m</text>
    </svg>
  );
}

/* ==================== SOAL 9: PELAT PERSEGI PANJANG POROS SUDUT ==================== */
function RectangularPlateCornerSvg() {
  // Pelat a = 2,0 m (260 px) x b = 1,0 m (130 px) -> tepat rasio 2:1!
  return (
    <svg
      viewBox="0 0 480 255"
      className="w-full max-w-[480px] h-auto"
      role="img"
      aria-label="Pelat persegi panjang 2,0 m x 1,0 m dengan poros di titik sudut dan pusat massa di tengah"
    >
      {/* Pelat persegi panjang */}
      <rect x="110" y="55" width="260" height="130" fill="#F0FDFA" stroke={TEAL_DARK} strokeWidth="2.5" />

      {/* Garis diagonal bantu */}
      <line x1="110" y1="185" x2="370" y2="55" stroke="#94A3B8" strokeWidth="1.3" strokeDasharray="5 4" />
      <line x1="110" y1="55" x2="370" y2="185" stroke="#94A3B8" strokeWidth="1.3" strokeDasharray="5 4" />

      {/* Pusat massa PM */}
      <circle cx="240" cy="120" r="5" fill={SLATE_DARK} />
      <text x="248" y="114" fontSize="12" fontWeight="700" fill={SLATE_DARK}>PM</text>

      {/* Poros sudut O di kiri bawah */}
      <circle cx="110" cy="185" r="10" fill="#FFFFFF" stroke={FORCE_RED} strokeWidth="2.5" />
      <circle cx="110" cy="185" r="3.5" fill={FORCE_RED} />
      <text x="64" y="212" fontSize="12.5" fontWeight="700" fill={FORCE_RED}>Poros Sudut (⊥ bidang)</text>

      {/* Dimensi a dan b */}
      <text x="210" y="42" fontSize="12.5" fontWeight="700" fill={SLATE_DARK}>a = 2,0 m</text>
      <text x="382" y="124" fontSize="12.5" fontWeight="700" fill={SLATE_DARK}>b = 1,0 m</text>
      <text x="212" y="222" fontSize="12" fontWeight="600" fill={TEAL_DARK}>M = 12 kg</text>
    </svg>
  );
}

/* ==================== SOAL 10: SINTESIS KONFIGURASI I & II ==================== */
function CombinedRodParticlesSvg() {
  // Panjang L = 2,0 m -> 280 px (x=120 sampai x=400). Tengah O=260. r2=1,5 m -> 120 + 210 = 330.
  return (
    <svg
      viewBox="0 0 540 275"
      className="w-full max-w-[540px] h-auto"
      role="img"
      aria-label="Perbandingan Konfigurasi I dan Konfigurasi II pada batang 2,0 m dan dua partikel massa 1,0 kg"
    >
      {/* KONFIGURASI I */}
      <text x="24" y="30" fontSize="13" fontWeight="700" fill={TEAL_DARK}>Konfigurasi I (Poros di Tengah O)</text>
      <rect x="120" y="62" width="280" height="12" rx="3" fill="#E2E8F0" stroke={SLATE_DARK} strokeWidth="1.8" />
      <line x1="260" y1="36" x2="260" y2="104" stroke={TEAL_DARK} strokeWidth="2" strokeDasharray="4 3" />
      <circle cx="260" cy="68" r="4.5" fill={TEAL_DARK} />
      <text x="268" y="50" fontSize="11.5" fontWeight="700" fill={TEAL_DARK}>Poros O</text>

      {/* Partikel A & B */}
      <circle cx="120" cy="68" r="9" fill={FORCE_BLUE} stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="96" y="94" fontSize="11.5" fontWeight="700" fill={FORCE_BLUE}>A (1,0 kg)</text>

      <circle cx="400" cy="68" r="9" fill={FORCE_BLUE} stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="380" y="94" fontSize="11.5" fontWeight="700" fill={FORCE_BLUE}>B (1,0 kg)</text>

      <text x="170" y="114" fontSize="11.5" fill={SLATE_MID}>1,0 m</text>
      <text x="315" y="114" fontSize="11.5" fill={SLATE_MID}>1,0 m</text>

      <line x1="24" y1="136" x2="516" y2="136" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* KONFIGURASI II */}
      <text x="24" y="164" fontSize="13" fontWeight="700" fill={FORCE_RED}>Konfigurasi II (Poros di Ujung A)</text>
      <rect x="120" y="196" width="280" height="12" rx="3" fill="#E2E8F0" stroke={SLATE_DARK} strokeWidth="1.8" />
      <line x1="120" y1="170" x2="120" y2="238" stroke={FORCE_RED} strokeWidth="2.2" />

      {/* Partikel 1 tepat di poros A */}
      <circle cx="120" cy="202" r="9" fill={FORCE_RED} stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="72" y="232" fontSize="11.5" fontWeight="700" fill={FORCE_RED}>Poros A (1,0 kg)</text>

      {/* Partikel 2 di r2 = 1,5 m dari A (x=330) */}
      <circle cx="330" cy="202" r="9" fill={FORCE_BLUE} stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="308" y="185" fontSize="11.5" fontWeight="700" fill={FORCE_BLUE}>m₂ (1,0 kg)</text>
      <text x="398" y="190" fontSize="11.5" fontWeight="600" fill={SLATE_MID}>B</text>

      {/* Jarak r2 */}
      <line x1="120" y1="254" x2="330" y2="254" stroke={SLATE_DARK} strokeWidth="1.5" />
      <line x1="330" y1="214" x2="330" y2="260" stroke={SLATE_MID} strokeWidth="1" strokeDasharray="3 3" />
      <rect x="195" y="244" width="66" height="16" fill="#FFFFFF" />
      <text x="198" y="257" fontSize="11.5" fontWeight="700" fill={SLATE_DARK}>r₂ = 1,5 m</text>
      <text x="415" y="230" fontSize="11.5" fontWeight="600" fill={SLATE_MID}>Batang: m_b = 6,0 kg, L = 2,0 m</text>
    </svg>
  );
}
