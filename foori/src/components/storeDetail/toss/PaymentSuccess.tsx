import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cookieStorage } from '../../../api/utils/cookies';
import { useToast } from '../../../contexts/ToastContext';

const PaymentSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const token = cookieStorage.getToken();

  useEffect(() => {
    const confirmPayment = async () => {
      const searchParams = new URLSearchParams(search);
      const paymentKey = searchParams.get('paymentKey');
      const orderId = searchParams.get('orderId');
      //console.log('orderId', orderId);
      const amount = searchParams.get('amount');

      // 필수 파라미터가 없으면 early return
      if (!paymentKey || !orderId || !amount) {
        showToast('결제 정보가 올바르지 않습니다.', 'error');
        return;
      }

      try {
        const requestData = {
          confirmPaymentRequestDto: {
            paymentKey: String(paymentKey),
            orderId: String(orderId),
            amount: Number(amount),
          },
        };

        const response = await fetch(
          `${import.meta.env.VITE_BACK_URL}/api/booking/confirm`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestData),
          },
        );

        if (!response.ok) {
          throw new Error('결제 승인 실패');
        }

        showToast('결제가 완료되었습니다.', 'success');
        navigate('/mypage');
      } catch (error) {
        console.error('Payment Confirmation Error:', error);
        showToast('결제 승인 중 오류가 발생했습니다.', 'error');
        navigate(-1);
      }
    };

    confirmPayment();
  }, [search]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">결제 처리 중입니다...</h2>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
