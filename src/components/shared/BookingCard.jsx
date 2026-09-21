"use client";
import { authClient } from "@/lib/auth-client";
import { Label } from "@heroui/react";
import { DateField } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BookingCard = ({ destination }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  //console.log(user);
  const [departureDate, setDepartureDate] = useState(null);
  //console.log(new Date(departureDate));
  const { price, _id, destinationName, imageUrl, country } = destination || {};
  //console.log(destination);

  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      destinationId: _id,
      destinationName,
      price,
      imageUrl,
      country,
      departureDate: new Date(departureDate),
    };
    

    const {data: tokenData} = await authClient.token()
    const token = tokenData?.token;
    // console.log(token);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
         Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();
    toast.success("You booked Successfully")
    router.push("/my-bookings");
  };
  return (
    <div className="border border-gray-100 shadow-xl rounded-2xl p-6 sticky top-10 space-y-4">
      <p className="text-gray-500 text-sm mb-1">Starting from</p>

      <h2 className="text-3xl font-bold text-cyan-600 mb-6">
        ${price}
        <span className="text-sm font-normal text-gray-400"> per person</span>
      </h2>

      <DateField onChange={setDepartureDate} className="w-[256px]" name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>
      {/* <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4 text-gray-700 font-medium">
        {departureDate}
      </div> */}

      <button
        onClick={handleBooking}
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl transition-colors mb-6 flex justify-center items-center gap-2"
      >
        Book Now <span>→</span>
      </button>

      <ul className="space-y-3 text-sm text-gray-600">
        <li className="flex items-center gap-2">
          ✓ Free cancellation up to 7 days
        </li>

        <li className="flex items-center gap-2">✓ Travel insurance included</li>

        <li className="flex items-center gap-2">✓ 24/7 customer support</li>
      </ul>
    </div>
  );
};

export default BookingCard;
