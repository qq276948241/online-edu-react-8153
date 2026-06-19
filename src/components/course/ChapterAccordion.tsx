import { ChevronDown, Play, Pause, Eye, Clock } from 'lucide-react';
import type { Chapter } from '@/types';
import { cn } from '@/lib/utils';

interface ChapterAccordionProps {
  chapters: Chapter[];
  expandedChapterIds: Set<string>;
  currentLessonId: string | null;
  isPlaying: boolean;
  totalLessons: number;
  totalDurationText: string;

  onToggleChapter: (chapterId: string) => void;
  onPlayLesson: (chapterId: string, lessonId: string) => void;
  onSelectLesson?: (chapterId: string, lessonId: string) => void;

  getChapterStats: (chapter: Chapter) => {
    lessonCount: number;
    durationSeconds: number;
    durationText: string;
  };

  className?: string;
}

export default function ChapterAccordion({
  chapters,
  expandedChapterIds,
  currentLessonId,
  isPlaying,
  totalLessons,
  totalDurationText,
  onToggleChapter,
  onPlayLesson,
  onSelectLesson,
  getChapterStats,
  className = '',
}: ChapterAccordionProps) {
  return (
    <div className={`card overflow-hidden ${className}`}>
      <div className="p-5 border-b border-navy-700/5 bg-gradient-to-r from-brand-50 to-sky-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-navy-900">课程目录</h3>
            <p className="text-sm text-navy-700/60 mt-1">
              {chapters.length} 章 · {totalLessons} 节课 · 共 {totalDurationText}
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-navy-700/5">
        {chapters.map((chapter, idx) => {
          const isExpanded = expandedChapterIds.has(chapter.id);
          const stats = getChapterStats(chapter);

          return (
            <div key={chapter.id}>
              <button
                type="button"
                onClick={() => onToggleChapter(chapter.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-navy-700/[0.02] transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-600 flex items-center justify-center shrink-0 font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-900 truncate pr-2">
                    {chapter.title}
                  </p>
                  <p className="text-xs text-navy-700/50 mt-1">
                    {stats.lessonCount} 节课 · {stats.durationText}
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-navy-700/40 shrink-0 transition-transform duration-300',
                    isExpanded && 'rotate-180'
                  )}
                />
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-smooth',
                  isExpanded ? 'max-h-[2000px]' : 'max-h-0'
                )}
              >
                <div className="px-4 pb-4">
                  <div className="space-y-1 pl-11">
                    {chapter.lessons.map((lesson, lidx) => {
                      const isCurrent = currentLessonId === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => {
                            onPlayLesson(chapter.id, lesson.id);
                            onSelectLesson?.(chapter.id, lesson.id);
                          }}
                          className={cn(
                            'w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left',
                            isCurrent
                              ? 'bg-gradient-to-r from-brand-50 to-sky-50 ring-1 ring-brand-500/30'
                              : lesson.isPreview
                              ? 'bg-accent-gold/5 hover:bg-accent-gold/10'
                              : 'hover:bg-navy-700/[0.03]'
                          )}
                        >
                          <div
                            className={cn(
                              'w-7 h-7 rounded-full flex items-center justify-center shrink-0',
                              isCurrent
                                ? isPlaying
                                  ? 'bg-gradient-brand text-white'
                                  : 'bg-brand-500/15 text-brand-600'
                                : lesson.isPreview
                                ? 'bg-accent-gold/15 text-accent-gold'
                                : 'bg-navy-700/5 text-navy-700/40'
                            )}
                          >
                            {isCurrent && isPlaying ? (
                              <Pause className="w-3 h-3" fill="currentColor" />
                            ) : (
                              <Play className="w-3 h-3" fill="currentColor" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                'text-sm font-medium truncate',
                                isCurrent ? 'text-brand-700' : 'text-navy-800'
                              )}
                            >
                              {lidx + 1}. {lesson.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {lesson.isPreview && (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-gold bg-accent-gold/10 px-2 py-0.5 rounded-full">
                                <Eye className="w-3 h-3" />
                                试看
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 text-xs text-navy-700/50">
                              <Clock className="w-3 h-3" />
                              {lesson.duration}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
