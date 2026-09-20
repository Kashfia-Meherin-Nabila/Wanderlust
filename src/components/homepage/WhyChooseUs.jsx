import { FiCompass, FiShield, FiDollarSign, FiHeadphones } from "react-icons/fi";

export function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: <FiCompass className="w-6 h-6 text-cyan-500" />,
      title: "Handpicked Destinations",
      description:
        "Carefully curated travel experiences and hidden gems selected by expert travelers.",
    },
    {
      id: 2,
      icon: <FiDollarSign className="w-6 h-6 text-cyan-500" />,
      title: "Best Price Guarantee",
      description:
        "Competitive rates with zero hidden fees. Exceptional travel packages for every budget.",
    },
    {
      id: 3,
      icon: <FiShield className="w-6 h-6 text-cyan-500" />,
      title: "Safe & Seamless Booking",
      description:
        "Verified itineraries, secure payment gateways, and instant booking confirmations.",
    },
    {
      id: 4,
      icon: <FiHeadphones className="w-6 h-6 text-cyan-500" />,
      title: "24/7 Travel Support",
      description:
        "Our dedicated team is available around the clock to assist you before and during your journey.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
            Why Choose Wanderlust
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            We handle the details so you can create unforgettable memories across the globe.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 flex flex-col items-start"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center mb-5">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;