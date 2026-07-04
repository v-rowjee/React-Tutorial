import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, LayoutDashboard, BookOpen, User } from 'lucide-react';
import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ProgressBar from '@/components/ui/ProgressBar';
import { useProgress } from '@/hooks/useProgress';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const progressHook = useProgress();
  const { progress, getChapterStatus, currentChapter, overallProgress } = progressHook;

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/curriculum', label: 'Curriculum', icon: BookOpen },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 z-40 h-full w-72 border-r border-border bg-card/60 backdrop-blur-sm transition-transform duration-200 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <Link to="/" className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg font-heading">React Path</span>
          </Link>

          <div className="px-3 py-4 border-b border-border">
            <div className="space-y-1">
              {navLinks.map(link => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive(link.to)
                        ? 'bg-primary/15 text-primary font-medium'
                        : 'text-muted-foreground hover:bg-secondary/30 hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Overall Progress</span>
              <span className="text-xs font-semibold">{overallProgress}%</span>
            </div>
            <ProgressBar value={overallProgress} />
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4">
            <Sidebar
              progress={progress}
              getChapterStatus={getChapterStatus}
              currentChapter={currentChapter}
            />
          </div>
        </div>
      </aside>

      <div className="lg:ml-72">
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 lg:px-8 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary/40"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-xs">{progress.completedChapters?.length || 0}/15 chapters</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="fixed top-4 right-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-border"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <main className="px-4 lg:px-8 py-6 max-w-5xl mx-auto">
          <Outlet context={progressHook} />
        </main>
      </div>
    </div>
  );
}