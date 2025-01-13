import { useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';
import { RouteConst } from '../interface/RouteConst';

interface PaymentProps {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
}

declare const TossPayments: any;

export const useTossPay = () => {
  const { showToast } = useToast();

  const tossPay = useCallback(
    async ({ amount, orderId, orderName, customerName }: PaymentProps) => {
      try {
        // 기존 위젯 cleanup
        const paymentMethodEl = document.getElementById('payment-method');
        const agreementEl = document.getElementById('agreement');
        if (paymentMethodEl) paymentMethodEl.innerHTML = '';
        if (agreementEl) agreementEl.innerHTML = '';

        const tossPayments = TossPayments(import.meta.env.VITE_TOSS_CLIENT_KEY);
        const widgets = tossPayments.widgets({
          customerKey: 'ANONYMOUS',
        });

        await widgets.setAmount({
          value: amount,
          currency: 'KRW',
        });

        await Promise.all([
          widgets.renderPaymentMethods({
            selector: '#payment-method',
            variantKey: 'DEFAULT',
          }),
          widgets.renderAgreement({
            selector: '#agreement',
            variantKey: 'AGREEMENT',
          }),
        ]);

        // 결제하기 버튼 클릭 시 호출될 함수
        const handlePaymentClick = async () => {
          try {
            await widgets.requestPayment({
              orderId,
              orderName,
              customerName,
              successUrl: `${window.location.origin}${RouteConst.PaymentSuccess}`,
              failUrl: `${window.location.origin}${RouteConst.PaymentFail}`,
            });
          } catch (error) {
            if (error === '카드 결제 정보를 선택해주세요.') {
              showToast('결제 수단을 선택해주세요.', 'error');
            } else {
              throw error;
            }
          }
        };

        return handlePaymentClick;
      } catch (error) {
        showToast('결제 중 오류가 발생했습니다.', 'error');
        console.error('Payment Error:', error);
      }
    },
    [showToast],
  );

  return { tossPay };
};
