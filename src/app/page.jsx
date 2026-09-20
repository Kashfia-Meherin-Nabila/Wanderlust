import Banner from "@/components/homepage/Banner";
import FeaturedDestinations from "@/components/homepage/FeaturedDestinations";
import Testimonials from "@/components/homepage/Testimonials";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Banner/>
      <FeaturedDestinations/>
      <WhyChooseUs/>
      <Testimonials/>
    </div>
  );
}
