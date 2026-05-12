import Image from 'next/image';
import React from 'react';

const DestinationCard = ({ destination }) => {
  const { 
    destinationName, 
    country, 
    category, 
    price, 
    duration, 
    departureDate, 
    imageUrl, 
    description 
  } = destination;

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative">
        <Image 
          className="w-full h-56 object-cover" 
          src={imageUrl} 
          alt={destinationName} 
          height={400}
          width={400}
        />
        <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
          {category}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">
            {destinationName}
          </h2>
          <p className="text-blue-600 font-bold text-xl">
            ৳{price}
          </p>
        </div>

        <p className="text-sm text-gray-500 mb-3 flex items-center">
          <span className="mr-1">📍</span> {country}
        </p>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {description}
        </p>

        <hr className="my-4 border-gray-100" />

        {/* Footer Info */}
        <div className="flex justify-between items-center text-sm font-medium text-gray-700">
          <div className="flex items-center">
            <span className="mr-1">⏱️</span> {duration}
          </div>
          <div className="flex items-center">
            <span className="mr-1">📅</span> {departureDate}
          </div>
        </div>

        <button className="w-full mt-5 bg-gray-900 hover:bg-black text-white font-semibold py-2 rounded-lg transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DestinationCard;