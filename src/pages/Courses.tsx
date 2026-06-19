import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Home, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';
import { filterAndSortCourses } from '@/data/helpers';
import type { CourseFilters, SortOrder, CourseLevel } from '@/types';
import CourseCard from '@/components/course/CourseCard';
import Pagination from '@/components/common/Pagination';

const LEVEL_OPTIONS: { value: CourseLevel | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'beginner', label: '入门' },
  { value: 'intermediate', label: '进阶' },
  { value: 'advanced', label: '高级' },
];

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'default', label: '默认排序' },
  { value: 'price-asc', label: '价格升序' },
  { value: 'price-desc', label: '价格降序' },
  { value: 'rating', label: '评分最高' },
  { value: 'students', label: '人气最高' },
];

const PAGE_SIZE = 6;

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOpen, setSortOpen] = useState(false);

  const category = searchParams.get('category') || 'all';
  const level = (searchParams.get('level') as CourseLevel | 'all') || 'all';
  const sort = (searchParams.get('sort') as SortOrder) || 'default';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const filters: CourseFilters = useMemo(
    () => ({
      category,
      level,
      sort,
      page,
      pageSize: PAGE_SIZE,
    }),
    [category, level, sort, page]
  );

  const { items, total, totalPages } = useMemo(
    () => filterAndSortCourses(filters),
    [filters]
  );

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      updateParams({ page: 1 });
    }
  }, [totalPages, page]);

  const updateParams = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '' || value === 1) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    setSearchParams(params);
  };

  const handleCategoryChange = (id: string) => {
    updateParams({ category: id === 'all' ? null : id, page: 1 });
  };

  const handleLevelChange = (value: CourseLevel | 'all') => {
    updateParams({ level: value === 'all' ? null : value, page: 1 });
  };

  const handleSortChange = (value: SortOrder) => {
    updateParams({ sort: value === 'default' ? null : value, page: 1 });
    setSortOpen(false);
  };

  const handlePageChange = (p: number) => {
    updateParams({ page: p });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label || SORT_OPTIONS[0].label;

  return (
    <div className="min-h-screen bg-surface-bg">
      <div className="container py-8 md:py-12">
        <nav className="flex items-center gap-2 text-sm text-navy-700/60 mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-brand-600 transition-colors">
            <Home className="w-4 h-4" />
            首页
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-navy-900 font-medium">全部课程</span>
        </nav>

        <div className="mb-8">
          <h1 className="section-title">全部课程</h1>
          <p className="section-subtitle">精选优质课程，助你高效提升技能</p>
        </div>

        <div className="card p-5 md:p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-brand-600" />
            <span className="font-semibold text-navy-900">分类筛选</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => {
              const isActive = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={isActive ? 'chip-filled' : 'chip-outline'}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="card p-5 md:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-navy-700">难度：</span>
              <div className="flex flex-wrap gap-2">
                {LEVEL_OPTIONS.map((opt) => {
                  const isActive = level === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleLevelChange(opt.value)}
                      className={isActive ? 'chip-filled !py-1.5' : 'chip-outline !py-1.5'}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="chip-outline !py-2.5 min-w-[140px] justify-between"
              >
                <span>{currentSortLabel}</span>
                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${sortOpen ? 'rotate-90' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-card-hover border border-navy-700/5 py-1.5 z-10 animate-fade-in">
                  {SORT_OPTIONS.map((opt) => {
                    const isActive = sort === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSortChange(opt.value)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          isActive
                            ? 'text-brand-600 font-medium bg-brand-50'
                            : 'text-navy-700 hover:bg-surface-bg'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-navy-700/70">
            共找到 <span className="font-semibold text-navy-900">{total}</span> 门课程
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-10">
            {items.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="card p-12 mb-10">
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="w-20 h-20 rounded-2xl bg-navy-700/5 flex items-center justify-center mb-6">
                <SlidersHorizontal className="w-10 h-10 text-navy-700/30" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">暂无符合条件的课程</h3>
              <p className="text-navy-700/60">试试调整筛选条件，发现更多好课</p>
            </div>
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
