import React from 'react';

export const OurPolicy: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-gray-50 my-12 rounded-xl">
      <div className="flex flex-col items-center p-4">
        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl mb-4">
          🔄
        </div>
        <h4 className="font-semibold text-gray-900 text-lg">Easy Exchange Policy</h4>
        <p className="text-gray-500 text-sm mt-2">We offer hassle-free exchange policy on all clothing items within 7 days.</p>
      </div>

      <div className="flex flex-col items-center p-4">
        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl mb-4">
          🛡️
        </div>
        <h4 className="font-semibold text-gray-900 text-lg">7 Days Return Policy</h4>
        <p className="text-gray-500 text-sm mt-2">Shop with confidence with our straightforward 7-day return guarantee.</p>
      </div>

      <div className="flex flex-col items-center p-4">
        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl mb-4">
          📞
        </div>
        <h4 className="font-semibold text-gray-900 text-lg">Best Customer Support</h4>
        <p className="text-gray-500 text-sm mt-2">Our support team is available 24/7 to assist you with any questions.</p>
      </div>
    </div>
  );
};