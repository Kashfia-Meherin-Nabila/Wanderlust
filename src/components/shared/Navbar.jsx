
"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import NavLink from "./NavLink";
import { Button, Avatar } from "@heroui/react";
import { FaUser } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Existing logout functionality
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="sticky top-0 z-50 px-4 pt-5">
      <div className="container mx-auto flex items-center justify-between gap-6 rounded-2xl border border-slate-200/70 bg-white/90 px-6 py-4 shadow-lg shadow-slate-200/40 backdrop-blur-xl">

        {/* Navigation menus */}
        <ul className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <li>
            <NavLink href={"/"}>
              <span className="rounded-xl px-4 py-3 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700">
                Home
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink href={"/destinations"}>
              <span className="rounded-xl px-4 py-3 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700">
                Destinations
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink href={"/my-bookings"}>
              <span className="rounded-xl px-4 py-3 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700">
                My Bookings
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink href={"/add-destination"}>
              <span className="rounded-xl px-4 py-3 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700">
                Add Destination
              </span>
            </NavLink>
          </li>
        </ul>

        {/* Logo */}
        <div className="shrink-0">
          <Image
            src={"/assets/Wanderlast.png"}
            alt="logo"
            height={150}
            width={150}
            priority
            className="h-auto w-[130px] transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Avatar and login button */}
        <div className="flex items-center gap-3">

          <Link href="/profile">
            <Button
              variant="ghost"
              startContent={<FaUser />}
              className="rounded-xl border border-slate-200 bg-white px-4 font-semibold text-slate-700 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700"
            >
              Profile
            </Button>
          </Link>

          <div className="h-8 w-px bg-slate-200" />

          {user ? (
            <>
              <li className="list-none">
                <Avatar className="h-10 w-10 border-2 border-cyan-200 shadow-sm">
                  <Avatar.Image
                    alt="John Doe"
                    src={user?.image}
                  />
                  <Avatar.Fallback>
                    {user.name.charAt(0)}
                  </Avatar.Fallback>
                </Avatar>
              </li>

              <li className="list-none">
                <Button
                  onClick={handleSignOut}
                  className="rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-5 font-semibold text-white shadow-md shadow-rose-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="rounded-xl px-4 font-semibold text-slate-700 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700"
                >
                  Log In
                </Button>
              </Link>

              <Link href="/signUp">
                <Button className="rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 px-6 font-semibold text-white shadow-md shadow-cyan-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
