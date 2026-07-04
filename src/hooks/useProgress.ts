import { useState, useEffect, useCallback, useMemo } from 'react';
import { curriculum } from '@/data/curriculum';

const STORAGE_KEY = 'reactpath-progress';
const TOTAL_CHAPTERS = curriculum.length;
const PASS_THRESHOLD = 70;

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fall through to defaults
  }
  return {
    completedChapters: [],
    quizScores: {},
    currentChapter: curriculum[0].id,
    lastActive: null,
    streak: 0,
  };
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function yesterdayStr() {
  return new Date(Date.now() - 86400000).toISOString().split('T')[0];
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  // Persist to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Update streak on mount (runs once)
  useEffect(() => {
    setProgress(prev => {
      const today = todayStr();
      if (prev.lastActive === today) return prev;
      const newStreak = prev.lastActive === yesterdayStr() ? prev.streak + 1 : 1;
      return { ...prev, lastActive: today, streak: newStreak };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveQuizScore = useCallback((chapterId, score) => {
    setProgress(prev => {
      const prevScore = prev.quizScores[chapterId] || { best: 0, attempts: 0, lastScore: 0 };
      const updatedScore = {
        best: Math.max(prevScore.best, score),
        attempts: prevScore.attempts + 1,
        lastScore: score,
      };

      const passed = score >= PASS_THRESHOLD;
      const newCompleted =
        passed && !prev.completedChapters.includes(chapterId)
          ? [...prev.completedChapters, chapterId]
          : prev.completedChapters;

      const chapterIdx = curriculum.findIndex(c => c.id === chapterId);
      const nextChapter =
        chapterIdx < TOTAL_CHAPTERS - 1 ? curriculum[chapterIdx + 1].id : chapterId;
      const newCurrent = passed ? nextChapter : prev.currentChapter;

      return {
        ...prev,
        quizScores: { ...prev.quizScores, [chapterId]: updatedScore },
        completedChapters: newCompleted,
        currentChapter: newCurrent,
      };
    });
  }, []);

  const setCurrentChapter = useCallback(chapterId => {
    setProgress(prev => ({ ...prev, currentChapter: chapterId }));
  }, []);

  const isChapterUnlocked = useCallback(
    chapterId => {
      const idx = curriculum.findIndex(c => c.id === chapterId);
      if (idx <= 0) return true;
      const prevChapter = curriculum[idx - 1];
      return progress.completedChapters.includes(prevChapter.id);
    },
    [progress.completedChapters]
  );

  const getChapterStatus = useCallback(
    chapterId => {
      if (progress.completedChapters.includes(chapterId)) return 'completed';
      if (isChapterUnlocked(chapterId)) return 'in-progress';
      return 'locked';
    },
    [progress.completedChapters, isChapterUnlocked]
  );

  const overallProgress = useMemo(
    () => Math.round((progress.completedChapters.length / TOTAL_CHAPTERS) * 100),
    [progress.completedChapters]
  );

  return {
    progress,
    saveQuizScore,
    setCurrentChapter,
    isChapterUnlocked,
    getChapterStatus,
    overallProgress,
    totalChapters: TOTAL_CHAPTERS,
    completedCount: progress.completedChapters.length,
  };
}