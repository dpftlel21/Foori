import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';

interface PaymentProps {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
}

export const useTossPay = () => {
  const { showToast } = useToast();

  const handlePayment = useCallback(
    async ({ amount, orderId, orderName, customerName }: PaymentProps) => {
      try {
        const tossPayments = await loadTossPayments(
          import.meta.env.VITE_TOSS_CLIENT_KEY,
        );

        await tossPayments.requestPayment('카드', {
          amount,
          orderId,
          orderName,
          customerName,
          successUrl: `${window.location.origin}/payment/success`,
          failUrl: `${window.location.origin}/payment/fail`,
        });

        console.log('tossPayments', tossPayments);
      } catch (error) {
        showToast('결제 중 오류가 발생했습니다.', 'error');
        console.error('Payment Error:', error);
      }
    },
    [showToast],
  );

  return { handlePayment };
};
