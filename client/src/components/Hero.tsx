import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-gray-900 text-white overflow-hidden my-6 rounded-xl max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <span className="w-8 h-[2px] bg-white"></span>
          <p className="font-medium text-sm tracking-widest uppercase">OUR BESTSELLERS</p>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Latest Arrivals
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-md">
          Discover premium fashion trends crafted for comfort, style, and everyday elegance. Elevate your wardrobe today.
        </p>
        <div>
          <a
            href="#latest"
            className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-md hover:bg-gray-200 transition"
          >
            Shop Now
          </a>
        </div>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <div className="w-72 h-72 md:w-96 md:h-96 bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-700 shadow-2xl">
          <span className="text-gray-500 text-sm tracking-wider uppercase font-semibold">Fashion Banner</span>
        </div>
      </div>
    </div>
  );
};