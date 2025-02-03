import { AnimatePresence, motion } from 'framer-motion';
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

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const contentVariants = {
    hidden: {
      scale: 0.9,
      y: 20,
      opacity: 0,
    },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      scale: 0.9,
      y: 20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  useEffect(() => {
    const initPayment = async () => {
      if (isOpen && document.getElementById('payment-method')) {
        const handler = await tossPay({
          amount,
          orderId,
          orderName,
          customerName,
        });
        setPaymentHandler(handler as () => Promise<void>);
      }
    };

    initPayment();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-[500px]"
            variants={contentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="flex justify-between items-center mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-bold">결제 수단 선택</h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div id="payment-method" className="w-full min-h-[200px]" />
              <div id="agreement" className="w-full" />
            </motion.div>

            <motion.button
              onClick={() => paymentHandler && paymentHandler()}
              className="w-full mt-4 bg-[#e38994] text-white py-2 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              결제하기
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
