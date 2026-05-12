"use client";

import {
  Button,
  Input,
  Label,
  Modal,
  TextArea,
  Select,
  TextField,
  FieldError,
  ListBox,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";

export function EditModal({ destination }) {
  // Destructure for easy access to default values
  const {
    _id,
    destinationName,
    country,
    category,
    price,
    duration,
    departureDate,
    imageUrl,
    description,
  } = destination || {};
 const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());
    console.log("Updated Destination Data:", updatedData);
    // Here you would typically call your API:

   
    const res = await fetch(`http://localhost:5000/destinations/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const data = await res.json();
    console.log(data);

    if (data.modifiedCount > 0) {
    router.refresh();
  }
  };

  return (
    <Modal>
      {/* The Trigger Button */}
      <Modal.Trigger>
        <button className="border border-gray-300 px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors">
          <BiEdit /> Edit
        </button>
      </Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl">
            {" "}
            {/* Widened to xl for the grid */}
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-cyan-100 text-cyan-600">
                <BsPencilSquare className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Destination</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-0">
              {" "}
              {/* Removed body padding to let Surface/Form control it */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Destination Name */}
                  <div className="md:col-span-2">
                    <TextField
                      name="destinationName"
                      isRequired
                      defaultValue={destinationName}
                    >
                      <Label>Destination Name</Label>
                      <Input
                        placeholder="e.g. Bali Paradise"
                        className="rounded-xl"
                      />
                      <FieldError />
                    </TextField>
                  </div>

                  {/* Country */}
                  <TextField name="country" isRequired defaultValue={country}>
                    <Label>Country</Label>
                    <Input placeholder="Indonesia" className="rounded-xl" />
                    <FieldError />
                  </TextField>

                  {/* Category */}
                  <Select
                    name="category"
                    isRequired
                    defaultSelectedKey={category}
                  >
                    <Label>Category</Label>
                    <Select.Trigger className="rounded-xl">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {[
                          "Beach",
                          "Mountain",
                          "City",
                          "Adventure",
                          "Cultural",
                          "Luxury",
                        ].map((cat) => (
                          <ListBox.Item key={cat} id={cat} textValue={cat}>
                            {cat}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {/* Price */}
                  <TextField
                    name="price"
                    type="number"
                    isRequired
                    defaultValue={price}
                  >
                    <Label>Price (USD)</Label>
                    <Input placeholder="1299" className="rounded-xl" />
                    <FieldError />
                  </TextField>

                  {/* Duration */}
                  <TextField name="duration" isRequired defaultValue={duration}>
                    <Label>Duration</Label>
                    <Input
                      placeholder="7 Days / 6 Nights"
                      className="rounded-xl"
                    />
                    <FieldError />
                  </TextField>

                  {/* Departure Date */}
                  <div className="md:col-span-2">
                    <TextField
                      name="departureDate"
                      type="date"
                      isRequired
                      defaultValue={departureDate}
                    >
                      <Label>Departure Date</Label>
                      <Input type="date" className="rounded-xl" />
                      <FieldError />
                    </TextField>
                  </div>

                  {/* Image URL */}
                  <div className="md:col-span-2">
                    <TextField
                      name="imageUrl"
                      isRequired
                      defaultValue={imageUrl}
                    >
                      <Label>Image URL</Label>
                      <Input type="url" className="rounded-xl" />
                      <FieldError />
                    </TextField>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <TextField
                      name="description"
                      isRequired
                      defaultValue={description}
                    >
                      <Label>Description</Label>
                      <TextArea
                        placeholder="Describe the experience..."
                        className="rounded-xl"
                      />
                      <FieldError />
                    </TextField>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-cyan-600 text-white font-bold h-12 rounded-xl hover:bg-cyan-700"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer className="border-t border-gray-100">
              <Button slot="close" variant="secondary" className="rounded-xl">
                Close without saving
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
