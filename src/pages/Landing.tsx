import { Link } from 'react-router-dom';
import { Code2, ArrowRight, Zap, BookOpen, Terminal, Check, GraduationCap } from 'lucide-react';
import { curriculum } from '@/data/curriculum';
import { useProgress } from '@/hooks/useProgress';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Landing() {
  const { overallProgress, completedCount } = useProgress();
  const hasProgress = completedCount > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 lg:px-8 py-3.5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg font-heading">React Path</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/curriculum" className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Curriculum
            </Link>
            <ThemeToggle />
            <Link
              to={hasProgress ? "/dashboard" : "/dashboard"}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {hasProgress ? "Continue" : "Start Learning"} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
        <div className="relative max-w-4xl mx-auto px-4 lg:px-8 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 text-xs text-muted-foreground mb-6">
            <Zap className="w-3 h-3 text-primary" />
            15 chapters · Basics to Intermediate
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold font-heading tracking-tight mb-6 leading-[1.05]">
            Learn React
            <br />
            <span className="text-primary">the right way.</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A structured, interactive course with live code sandboxes and quiz-based learning.
            No setup, no fluff — just you, React, and a clear path forward.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              {hasProgress ? `Continue Learning (${overallProgress}%)` : "Start Learning — Free"} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/curriculum"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card/50 font-medium hover:bg-secondary/40 transition-colors"
            >
              <BookOpen className="w-4 h-4" /> View Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, title: "Structured Curriculum", desc: "15 chapters covering JSX, hooks, state, context, routing, and more — organized from basics to intermediate." },
            { icon: Terminal, title: "Live Code Sandbox", desc: "Write and run React code directly in your browser. No install, no setup. Just code and see results instantly." },
            { icon: GraduationCap, title: "Quiz-Based Learning", desc: "Each chapter ends with a quiz. Score 70%+ to unlock the next chapter. Track your progress and build a streak." },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="rounded-2xl border border-border bg-card/50 p-6 hover:border-primary/30 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* What you'll learn */}
      <section className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <h2 className="text-2xl font-bold font-heading text-center mb-10">What You'll Learn</h2>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
          {curriculum.map(chapter => (
            <div key={chapter.id} className="flex items-center gap-3 py-2.5 border-b border-border/50">
              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-secondary/40 flex items-center justify-center text-xs font-mono font-semibold">
                {chapter.number}
              </span>
              <span className="text-sm flex-1">{chapter.title}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                chapter.level === 'Basics' ? 'bg-blue-500/15 text-blue-500' : 'bg-purple-500/15 text-purple-500'
              }`}>
                {chapter.level}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 lg:px-8 py-20 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">Ready to start?</h2>
        <p className="text-muted-foreground mb-8">Jump in and learn at your own pace. Your progress is saved automatically.</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          {hasProgress ? `Continue (${overallProgress}%)` : "Start Learning"} <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code2 className="w-4 h-4 text-primary" />
            React Path
          </div>
          <p className="text-xs text-muted-foreground/60">Built for self-learners. No account required — progress saves locally.</p>
        </div>
      </footer>
    </div>
  );
}