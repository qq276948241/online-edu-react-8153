import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Ticket, AlertCircle } from 'lucide-react';
import type { Coupon } from '@/types';
import { calculateDiscount, formatDate } from '@/data/helpers';

interface CouponSelectorProps {
  coupons: Coupon[];
  orderAmount: number;
  selectedCouponId: string | null;
  onSelect: (couponId: string | null) => void;
}

export default function CouponSelector({
  coupons,
  orderAmount,
  selectedCouponId,
  onSelect,
}: CouponSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isCouponApplicable = (coupon: Coupon) => orderAmount >= coupon.minOrder;

  const selectedCoupon = coupons.find((c) => c.id === selectedCouponId);
  const applicableCoupons = coupons.filter(isCouponApplicable);
  const bestCoupon = applicableCoupons.reduce<Coupon | null>((best, coupon) => {
    const discount = calculateDiscount(coupon, orderAmount);
    const bestDiscount = best ? calculateDiscount(best, orderAmount) : 0;
    return discount > bestDiscount ? coupon : best;
  }, null);

  const selectedDiscount = selectedCoupon
    ? calculateDiscount(selectedCoupon, orderAmount)
    : 0;

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-navy-700/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center">
            <Ticket className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-navy-900 flex items-center gap-2">
              优惠券
              {applicableCoupons.length > 0 && (
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">
                  {applicableCoupons.length} 张可用
                </span>
              )}
            </h3>
            {selectedCoupon ? (
              <p className="text-sm text-accent-green font-medium mt-0.5">
                已使用「{selectedCoupon.name}」- ¥{selectedDiscount.toFixed(2)}
              </p>
            ) : (
              <p className="text-sm text-navy-700/50 mt-0.5">
                {applicableCoupons.length > 0
                  ? `建议使用最优券，可省 ¥${bestCoupon ? calculateDiscount(bestCoupon, orderAmount).toFixed(2) : '0.00'}`
                  : '暂无可使用的优惠券'}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedCouponId && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(null);
              }}
              className="text-xs text-navy-700/50 hover:text-brand-600 transition-colors"
            >
              不使用
            </button>
          )}
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-navy-700/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-navy-700/50" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-navy-700/5 max-h-96 overflow-y-auto scrollbar-thin">
          {coupons.length === 0 ? (
            <div className="p-8 text-center text-navy-700/50 text-sm">
              暂无优惠券
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {coupons.map((coupon) => {
                const applicable = isCouponApplicable(coupon);
                const discount = calculateDiscount(coupon, orderAmount);
                const isSelected = selectedCouponId === coupon.id;
                const isBest = bestCoupon?.id === coupon.id && applicable;

                return (
                  <button
                    key={coupon.id}
                    disabled={!applicable}
                    onClick={() => onSelect(isSelected ? null : coupon.id)}
                    className={`w-full text-left relative overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/50 shadow-sm'
                        : applicable
                        ? 'border-navy-700/10 hover:border-brand-300 hover:bg-brand-50/30'
                        : 'border-navy-700/5 bg-navy-700/[0.02] opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {isBest && (
                      <div className="absolute top-0 right-0 bg-gradient-brand text-white text-xs font-medium px-3 py-0.5 rounded-bl-lg">
                        最优
                      </div>
                    )}
                    <div className="flex">
                      <div
                        className={`w-24 shrink-0 p-4 flex flex-col items-center justify-center border-r border-dashed ${
                          isSelected
                            ? 'border-brand-200 bg-brand-50'
                            : 'border-navy-700/10'
                        }`}
                      >
                        {coupon.discountType === 'fixed' ? (
                          <>
                            <div className="text-2xl font-bold text-gradient-brand leading-none">
                              ¥{coupon.discountValue}
                            </div>
                            <div className="text-xs text-navy-700/50 mt-1">
                              立减
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-2xl font-bold text-gradient-brand leading-none">
                              {100 - coupon.discountValue}
                              <span className="text-base">折</span>
                            </div>
                            {coupon.maxDiscount && (
                              <div className="text-xs text-navy-700/50 mt-1">
                                上限¥{coupon.maxDiscount}
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-navy-900 truncate">
                                {coupon.name}
                              </h4>
                            </div>
                            <p className="text-xs text-navy-700/60 mt-1">
                              {coupon.description}
                            </p>
                            <div className="flex items-center gap-3 mt-2 flex-wrap">
                              <span className="text-xs text-navy-700/50 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                满 ¥{coupon.minOrder} 可用
                              </span>
                              <span className="text-xs text-navy-700/50">
                                有效期至 {formatDate(coupon.validUntil)}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-brand-500 bg-gradient-brand'
                                : applicable
                                ? 'border-navy-700/20'
                                : 'border-navy-700/10'
                            }`}
                          >
                            {isSelected && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                        {applicable && (
                          <div className="mt-3 pt-3 border-t border-navy-700/5">
                            <span className="text-xs text-accent-green font-medium">
                              可优惠 ¥{discount.toFixed(2)}
                            </span>
                          </div>
                        )}
                        {!applicable && (
                          <div className="mt-3 pt-3 border-t border-navy-700/5">
                            <span className="text-xs text-navy-700/40 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              还差 ¥{(coupon.minOrder - orderAmount).toFixed(2)} 可用
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
