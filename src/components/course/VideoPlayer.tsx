import { Play } from 'lucide-react';

interface VideoPlayerProps {
  coverImage: string;
  title: string;
  className?: string;
}

export default function VideoPlayer({ coverImage, title, className = '' }: VideoPlayerProps) {
  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-navy-900 ${className}`}>
      <img
        src={coverImage}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-navy-900/40 flex items-center justify-center">
        <button
          type="button"
          className="group relative w-20 h-20 rounded-full bg-white/90 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white"
          aria-label="播放视频"
        >
          <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
          <Play className="w-8 h-8 text-brand-600 ml-1" fill="currentColor" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-navy-900/80 via-navy-900/40 to-transparent">
        <p className="text-white font-medium text-lg">课程预览</p>
        <p className="text-white/60 text-sm mt-1">点击播放免费试看视频</p>
      </div>
    </div>
  );
}
