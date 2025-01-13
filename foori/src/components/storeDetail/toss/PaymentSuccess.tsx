import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cookieStorage } from '../../../api/cookies';
import { useToast } from '../../../contexts/ToastContext';

const PaymentSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const token = cookieStorage.getToken();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const paymentKey = searchParams.get('paymentKey') || '';
    const orderId = searchParams.get('orderId') || '';
    const amount = searchParams.get('amount') || '0';
    const paymentType = searchParams.get('paymentType');

    const confirmPayment = async () => {
      try {
        // orderId에서 숫자 부분만 추출 (ORDER_timestamp_id_random 형식에서)
        const orderIdNumber = orderId.split('_')[2]; // placeInfo.id 부분 추출

        const response = await fetch(
          `${import.meta.env.VITE_BACK_URL}/api/booking/confirm`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              paymentKey: paymentKey, // string
              orderId: Number(orderIdNumber), // number로 변환
              amount: Number(amount), // number로 변환
              paymentType: paymentType || 'NORMAL', // string
            }),
          },
        );

        console.log('Payment confirmation request:', {
          paymentKey,
          orderId: Number(orderIdNumber),
          amount: Number(amount),
          paymentType,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '결제 승인 실패');
        }

        showToast('결제가 완료되었습니다.', 'success');
        navigate('/mypage');
      } catch (error) {
        console.error('Payment Confirmation Error:', error);
        showToast('결제 승인 중 오류가 발생했습니다.', 'error');
      }
    };

    if (paymentKey && orderId && amount) {
      confirmPayment();
    }
  }, [search, navigate, showToast]);

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
