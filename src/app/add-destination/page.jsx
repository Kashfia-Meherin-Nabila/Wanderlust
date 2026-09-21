"use client"
import { authClient } from "@/lib/auth-client";
import { FieldError } from "@heroui/react";
import { Label } from "@heroui/react";
import { Input } from "@heroui/react";
import { ListBox } from "@heroui/react";
import { TextField } from "@heroui/react";
import { TextArea } from "@heroui/react";
import { Button } from "@heroui/react";
import { Select } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const AddDestination = () => {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());

    const {data: tokenData} = await authClient.token()
        const token = tokenData?.token;
        // console.log(token);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(destination),
    });
   if (res.ok) {
    toast.success("Destination Added Successfully")
      router.push("/destinations"); 
      router.refresh();             
    }
  
  };
  return (
   <div className="max-w-5xl mx-auto p-5">
      <h2 className="text-2xl font-bold">Add Destination</h2>

      <form onSubmit={onSubmit} className="p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Destination Name */}
          <div className="md:col-span-2">
            <TextField isRequired>
              <Label>Destination Name</Label>
              <Input
                name="destinationName"
                placeholder="Bali Paradise"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>
          </div>

          {/* Country */}
          <TextField isRequired>
            <Label>Country</Label>
            <Input
              name="country"
              placeholder="Indonesia"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Category */}
          <div>
            <Select
              name="category"
              isRequired
              className="w-full"
              placeholder="Select category"
            >
              <Label>Category</Label>
              <Select.Trigger className="rounded-2xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="Beach" textValue="Beach">
                    Beach
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Mountain" textValue="Mountain">
                    Mountain
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="City" textValue="City">
                    City
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Adventure" textValue="Adventure">
                    Adventure
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Cultural" textValue="Cultural">
                    Cultural
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Luxury" textValue="Luxury">
                    Luxury
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Price */}
          <TextField isRequired>
            <Label>Price (BDT)</Label>
            <Input
              name="price"
              type="number"
              placeholder="1299"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Duration */}
          <TextField isRequired>
            <Label>Duration</Label>
            <Input
              name="duration"
              placeholder="7 Days / 6 Nights"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Departure Date */}
          <div className="md:col-span-2">
            <TextField isRequired>
              <Label>Departure Date</Label>
              <Input name="departureDate" type="date" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <TextField isRequired>
              <Label>Image URL</Label>
              <Input
                name="imageUrl"
                type="url"
                placeholder="https://example.com/bali-paradise.jpg"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <TextField isRequired>
              <Label>Description</Label>
              <TextArea
                name="description"
                placeholder="Describe the travel experience..."
                className="rounded-3xl"
              />
              <FieldError />
            </TextField>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="outline"
          className="rounded-none w-full bg-cyan-500 text-white"
        >
          Add Destination
        </Button>
      </form>
    </div>
  );
};

export default AddDestination;
