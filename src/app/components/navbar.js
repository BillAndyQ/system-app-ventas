"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Navbar = ({ children, options_nav, title }) => {
  const pathname = usePathname();
  
  return (
    <div className="flex text-gray-900">
      <div className="bg-white flex flex-col gap-4 border-e w-[4rem] h-screen items-center">
        <img className="w-14" src="https://img.freepik.com/vector-premium/logo-aguila_579179-2766.jpg" alt="" />
        
        <div className="flex flex-col gap-2 items-center">
            <div className={`group relative p-2 rounded-md cursor-pointer ${pathname === "/" ? "bg-gray-100" : "hover:bg-gray-100"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-panel-left"><rect width="7" height="18" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth={1.2} d="M16 16c0-1.105-3.134-2-7-2s-7 .895-7 2s3.134 2 7 2s7-.895 7-2ZM2 16v4.937C2 22.077 5.134 23 9 23s7-.924 7-2.063V16M9 5c-4.418 0-8 .895-8 2s3.582 2 8 2M1 7v5c0 1.013 3.582 2 8 2M23 4c0-1.105-3.1-2-6.923-2s-6.923.895-6.923 2s3.1 2 6.923 2S23 5.105 23 4Zm-7 12c3.824 0 7-.987 7-2V4M9.154 4v10.166M9 9c0 1.013 3.253 2 7.077 2S23 10.013 23 9"></path></svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"/><path d="m7.5 4.27 9 5.15"/></svg>
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