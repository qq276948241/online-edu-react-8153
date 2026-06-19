import { ArrowRight, Play, Users, BookOpen, Award, TrendingUp, GraduationCap, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseCard from '@/components/course/CourseCard';
import StarRating from '@/components/common/StarRating';
import { getHotCourses } from '@/data/helpers';
import { REVIEWS, COURSES, INSTRUCTORS } from '@/data/mockData';
import { cn } from '@/lib/utils';

const HERO_IMAGE = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20tech%20online%20education%20learning%20platform%20blue%20futuristic%20abstract&image_size=landscape_16_9';

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/30 to-navy-900/60" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-brand-700/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      
      <div className="absolute top-32 left-[15%] w-16 h-16 border border-white/20 rounded-xl rotate-12 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-48 right-[20%] w-12 h-12 border border-sky-400/30 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-40 left-[10%] w-20 h-20 border-2 border-brand-500/25 rounded-2xl -rotate-6 animate-float" style={{ animationDelay: '2.5s' }} />
      <div className="absolute bottom-32 right-[12%] w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg rotate-45 animate-float" style={{ animationDelay: '1.5s' }} />
      
      <div className="container relative pt-28 pb-32 md:pt-36 md:pb-44">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-white animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-6">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-medium">2026 年度新课升级 · 限时优惠中</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              解锁<span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-brand-400">未来技能</span>
              <br />
              成就更好的自己
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl">
              汇聚大厂一线导师，打造 IT 技术、UI 设计、产品运营、数据分析等 1000+ 精品课程，助你职业跃迁。
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/courses" className="btn-primary text-base !px-8 !py-4">
                免费试学
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/15 hover:border-white/30 transition-all duration-300">
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </span>
                观看介绍
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-8">
              <div>
                <div className="flex -space-x-3 mb-2">
                  {REVIEWS.slice(0, 5).map((r) => (
                    <img
                      key={r.id}
                      src={r.userAvatar}
                      alt={r.userName}
                      className="w-9 h-9 rounded-full ring-2 ring-navy-800"
                    />
                  ))}
                </div>
                <p className="text-sm text-white/60">已有 <span className="text-white font-semibold">120,000+</span> 学员加入</p>
              </div>
              <div className="flex items-center gap-3">
                <StarRating rating={4.9} size="md" />
                <span className="text-sm text-white/70">4.9 平均评分</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy-950/50">
              <img
                src={HERO_IMAGE}
                alt="在线学习平台"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/60 via-transparent to-transparent" />
              
              <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
                <div className="px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-md text-white text-sm font-medium border border-white/20">
                  实时学习中
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-green/20 backdrop-blur-md text-accent-green text-sm font-medium border border-accent-green/30">
                  <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                  2,847 人在线
                </div>
              </div>
              
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={INSTRUCTORS[0].avatar}
                    alt={INSTRUCTORS[0].name}
                    className="w-10 h-10 rounded-full ring-2 ring-white/30"
                  />
                  <div>
                    <p className="text-white font-medium">{INSTRUCTORS[0].name}</p>
                    <p className="text-white/60 text-xs">前字节跳动高级前端架构师</p>
                  </div>
                  <div className="ml-auto">
                    <StarRating rating={INSTRUCTORS[0].rating} size="sm" />
                  </div>
                </div>
                <p className="text-white/90 text-sm line-clamp-2">
                  正在直播：「React 18 并发特性深度解析与实战」
                </p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-56 p-4 rounded-2xl bg-white shadow-xl shadow-navy-950/20 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-navy-700/60">本周学习时长</p>
                  <p className="text-lg font-bold text-navy-900">+12.5h</p>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-navy-700/10 overflow-hidden">
                <div className="h-full w-4/5 rounded-full bg-gradient-brand" />
              </div>
            </div>
            
            <div className="absolute -top-5 -right-4 w-48 p-4 rounded-2xl bg-white shadow-xl shadow-navy-950/20 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-accent-gold fill-accent-gold/20" />
                <span className="text-sm font-semibold text-navy-900">完课证书</span>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-sky-400 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white"
                  >
                    {i}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-lg bg-navy-700/10 flex items-center justify-center text-navy-700/60 text-xs font-semibold ring-2 ring-white">
                  +56
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-surface-bg" />
    </section>
  );
}

function HotCoursesSection() {
  const hotCourses = getHotCourses(8);
  
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              热门推荐
            </div>
            <h2 className="section-title">精选热门课程</h2>
            <p className="section-subtitle max-w-2xl">
              百万学员共同选择的优质好课，涵盖 IT 技术、设计、产品、数据等多个领域
            </p>
          </div>
          <Link
            to="/courses"
            className="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-brand-600 font-medium hover:text-brand-700 transition-colors group"
          >
            查看全部课程
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {hotCourses.map((course, index) => (
            <div
              key={course.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCarousel() {
  const reviews = REVIEWS.slice(0, 10);
  
  return (
    <div className="overflow-hidden mask-fade-x py-4">
      <div className="flex animate-scroll-x gap-5 w-max">
        {[...reviews, ...reviews].map((review, index) => (
          <div
            key={`${review.id}-${index}`}
            className="w-[360px] flex-shrink-0 p-6 rounded-2xl bg-white shadow-card border border-navy-700/5"
          >
            <Quote className="w-8 h-8 text-brand-500/20 mb-4" />
            <StarRating rating={review.rating} size="sm" className="mb-3" />
            <p className="text-navy-800 leading-relaxed mb-5 line-clamp-3">
              {review.content}
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-navy-700/5">
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy-900 truncate">{review.userName}</p>
                <p className="text-xs text-navy-700/60 truncate">
                  {review.courseName || '优秀学员'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-surface-bg via-white to-surface-bg">
      <div className="container">
        <div className="text-center mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 text-accent-gold text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            学员心声
          </div>
          <h2 className="section-title">120,000+ 学员真实评价</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            他们通过学习改变了职业轨迹，收获了更好的未来
          </p>
        </div>
      </div>
      
      <ReviewCarousel />
      
      <div className="container mt-8 md:mt-10">
        <ReviewCarousel />
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    {
      icon: Users,
      label: '累计学员',
      value: '120,000+',
      subValue: '来自全国各地',
      gradient: 'from-brand-500 to-sky-400',
      bgGradient: 'from-brand-500/5 to-sky-400/5',
      borderGradient: 'border-brand-500/10',
    },
    {
      icon: BookOpen,
      label: '精品课程',
      value: `${COURSES.length * 80}+`,
      subValue: '持续更新中',
      gradient: 'from-sky-500 to-accent-green',
      bgGradient: 'from-sky-500/5 to-accent-green/5',
      borderGradient: 'border-sky-500/10',
    },
    {
      icon: GraduationCap,
      label: '资深讲师',
      value: `${INSTRUCTORS.length * 15}+`,
      subValue: '大厂一线背景',
      gradient: 'from-accent-gold to-brand-500',
      bgGradient: 'from-accent-gold/5 to-brand-500/5',
      borderGradient: 'border-accent-gold/10',
    },
    {
      icon: Award,
      label: '好评率',
      value: '98.6%',
      subValue: '学员满意度',
      gradient: 'from-accent-green to-sky-400',
      bgGradient: 'from-accent-green/5 to-sky-400/5',
      borderGradient: 'border-accent-green/10',
    },
  ];
  
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      
      <div className="absolute top-10 left-10 w-72 h-72 bg-brand-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            数据说话
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            用数字证明实力
          </h2>
          <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            每一个数字背后，都是学员们努力的见证和对我们的认可
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'group relative p-6 md:p-8 rounded-2xl md:rounded-3xl overflow-hidden',
                'bg-white/5 backdrop-blur-sm border',
                stat.borderGradient,
                'hover:bg-white/10 hover:border-white/20 transition-all duration-500'
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={cn('absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500', stat.bgGradient)} />
              
              <div className="relative">
                <div className={cn(
                  'w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-5 shadow-lg',
                  stat.gradient,
                  'shadow-black/10 group-hover:scale-110 transition-transform duration-500'
                )}>
                  <stat.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                
                <p className="text-white/60 text-sm md:text-base mb-2">{stat.label}</p>
                <p className={cn(
                  'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r',
                  stat.gradient
                )}>
                  {stat.value}
                </p>
                <p className="text-white/40 text-xs md:text-sm">{stat.subValue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="bg-surface-bg">
      <HeroSection />
      <HotCoursesSection />
      <ReviewsSection />
      <StatsSection />
    </div>
  );
}
