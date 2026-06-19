import { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Users,
  BookOpen,
  Clock,
  Award,
  Target,
  Sparkles,
  User,
  MessageSquare,
  ArrowRight,
  Shield,
  RefreshCw,
  FileText,
  List,
  StickyNote,
} from 'lucide-react';
import {
  getCourseById,
  getInstructorById,
  getReviewsByCourse,
  getCategoryName,
  getLevelLabel,
  formatDate,
} from '@/data/helpers';
import StarRating from '@/components/common/StarRating';
import VideoPlayer from '@/components/course/VideoPlayer';
import ChapterAccordion from '@/components/course/ChapterAccordion';
import NotePanel from '@/components/course/NotePanel';
import { useNotesStore } from '@/store/useNotesStore';
import { useCoursePlayer } from '@/hooks/useCoursePlayer';
import { cn } from '@/lib/utils';

type SidebarTab = 'chapters' | 'notes';

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const course = id ? getCourseById(id) : undefined;
  const [activeTab, setActiveTab] = useState<SidebarTab>('chapters');

  const player = useCoursePlayer({
    chapters: course?.chapters || [],
  });

  if (!id || !course) {
    return <Navigate to="/" replace />;
  }

  const instructor = getInstructorById(course.instructorId);
  const reviews = getReviewsByCourse(course.id);
  const discount = Math.round((1 - course.price / course.originalPrice) * 100);
  const totalNotes = useNotesStore((s) => s.getNotesByCourse(course.id).length);

  return (
    <div className="pt-20 pb-16 bg-surface-bg min-h-screen">
      <nav className="container py-4">
        <ol className="flex items-center gap-2 text-sm text-navy-700/60 flex-wrap">
          <li>
            <Link to="/" className="hover:text-brand-600 transition-colors inline-flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              首页
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-navy-700/30" />
          <li>
            <Link to="/courses" className="hover:text-brand-600 transition-colors">
              全部课程
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-navy-700/30" />
          <li>
            <Link to={`/courses?category=${course.category}`} className="hover:text-brand-600 transition-colors">
              {getCategoryName(course.category)}
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-navy-700/30" />
          <li className="text-navy-900 font-medium truncate max-w-[240px]">
            {course.title}
          </li>
        </ol>
      </nav>

      <section className="container">
        <div className="card p-6 md:p-8 mb-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-brand opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="chip !px-2.5 !py-1 text-xs bg-brand-500/10 text-brand-600 font-medium">
                {getLevelLabel(course.level)}
              </span>
              <span className="chip !px-2.5 !py-1 text-xs bg-navy-700/5 text-navy-700">
                {getCategoryName(course.category)}
              </span>
              {course.isHot && (
                <span className="chip !px-2.5 !py-1 text-xs bg-gradient-to-r from-red-500 to-accent-gold text-white">
                  爆款课程
                </span>
              )}
              {course.isNew && (
                <span className="chip !px-2.5 !py-1 text-xs bg-gradient-to-r from-sky-500 to-brand-500 text-white">
                  新课上线
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-900 leading-tight mb-3">
              {course.title}
            </h1>
            <p className="text-base md:text-lg text-navy-700/70 mb-5 max-w-3xl leading-relaxed">
              {course.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-5">
              <div className="flex items-center gap-2">
                <StarRating rating={course.rating} size="md" />
                <span className="text-sm font-semibold text-navy-900">{course.rating.toFixed(1)}</span>
                <span className="text-sm text-navy-700/50">({course.reviewCount.toLocaleString()}条评价)</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-navy-700/70">
                <Users className="w-4 h-4 text-brand-500" />
                <span>{course.totalStudents.toLocaleString()}人学习</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-navy-700/70">
                <BookOpen className="w-4 h-4 text-brand-500" />
                <span>{course.totalLessons}节课</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-navy-700/70">
                <Clock className="w-4 h-4 text-brand-500" />
                <span>{course.duration}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-end gap-5 justify-between">
              <div className="flex items-baseline gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-navy-700/60">¥</span>
                  <span className="text-4xl font-bold text-gradient-brand">{course.price}</span>
                </div>
                {course.originalPrice > course.price && (
                  <>
                    <span className="text-lg text-navy-700/30 line-through">
                      ¥{course.originalPrice}
                    </span>
                    <span className="chip !px-2 !py-0.5 text-xs bg-accent-gold/15 text-accent-gold font-bold">
                      省 ¥{course.originalPrice - course.price}
                      {discount > 0 && ` (${discount}%OFF)`}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button className="btn-secondary !py-3.5">
                  <Shield className="w-4 h-4" />
                  加入收藏
                </button>
                <Link
                  to={`/checkout?courseId=${course.id}`}
                  className="btn-primary !py-3.5 !px-8 text-base"
                >
                  立即报名
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer
              coverImage={course.coverImage}
              title={course.title}
              currentLesson={player.currentLesson}
              isPlaying={player.isPlaying}
              onTogglePlay={player.togglePlay}
              onNext={player.nextLesson}
              onPrev={player.prevLesson}
              hasNext={player.currentLessonIndex < player.totalLessons - 1}
              hasPrev={player.currentLessonIndex > 0}
            />

            <div className="card p-6 md:p-8">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-navy-900">课程介绍</h2>
              </div>
              <p className="text-navy-700/80 leading-relaxed whitespace-pre-line">
                {course.description}
              </p>
            </div>

            <div className="card p-6 md:p-8">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-accent-green to-emerald-500 flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-navy-900">适合人群</h2>
              </div>
              <ul className="space-y-3">
                {course.suitableFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-green/10 text-accent-green flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3 h-3" />
                    </div>
                    <span className="text-navy-700/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6 md:p-8">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-accent-gold to-amber-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-navy-900">课程亮点</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-brand-50 to-sky-50 border border-brand-500/10"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4 text-accent-gold" />
                    </div>
                    <span className="text-navy-800 font-medium leading-relaxed pt-0.5">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-navy-700/5">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-brand-600 font-bold text-xl mb-1">
                    <Shield className="w-5 h-5" />
                    7天
                  </div>
                  <p className="text-xs text-navy-700/50">无理由退款</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-brand-600 font-bold text-xl mb-1">
                    <RefreshCw className="w-5 h-5" />
                    永久
                  </div>
                  <p className="text-xs text-navy-700/50">有效回看</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-brand-600 font-bold text-xl mb-1">
                    <FileText className="w-5 h-5" />
                    作业
                  </div>
                  <p className="text-xs text-navy-700/50">1v1批改</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-brand-600 font-bold text-xl mb-1">
                    <MessageSquare className="w-5 h-5" />
                    社群
                  </div>
                  <p className="text-xs text-navy-700/50">学员交流</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="card overflow-hidden">
                <div className="relative flex border-b border-navy-700/5 bg-white">
                  <div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-brand transition-all duration-300 ease-smooth"
                    style={{
                      width: '50%',
                      transform: activeTab === 'chapters' ? 'translateX(0)' : 'translateX(100%)',
                    }}
                  />
                  <button
                    onClick={() => setActiveTab('chapters')}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-1.5 py-3.5 text-sm font-medium transition-all relative z-10',
                      activeTab === 'chapters'
                        ? 'text-brand-600'
                        : 'text-navy-700/60 hover:text-navy-900'
                    )}
                  >
                    <List className="w-4 h-4" />
                    课程目录
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-1.5 py-3.5 text-sm font-medium transition-all relative z-10',
                      activeTab === 'notes'
                        ? 'text-brand-600'
                        : 'text-navy-700/60 hover:text-navy-900'
                    )}
                  >
                    <StickyNote className="w-4 h-4" />
                    学习笔记
                    {totalNotes > 0 && (
                      <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-bold flex items-center justify-center">
                        {totalNotes}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className={activeTab === 'chapters' ? 'block' : 'hidden'}>
                <ChapterAccordion
                  chapters={course.chapters}
                  expandedChapterIds={player.expandedChapterIds}
                  currentLessonId={player.currentLessonId}
                  isPlaying={player.isPlaying}
                  totalLessons={player.totalLessons}
                  totalDurationText={player.totalDurationText}
                  onToggleChapter={player.toggleChapter}
                  onPlayLesson={player.playLesson}
                  getChapterStats={player.getChapterStats}
                />
              </div>
              <div className={activeTab === 'notes' ? 'block' : 'hidden'}>
                <NotePanel courseId={course.id} chapters={course.chapters} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {instructor && (
        <section className="container mt-6">
          <div className="card overflow-hidden">
            <div className="h-40 bg-gradient-hero relative">
              <img
                src={instructor.coverImage}
                alt={instructor.name}
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-12 relative">
              <div className="flex flex-col md:flex-row md:items-end gap-5 mb-6">
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-2xl ring-4 ring-white shadow-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-2xl font-bold text-navy-900">{instructor.name}</h3>
                    <Link
                      to={`/instructors/${instructor.id}`}
                      className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
                    >
                      查看讲师主页
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <p className="text-navy-700/70 mb-3">{instructor.title}</p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={instructor.rating} size="sm" />
                      <span className="text-sm font-semibold text-navy-900">{instructor.rating.toFixed(1)}</span>
                      <span className="text-sm text-navy-700/50">评分</span>
                    </div>
                    <div className="text-sm text-navy-700/70">
                      <span className="font-semibold text-navy-900">{(instructor.studentCount / 10000).toFixed(1)}w</span> 学员
                    </div>
                    <div className="text-sm text-navy-700/70">
                      <span className="font-semibold text-navy-900">{instructor.courseCount}</span> 门课程
                    </div>
                    <div className="text-sm text-navy-700/70">
                      <span className="font-semibold text-navy-900">{instructor.reviewCount.toLocaleString()}</span> 条评价
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-navy-700/80 leading-relaxed mb-5">{instructor.bio}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {instructor.specialties.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-3 py-1.5 rounded-lg bg-navy-700/5 text-navy-700 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-navy-700/5">
                <h4 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-500" />
                  学员评价
                  <span className="text-sm font-normal text-navy-700/50">
                    ({reviews.length}条)
                  </span>
                </h4>

                {reviews.length === 0 ? (
                  <div className="py-10 text-center text-navy-700/50 text-sm">
                    暂无评价，成为第一个评价的学员吧！
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.slice(0, 5).map((review) => (
                      <div
                        key={review.id}
                        className="p-4 rounded-xl bg-navy-700/[0.02]"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-10 h-10 rounded-full object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <p className="font-semibold text-navy-900 text-sm">
                                {review.userName}
                              </p>
                              <span className="text-xs text-navy-700/40">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                            <StarRating rating={review.rating} size="sm" className="mt-1" />
                          </div>
                        </div>
                        <p className="text-sm text-navy-700/80 leading-relaxed pl-13">
                          {review.content}
                        </p>
                      </div>
                    ))}
                    {reviews.length > 5 && (
                      <button className="w-full py-3 text-sm text-brand-600 hover:text-brand-700 font-medium hover:bg-brand-50 rounded-xl transition-colors">
                        查看全部 {reviews.length} 条评价
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
