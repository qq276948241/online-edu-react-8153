export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isPreview: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  coverImage: string;
  previewVideo: string;
  category: string;
  level: CourseLevel;
  duration: string;
  totalLessons: number;
  totalStudents: number;
  rating: number;
  reviewCount: number;
  instructorId: string;
  tags: string[];
  highlights: string[];
  suitableFor: string[];
  chapters: Chapter[];
  createdAt: string;
  isHot?: boolean;
  isNew?: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  coverImage: string;
  bio: string;
  experience: string[];
  specialties: string[];
  rating: number;
  studentCount: number;
  courseCount: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  courseId?: string;
  instructorId?: string;
  courseName?: string;
  createdAt: string;
}

export type CouponType = 'fixed' | 'percentage';

export interface Coupon {
  id: string;
  code: string;
  name: string;
  discountType: CouponType;
  discountValue: number;
  minOrder: number;
  maxDiscount?: number;
  validUntil: string;
  description: string;
  isApplied?: boolean;
}

export type SortOrder = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'students';

export interface CourseFilters {
  category: string;
  sort: SortOrder;
  level: CourseLevel | 'all';
  page: number;
  pageSize: number;
}

export interface Note {
  id: string;
  courseId: string;
  chapterId: string;
  lessonId?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isImportant?: boolean;
}

export interface NotesState {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  toggleImportant: (id: string) => void;
  getNotesByCourse: (courseId: string) => Note[];
  getNotesByChapter: (courseId: string, chapterId: string) => Note[];
  getNoteCountByChapter: (courseId: string, chapterId: string) => number;
}
