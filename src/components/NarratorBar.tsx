import React, { useEffect, useMemo, useState } from 'react';
import { Volume2, Play, Pause, Square, RotateCcw } from 'lucide-react';

interface NarratorBarProps {
  title?: string;
  speechText: string;
  autoStopKey?: string | number;
}

type SpeechStatus = 'idle' | 'speaking' | 'paused';

function pickPreferredIndonesianMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;
  const idVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('id'));
  const maleKeywords = /(ardi|andika|budi|male|pria|laki|david|daniel|alex)/i;
  const femaleKeywords = /(gadis|siti|female|wanita|perempuan|damayanti)/i;

  const idMale = idVoices.find(
    (v) => maleKeywords.test(v.name) && !femaleKeywords.test(v.name),
  );
  if (idMale) return idMale;

  const idNeutral = idVoices.find((v) => !femaleKeywords.test(v.name));
  if (idNeutral) return idNeutral;

  if (idVoices.length > 0) return idVoices[0];

  const anyMale = voices.find((v) => maleKeywords.test(v.name));
  return anyMale ?? voices[0];
}

export const NarratorBar: React.FC<NarratorBarProps> = ({
  title = 'BIMBINGAN MR JO',
  speechText,
  autoStopKey,
}) => {
  const isSupported =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof SpeechSynthesisUtterance !== 'undefined';

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [status, setStatus] = useState<SpeechStatus>('idle');

  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      setVoices(list);
      if (list.length > 0) {
        setSelectedVoiceURI((prev) => {
          if (prev && list.some((v) => v.voiceURI === prev)) return prev;
          return pickPreferredIndonesianMaleVoice(list)?.voiceURI ?? list[0].voiceURI;
        });
      }
    };

    loadVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', loadVoices);
    };
  }, [isSupported]);

  // Hentikan narasi otomatis saat berganti soal
  useEffect(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setStatus('idle');
  }, [autoStopKey, isSupported]);

  useEffect(() => {
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  const sortedVoices = useMemo(() => {
    return [...voices].sort((a, b) => {
      const aId = a.lang.toLowerCase().startsWith('id') ? 0 : 1;
      const bId = b.lang.toLowerCase().startsWith('id') ? 0 : 1;
      if (aId !== bId) return aId - bId;
      return a.name.localeCompare(b.name);
    });
  }, [voices]);

  const startSpeaking = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    const chosenVoice = voices.find((v) => v.voiceURI === selectedVoiceURI) ?? null;
    if (chosenVoice) {
      utterance.voice = chosenVoice;
      utterance.lang = chosenVoice.lang;
    } else {
      utterance.lang = 'id-ID';
    }
    // Intonasi tenang, berwibawa, tidak terlalu cepat
    utterance.rate = 0.94;
    utterance.pitch = 0.92;
    utterance.volume = 1;

    utterance.onend = () => setStatus('idle');
    utterance.onerror = () => setStatus('idle');

    setStatus('speaking');
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (!isSupported || status !== 'speaking') return;
    window.speechSynthesis.pause();
    setStatus('paused');
  };

  const handleResume = () => {
    if (!isSupported || status !== 'paused') return;
    window.speechSynthesis.resume();
    setStatus('speaking');
  };

  const handleStop = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setStatus('idle');
  };

  return (
    <section
      aria-label="Narator Suara Bimbingan Mr Jo"
      className="rounded-xl border border-teal-200 bg-teal-50/50 px-3 py-2.5 sm:px-4 sm:py-3"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0">
            <Volume2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-teal-950 tracking-tight truncate">
              {title}
            </h3>
            <p className="text-[11px] text-teal-800 truncate">
              Narator Fisika Bahasa Indonesia · {status === 'speaking' ? 'Sedang membacakan' : status === 'paused' ? 'Dijeda' : 'Siap diputar'}
            </p>
          </div>
        </div>

        {!isSupported ? (
          <p className="text-xs text-slate-600">
            Browser pada perangkat ini belum mendukung Web Speech API.
          </p>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="mrjo-voice-select" className="sr-only">
              Pilih Suara Narator
            </label>
            <select
              id="mrjo-voice-select"
              value={selectedVoiceURI}
              onChange={(e) => setSelectedVoiceURI(e.target.value)}
              className="w-full sm:w-44 min-h-[38px] px-2.5 py-1 text-xs rounded-lg border border-teal-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              {sortedVoices.length === 0 ? (
                <option value="">Suara Indonesia Default</option>
              ) : (
                sortedVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))
              )}
            </select>

            {status === 'idle' && (
              <button
                type="button"
                onClick={startSpeaking}
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-teal-700 text-white hover:bg-teal-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" aria-hidden="true" />
                PUTAR SUARA
              </button>
            )}

            {status === 'speaking' && (
              <button
                type="button"
                onClick={handlePause}
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                PAUSE
              </button>
            )}

            {status === 'paused' && (
              <button
                type="button"
                onClick={handleResume}
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-teal-700 text-white hover:bg-teal-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" aria-hidden="true" />
                LANJUTKAN
              </button>
            )}

            <button
              type="button"
              onClick={handleStop}
              disabled={status === 'idle'}
              className="min-h-[38px] px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-45 disabled:cursor-not-allowed text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Square className="w-3.5 h-3.5" aria-hidden="true" />
              HENTIKAN
            </button>

            <button
              type="button"
              onClick={startSpeaking}
              className="min-h-[38px] px-2.5 py-1.5 rounded-lg border border-teal-300 bg-white text-teal-800 hover:bg-teal-100 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              ULANGI
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
