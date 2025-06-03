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
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receipt) {
      setError('Please upload your payment receipt.');
      return;
    }
    if (!paymentType) {
      setError('Please select a payment type.');
      return;
    }
    setError(null);
    if (onEnrollmentSubmitted) onEnrollmentSubmitted(receipt, paymentType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl max-w-md w-full p-8 shadow-xl z-10">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-[#1E3A5F]">Enroll in {program}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Program Price</label>
            <div className="text-lg font-bold text-[#002B5C] mb-2">₱{price.toLocaleString()}</div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Upload Receipt</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#92D0D3]"
              required
            />
            {receipt && <div className="mt-2 text-green-600 text-sm">{receipt.name} selected</div>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Payment Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentType"
                  value="cash"
                  checked={paymentType === 'cash'}
                  onChange={() => setPaymentType('cash')}
                  className="accent-[#92D0D3]"
                />
                Cash
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentType"
                  value="online"
                  checked={paymentType === 'online'}
                  onChange={() => setPaymentType('online')}
                  className="accent-[#92D0D3]"
                />
                Online Payment
              </label>
            </div>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[#92D0D3] text-white py-2 rounded-lg font-semibold hover:bg-[#7bbec2] transition"
          >
            Submit Enrollment
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollModal;
