import { useOutletContext } from 'react-router-dom';
import { Flame, Award, Calendar, Trash2, CheckCircle2, RotateCcw } from 'lucide-react';
import { curriculum } from '@/data/curriculum';
import { useState } from 'react';
import ProgressRing from '@/components/ui/ProgressRing';

export default function Profile() {
  const { progress, overallProgress, completedCount, totalChapters } = useOutletContext();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const lastActiveDate = progress.lastActive
    ? new Date(progress.lastActive).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '—';

  const handleReset = () => {
    localStorage.removeItem('reactpath-progress');
    window.location.reload();
  };

  const completedChapters = curriculum.filter(c => progress.completedChapters?.includes(c.id));
  const inProgressChapters = curriculum.filter(c => {
    const score = progress.quizScores?.[c.id];
    return score && !progress.completedChapters?.includes(c.id);
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading mb-1">Profile</h1>
        <p className="text-muted-foreground">Track your learning journey and manage your settings.</p>
      </div>

      {/* Overview card */}
      <div className="rounded-2xl border border-border bg-card/50 p-6 flex flex-col sm:flex-row items-center gap-6">
        <ProgressRing progress={overallProgress} size={130} strokeWidth={10} />
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          <div>
            <div className="text-2xl font-bold">{completedCount}/{totalChapters}</div>
            <div className="text-xs text-muted-foreground">Chapters Done</div>
          </div>
          <div>
            <div className="text-2xl font-bold flex items-center gap-1">
              <Flame className="w-5 h-5 text-amber-500" /> {progress.streak}
            </div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{Object.keys(progress.quizScores || {}).length}</div>
            <div className="text-xs text-muted-foreground">Quizzes Taken</div>
          </div>
          <div>
            <div className="text-2xl font-bold flex items-center gap-1">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="text-xs text-muted-foreground mt-1.5">{lastActiveDate}</div>
          </div>
        </div>
      </div>

      {/* Quiz scores */}
      <div>
        <h2 className="text-xl font-semibold font-heading mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" /> Quiz Scores
        </h2>
        {completedChapters.length === 0 && inProgressChapters.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No quizzes taken yet. Start a chapter to begin!</p>
        ) : (
          <div className="space-y-2">
            {curriculum.map(chapter => {
              const score = progress.quizScores?.[chapter.id];
              if (!score) return null;
              const passed = score.best >= 70;
              return (
                <div key={chapter.id} className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-3.5">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary/40 flex items-center justify-center text-xs font-mono font-semibold">
                    {chapter.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{chapter.title}</p>
                    <p className="text-xs text-muted-foreground">{score.attempts} {score.attempts === 1 ? 'attempt' : 'attempts'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${passed ? 'text-green-500' : 'text-amber-500'}`}>
                        {score.best}%
                      </div>
                    </div>
                    {passed && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Settings */}
      <div>
        <h2 className="text-xl font-semibold font-heading mb-4">Settings</h2>
        <div className="rounded-xl border border-border bg-card/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sm flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-red-500" /> Reset Progress
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Clear all completed chapters, quiz scores, and streak data. This cannot be undone.
              </p>
            </div>
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex-shrink-0 text-sm px-4 py-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
              >
                Reset
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="text-sm px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Confirm
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="text-sm px-4 py-2 rounded-lg border border-border hover:bg-secondary/40 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}