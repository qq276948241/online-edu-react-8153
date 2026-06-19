import { useState, useRef, useEffect } from 'react';
import {
  StickyNote,
  Plus,
  Trash2,
  Edit3,
  Star,
  Check,
  X,
  ChevronDown,
  BookOpen,
  Clock,
} from 'lucide-react';
import type { Chapter, Note } from '@/types';
import { useNotesStore } from '@/store/useNotesStore';
import { cn } from '@/lib/utils';

interface NotePanelProps {
  courseId: string;
  chapters: Chapter[];
  className?: string;
}

function formatNoteTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return '刚刚';
  if (diffMins < 60) return `${diffMins} 分钟前`;
  if (diffHours < 24) return `${diffHours} 小时前`;
  if (diffDays < 7) return `${diffDays} 天前`;
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

export default function NotePanel({ courseId, chapters, className = '' }: NotePanelProps) {
  const [activeChapterId, setActiveChapterId] = useState(chapters[0]?.id || '');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftContent, setDraftContent] = useState('');
  const [chapterDropdownOpen, setChapterDropdownOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { notes, addNote, updateNote, deleteNote, toggleImportant, getNotesByChapter } =
    useNotesStore();

  const chapterNotes = getNotesByChapter(courseId, activeChapterId);
  const totalNotes = useNotesStore((s) => s.getNotesByCourse(courseId).length);

  const activeChapter = chapters.find((c) => c.id === activeChapterId);

  useEffect(() => {
    if (isAdding && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isAdding]);

  const handleAddNote = () => {
    if (!draftContent.trim() || !activeChapterId) return;
    addNote({
      courseId,
      chapterId: activeChapterId,
      content: draftContent.trim(),
    });
    setDraftContent('');
    setIsAdding(false);
  };

  const handleStartEdit = (note: Note) => {
    setEditingId(note.id);
    setDraftContent(note.content);
  };

  const handleSaveEdit = () => {
    if (!editingId || !draftContent.trim()) return;
    updateNote(editingId, draftContent.trim());
    setEditingId(null);
    setDraftContent('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDraftContent('');
  };

  const handleStartAdd = () => {
    setIsAdding(true);
    setDraftContent('');
    setEditingId(null);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setDraftContent('');
  };

  return (
    <div className={`card overflow-hidden flex flex-col ${className}`}>
      <div className="p-5 border-b border-navy-700/5 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-accent-gold to-amber-500 flex items-center justify-center">
              <StickyNote className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-900">学习笔记</h3>
              <p className="text-xs text-navy-700/60 mt-0.5">
                共 {totalNotes} 条笔记 · 自动保存
              </p>
            </div>
          </div>
          <button
            onClick={handleStartAdd}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-brand text-white text-sm font-medium shadow-btn hover:shadow-btn-hover hover:-translate-y-0.5 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            记笔记
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setChapterDropdownOpen(!chapterDropdownOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-navy-700/10 hover:border-brand-500/30 transition-colors text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              <BookOpen className="w-4 h-4 text-brand-500 shrink-0" />
              <span className="text-sm font-medium text-navy-900 truncate">
                {activeChapter?.title || '选择章节'}
              </span>
            </div>
            <ChevronDown
              className={cn(
                'w-4 h-4 text-navy-700/40 shrink-0 transition-transform duration-200',
                chapterDropdownOpen && 'rotate-180'
              )}
            />
          </button>

          {chapterDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-navy-700/10 rounded-xl shadow-lg shadow-navy-900/5 z-20 max-h-64 overflow-y-auto scrollbar-thin">
              {chapters.map((chapter, idx) => {
                const count = getNotesByChapter(courseId, chapter.id).length;
                const isActive = chapter.id === activeChapterId;
                return (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      setActiveChapterId(chapter.id);
                      setChapterDropdownOpen(false);
                      setIsAdding(false);
                      setEditingId(null);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3.5 py-2.5 text-left transition-colors',
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'hover:bg-navy-700/[0.03] text-navy-800'
                    )}
                  >
                    <div
                      className={cn(
                        'w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-xs font-bold',
                        isActive
                          ? 'bg-brand-500 text-white'
                          : 'bg-navy-700/5 text-navy-700/50'
                      )}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{chapter.title}</p>
                    </div>
                    {count > 0 && (
                      <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold font-medium">
                        {count} 条
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 max-h-[500px]">
        {isAdding && (
          <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-accent-gold/20">
            <textarea
              ref={textareaRef}
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              placeholder="记录你的学习心得、重点知识、疑问思考..."
              className="w-full h-24 px-3 py-2.5 rounded-lg bg-white border border-navy-700/10 text-sm text-navy-900 placeholder:text-navy-700/40 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-navy-700/40">
                当前章节：第 {chapters.findIndex((c) => c.id === activeChapterId) + 1} 章
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancelAdd}
                  className="px-3 py-1.5 text-sm text-navy-700/60 hover:text-navy-700 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleAddNote}
                  disabled={!draftContent.trim()}
                  className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-gradient-brand text-white text-sm font-medium shadow-sm hover:shadow-btn transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Check className="w-3.5 h-3.5" />
                  保存笔记
                </button>
              </div>
            </div>
          </div>
        )}

        {chapterNotes.length === 0 && !isAdding ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-navy-700/[0.04] flex items-center justify-center">
              <StickyNote className="w-7 h-7 text-navy-700/30" />
            </div>
            <p className="text-sm text-navy-700/50 mb-1">这一章还没有笔记</p>
            <p className="text-xs text-navy-700/30 mb-4">
              看视频时随时记录重点，复习更高效
            </p>
            <button
              onClick={handleStartAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              写第一条笔记
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {chapterNotes.map((note) => (
              <div
                key={note.id}
                className={cn(
                  'group p-4 rounded-xl border transition-all duration-200',
                  note.isImportant
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-accent-gold/30'
                    : 'bg-white border-navy-700/8 hover:border-navy-700/15 hover:shadow-sm'
                )}
              >
                {editingId === note.id ? (
                  <div>
                    <textarea
                      value={draftContent}
                      onChange={(e) => setDraftContent(e.target.value)}
                      className="w-full h-24 px-3 py-2.5 rounded-lg bg-white border border-navy-700/10 text-sm text-navy-900 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                      autoFocus
                    />
                    <div className="flex items-center justify-end gap-2 mt-3">
                      <button
                        onClick={handleCancelEdit}
                        className="p-1.5 rounded-lg text-navy-700/50 hover:text-navy-700 hover:bg-navy-700/5 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        disabled={!draftContent.trim()}
                        className="p-1.5 rounded-lg text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors disabled:opacity-40"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-navy-700/40" />
                        <span className="text-xs text-navy-700/50">
                          {formatNoteTime(note.updatedAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleImportant(note.id)}
                          className={cn(
                            'p-1.5 rounded-lg transition-colors',
                            note.isImportant
                              ? 'text-accent-gold bg-accent-gold/10'
                              : 'text-navy-700/40 hover:text-accent-gold hover:bg-accent-gold/10'
                          )}
                          title={note.isImportant ? '取消重要' : '标记重要'}
                        >
                          <Star
                            className="w-3.5 h-3.5"
                            fill={note.isImportant ? 'currentColor' : 'none'}
                          />
                        </button>
                        <button
                          onClick={() => handleStartEdit(note)}
                          className="p-1.5 rounded-lg text-navy-700/40 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                          title="编辑"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="p-1.5 rounded-lg text-navy-700/40 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="删除"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-navy-800 leading-relaxed whitespace-pre-wrap break-words">
                      {note.content}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
