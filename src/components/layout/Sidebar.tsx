import { Link, useLocation } from 'react-router-dom';
import { Check, Lock, Circle } from 'lucide-react';
import { curriculum } from '@/data/curriculum';

export default function Sidebar({ progress, getChapterStatus, currentChapter }) {
  const location = useLocation();
  const basics = curriculum.filter(c => c.level === 'Basics');
  const intermediate = curriculum.filter(c => c.level === 'Intermediate');

  const renderChapter = (chapter) => {
    const status = getChapterStatus(chapter.id);
    const isActive = location.pathname === `/chapter/${chapter.id}`;
    const isCurrent = currentChapter === chapter.id;

    const linkClasses = `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group ${
      isActive
        ? 'bg-primary/15 text-primary font-medium'
        : status === 'locked'
          ? 'text-muted-foreground/40 cursor-not-allowed'
          : 'text-muted-foreground hover:bg-secondary/30 hover:text-foreground'
    }`;

    const statusIcon = status === 'completed' ? (
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
        <Check className="w-3 h-3 text-green-500" />
      </span>
    ) : status === 'locked' ? (
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center">
        <Lock className="w-2.5 h-2.5" />
      </span>
    ) : (
      <span className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        isActive || isCurrent ? 'border-primary' : 'border-border'
      }`}>
        {isActive || isCurrent ? <Circle className="w-2 h-2 fill-primary text-primary" /> : <span className="text-[9px] text-muted-foreground">{chapter.number}</span>}
      </span>
    );

    if (status === 'locked') {
      return (
        <div key={chapter.id} className={linkClasses} title="Complete the previous chapter to unlock">
          {statusIcon}
          <span className="flex-1 truncate">{chapter.number}. {chapter.title}</span>
        </div>
      );
    }

    return (
      <Link key={chapter.id} to={`/chapter/${chapter.id}`} className={linkClasses}>
        {statusIcon}
        <span className="flex-1 truncate">{chapter.number}. {chapter.title}</span>
      </Link>
    );
  };

  return (
    <nav className="space-y-6">
      <div>
        <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          Level 1 — Basics
        </h3>
        <div className="space-y-1">
          {basics.map(renderChapter)}
        </div>
      </div>
      <div>
        <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          Level 2 — Intermediate
        </h3>
        <div className="space-y-1">
          {intermediate.map(renderChapter)}
        </div>
      </div>
    </nav>
  );
}