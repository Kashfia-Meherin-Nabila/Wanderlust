"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button, Input } from "@heroui/react";
import { FaUser, FaEnvelope, FaEdit, FaSave } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setName(user?.name || "");
    setImage(user?.image || "");
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setIsSaving(true);

      const tokenResult = await authClient.token();
      const token = tokenResult?.data?.token;

      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name.trim(),
            image: image.trim() || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      // Update Better Auth's internal client session state immediately
      if (typeof authClient.updateUser === "function") {
        await authClient.updateUser({
          name: name.trim(),
          image: image.trim() || null,
        });
      }

      // Re-fetch active session data from the server
      if (typeof refetch === "function") {
        await refetch();
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800">
            Login Required
          </h2>

          <p className="mt-3 text-gray-500">
            Please log in to view your profile.
          </p>

          <Link href="/login" className="mt-5 inline-block">
            <Button className="rounded-xl bg-cyan-600 text-white">
              Log In
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-cyan-100/50">

          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-teal-500 px-8 py-10 text-white">
            <h1 className="text-3xl font-bold">
              My Profile
            </h1>
            <p className="mt-2 text-sm text-white/80">
              Manage your personal information
            </p>
          </div>

          <div className="p-6 sm:p-10">

            {/* Profile Image */}
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-cyan-100 bg-cyan-50 shadow-md">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "Profile"}
                    fill
                    unoptimized
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-cyan-600">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Profile Details */}
            {!isEditing ? (
              <div className="space-y-5">

                {/* Name */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="mb-2 flex items-center gap-3 text-cyan-600">
                    <FaUser />
                    <span className="text-sm font-semibold">
                      Name
                    </span>
                  </div>

                  <p className="font-medium text-gray-800">
                    {user.name || "Not provided"}
                  </p>
                </div>

                {/* Email */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="mb-2 flex items-center gap-3 text-cyan-600">
                    <FaEnvelope />
                    <span className="text-sm font-semibold">
                      Email
                    </span>
                  </div>

                  <p className="break-all font-medium text-gray-800">
                    {user.email}
                  </p>
                </div>

                {/* Edit Button */}
                <Button
                  onClick={handleEdit}
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 py-3 font-semibold text-white shadow-md transition hover:shadow-lg"
                >
                  <FaEdit />
                  Edit Profile
                </Button>
              </div>
            ) : (
              /* Edit Form */
              <form onSubmit={handleUpdate} className="space-y-5">

                {/* Editable Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Name
                  </label>

                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full"
                    required
                  />
                </div>

                {/* Read-only Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    value={user.email || ""}
                    readOnly
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 outline-none"
                  />
                </div>

                {/* Editable Image */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Profile Image URL
                  </label>

                  <Input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Enter image URL"
                    className="w-full"
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 pt-3">
                  <Button
                    type="submit"
                    isDisabled={isSaving}
                    className="rounded-xl bg-cyan-600 px-6 font-semibold text-white hover:bg-cyan-700"
                  >
                    <FaSave />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    isDisabled={isSaving}
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-gray-200 px-6 font-semibold text-gray-600"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}