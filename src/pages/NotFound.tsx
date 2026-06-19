import { Link } from 'react-router-dom';
import { Home, BookOpen, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden flex items-center">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/20 to-navy-900/40" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-brand-700/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      
      <div className="absolute top-32 left-[15%] w-16 h-16 border border-white/20 rounded-xl rotate-12 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-48 right-[20%] w-12 h-12 border border-sky-400/30 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-40 left-[10%] w-20 h-20 border-2 border-brand-500/25 rounded-2xl -rotate-6 animate-float" style={{ animationDelay: '2.5s' }} />
      <div className="absolute bottom-32 right-[12%] w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg rotate-45 animate-float" style={{ animationDelay: '1.5s' }} />
      
      <div className="container relative py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="mb-8 md:mb-12">
            <h1 className="text-[120px] md:text-[180px] lg:text-[220px] font-black leading-none tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-br from-sky-300 via-brand-400 to-sky-500 drop-shadow-2xl">
              404
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Compass className="w-6 h-6 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-white/60 text-sm tracking-widest uppercase">Page Not Found</span>
              <Compass className="w-6 h-6 text-sky-400 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            哎呀，页面走丢了
          </h2>
          
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            您访问的页面可能已被移除、名称已更改或暂时不可用。
            <br className="hidden md:block" />
            别担心，让我们带您回到正轨！
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/" className="btn-primary !px-10 !py-4 text-base group">
              <Home className="w-5 h-5" />
              返回首页
            </Link>
            <Link to="/courses" className="group inline-flex items-center gap-2.5 px-10 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/15 hover:border-white/30 transition-all duration-300 text-base">
              <BookOpen className="w-5 h-5" />
              浏览课程
            </Link>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="p-6 md:p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                  <Compass className="w-4 h-4 text-white" />
                </span>
                您可以尝试
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                <Link to="/" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 text-left group">
                  <p className="font-medium text-white mb-1 group-hover:text-sky-300 transition-colors">🏠 首页</p>
                  <p className="text-white/50 text-xs">发现精彩内容</p>
                </Link>
                <Link to="/courses" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 text-left group">
                  <p className="font-medium text-white mb-1 group-hover:text-sky-300 transition-colors">📚 课程中心</p>
                  <p className="text-white/50 text-xs">1000+ 精品课程</p>
                </Link>
                <a href="#" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 text-left group">
                  <p className="font-medium text-white mb-1 group-hover:text-sky-300 transition-colors">💬 联系客服</p>
                  <p className="text-white/50 text-xs">7×24 小时在线</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
