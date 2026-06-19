import { useParams, Link } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Star,
  Users,
  BookOpen,
  MessageSquare,
  Briefcase,
  Award,
  ArrowLeft,
  Clock,
} from 'lucide-react';
import {
  getInstructorById,
  getCoursesByInstructor,
  getReviewsByInstructor,
  formatDate,
} from '@/data/helpers';
import StarRating from '@/components/common/StarRating';
import CourseCard from '@/components/course/CourseCard';

export default function Instructor() {
  const { id } = useParams<{ id: string }>();
  const instructor = id ? getInstructorById(id) : undefined;
  const courses = id ? getCoursesByInstructor(id) : [];
  const reviews = id ? getReviewsByInstructor(id) : [];

  if (!instructor) {
    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center pt-20 pb-16">
        <div className="text-center px-6">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-brand/10 flex items-center justify-center">
            <Users className="w-16 h-16 text-brand-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            讲师未找到
          </h1>
          <p className="text-navy-700/70 max-w-md mx-auto mb-8 leading-relaxed">
            抱歉，您访问的讲师页面不存在或已被移除。请检查链接是否正确，或返回首页继续浏览。
          </p>
          <Link
            to="/"
            className="btn-primary !py-3.5 !px-8"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </div>
    );
  }

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
          <li className="text-navy-900 font-medium truncate max-w-[240px]">
            {instructor.name}
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={instructor.coverImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/85 to-navy-800/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
        </div>

        <div className="container relative py-10 md:py-16">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 md:gap-8">
            <div className="shrink-0">
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-28 h-28 md:w-36 md:h-36 rounded-3xl ring-4 ring-white/20 shadow-2xl object-cover animate-float"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                    {instructor.name}
                  </h1>
                  <p className="text-base md:text-lg text-white/80 font-medium">
                    {instructor.title}
                  </p>
                </div>
              </div>

              <p className="text-white/70 max-w-3xl leading-relaxed mb-6 text-sm md:text-base">
                {instructor.bio}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {instructor.specialties.map((s) => (
                  <span
                    key={s}
                    className="chip !px-3 !py-1.5 text-xs md:text-sm bg-white/10 text-white border border-white/15 backdrop-blur-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-6 md:gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-accent-gold/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-accent-gold fill-accent-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl md:text-2xl font-bold text-white">{instructor.rating.toFixed(1)}</span>
                      <StarRating rating={instructor.rating} size="sm" />
                    </div>
                    <p className="text-xs text-white/60">综合评分</p>
                  </div>
                </div>

                <div className="h-12 w-px bg-white/10 hidden md:block" />

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-400/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-white">
                      {instructor.studentCount >= 10000
                        ? `${(instructor.studentCount / 10000).toFixed(1)}w`
                        : instructor.studentCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-white/60">累计学员</p>
                  </div>
                </div>

                <div className="h-12 w-px bg-white/10 hidden md:block" />

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/30 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-brand-100" />
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-white">{instructor.courseCount}</p>
                    <p className="text-xs text-white/60">主讲课程</p>
                  </div>
                </div>

                <div className="h-12 w-px bg-white/10 hidden md:block" />

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-accent-green/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-accent-green" />
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-white">
                      {instructor.reviewCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-white/60">学员评价</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-8 md:mt-10">
        <div className="card p-6 md:p-8">
          <div className="flex items-center gap-2.5 mb-6 md:mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-brand-500 to-sky-500 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-navy-900">履历经历</h2>
          </div>

          <div className="relative">
            <div className="absolute left-[17px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-500/40 via-brand-500/20 to-transparent" />

            <div className="space-y-5">
              {instructor.experience.map((exp, idx) => {
                const match = exp.match(/^(.*?)\s·\s(\d+)\s*年$/);
                const company = match ? match[1].trim() : exp;
                const years = match ? match[2] : null;

                return (
                  <div key={idx} className="relative flex items-start gap-4 pl-1">
                    <div className="relative z-10 shrink-0 w-9 h-9 rounded-full bg-white shadow-md border-2 border-brand-500/30 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-gradient-brand" />
                    </div>

                    <div className="flex-1 pt-1">
                      <div className="flex flex-wrap items-center gap-3 mb-1.5">
                        <h3 className="text-base md:text-lg font-semibold text-navy-900">
                          {company}
                        </h3>
                        {years && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                            <Clock className="w-3 h-3" />
                            {years} 年
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-navy-700/60">{exp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-8 md:mt-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-900">主讲课程</h2>
              <p className="text-sm text-navy-700/50">共 {courses.length} 门课程</p>
            </div>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="card py-16 text-center">
            <BookOpen className="w-12 h-12 text-navy-700/20 mx-auto mb-4" />
            <p className="text-navy-700/50">该讲师暂无课程</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      <section className="container mt-8 md:mt-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-accent-green to-emerald-500 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-900">学员评价</h2>
              <p className="text-sm text-navy-700/50">共 {reviews.length} 条评价</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 text-accent-gold" />
            <span className="text-navy-700/70">好评率</span>
            <span className="font-bold text-navy-900">
              {reviews.length > 0
                ? `${Math.round(
                    (reviews.filter((r) => r.rating >= 4).length / reviews.length) * 100
                  )}%`
                : '—'}
            </span>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="card py-16 text-center">
            <MessageSquare className="w-12 h-12 text-navy-700/20 mx-auto mb-4" />
            <p className="text-navy-700/50">暂无评价，成为第一个评价的学员吧！</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="card p-5 md:p-6 card-hover"
              >
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-white shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                      <p className="font-semibold text-navy-900 text-sm md:text-base">
                        {review.userName}
                      </p>
                      <span className="text-xs text-navy-700/40 shrink-0">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <StarRating rating={review.rating} size="sm" />
                      {review.courseName && (
                        <Link
                          to={`/courses/${review.courseId}`}
                          className="text-xs text-brand-600 hover:text-brand-700 font-medium truncate max-w-[180px]"
                        >
                          《{review.courseName}》
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm md:text-base text-navy-700/80 leading-relaxed">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
