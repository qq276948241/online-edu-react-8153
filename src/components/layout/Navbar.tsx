import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, Search, User, ShoppingCart } from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navCategories = CATEGORIES.filter((c) => c.id !== 'all').slice(0, 5);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-smooth ${
        isScrolled
          ? 'bg-navy-900/95 backdrop-blur-lg shadow-lg shadow-navy-900/10'
          : 'bg-gradient-to-b from-navy-900/80 to-navy-900/40 backdrop-blur-sm'
      }`}
    >
      <nav className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-btn group-hover:shadow-btn-hover transition-all duration-300">
              <GraduationCap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold text-white tracking-tight">SkillUp</span>
              <span className="text-[10px] text-white/50 mt-0.5">职业技能学习平台</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1 ml-8">
            {navCategories.map((cat) => (
              <NavLink
                key={cat.id}
                to={`/courses?category=${cat.id}`}
                className={({ isActive }) =>
                  `nav-link px-3 text-sm ${isActive ? 'active' : ''}`
                }
              >
                {cat.name}
              </NavLink>
            ))}
          </div>

          <div className="flex-1" />

          <div className="hidden md:flex items-center mr-3">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索课程..."
                className="w-52 h-10 pl-10 pr-4 rounded-xl bg-white/10 border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:bg-white/15 focus:border-brand-500/50 transition-all duration-200"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button className="btn-ghost !py-2 text-sm">
              <ShoppingCart className="w-4 h-4" />
            </button>
            <button className="btn-ghost text-sm">登录</button>
            <Link to="/courses" className="btn-primary !py-2.5 text-sm !px-5">
              免费试学
            </Link>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-white/80 hover:bg-white/10 transition-colors"
            aria-label="菜单"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMobileOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-white/10 animate-fade-in">
            <div className="flex flex-col gap-1">
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <NavLink
                  key={cat.id}
                  to={`/courses?category=${cat.id}`}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm transition-all ${
                      isActive
                        ? 'bg-gradient-brand text-white shadow-btn'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  {cat.name}
                </NavLink>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex gap-2">
                <button className="flex-1 btn-ghost text-sm justify-center">登录</button>
                <Link to="/courses" className="flex-1 btn-primary text-sm !py-2.5">
                  免费试学
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
