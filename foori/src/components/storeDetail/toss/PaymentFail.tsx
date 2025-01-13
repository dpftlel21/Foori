import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../../../contexts/ToastContext';

const PaymentFail = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    // v2에서 변경된 에러 파라미터들
    const errorCode = searchParams.get('code'); // 에러 코드
    const errorMessage = searchParams.get('message'); // 에러 메시지
    const orderId = searchParams.get('orderId'); // 주문 ID

    showToast(errorMessage || '결제가 취소되었습니다.', 'error');

    // 에러 로깅
    console.error('Payment Failed:', {
      errorCode,
      errorMessage,
      orderId,
    });

    // 3초 후 이전 페이지로 이동
    const timer = setTimeout(() => {
      navigate(-1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [search, navigate, showToast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">결제에 실패했습니다</h2>
        <p className="text-gray-600">이전 페이지로 돌아갑니다...</p>
      </div>
    </div>
  );
};

export default PaymentFail;
