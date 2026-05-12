import { EditModal } from '@/components/shared/EditModal';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';

const DestinationDetails =async ({params}) => {
    const {id} = await params
    const res = await fetch (`http://localhost:5000/destinations/${id}`)
    const destination = await res.json()

    if (!destination) return <div className="p-10 text-center">Loading...</div>;

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
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* Navbar Placeholder */}
      

      <main className="max-w-6xl mx-auto mt-8 px-4">
        {/* Navigation / Actions */}
        <div className="flex justify-between items-center mb-6">
          <button className="text-gray-500 flex items-center gap-2 hover:text-black">
           <Link href="/destinations" className="flex items-center gap-2 text-gray-500 hover:text-black">
   <BiArrowBack /> Destinations
</Link>
            
          </button>
          <div className="flex gap-3">
            <EditModal destination={ destination }/>

            <button className="border border-red-200 text-red-500 px-4 py-1.5 rounded-md text-sm font-medium">
              🗑️ Cancel
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="object-cover w-full h-112.5 rounded-2xl overflow-hidden mb-10 shadow-lg">
          <Image 
            src={imageUrl} 
            alt={destinationName}
            width={600}
            height={300}
            
            className="w-full h-full "
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            <p className="text-gray-400 text-sm flex items-center gap-1 mb-2">
              📍 {country}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{destinationName}</h1>
            
            <div className="flex items-center gap-4 mb-8 text-sm text-gray-600 font-medium">
              <span className="flex items-center text-yellow-500">⭐ 4.9 (234 reviews)</span>
              <span className="flex items-center gap-1">🕒 {duration}</span>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs uppercase">
                {category}
              </span>
            </div>

            <section className="mb-8">
              <h3 className="text-xl font-bold mb-3">Overview</h3>
              <p className="text-gray-600 leading-relaxed">
                {description}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">Highlights</h3>
              <div className="grid grid-cols-2 gap-y-3 text-gray-600 text-sm">
                <div className="flex items-center gap-2">✅ Luxury mountain accommodation</div>
                <div className="flex items-center gap-2">✅ Guided nature trails</div>
                <div className="flex items-center gap-2">✅ Traditional local cuisine</div>
                <div className="flex items-center gap-2">✅ Evening campfire experience</div>
                <div className="flex items-center gap-2">✅ Photography session</div>
              </div>
            </section>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <div className="border border-gray-100 shadow-xl rounded-2xl p-6 sticky top-10">
              <p className="text-gray-500 text-sm mb-1">Starting from</p>
              <h2 className="text-3xl font-bold text-cyan-600 mb-6">${price} <span className="text-sm font-normal text-gray-400">per person</span></h2>
              
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4 text-gray-700 font-medium">
                {departureDate}
              </div>

              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl transition-colors mb-6 flex justify-center items-center gap-2">
                Book Now <span>→</span>
              </button>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2">✓ Free cancellation up to 7 days</li>
                <li className="flex items-center gap-2">✓ Travel insurance included</li>
                <li className="flex items-center gap-2">✓ 24/7 customer support</li>
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default DestinationDetails;