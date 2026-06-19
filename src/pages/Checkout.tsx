import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  BookOpen,
  Clock,
  User,
  CreditCard,
  Shield,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Landmark,
  Smartphone,
  Wallet,
} from 'lucide-react';
import {
  getCourseById,
  getInstructorById,
  calculateDiscount,
  getCategoryName,
} from '@/data/helpers';
import { COUPONS } from '@/data/mockData';
import CouponSelector from '@/components/checkout/CouponSelector';

type PaymentMethod = 'wechat' | 'alipay' | 'bank';

const PAYMENT_METHODS: {
  id: PaymentMethod;
  name: string;
  desc: string;
  icon: typeof Smartphone;
}[] = [
  { id: 'wechat', name: '微信支付', desc: '推荐使用，安全便捷', icon: Smartphone },
  { id: 'alipay', name: '支付宝', desc: '支持花呗分期', icon: Wallet },
  { id: 'bank', name: '银行卡支付', desc: '支持储蓄卡/信用卡', icon: Landmark },
];

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = searchParams.get('courseId');

  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('wechat');
  const [showError, setShowError] = useState(false);

  const course = courseId ? getCourseById(courseId) : undefined;
  const instructor = course ? getInstructorById(course.instructorId) : undefined;

  useEffect(() => {
    if (courseId && !course) {
      setShowError(true);
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [courseId, course, navigate]);

  if (showError || !course || !instructor) {
    return (
      <div className="pt-20 pb-16 bg-surface-bg min-h-screen flex items-center justify-center">
        <div className="card p-10 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-8 h-8 text-accent-gold" />
          </div>
          <h2 className="text-xl font-bold text-navy-900 mb-2">课程不存在</h2>
          <p className="text-navy-700/60 mb-6">
            您要购买的课程不存在或已下架，即将返回首页...
          </p>
          <Link to="/" className="btn-primary w-full">
            <Home className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const originalPrice = course.originalPrice;
  const courseDiscount = originalPrice - course.price;
  const subtotal = course.price;

  const selectedCoupon = COUPONS.find((c) => c.id === selectedCouponId);
  const couponDiscount =
    selectedCoupon && subtotal >= selectedCoupon.minOrder
      ? calculateDiscount(selectedCoupon, subtotal)
      : 0;

  const totalDiscount = courseDiscount + couponDiscount;
  const finalPrice = Math.max(0, subtotal - couponDiscount);

  const handlePayment = () => {
    alert(`支付成功！您已成功报名「${course.title}」`);
  };

  return (
    <div className="pt-20 pb-16 bg-surface-bg min-h-screen">
      <nav className="container py-4">
        <ol className="flex items-center gap-2 text-sm text-navy-700/60 flex-wrap">
          <li>
            <Link
              to="/"
              className="hover:text-brand-600 transition-colors inline-flex items-center gap-1"
            >
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
            <Link
              to={`/courses/${course.id}`}
              className="hover:text-brand-600 transition-colors truncate max-w-[200px]"
            >
              {course.title}
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-navy-700/30" />
          <li className="text-navy-900 font-medium">确认报名</li>
        </ol>
      </nav>

      <div className="container mt-2">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-navy-900 flex items-center gap-3">
              <CreditCard className="w-7 h-7 text-brand-500" />
              确认报名
            </h1>
            <p className="text-navy-700/60 mt-1.5 text-sm">
              请核对订单信息，完成支付后即可开始学习
            </p>
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="btn-secondary !py-2.5 !px-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            返回课程详情
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <div className="card p-6 overflow-hidden">
              <h2 className="text-lg font-bold text-navy-900 mb-5 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-500" />
                订单信息
              </h2>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  to={`/courses/${course.id}`}
                  className="sm:w-48 shrink-0 aspect-video sm:aspect-[4/3] rounded-xl overflow-hidden group"
                >
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-lg font-bold text-navy-900 hover:text-brand-600 transition-colors line-clamp-2 leading-snug"
                  >
                    {course.title}
                  </Link>
                  <p className="text-sm text-navy-700/60 mt-2 line-clamp-2">
                    {course.subtitle}
                  </p>

                  <div className="flex items-center gap-2 mt-4">
                    <img
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="w-7 h-7 rounded-full ring-2 ring-white shadow-sm"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-navy-800 truncate flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-brand-500" />
                        {instructor.name}
                      </p>
                      <p className="text-xs text-navy-700/50 truncate">
                        {instructor.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 pt-4 border-t border-navy-700/5">
                    <div className="flex items-center gap-1.5 text-sm text-navy-700/70">
                      <Clock className="w-4 h-4 text-brand-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-navy-700/70">
                      <BookOpen className="w-4 h-4 text-brand-500" />
                      <span>{course.totalLessons} 节课</span>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-md bg-brand-50 text-brand-600 font-medium">
                      {getCategoryName(course.category)}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-navy-700/5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-navy-700/60">¥</span>
                      <span className="text-3xl font-bold text-gradient-brand">
                        {course.price}
                      </span>
                    </div>
                    {course.originalPrice > course.price && (
                      <span className="text-base text-navy-700/30 line-through">
                        ¥{course.originalPrice}
                      </span>
                    )}
                    {courseDiscount > 0 && (
                      <span className="chip !px-2 !py-0.5 text-xs bg-accent-gold/15 text-accent-gold font-bold">
                        限时优惠省 ¥{courseDiscount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-bold text-navy-900 mb-5 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-brand-500" />
                支付方式
              </h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  const isSelected = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/50 shadow-sm'
                          : 'border-navy-700/10 hover:border-brand-300 hover:bg-brand-50/30'
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-gradient-brand text-white'
                            : 'bg-navy-700/5 text-navy-700/60'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-navy-900">{method.name}</p>
                        <p className="text-sm text-navy-700/50 mt-0.5">
                          {method.desc}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-brand-500 bg-gradient-brand'
                            : 'border-navy-700/20'
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-5">
              <div className="card p-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-brand opacity-[0.04] rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
                <h2 className="text-lg font-bold text-navy-900 mb-5 flex items-center gap-2 relative">
                  <Shield className="w-5 h-5 text-brand-500" />
                  费用明细
                </h2>

                <div className="space-y-3.5 relative">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-navy-700/70">课程原价</span>
                    <span className="text-navy-700/70 line-through">
                      ¥{originalPrice.toFixed(2)}
                    </span>
                  </div>
                  {courseDiscount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-navy-700/70">限时优惠</span>
                      <span className="text-accent-green font-medium">
                        -¥{courseDiscount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-navy-700/70">课程小计</span>
                    <span className="font-semibold text-navy-900">
                      ¥{subtotal.toFixed(2)}
                    </span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-navy-700/70">
                        优惠券{selectedCoupon ? `「${selectedCoupon.name}」` : ''}
                      </span>
                      <span className="text-accent-green font-medium">
                        -¥{couponDiscount.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="my-5 h-px bg-gradient-to-r from-transparent via-navy-700/10 to-transparent" />

                <div className="relative">
                  <CouponSelector
                    coupons={COUPONS}
                    orderAmount={subtotal}
                    selectedCouponId={selectedCouponId}
                    onSelect={setSelectedCouponId}
                  />
                </div>

                <div className="my-5 h-px bg-gradient-to-r from-transparent via-navy-700/10 to-transparent" />

                <div className="relative">
                  <div className="flex items-end justify-between mb-5">
                    <div>
                      <span className="text-sm text-navy-700/70">实付金额</span>
                      {totalDiscount > 0 && (
                        <p className="text-xs text-accent-gold font-medium mt-1 flex items-center gap-1">
                          <SparklesInline />
                          已为您节省 ¥{totalDiscount.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-accent-gold">¥</span>
                      <span className="text-4xl font-black text-gradient-brand leading-none">
                        {finalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    className="btn-primary w-full !py-4 text-base font-semibold"
                  >
                    <Shield className="w-5 h-5" />
                    确认支付 ¥{finalPrice.toFixed(2)}
                  </button>

                  <p className="text-xs text-navy-700/40 text-center mt-4 leading-relaxed">
                    点击「确认支付」即表示您已阅读并同意
                    <a href="#" className="text-brand-600 hover:underline mx-0.5">
                      《用户服务协议》
                    </a>
                    、
                    <a href="#" className="text-brand-600 hover:underline mx-0.5">
                      《隐私政策》
                    </a>
                    和
                    <a href="#" className="text-brand-600 hover:underline mx-0.5">
                      《课程购买须知》
                    </a>
                  </p>

                  <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-navy-700/5">
                    <div className="flex items-center gap-1.5 text-xs text-navy-700/40">
                      <Shield className="w-3.5 h-3.5" />
                      <span>7天无理由退款</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-navy-700/40">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>永久有效回看</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-navy-700/40">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>SSL安全加密</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklesInline() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z" />
    </svg>
  );
}
