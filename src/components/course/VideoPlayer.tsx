import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize } from 'lucide-react';
import type { Lesson } from '@/types';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  coverImage: string;
  title: string;
  currentLesson?: Lesson;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  className?: string;
}

export default function VideoPlayer({
  coverImage,
  title,
  currentLesson,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  hasNext = true,
  hasPrev = false,
  className = '',
}: VideoPlayerProps) {
  return (
    <div className={cn('relative aspect-video w-full overflow-hidden rounded-2xl bg-navy-900', className)}>
      <img src={coverImage} alt={title} className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-navy-900/30 flex items-center justify-center">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className={cn(
              'w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200',
              hasPrev
                ? 'hover:bg-white/30 hover:scale-110 text-white'
                : 'opacity-30 cursor-not-allowed text-white/60'
            )}
            aria-label="上一节课"
          >
            <SkipBack className="w-5 h-5" fill="currentColor" />
          </button>

          <button
            type="button"
            onClick={onTogglePlay}
            className="group relative w-20 h-20 rounded-full bg-white/90 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white"
            aria-label={isPlaying ? '暂停视频' : '播放视频'}
          >
            {!isPlaying && (
              <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
            )}
            {isPlaying ? (
              <Pause className="w-8 h-8 text-brand-600" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8 text-brand-600 ml-1" fill="currentColor" />
            )}
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            className={cn(
              'w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200',
              hasNext
                ? 'hover:bg-white/30 hover:scale-110 text-white'
                : 'opacity-30 cursor-not-allowed text-white/60'
            )}
            aria-label="下一节课"
          >
            <SkipForward className="w-5 h-5" fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 p-5 bg-gradient-to-b from-navy-900/70 via-navy-900/30 to-transparent">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-white font-semibold text-lg truncate">
              {currentLesson?.title || title}
            </p>
            {currentLesson && (
              <p className="text-white/60 text-sm mt-1">正在播放 · {currentLesson.duration}</p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors">
              <Volume2 className="w-4.5 h-4.5" />
            </button>
            <button className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors">
              <Maximize className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-transparent">
        <div className="px-5 pt-8 pb-4">
          <div className="relative h-1 bg-white/20 rounded-full mb-4 overflow-hidden">
            <div
              className={cn(
                'absolute left-0 top-0 h-full rounded-full bg-gradient-brand transition-all duration-300',
                isPlaying ? 'w-1/3' : 'w-0'
              )}
            />
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg transition-all duration-300',
                isPlaying ? 'left-1/3' : 'left-0'
              )}
            />
          </div>

          <div className="flex items-center justify-between text-white/70 text-xs">
            <span>{isPlaying ? '05:23' : '00:00'}</span>
            <span>{currentLesson?.duration || '--:--'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
