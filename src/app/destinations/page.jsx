import DestinationCard from "@/components/shared/DestinationCard";

const DestinationPage = async () => {
  const res = await fetch("http://localhost:5000/destinations");
  const destinations = await res.json();
  return (
    <div className="max-w-10/12 mx-auto my-20 space-y-5">
      <h2 className="text-3xl font-bold">All Destinations</h2>

      <div className="grid grid-cols-3 gap-5">
        {destinations.map((destinations) => (
          <DestinationCard key={destinations._id} destination={destinations} />
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;
