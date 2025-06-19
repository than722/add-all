import React, { useRef, useState } from 'react';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: string;
  price: number;
  onEnrollmentSubmitted?: (receiptFile: File, paymentType: string) => void;
}

const EnrollModal: React.FC<EnrollModalProps> = ({ isOpen, onClose, program, price, onEnrollmentSubmitted }) => {
  const [paymentType, setPaymentType] = useState<'cash' | 'online' | ''>('');
  const [receipt, setReceipt] = useState<File | null>(null);

  const [receiptError, setReceiptError] = useState<string | null>(null);
  const [paymentTypeError, setPaymentTypeError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0]);
      setReceiptError(null);
    } else {
      setReceipt(null);
      setReceiptError('Please upload your payment receipt.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setReceiptError(null);
    setPaymentTypeError(null);

    let isValid = true;

    if (!receipt) {
      setReceiptError('Please upload your payment receipt.');
      isValid = false;
    }

    if (!paymentType) {
      setPaymentTypeError('Please select a payment type.');
      isValid = false;
    }

    if (isValid && onEnrollmentSubmitted) {
      onEnrollmentSubmitted(receipt as File, paymentType);
      setPaymentType('');
      setReceipt(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-2 sm:px-0">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl max-w-xs sm:max-w-md w-full p-4 sm:p-8 shadow-xl z-10">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 focus:outline-none text-xl sm:text-2xl cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-[#1E3A5F]">Enroll in {program}</h2>
        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold text-sm">Program Price</label>
            <div className="text-base sm:text-lg font-bold text-[#08228d] mb-2">₱{price.toLocaleString()}</div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold text-sm">Upload Receipt</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="Choose File"
              />
              <button
                type="button"
                className={`w-full border rounded-lg px-3 sm:px-4 py-2 bg-white text-gray-900 text-left focus:outline-none focus:ring-2 ${receiptError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#92D0D3]'} text-xs sm:text-base cursor-pointer`}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                {receipt ? receipt.name : 'Choose File'}
              </button>
            </div>
            {receipt && <div className="mt-2 text-green-600 text-xs sm:text-sm">{receipt.name} selected</div>}
            {receiptError && <div className="text-red-600 text-xs mt-1">{receiptError}</div>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold text-sm">Payment Type</label>
            <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4 ${paymentTypeError ? 'border-red-500 p-2 rounded-lg' : ''}`}>
              <label className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="paymentType"
                  value="cash"
                  checked={paymentType === 'cash'}
                  onChange={() => {
                    setPaymentType('cash');
                    setPaymentTypeError(null);
                  }}
                  className="accent-[#92D0D3] cursor-pointer"
                />
                Cash
              </label>
              <label className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="paymentType"
                  value="online"
                  checked={paymentType === 'online'}
                  onChange={() => {
                    setPaymentType('online');
                    setPaymentTypeError(null);
                  }}
                  className="accent-[#92D0D3] cursor-pointer"
                />
                Online Payment
              </label>
            </div>
            {paymentTypeError && <div className="text-red-600 text-xs mt-1">{paymentTypeError}</div>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#92D0D3] text-white py-2 rounded-lg font-semibold hover:bg-[#7bbec2] transition text-sm sm:text-base cursor-pointer"
          >
            Submit Enrollment
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollModal;