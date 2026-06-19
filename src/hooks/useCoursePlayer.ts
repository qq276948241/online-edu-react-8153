import { useState, useMemo, useCallback } from 'react';
import type { Chapter, Lesson } from '@/types';

interface UseCoursePlayerOptions {
  chapters: Chapter[];
  autoExpandFirst?: boolean;
}

interface UseCoursePlayerReturn {
  expandedChapterIds: Set<string>;
  currentChapterId: string | null;
  currentLessonId: string | null;
  isPlaying: boolean;

  currentChapter: Chapter | undefined;
  currentLesson: Lesson | undefined;
  currentLessonIndex: number;
  currentChapterIndex: number;

  totalLessons: number;
  totalDurationSeconds: number;
  totalDurationText: string;

  toggleChapter: (chapterId: string) => void;
  expandChapter: (chapterId: string) => void;
  collapseChapter: (chapterId: string) => void;
  expandAll: () => void;
  collapseAll: () => void;

  isChapterExpanded: (chapterId: string) => boolean;

  selectLesson: (chapterId: string, lessonId: string) => void;
  playLesson: (chapterId: string, lessonId: string) => void;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;

  nextLesson: () => void;
  prevLesson: () => void;

  getChapterStats: (chapter: Chapter) => {
    lessonCount: number;
    durationSeconds: number;
    durationText: string;
  };
}

function parseDurationToSeconds(duration: string): number {
  const parts = duration.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 0;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}小时${mins}分`;
  }
  return `${mins}分钟`;
}

function findLessonPosition(
  chapters: Chapter[],
  lessonId: string
): { chapterIndex: number; lessonIndex: number } | null {
  for (let ci = 0; ci < chapters.length; ci++) {
    const li = chapters[ci].lessons.findIndex((l) => l.id === lessonId);
    if (li !== -1) {
      return { chapterIndex: ci, lessonIndex: li };
    }
  }
  return null;
}

function getLessonByIndex(
  chapters: Chapter[],
  chapterIndex: number,
  lessonIndex: number
): Lesson | null {
  const chapter = chapters[chapterIndex];
  if (!chapter) return null;
  return chapter.lessons[lessonIndex] || null;
}

function getTotalLessonsCount(chapters: Chapter[]): number {
  return chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
}

function getTotalDuration(chapters: Chapter[]): number {
  return chapters.reduce((sum, ch) => {
    return (
      sum +
      ch.lessons.reduce((s, l) => s + parseDurationToSeconds(l.duration), 0)
    );
  }, 0);
}

export function useCoursePlayer({
  chapters,
  autoExpandFirst = true,
}: UseCoursePlayerOptions): UseCoursePlayerReturn {
  const initialExpanded = useMemo(() => {
    if (autoExpandFirst && chapters.length > 0) {
      return new Set([chapters[0].id]);
    }
    return new Set<string>();
  }, [chapters, autoExpandFirst]);

  const [expandedChapterIds, setExpandedChapterIds] = useState<Set<string>>(initialExpanded);
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(
    chapters[0]?.id || null
  );
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(
    chapters[0]?.lessons[0]?.id || null
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const currentChapterIndex = useMemo(() => {
    if (!currentChapterId) return -1;
    return chapters.findIndex((c) => c.id === currentChapterId);
  }, [currentChapterId, chapters]);

  const currentLessonIndex = useMemo(() => {
    if (!currentLessonId) return -1;
    const pos = findLessonPosition(chapters, currentLessonId);
    return pos ? pos.lessonIndex : -1;
  }, [currentLessonId, chapters]);

  const currentChapter = useMemo(() => {
    return chapters.find((c) => c.id === currentChapterId);
  }, [currentChapterId, chapters]);

  const currentLesson = useMemo(() => {
    const pos = findLessonPosition(chapters, currentLessonId || '');
    if (!pos) return undefined;
    return chapters[pos.chapterIndex].lessons[pos.lessonIndex];
  }, [currentLessonId, chapters]);

  const totalLessons = useMemo(() => getTotalLessonsCount(chapters), [chapters]);
  const totalDurationSeconds = useMemo(() => getTotalDuration(chapters), [chapters]);
  const totalDurationText = useMemo(
    () => formatDuration(totalDurationSeconds),
    [totalDurationSeconds]
  );

  const toggleChapter = useCallback((chapterId: string) => {
    setExpandedChapterIds((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  }, []);

  const expandChapter = useCallback((chapterId: string) => {
    setExpandedChapterIds((prev) => {
      if (prev.has(chapterId)) return prev;
      const next = new Set(prev);
      next.add(chapterId);
      return next;
    });
  }, []);

  const collapseChapter = useCallback((chapterId: string) => {
    setExpandedChapterIds((prev) => {
      if (!prev.has(chapterId)) return prev;
      const next = new Set(prev);
      next.delete(chapterId);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedChapterIds(new Set(chapters.map((c) => c.id)));
  }, [chapters]);

  const collapseAll = useCallback(() => {
    setExpandedChapterIds(new Set());
  }, []);

  const isChapterExpanded = useCallback(
    (chapterId: string) => expandedChapterIds.has(chapterId),
    [expandedChapterIds]
  );

  const selectLesson = useCallback(
    (chapterId: string, lessonId: string) => {
      setCurrentChapterId(chapterId);
      setCurrentLessonId(lessonId);
      expandChapter(chapterId);
    },
    [expandChapter]
  );

  const playLesson = useCallback(
    (chapterId: string, lessonId: string) => {
      selectLesson(chapterId, lessonId);
      setIsPlaying(true);
    },
    [selectLesson]
  );

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);

  const nextLesson = useCallback(() => {
    const pos = findLessonPosition(chapters, currentLessonId || '');
    if (!pos) return;

    const { chapterIndex, lessonIndex } = pos;
    const currentChapterData = chapters[chapterIndex];

    if (lessonIndex < currentChapterData.lessons.length - 1) {
      const nextLessonData = currentChapterData.lessons[lessonIndex + 1];
      playLesson(currentChapterData.id, nextLessonData.id);
      return;
    }

    if (chapterIndex < chapters.length - 1) {
      const nextChapterData = chapters[chapterIndex + 1];
      const nextLessonData = nextChapterData.lessons[0];
      playLesson(nextChapterData.id, nextLessonData.id);
    }
  }, [chapters, currentLessonId, playLesson]);

  const prevLesson = useCallback(() => {
    const pos = findLessonPosition(chapters, currentLessonId || '');
    if (!pos) return;

    const { chapterIndex, lessonIndex } = pos;

    if (lessonIndex > 0) {
      const prevLessonData = chapters[chapterIndex].lessons[lessonIndex - 1];
      playLesson(chapters[chapterIndex].id, prevLessonData.id);
      return;
    }

    if (chapterIndex > 0) {
      const prevChapterData = chapters[chapterIndex - 1];
      const prevLessonData =
        prevChapterData.lessons[prevChapterData.lessons.length - 1];
      playLesson(prevChapterData.id, prevLessonData.id);
    }
  }, [chapters, currentLessonId, playLesson]);

  const getChapterStats = useCallback((chapter: Chapter) => {
    const lessonCount = chapter.lessons.length;
    const durationSeconds = chapter.lessons.reduce(
      (s, l) => s + parseDurationToSeconds(l.duration),
      0
    );
    return {
      lessonCount,
      durationSeconds,
      durationText: formatDuration(durationSeconds),
    };
  }, []);

  return {
    expandedChapterIds,
    currentChapterId,
    currentLessonId,
    isPlaying,
    currentChapter,
    currentLesson,
    currentLessonIndex,
    currentChapterIndex,
    totalLessons,
    totalDurationSeconds,
    totalDurationText,
    toggleChapter,
    expandChapter,
    collapseChapter,
    expandAll,
    collapseAll,
    isChapterExpanded,
    selectLesson,
    playLesson,
    togglePlay,
    play,
    pause,
    nextLesson,
    prevLesson,
    getChapterStats,
  };
}

export default useCoursePlayer;
