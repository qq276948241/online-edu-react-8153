import { Users, Flame, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Course, Instructor } from '@/types';
import StarRating from '@/components/common/StarRating';
import { getInstructorById } from '@/data/helpers';

interface CourseCardProps {
  course: Course;
  className?: string;
}

const LEVEL_MAP: Record<string, { label: string; className: string }> = {
  beginner: { label: '入门', className: 'bg-accent-green/10 text-accent-green' },
  intermediate: { label: '进阶', className: 'bg-brand-500/10 text-brand-600' },
  advanced: { label: '高级', className: 'bg-accent-gold/15 text-accent-gold' },
};

export default function CourseCard({ course, className = '' }: CourseCardProps) {
  const instructor: Instructor | undefined = getInstructorById(course.instructorId);
  const levelInfo = LEVEL_MAP[course.level];
  const discount = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <Link
      to={`/courses/${course.id}`}
      className={`group block card card-hover overflow-hidden ${className}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {course.isHot && (
            <span className="chip !px-2 !py-1 text-xs bg-gradient-to-r from-red-500 to-accent-gold text-white shadow-md">
              <Flame className="w-3 h-3" />
              爆款
            </span>
          )}
          {course.isNew && (
            <span className="chip !px-2 !py-1 text-xs bg-gradient-to-r from-sky-500 to-brand-500 text-white shadow-md">
              <Sparkles className="w-3 h-3" />
              新课
            </span>
          )}
          <span className={`chip !px-2 !py-1 text-xs ${levelInfo.className}`}>
            {levelInfo.label}
          </span>
        </div>

        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-accent-gold text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          {instructor && (
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-7 h-7 rounded-full ring-2 ring-white shadow-sm"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-navy-700 truncate">
              {instructor?.name}
            </p>
          </div>
          <StarRating rating={course.rating} size="sm" showValue />
        </div>

        <h3 className="text-base font-bold text-navy-900 line-clamp-2 leading-snug group-hover:text-brand-600 transition-colors duration-200 mb-2">
          {course.title}
        </h3>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-md bg-brand-50 text-brand-600 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-navy-700/5">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gradient-brand">
              ¥{course.price}
            </span>
            {course.originalPrice > course.price && (
              <span className="text-xs text-navy-700/40 line-through">
                ¥{course.originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-navy-700/60">
            <Users className="w-3.5 h-3.5" />
            <span>
              {course.totalStudents >= 10000
                ? `${(course.totalStudents / 10000).toFixed(1)}w`
                : course.totalStudents.toLocaleString()}
              人学习
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
