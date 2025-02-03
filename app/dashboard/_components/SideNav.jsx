"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { GraduationCap, Hand, LayoutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SideNav() {
  const { user } = useKindeBrowserClient();

  const menulist = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icon: GraduationCap,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="border shadow-md h-screen p-5">
      <Image src="/logo.svg" className="ml-20" width={120} height={50} alt="logo" />

      <hr className="my-5"></hr>
      {menulist.map((menu) => (
       <Link href={menu.path} key={menu.id}>
        <h2
          className="flex items-center gap-3 text-md p-4 hover:bg-slate-700 rounded-lg cursor-pointer
                text-slate-500 hover:text-white"          
        >
          <menu.icon />
          {menu.name}
        </h2>
       </Link>
      ))}

      <div className="flex gap-2 items-center bottom-5 fixed p-2">
        {user?.picture && (
          <Image
            src={user.picture}
            width={35}
            height={35}
            alt="User"
            className="rounded-full cursor-pointer"
          />
        )}
        <div>
            <h2 className="text-sm font-bold">{user?.given_name} {user?.family_name}</h2>
            <h2 className="text-xs text-slate-500">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
}

export default SideNav;