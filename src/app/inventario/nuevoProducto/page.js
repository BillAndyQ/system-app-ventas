"use client"
import { useState } from 'react';

export default function Home() {

    const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  const generateQRCode = async () => {
    try {
      setError('');
      setQrCode('');

      const response = await fetch('/recurses/generateQR', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate QR code');
      }

      setQrCode(data.qrCode);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative px-4 h-[calc(100vh-5rem)]">
        <div className="flex w-full ">
            <p className="text-lg font-bold">Nuevo producto</p>
        </div>

        <p className="text-sm mt-3 mb-1 text-gray-700">Nombre del producto</p>
        <div className="flex rounded-md border overflow-hidden w-1/2 max-w-md font-[sans-serif]">
            <input type="text" placeholder="Nombre del producto" className="w-full outline-none bg-white text-gray-600 text-sm px-3 py-2" />
        </div>



        <p className="text-sm mt-2 mb-1 text-gray-700">Descripción</p>
        <div className="flex rounded-md border overflow-hidden w-1/2 max-w-md font-[sans-serif]">
            <input type="text" placeholder="Descripción" className="w-full outline-none bg-white text-gray-600 text-sm px-3 py-2" />
        </div>

        <p className="text-sm mt-2 mb-1 text-gray-700">Precio</p>
        <div className="flex rounded-md border overflow-hidden w-1/2 max-w-md font-[sans-serif]">
            <input type="number" placeholder="Precio" className="w-full outline-none bg-white text-gray-600 text-sm px-3 py-2" />
        </div>

        <p className="text-sm mt-2 mb-1 text-gray-700">Stock</p>
        <div className="flex rounded-md border overflow-hidden w-full max-w-md font-[sans-serif]">
            <input type="number" placeholder="Stock" className="w-full outline-none bg-white text-gray-600 text-sm px-3 py-2" />
        </div>

        <p className="text-sm mt-2 mb-1 text-gray-700">Categoría</p>
        <div className="w-full max-w-md">
            <div className="relative">
                <select
                    className="w-full bg-transparent placeholder:text-slate-400  text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                    <option value="brazil">Brazil</option>
                    <option value="bucharest">Bucharest</option>
                    <option value="london">London</option>
                    <option value="washington">Washington</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
            </div>
        </div>

        <p className="text-sm mt-3 mb-1 text-gray-700">Código del producto</p>
        <div className="flex rounded-md border overflow-hidden w-1/2 max-w-md font-[sans-serif]">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text" placeholder="Nombre del producto" className="w-full outline-none bg-white text-gray-600 text-sm px-3 py-2" />
            <button onClick={generateQRCode} type='button' className="flex items-center justify-center bg-[#007bff] px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className='text-white' width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M3 11h8V3H3zm2-6h4v4H5zM3 21h8v-8H3zm2-6h4v4H5zm8-12v8h8V3zm6 6h-4V5h4zm-5.99 4h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm4 0h2v2h-2zm2 2h2v2h-2zm-4 0h2v2h-2zm2-6h2v2h-2zm2 2h2v2h-2z"></path></svg>

            </button>
        </div>
      {qrCode && (
        <div className='border mt-2 w-fit'>
          <img src={qrCode} alt="QR Code" className='h-30'/>
        </div>
      )}
      <button className="items-center justify-center bg-[#007bff] px-5 py-2 mt-3 text-sm text-white rounded-sm">Registrar</button>
    </div>
  );
}
