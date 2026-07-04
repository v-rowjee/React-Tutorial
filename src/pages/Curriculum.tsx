import { Link, useOutletContext } from 'react-router-dom';
import { Lock, Check, Clock, ArrowRight } from 'lucide-react';
import { curriculum } from '@/data/curriculum';
import ProgressBar from '@/components/ui/ProgressBar';

export default function Curriculum() {
  const { getChapterStatus, overallProgress, progress } = useOutletContext();

  const levels = [
    { name: 'Level 1 — Basics', chapters: curriculum.filter(c => c.level === 'Basics'), color: 'blue' },
    { name: 'Level 2 — Intermediate', chapters: curriculum.filter(c => c.level === 'Intermediate'), color: 'purple' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading mb-1">Curriculum</h1>
        <p className="text-muted-foreground">15 chapters to take you from zero to confident with React.</p>
      </div>

      {/* Progress bar */}
      <div className="rounded-2xl border border-border bg-card/50 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Your Progress</span>
          <span className="text-sm text-muted-foreground">{progress.completedChapters?.length || 0} of {curriculum.length} completed</span>
        </div>
        <ProgressBar value={overallProgress} height="h-3" />
      </div>

      {/* Levels */}
      {levels.map(level => (
        <div key={level.name}>
          <h2 className="text-lg font-semibold font-heading mb-4">{level.name}</h2>
          <div className="space-y-3">
            {level.chapters.map(chapter => {
              const status = getChapterStatus(chapter.id);
              const score = progress.quizScores?.[chapter.id];

              return (
                <Link
                  key={chapter.id}
                  to={status === 'locked' ? '#' : `/chapter/${chapter.id}`}
                  onClick={e => status === 'locked' && e.preventDefault()}
                  className={`block rounded-xl border p-5 transition-all ${
                    status === 'locked'
                      ? 'border-border bg-card/20 opacity-50 cursor-not-allowed'
                      : 'border-border bg-card/50 hover:border-primary/40 hover:bg-card'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Status indicator */}
                    <div className="flex-shrink-0 mt-0.5">
                      {status === 'completed' ? (
                        <span className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-500" />
                        </span>
                      ) : status === 'locked' ? (
                        <span className="w-9 h-9 rounded-xl bg-secondary/30 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        </span>
                      ) : (
                        <span className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                          <span className="text-sm font-mono font-semibold text-primary">{chapter.number}</span>
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{chapter.title}</h3>
                        {score && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                            score.best >= 70 ? 'bg-green-500/15 text-green-500' : 'bg-amber-500/15 text-amber-500'
                          }`}>
                            {score.best}%
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{chapter.intro}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {chapter.examples.length} examples
                        </span>
                        <span>{chapter.quiz.length} quiz questions</span>
                        {status !== 'locked' && (
                          <span className="flex items-center gap-1 text-primary">
                            {status === 'completed' ? 'Review' : 'Start'} <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}