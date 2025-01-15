import { useEffect, useState } from 'react';
import { useTossPay } from '../../../api/endpoints/tossPayments';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
}

const PaymentModal = ({
  isOpen,
  onClose,
  amount,
  orderId,
  orderName,
  customerName,
}: PaymentModalProps) => {
  const { tossPay } = useTossPay();
  const [paymentHandler, setPaymentHandler] = useState<
    (() => Promise<void>) | null
  >(null);

  useEffect(() => {
    const initPayment = async () => {
      if (isOpen && document.getElementById('payment-method')) {
        console.log('orderId', orderId);
        const handler = await tossPay({
          amount,
          orderId,
          orderName,
          customerName,
        });
        setPaymentHandler(() => handler);
      }
    };

    initPayment();
  }, [isOpen]);

  //console.log('amount', amount);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">결제 수단 선택</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div id="payment-method" className="w-full min-h-[200px]"></div>
        <div id="agreement" className="w-full"></div>
        <button
          onClick={() => paymentHandler && paymentHandler()}
          className="w-full mt-4 bg-[#e38994] text-white py-2 rounded-lg"
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
