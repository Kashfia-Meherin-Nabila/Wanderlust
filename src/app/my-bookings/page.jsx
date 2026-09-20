import { DeleteBooking } from "@/components/shared/DeleteBooking";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { CiBookmarkCheck } from "react-icons/ci";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";


const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user
  const res = await fetch(`http://localhost:5000/booking/${user?.id}`,{
    cache: "no-store"
  })
  const bookings=await res.json()

  console.log(bookings);


  return <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view your upcoming travel plans.
          </p>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking, index) => {
              const bookingId = booking._id || booking.id || `b${index + 1}`;
              const isConfirmed = booking.status?.toLowerCase() === "confirmed";

              return (
                <div
                  key={bookingId}
                  className="flex flex-col sm:flex-row items-center bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-4 sm:p-5 gap-6"
                >
                  {/* Destination Image */}
                  <div className="relative w-full sm:w-56 h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={booking.imageUrl
 || "/placeholder.jpg"}
                      alt={booking.title || "Travel Destination"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content Details */}
                  <div className="flex-1 flex flex-col justify-between w-full h-full">
                    <div>
                      {/* Status Badge */}
                      <div className="mb-2">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-medium ${
                            isConfirmed
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {booking.status || "Pending"}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-900">
                        {booking.title}
                      </h2>

                      {/* Metadata */}
                      <div className="mt-2 space-y-1 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <span><FaCalendarAlt /></span>
                          <span>
                            Departure: {booking.departureDate || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span><CiBookmarkCheck /></span>
                          <span>Booking ID: {bookingId}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="mt-4 pt-2 flex items-center justify-between border-t border-gray-50 sm:border-none sm:pt-0">
                      <span className="text-2xl font-bold text-cyan-600">
                        ${booking.price}
                      </span>

                      <div className="flex items-center gap-3">
                        
                        <DeleteBooking bookingId={bookingId}/>
                        <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold rounded-md transition flex items-center gap-1.5">
                          <span><FaEye /></span>
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-500">No bookings found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  
};

export default MyBookingsPage;
