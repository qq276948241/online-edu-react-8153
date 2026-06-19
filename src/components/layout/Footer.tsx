import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';

export default function Footer() {
  return (
    <footer className="bg-gradient-navy mt-24 text-white">
      <div className="container pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-btn">
                <GraduationCap className="w-5.5 h-5.5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold tracking-tight">SkillUp</span>
                <span className="text-[11px] text-white/50 mt-0.5">职业技能学习平台</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm mb-6">
              SkillUp 专注于职业技能在线教育，汇聚行业顶尖讲师，提供 IT 技术、设计、产品、运营、数据、营销等高品质课程，助力每一位学员实现职业突破。
            </p>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>contact@skillup.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400" />
                <span>400-888-6666</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>北京市朝阳区望京科技园 A 座 18 层</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">课程分类</h4>
            <ul className="space-y-2.5">
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/courses?category=${cat.id}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">关于我们</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  平台介绍
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  成为讲师
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  企业培训
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  合作伙伴
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  招贤纳士
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">帮助支持</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  新手指南
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  常见问题
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  退款政策
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  用户协议
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  联系客服
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/10 mt-12 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2026 SkillUp 在线教育平台. 保留所有权利.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white/60 transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white/60 transition-colors">服务条款</a>
            <a href="#" className="hover:text-white/60 transition-colors">ICP 备案号</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
