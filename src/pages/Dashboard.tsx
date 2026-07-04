import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, Flame, BookOpen, TrendingUp, Lock, Check, Clock } from 'lucide-react';
import { curriculum } from '@/data/curriculum';
import ProgressRing from '@/components/ui/ProgressRing';
import ProgressBar from '@/components/ui/ProgressBar';

export default function Dashboard() {
  const { progress, getChapterStatus, overallProgress, completedCount, totalChapters } = useOutletContext();
  const currentChapterData = curriculum.find(c => c.id === progress.currentChapter) || curriculum[0];

  const stats = [
    { icon: BookOpen, label: 'Completed', value: `${completedCount}/${totalChapters}`, color: 'text-green-500' },
    { icon: Flame, label: 'Streak', value: `${progress.streak} ${progress.streak === 1 ? 'day' : 'days'}`, color: 'text-amber-500' },
    { icon: TrendingUp, label: 'Progress', value: `${overallProgress}%`, color: 'text-primary' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading mb-1">Welcome back</h1>
        <p className="text-muted-foreground">Pick up where you left off and keep learning.</p>
      </div>

      {/* Continue card + Progress */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Link
          to={`/chapter/${currentChapterData.id}`}
          className="lg:col-span-2 group rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-6 hover:border-primary/40 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Clock className="w-3.5 h-3.5" /> Continue where you left off
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  currentChapterData.level === 'Basics' ? 'bg-blue-500/15 text-blue-500' : 'bg-purple-500/15 text-purple-500'
                }`}>
                  {currentChapterData.level}
                </span>
                <span className="text-xs text-muted-foreground">Chapter {currentChapterData.number}</span>
              </div>
              <h2 className="text-xl font-semibold mb-1">{currentChapterData.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-2">{currentChapterData.intro}</p>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center group-hover:scale-105 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </Link>

        <div className="rounded-2xl border border-border bg-card/50 p-6 flex flex-col items-center justify-center">
          <ProgressRing progress={overallProgress} size={110} />
          <p className="text-sm text-muted-foreground mt-3">Curriculum Progress</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="rounded-xl border border-border bg-card/50 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/40 flex items-center justify-center">
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-lg font-semibold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chapter grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold font-heading">All Chapters</h2>
          <Link to="/curriculum" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {curriculum.map(chapter => {
            const status = getChapterStatus(chapter.id);
            return (
              <Link
                key={chapter.id}
                to={status === 'locked' ? '#' : `/chapter/${chapter.id}`}
                className={`group rounded-xl border p-4 transition-all ${
                  status === 'locked'
                    ? 'border-border bg-card/20 opacity-50 cursor-not-allowed'
                    : 'border-border bg-card/50 hover:border-primary/40 hover:bg-card'
                }`}
                onClick={e => status === 'locked' && e.preventDefault()}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-muted-foreground">Ch. {chapter.number}</span>
                  {status === 'completed' ? (
                    <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    </span>
                  ) : status === 'locked' ? (
                    <span className="w-6 h-6 rounded-full bg-secondary/30 flex items-center justify-center">
                      <Lock className="w-3 h-3 text-muted-foreground" />
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-sm mb-1 leading-snug">{chapter.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{chapter.intro}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}