'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

const PaymentSuccess = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0; // Just update state
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Redirect separately when countdown hits 0
  useEffect(() => {
    if (countdown === 0) {
      router.push('/cart');
    }
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-green-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="relative w-24 h-24 mb-6 mx-auto">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25" />
          <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse opacity-50" />
          <div className="relative bg-green-500 rounded-full w-full h-full flex items-center justify-center">
            <Check className="w-12 h-12 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-600 text-lg mb-4">Payment was completed successfully.</p>
        <p className="text-gray-500 text-md mb-6">You will be redirected to your cart shortly.</p>

        <p className="text-lg font-medium text-gray-700">
          Redirecting in <span className="font-bold">{countdown}</span> seconds...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
