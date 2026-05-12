"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiDelete } from "react-icons/fi";

export function DeleteDestination({ destination }) {
     const router = useRouter();
  const { _id, destinationName } = destination;

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/destinations/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
     if (data.deletedCount > 0) {
      router.push("/destinations"); 
    }
    console.log(data);
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
              <AlertDialog.Heading>
                Delete <strong>{destinationName}</strong> permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{destinationName}</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" onClick={handleDelete} variant="danger">
                Delete Destination
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
