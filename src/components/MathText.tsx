import React from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
}

/**
 * Merender teks Bahasa Indonesia yang bercampur dengan ekspresi LaTeX ($...$, $$...$$)
 * dan penekanan tebal (**...**) menjadi elemen HTML + KaTeX yang presisi.
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Tokenisasi blok display $$...$$, inline $...$, dan **bold**
  const tokens: Array<{ type: 'text' | 'inline-math' | 'block-math' | 'bold'; content: string }> = [];
  const regex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\*\*[^*]+?\*\*)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    const raw = match[0];
    if (raw.startsWith('$$') && raw.endsWith('$$')) {
      tokens.push({ type: 'block-math', content: raw.slice(2, -2).trim() });
    } else if (raw.startsWith('$') && raw.endsWith('$')) {
      tokens.push({ type: 'inline-math', content: raw.slice(1, -1).trim() });
    } else if (raw.startsWith('**') && raw.endsWith('**')) {
      tokens.push({ type: 'bold', content: raw.slice(2, -2) });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return (
    <span className={className}>
      {tokens.map((tok, idx) => {
        if (tok.type === 'text') {
          return <React.Fragment key={idx}>{tok.content}</React.Fragment>;
        }
        if (tok.type === 'bold') {
          return (
            <strong key={idx} className="font-semibold text-slate-900">
              <MathText text={tok.content} />
            </strong>
          );
        }
        const isDisplay = tok.type === 'block-math';
        try {
          const html = katex.renderToString(tok.content, {
            displayMode: isDisplay,
            throwOnError: false,
            strict: false,
          });
          if (isDisplay) {
            return (
              <span
                key={idx}
                className="block my-2 overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }
          return (
            <span
              key={idx}
              className="inline-block align-baseline mx-0.5"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return (
            <code key={idx} className="font-mono text-xs bg-slate-100 px-1 rounded">
              {tok.content}
            </code>
          );
        }
      })}
    </span>
  );
};
