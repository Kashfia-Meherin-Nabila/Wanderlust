"use client";

import { useState } from "react";
import Image from "next/image";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export function Testimonials() {
  const [swiperRef, setSwiperRef] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Solo Traveler",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      comment:
        "Booking our Cox's Bazar beach getaway through Wanderlust was completely effortless. The itinerary was well organized and customer support helped us instantly when we needed to tweak dates!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Adventure Enthusiast",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      comment:
        "Top tier experience! I've booked three separate trips through Wanderlust now and every destination exceeded expectations. Transparent pricing with zero hidden fees.",
    },
    {
      id: 3,
      name: "Emma & David",
      role: "Honeymooners",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      comment:
        "Our Bali trip was magical. From the ocean view resorts to seamless airport transfers, everything felt premium and curated specifically for us. Highly recommended!",
    },
    {
      id: 4,
      name: "Alex Rivera",
      role: "Digital Nomad",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      comment:
        "Finding reliable travel deals while working remotely can be stressful, but Wanderlust makes it simple. Fast cancellation and instant booking updates give huge peace of mind.",
    },
  ];

  return (
    <section className="py-16 bg-white font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
            Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
            What Travelers Say
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Read genuine feedback from travelers who explored the world with us.
          </p>
        </div>

        {/* Testimonial Swiper Slider */}
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
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition">
                <div>
                  {/* Quote Icon & Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <FaQuoteLeft className="text-cyan-500/30 text-3xl" />
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} className="text-amber-400 text-xs" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                    {review.comment}
                  </p>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200/60">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-cyan-200">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">
                      {review.name}
                    </h4>
                    <p className="text-xs text-gray-400">{review.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Carousel Navigation Controls */}
        <div className="mt-8 pt-4 flex items-center justify-between border-t border-gray-100">
          <div className="text-sm font-semibold text-gray-500">
            {currentIndex}/{reviews.length}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => swiperRef?.slidePrev()}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-95 transition"
            >
              <FiArrowLeft />
            </button>
            <button
              onClick={() => swiperRef?.slideNext()}
              aria-label="Next review"
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

export default Testimonials;