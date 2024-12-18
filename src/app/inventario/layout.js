import localFont from "next/font/local";
import "../globals.css";
import Navbar from "@/app/components/navbar.js"

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Ventas",
  description: "Ventas",
};

const options_nav = (
  <>
    <div className="bg-gray-100 rounded"><p className="ps-4 py-1 text-sm font-bold text-black">Lista de productos</p></div>
    <div className="rounded"><p className="ps-4 py-1 text-sm text-black">Reporte de inventario</p></div>
  </>
)

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar options_nav={options_nav} title={"Inventario"}>
        { children}
        </Navbar>
      </body>
    </html>
  );
}
