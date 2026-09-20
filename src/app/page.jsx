import Banner from "@/components/homepage/Banner";
import FeaturedDestinations from "@/components/homepage/FeaturedDestinations";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Banner/>
      <FeaturedDestinations/>
    </div>
  );
}
