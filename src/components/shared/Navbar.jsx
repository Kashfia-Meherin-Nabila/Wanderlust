"use client";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import NavLink from "./NavLink";
import { Button } from "@heroui/react";
import { FaUser } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // logout button functionality
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="container my-6 flex justify-between mx-auto items-center">
      {/* left empty div */}

      {/* nav menus */}
      <ul className="flex gap-4 justify-between items-center text-gray-700 font-semibold">
        <li>
          <NavLink href={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink href={"/destinations"}>Destinations</NavLink>
        </li>
        <li>
          <NavLink href={"/my-bookings"}>My Bookings</NavLink>
        </li>
        <li>
          <NavLink href={"/admin"}>Admin</NavLink>
        </li>
        <li>
          <NavLink href={"/add-destination"}>Add-Destination</NavLink>
        </li>
      </ul>

      <div>
        <Image
          src={"/assets/Wanderlast.png"}
          alt="logo"
          height={150}
          width={150}
        />
      </div>

      {/* avatar and login button div */}
      <div className="flex gap-3 items-center">
        <Link href="/profile">
          <Button
            className="items-center hover:border-cyan-600 hover:bg-cyan-50 rounded-2xl transition-all"
            variant="ghost"
            startContent={<FaUser />}
          >
            <FaUser /> Profile
          </Button>
        </Link>
        <div className="h-6 w-px bg-gray-200 mx-2" /> {/* Vertical Divider */}
        {user ? (
          <>
            <li>
              <Avatar>
                <Avatar.Image
                  // referrerPolicy="no-referrer"
                  alt="John Doe"
                  src={user?.image}
                />
                <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
            </li>
            <li>
              <Button
                onClick={handleSignOut}
                className={"rounded-none bg-red-500 text-white"}
              >
                Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button
                className="hover:border-cyan-600 hover:bg-cyan-50 rounded-2xl transition-all"
                variant="ghost"
              >
                Log In
              </Button>
            </Link>

            <Link href="/signUp">
              <Button className="bg-cyan-600 text-white hover:bg-cyan-700 rounded-2xl px-6 transition-all">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
