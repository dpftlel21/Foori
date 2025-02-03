import { useCallback } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { RouteConst } from '../../interface/RouteConst';

interface PaymentProps {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
}

interface PaymentHandler {
  (): Promise<void>;
}

declare const TossPayments: any;

export const useTossPay = () => {
  const { showToast } = useToast();

  const tossPay = useCallback(
    async ({
      amount,
      orderId,
      orderName,
      customerName,
    }: PaymentProps): Promise<PaymentHandler | undefined> => {
      try {
        // 기존 위젯 cleanup
        const paymentMethodEl = document.getElementById('payment-method');
        const agreementEl = document.getElementById('agreement');
        if (!paymentMethodEl || !agreementEl) {
          console.error('Payment elements not found');
          return undefined;
        }

        paymentMethodEl.innerHTML = '';
        agreementEl.innerHTML = '';

        // DOM이 준비될 때까지 대기
        await new Promise((resolve) => setTimeout(resolve, 500));

        try {
          const tossPayments = TossPayments(
            import.meta.env.VITE_TOSS_CLIENT_KEY,
          );
          console.log('TossPayments initialized'); // 디버깅

          const widgets = tossPayments.widgets({
            customerKey: 'ANONYMOUS',
          });

          // 순차적으로 실행
          await widgets.setAmount({
            value: amount,
            currency: 'KRW',
          });

          // 결제 수단 렌더링
          await widgets.renderPaymentMethods({
            selector: '#payment-method',
            variantKey: 'DEFAULT',
          });

          // 약관 렌더링
          await widgets.renderAgreement({
            selector: '#agreement',
            variantKey: 'AGREEMENT',
          });

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
                console.error('Payment request error:', error);
                showToast('결제 요청 중 오류가 발생했습니다.', 'error');
                throw error;
              }
            }
          };

          return handlePaymentClick;
        } catch (error) {
          console.error('TossPayments initialization error:', error);
          showToast('결제 초기화 중 오류가 발생했습니다.', 'error');
          return undefined;
        }
      } catch (error) {
        console.error('Payment setup error:', error);
        showToast('결제 설정 중 오류가 발생했습니다.', 'error');
        return undefined;
      }
    },
    [showToast],
  );

  return { tossPay };
};
