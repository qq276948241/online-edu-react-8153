import { COURSES, INSTRUCTORS, REVIEWS, CATEGORIES } from './mockData';
import type { Course, Instructor, Review, CourseFilters, SortOrder, CourseLevel } from '@/types';

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getInstructorById(id: string): Instructor | undefined {
  return INSTRUCTORS.find((i) => i.id === id);
}

export function getCoursesByInstructor(instructorId: string): Course[] {
  return COURSES.filter((c) => c.instructorId === instructorId);
}

export function getReviewsByCourse(courseId: string): Review[] {
  return REVIEWS.filter((r) => r.courseId === courseId);
}

export function getReviewsByInstructor(instructorId: string): Review[] {
  return REVIEWS.filter((r) => r.instructorId === instructorId);
}

export function getCategoryName(categoryId: string): string {
  return CATEGORIES.find((c) => c.id === categoryId)?.name || '未分类';
}

export function getHotCourses(limit = 8): Course[] {
  return [...COURSES]
    .sort((a, b) => b.totalStudents - a.totalStudents)
    .slice(0, limit);
}

export function getLatestCourses(limit = 6): Course[] {
  return [...COURSES]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function sortCourses(courses: Course[], sort: SortOrder): Course[] {
  const list = [...courses];
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating);
    case 'students':
      return list.sort((a, b) => b.totalStudents - a.totalStudents);
    default:
      return list;
  }
}

export function filterAndSortCourses(filters: CourseFilters): {
  items: Course[];
  total: number;
  totalPages: number;
} {
  let list = [...COURSES];

  if (filters.category !== 'all') {
    list = list.filter((c) => c.category === filters.category);
  }

  if (filters.level !== 'all') {
    list = list.filter((c) => c.level === filters.level);
  }

  list = sortCourses(list, filters.sort);

  const total = list.length;
  const totalPages = Math.ceil(total / filters.pageSize);
  const start = (filters.page - 1) * filters.pageSize;
  const items = list.slice(start, start + filters.pageSize);

  return { items, total, totalPages };
}

export function getLevelLabel(level: CourseLevel): string {
  const map: Record<CourseLevel, string> = {
    beginner: '入门级',
    intermediate: '进阶级',
    advanced: '高级',
  };
  return map[level];
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function calculateDiscount(coupon: { discountType: 'fixed' | 'percentage'; discountValue: number; maxDiscount?: number }, price: number): number {
  if (coupon.discountType === 'fixed') {
    return Math.min(coupon.discountValue, price);
  }
  const discount = price * (coupon.discountValue / 100);
  return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount;
}
