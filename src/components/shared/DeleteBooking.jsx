"use client";

import { AlertDialog, Button } from "@heroui/react";
import { FiDelete } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function DeleteBooking({ bookingId }) {
    const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleCancelBooking = async () => {
    try {
      setLoading(true);
      const {data: tokenData} = await authClient.token()
          const token = tokenData?.token;
          // console.log(token);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      if (res.ok) {
        // Refreshes the server-side data without full page reload
        toast.success("Booking cancelled successfully!");
        router.refresh(); 
        
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <button className="flex items-center gap-1 border border-red-200 text-red-500 px-4 py-1.5 rounded-md text-sm font-medium">
          <FiDelete /> Cancel
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete and all of its data. This action
                cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={handleCancelBooking}
                slot="close"
                variant="danger"
              >
                Delete Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
