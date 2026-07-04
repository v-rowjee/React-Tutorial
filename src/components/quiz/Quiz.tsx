import { useState } from 'react';
import { Check, X, Award, RefreshCw, Lock } from 'lucide-react';
import CodeBlock from '@/components/ui/CodeBlock';

export default function Quiz({ chapter, onPass }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const questions = chapter.quiz;
  const total = questions.length;
  const passThreshold = 70;

  const handleSelect = (qIndex, optionIndex) => {
    if (submitted) return;
    setAnswers({ ...answers, [qIndex]: optionIndex });
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    const pct = Math.round((correct / total) * 100);
    setScore(pct);
    setSubmitted(true);
    if (pct >= passThreshold && onPass) {
      onPass(pct);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  const allAnswered = Object.keys(answers).length === total;
  const correctCount = submitted
    ? questions.filter((q, i) => answers[i] === q.correctIndex).length
    : 0;

  return (
    <div className="space-y-6">
      {questions.map((q, qIndex) => {
        const userAnswer = answers[qIndex];
        const isCorrect = submitted && userAnswer === q.correctIndex;
        const isWrong = submitted && userAnswer !== undefined && userAnswer !== q.correctIndex;

        return (
          <div
            key={qIndex}
            className={`rounded-xl border p-5 transition-colors ${
              isCorrect ? 'border-green-500/50 bg-green-500/5'
              : isWrong ? 'border-red-500/50 bg-red-500/5'
              : 'border-border bg-card/50'
            }`}
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-secondary/60 flex items-center justify-center text-xs font-mono font-semibold">
                {qIndex + 1}
              </span>
              <div className="flex-1">
                <p className="font-medium leading-relaxed">{q.question}</p>
                {q.type === 'predict' && q.code && (
                  <div className="mt-3">
                    <CodeBlock code={q.code} showCopy={false} />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 ml-10">
              {q.options.map((opt, optIndex) => {
                const isSelected = userAnswer === optIndex;
                const isCorrectAnswer = q.correctIndex === optIndex;

                return (
                  <button
                    key={optIndex}
                    onClick={() => handleSelect(qIndex, optIndex)}
                    disabled={submitted}
                    className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm transition-all ${
                      submitted
                        ? isCorrectAnswer
                          ? 'border-green-500/50 bg-green-500/10 text-foreground'
                          : isSelected
                            ? 'border-red-500/50 bg-red-500/10 text-foreground'
                            : 'border-border opacity-50'
                        : isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/40 hover:bg-secondary/30'
                    } ${!submitted && !isSelected ? 'cursor-pointer' : ''}`}
                  >
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] ${
                      submitted
                        ? isCorrectAnswer
                          ? 'border-green-500 bg-green-500 text-white'
                          : isSelected
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-border'
                        : isSelected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border'
                    }`}>
                      {submitted && isCorrectAnswer ? <Check className="w-3 h-3" /> :
                       submitted && isSelected ? <X className="w-3 h-3" /> :
                       String.fromCharCode(65 + optIndex)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className={`ml-10 mt-3 p-3 rounded-lg text-sm ${
                isCorrect ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                : 'bg-red-500/10 text-red-600 dark:text-red-400'
              }`}>
                <span className="font-semibold">
                  {isCorrect ? '✓ Correct! ' : '✗ Not quite. '}
                </span>
                {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
            allAnswered
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-secondary/40 text-muted-foreground cursor-not-allowed'
          }`}
        >
          {allAnswered ? (
            <>Submit Quiz <Award className="w-4 h-4" /></>
          ) : (
            <>Answer all questions to submit</>
          )}
        </button>
      ) : (
        <div className="rounded-xl border border-border p-6 text-center space-y-4">
          <div className={`text-4xl font-bold font-heading ${
            score >= passThreshold ? 'text-green-500' : 'text-amber-500'
          }`}>
            {score}%
          </div>
          <p className="text-sm text-muted-foreground">
            You got <span className="font-semibold text-foreground">{correctCount}</span> out of{' '}
            <span className="font-semibold text-foreground">{total}</span> correct.
          </p>
          {score >= passThreshold ? (
            <div className="flex items-center justify-center gap-2 text-green-500 text-sm font-medium">
              <Check className="w-4 h-4" />
              Chapter complete! Next chapter unlocked.
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-amber-500 text-sm font-medium">
              <Lock className="w-4 h-4" />
              You need {passThreshold}% to pass. Review and try again.
            </div>
          )}
          <button
            onClick={handleRetake}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-lg border border-border hover:bg-secondary/40 transition-colors text-sm font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}