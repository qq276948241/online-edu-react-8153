import { useState } from 'react';
import { ChevronDown, Play, Eye, Clock } from 'lucide-react';
import type { Chapter } from '@/types';

interface ChapterAccordionProps {
  chapters: Chapter[];
  className?: string;
}

export default function ChapterAccordion({ chapters, className = '' }: ChapterAccordionProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set([chapters[0]?.id].filter(Boolean) as string[]));

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalLessons = chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const totalDuration = chapters.reduce((sum, ch) => {
    return sum + ch.lessons.reduce((s, l) => {
      const [min, sec] = l.duration.split(':').map(Number);
      return s + min * 60 + sec;
    }, 0);
  }, 0);
  const totalHours = Math.floor(totalDuration / 3600);
  const totalMins = Math.floor((totalDuration % 3600) / 60);

  return (
    <div className={`card overflow-hidden ${className}`}>
      <div className="p-5 border-b border-navy-700/5 bg-gradient-to-r from-brand-50 to-sky-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-navy-900">课程目录</h3>
            <p className="text-sm text-navy-700/60 mt-1">
              {chapters.length} 章 · {totalLessons} 节课 · 共 {totalHours}小时{totalMins}分
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-navy-700/5">
        {chapters.map((chapter, idx) => {
          const isExpanded = expandedIds.has(chapter.id);
          const chapterDuration = chapter.lessons.reduce((s, l) => {
            const [min, sec] = l.duration.split(':').map(Number);
            return s + min * 60 + sec;
          }, 0);
          const chapterMins = Math.floor(chapterDuration / 60);

          return (
            <div key={chapter.id}>
              <button
                type="button"
                onClick={() => toggle(chapter.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-navy-700/[0.02] transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-600 flex items-center justify-center shrink-0 font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-900 truncate pr-2">{chapter.title}</p>
                  <p className="text-xs text-navy-700/50 mt-1">
                    {chapter.lessons.length} 节课 · {chapterMins} 分钟
                  </p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-navy-700/40 shrink-0 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-smooth ${
                  isExpanded ? 'max-h-[1000px]' : 'max-h-0'
                }`}
              >
                <div className="px-4 pb-4">
                  <div className="space-y-1 pl-11">
                    {chapter.lessons.map((lesson, lidx) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          lesson.isPreview
                            ? 'bg-accent-gold/5 hover:bg-accent-gold/10 cursor-pointer'
                            : 'hover:bg-navy-700/[0.03] cursor-pointer'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                            lesson.isPreview
                              ? 'bg-accent-gold/15 text-accent-gold'
                              : 'bg-navy-700/5 text-navy-700/40'
                          }`}
                        >
                          <Play className="w-3 h-3" fill="currentColor" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy-800 truncate">
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
                      </div>
                    ))}
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
