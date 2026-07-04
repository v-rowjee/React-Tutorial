import { useParams, Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Lock, Lightbulb, Terminal, BookOpen, CheckCircle2 } from 'lucide-react';
import { curriculum } from '@/data/curriculum';
import CodeBlock from '@/components/ui/CodeBlock';
import CodeSandbox from '@/components/sandbox/CodeSandbox';
import Quiz from '@/components/quiz/Quiz';

export default function ChapterPage() {
  const { id } = useParams();
  const { getChapterStatus, saveQuizScore, setCurrentChapter, progress } = useOutletContext();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const chapter = curriculum.find(c => c.id === id);
  const status = chapter ? getChapterStatus(chapter.id) : 'locked';

  // Update current chapter on visit
  useEffect(() => {
    if (chapter && status !== 'locked') {
      setCurrentChapter(chapter.id);
    }
  }, [chapter, status, setCurrentChapter]);

  // Reset quiz state when chapter changes
  useEffect(() => {
    setQuizStarted(false);
    setQuizPassed(false);
  }, [id]);

  if (!chapter) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-2">Chapter not found</h1>
        <Link to="/curriculum" className="text-primary hover:underline">Back to curriculum</Link>
      </div>
    );
  }

  if (status === 'locked') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-secondary/40 flex items-center justify-center mb-6">
          <Lock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">This chapter is locked</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Complete the previous chapter's quiz (score 70%+) to unlock "{chapter.title}".
        </p>
        <Link
          to={`/chapter/${curriculum[curriculum.findIndex(c => c.id === chapter.id) - 1]?.id}`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border hover:bg-secondary/40 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go to previous chapter
        </Link>
      </div>
    );
  }

  const chapterIdx = curriculum.findIndex(c => c.id === id);
  const prevChapter = chapterIdx > 0 ? curriculum[chapterIdx - 1] : null;
  const nextChapter = chapterIdx < curriculum.length - 1 ? curriculum[chapterIdx + 1] : null;
  const alreadyCompleted = progress.completedChapters?.includes(chapter.id);
  const quizScore = progress.quizScores?.[chapter.id];

  const handleQuizPass = (score) => {
    saveQuizScore(chapter.id, score);
    setQuizPassed(true);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeout(() => {
      document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb + Title */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/curriculum" className="hover:text-foreground transition-colors">Curriculum</Link>
          <span>/</span>
          <span className="text-foreground">{chapter.title}</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            chapter.level === 'Basics' ? 'bg-blue-500/15 text-blue-500' : 'bg-purple-500/15 text-purple-500'
          }`}>
            {chapter.level}
          </span>
          <span className="text-sm text-muted-foreground">Chapter {chapter.number}</span>
          {alreadyCompleted && (
            <span className="flex items-center gap-1 text-xs text-green-500">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </span>
          )}
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold font-heading mb-4">{chapter.title}</h1>
        <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
          {chapter.intro}
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-8">
        <h2 className="text-xl font-semibold font-heading flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" /> Code Examples
        </h2>
        {chapter.examples.map((example, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card/40 overflow-hidden">
            <div className="px-5 pt-5">
              <h3 className="font-semibold mb-2">{i + 1}. {example.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{example.explanation}</p>
            </div>
            <CodeBlock code={example.code} className="rounded-none border-x-0 border-b-0" />
          </div>
        ))}
      </div>

      {/* Sandbox */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold font-heading flex items-center gap-2">
          <Terminal className="w-5 h-5 text-primary" /> Try It Yourself
        </h2>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex gap-3">
          <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">{chapter.exercise.instructions}</p>
            <p className="text-xs text-muted-foreground">Hint: {chapter.exercise.hint}</p>
          </div>
        </div>
        <CodeSandbox starterCode={chapter.exercise.starterCode} />
      </div>

      {/* Quiz */}
      <div id="quiz-section" className="space-y-4 scroll-mt-20">
        <h2 className="text-xl font-semibold font-heading flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" /> Chapter Quiz
        </h2>

        {quizScore && !quizStarted && (
          <div className="rounded-xl border border-border bg-card/50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                quizScore.best >= 70 ? 'bg-green-500/15' : 'bg-amber-500/15'
              }`}>
                <span className={`font-bold text-sm ${
                  quizScore.best >= 70 ? 'text-green-500' : 'text-amber-500'
                }`}>{quizScore.best}%</span>
              </div>
              <div>
                <p className="text-sm font-medium">Best score: {quizScore.best}%</p>
                <p className="text-xs text-muted-foreground">{quizScore.attempts} {quizScore.attempts === 1 ? 'attempt' : 'attempts'}</p>
              </div>
            </div>
            <button
              onClick={startQuiz}
              className="text-sm px-4 py-2 rounded-lg border border-border hover:bg-secondary/40 transition-colors"
            >
              {quizScore.best >= 70 ? 'Retake' : 'Try Again'}
            </button>
          </div>
        )}

        {!quizStarted && !quizScore && (
          <div className="rounded-xl border border-border bg-card/50 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Score 70% or higher to complete this chapter and unlock the next one.
            </p>
            <button
              onClick={startQuiz}
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Start Quiz
            </button>
          </div>
        )}

        {quizStarted && (
          <Quiz chapter={chapter} onPass={handleQuizPass} />
        )}

        {quizPassed && nextChapter && (
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-medium">Chapter complete!</p>
                <p className="text-sm text-muted-foreground">Next chapter unlocked: {nextChapter.title}</p>
              </div>
            </div>
            <Link
              to={`/chapter/${nextChapter.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Next <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Prev/Next nav */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        {prevChapter ? (
          <Link
            to={`/chapter/${prevChapter.id}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {prevChapter.title}
          </Link>
        ) : <span />}
        {nextChapter ? (
          <Link
            to={`/chapter/${nextChapter.id}`}
            className={`flex items-center gap-2 text-sm transition-colors ${
              getChapterStatus(nextChapter.id) === 'locked'
                ? 'text-muted-foreground/40 pointer-events-none'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {nextChapter.title} <ArrowRight className="w-4 h-4" />
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}