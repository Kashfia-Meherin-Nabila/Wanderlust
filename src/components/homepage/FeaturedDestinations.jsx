"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { FiCalendar, FiArrowUpRight, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

// Swiper React components & styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export function FeaturedDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [swiperRef, setSwiperRef] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destinations`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setDestinations(data);
        }
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500 font-sans">
        Loading destinations...
      </div>
    );
  }

  return (
    <section className="py-12 bg-white font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Featured Destinations
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 border border-cyan-400 text-cyan-500 px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-cyan-50 transition self-start sm:self-auto"
          >
            All Destinations
            <FiArrowUpRight className="text-base" />
          </Link>
        </div>

        {/* Carousel Slider */}
        <Swiper
          onSwiper={setSwiperRef}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full !pb-4"
        >
          {destinations.map((item) => {
            const itemId = item._id || item.id;

            return (
              <SwiperSlide key={itemId}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col group h-full">
                  {/* Image Container with Rating Overlay */}
                  <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                    <Image
                      src={item.imageUrl || "/placeholder.jpg"}
                      alt={item.destinationName || "Destination"}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
                      <span>{item.rating || "4.5"}</span>
                      <FaStar className="text-amber-400 text-xs" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Country Meta */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1 capitalize">
                        <FaLocationDot className="text-gray-400" />
                        <span>{item.country}</span>
                      </div>

                      {/* Title & Price Row */}
                      <div className="flex items-baseline justify-between gap-2 mt-1">
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1 capitalize">
                          {item.destinationName}
                        </h3>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xl font-extrabold text-gray-900">
                            ${item.price}
                          </span>
                          <span className="text-xs text-gray-400 font-normal">
                            /Person
                          </span>
                        </div>
                      </div>

                      {/* Duration Meta */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2 font-medium">
                        <FiCalendar className="text-gray-400 text-sm" />
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 pt-2">
                      <Link
                        href={`/destinations/${itemId}`}
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-cyan-500 hover:text-cyan-600 transition"
                      >
                        Book Now
                        <FiArrowUpRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Clickable Navigation Controls */}
        <div className="mt-8 pt-4 flex items-center justify-between border-t border-gray-100">
          <div className="text-sm font-semibold text-gray-500">
            {currentIndex}/{destinations.length || 1}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => swiperRef?.slidePrev()}
              aria-label="Previous destination"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-95 transition"
            >
              <FiArrowLeft />
            </button>
            <button
              onClick={() => swiperRef?.slideNext()}
              aria-label="Next destination"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-95 transition"
            >
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedDestinations;