"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Navbar = ({ children, options_nav, title }) => {
  const pathname = usePathname();
  
  return (
    <div className="flex text-gray-900">
      <div className="bg-white flex flex-col gap-4 border-e w-20 h-screen items-center">
        <img className="w-14" src="https://img.freepik.com/vector-premium/logo-aguila_579179-2766.jpg" alt="" />
        
        <div className="flex flex-col gap-2 items-center">
            <div className={`group relative p-2 rounded-md cursor-pointer ${pathname === "/" ? "bg-gray-100" : "hover:bg-gray-100"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6zm2-10h4V5H5zm10 8h4v-6h-4zm0-12h4V5h-4zM5 19h4v-2H5zm4-2"></path></svg>
              <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                  <div className="absolute inset-0 -left-1 flex items-center">
                    <div className="h-2 w-2 rotate-45 bg-white"></div>
                  </div>
                  Dashboard
                </div>
              </div>
            </div>
          <Link href="/ventas">
            <div className={`group relative p-2 rounded-md cursor-pointer ${pathname === "/ventas" ? "bg-gray-100" : "hover:bg-gray-100"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth={1.5} d="M16 16c0-1.105-3.134-2-7-2s-7 .895-7 2s3.134 2 7 2s7-.895 7-2ZM2 16v4.937C2 22.077 5.134 23 9 23s7-.924 7-2.063V16M9 5c-4.418 0-8 .895-8 2s3.582 2 8 2M1 7v5c0 1.013 3.582 2 8 2M23 4c0-1.105-3.1-2-6.923-2s-6.923.895-6.923 2s3.1 2 6.923 2S23 5.105 23 4Zm-7 12c3.824 0 7-.987 7-2V4M9.154 4v10.166M9 9c0 1.013 3.253 2 7.077 2S23 10.013 23 9"></path></svg>
              <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                  <div className="absolute inset-0 -left-1 flex items-center">
                    <div className="h-2 w-2 rotate-45 bg-white"></div>
                  </div>
                  Ventas
                </div>
              </div>
            </div>
          </Link>
          <Link href="/inventario">
            <div className={`group relative p-2 rounded-md cursor-pointer ${pathname === "/inventario" ? "bg-gray-100" : "hover:bg-gray-100"}`}>
              <svg className="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" strokeWidth={1.5}><path fill="currentColor" d="m2.695 7.185l9 4l.61-1.37l-9-4zM12.75 21.5v-11h-1.5v11zm-.445-10.315l9-4l-.61-1.37l-9 4z"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3 17.11V6.89a.6.6 0 0 1 .356-.548l8.4-3.734a.6.6 0 0 1 .488 0l8.4 3.734A.6.6 0 0 1 21 6.89v10.22a.6.6 0 0 1-.356.548l-8.4 3.734a.6.6 0 0 1-.488 0l-8.4-3.734A.6.6 0 0 1 3 17.11"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m7.5 4.5l8.644 3.842a.6.6 0 0 1 .356.548v3.61"></path></g></svg>
              <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                  <div className="absolute inset-0 -left-1 flex items-center">
                    <div className="h-2 w-2 rotate-45 bg-white"></div>
                  </div>
                  Inventario
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="bg-white flex flex-col gap-4 border-e w-52 h-screen">
        <div className="border-b h-14 flex items-center">
          <p className="ps-4 font-bold">{title}</p>
        </div>
        <div className="flex flex-col gap-2 px-3">
          {options_nav}
        </div>
      </div>
      <div className="bg-white flex flex-col gap-4 border-e w-full h-screen">
        <div className="border-b h-14 flex items-center">
          <p className="ps-4 font-bold">Andy QM / Ferreteria S.A.C</p>
        </div>
        <div className="flex flex-col gap-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Navbar;