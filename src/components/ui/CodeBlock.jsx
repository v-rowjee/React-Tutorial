import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'import', 'export', 'from', 'default', 'class', 'extends', 'new', 'async',
  'await', 'true', 'false', 'null', 'undefined', 'this', 'super', 'typeof',
  'instanceof', 'in', 'of', 'try', 'catch', 'finally', 'throw', 'break',
  'continue', 'switch', 'case', 'do', 'yield', 'void', 'delete',
]);

function tokenize(code) {
  const regex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(["'`])(?:\\.|(?!\2)[^\\])*\2|\b(\d+\.?\d*)\b|\b([a-zA-Z_$][\w$]*)(?=\s*\()|\b([a-zA-Z_$][\w$]*)\b/g;
  const tokens = [];
  let lastIdx = 0;
  let match;

  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIdx) {
      tokens.push({ type: 'plain', value: code.slice(lastIdx, match.index) });
    }
    if (match[1]) {
      tokens.push({ type: 'comment', value: match[1] });
    } else if (match[2]) {
      tokens.push({ type: 'string', value: match[0] });
    } else if (match[3]) {
      tokens.push({ type: 'number', value: match[3] });
    } else if (match[4]) {
      tokens.push({ type: 'function', value: match[4] });
    } else if (match[5]) {
      if (KEYWORDS.has(match[5])) {
        tokens.push({ type: 'keyword', value: match[5] });
      } else {
        tokens.push({ type: 'plain', value: match[5] });
      }
    }
    lastIdx = regex.lastIndex;
  }

  if (lastIdx < code.length) {
    tokens.push({ type: 'plain', value: code.slice(lastIdx) });
  }

  return tokens;
}

export default function CodeBlock({ code, showCopy = true, className = '' }) {
  const [copied, setCopied] = useState(false);
  const tokens = tokenize(code);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group rounded-xl border border-border bg-[#0d0d12] overflow-hidden ${className}`}>
      {showCopy && (
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
        </button>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono">
        <code>
          {tokens.map((tok, i) =>
            tok.type === 'plain' ? (
              <span key={i} className="text-slate-300">{tok.value}</span>
            ) : (
              <span key={i} className={`syntax-${tok.type}`}>{tok.value}</span>
            )
          )}
        </code>
      </pre>
    </div>
  );
}