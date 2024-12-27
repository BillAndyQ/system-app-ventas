"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [nombreProduct, setNombreProduct] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [dataCategoria, setDataCategoria] = useState([]);
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar categorias
  useEffect(() => {
    // Función para obtener datos de la API externa
    const fetchData = async () => {
      try {
          const response = await axios.get('/api/categoria/traer', {
              headers: {
                  'Content-Type': 'application/json',  // Especifica que estamos enviando JSON
                  'Accept': 'application/json'        // Esperamos una respuesta JSON
                }
            });
        setDataCategoria(response.data); // Actualizamos el estado con los datos obtenidos
        
      } catch (err) {
        setError('Error al obtener los datos');
      } finally {
        setLoading(false); // Quitamos el estado de carga
      }
    };

    fetchData();
  }, []);

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

  const registrarProducto = async () => {
    try {
      setIsSubmitting(true);
      // Validaciones
      if (!nombreProduct || !descripcion || !precio || !stock || !idCategoria) {
        setError('Todos los campos son obligatorios');
        return;
      }
      
      if (precio <= 0) {
        setError('El precio debe ser mayor a 0');
        return;
      }

      if (stock < 0) {
        setError('El stock no puede ser negativo');
        return;
      }

      const response = await fetch('/api/producto/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "idEmpresa": 1,
          "categoria": {
            "idCategoria": idCategoria
          },
          "nombre": nombreProduct,
          "descripcion": descripcion,
          "precio": precio,
          "stock": stock
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar el producto');
      }

      setSuccess('Producto registrado exitosamente');
      setNombreProduct('');
      setDescripcion('');
      setPrecio('');
      setStock('');
      setIdCategoria('');
      
       // Redirigir después de un breve delay para mostrar el mensaje de éxito
       setTimeout(() => {
        router.push('/inventario');
      }, 1400);
      
    } catch (err) {
      setError(err.message);
      console.error('Error al registrar producto:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div className="relative px-4 h-[calc(100vh-5rem)]">
        <div className="flex w-full ">
            <p className="text-lg font-bold">Nuevo producto</p>
        </div>

        <p className="text-sm mt-3 mb-1 text-gray-700">Nombre del producto</p>
        <div className="flex rounded-md border overflow-hidden w-1/2 max-w-md font-[sans-serif]">
            <input 
              value={nombreProduct}
              onChange={(e) => setNombreProduct(e.target.value)}
              type="text" placeholder="Nombre del producto" className="w-full border-none outline-none bg-white text-gray-600 text-sm px-3 py-2" 
            />
        </div>

        <p className="text-sm mt-2 mb-1 text-gray-700">Descripción</p>
        <div className="flex rounded-md border overflow-hidden w-1/2 max-w-md font-[sans-serif]">
            <input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              type="text" placeholder="Descripción" className="w-full border-none outline-none bg-white text-gray-600 text-sm px-3 py-2" 
            />
        </div>

        <p className="text-sm mt-2 mb-1 text-gray-700">Precio</p>
        <div className="flex rounded-md border overflow-hidden w-1/2 max-w-md font-[sans-serif]">
            <input 
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              type="number" placeholder="Precio" className="w-full border-none outline-none bg-white text-gray-600 text-sm px-3 py-2" 
            />
        </div>

        <p className="text-sm mt-2 mb-1 text-gray-700">Stock</p>
        <div className="flex rounded-md border overflow-hidden w-full max-w-md font-[sans-serif]">
            <input 
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              type="number" placeholder="Stock" className="w-full border-none outline-none bg-white text-gray-600 text-sm px-3 py-2" 
            />
        </div>

        <p className="text-sm mt-2 mb-1 text-gray-700">Categoría</p>
        <div className="w-full max-w-md">
            <div className="relative">
                <select
                    value={idCategoria}
                    onChange={(e) => setIdCategoria(e.target.value)}
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                    <option value="">Seleccione una categoría</option>
                    {loading ? (
                        <option>Cargando...</option>
                    ) : (
                        dataCategoria.map((categoria) => (
                            <option key={categoria.idCategoria} value={categoria.idCategoria}>
                                {categoria.nombre}
                            </option>
                        ))
                    )}
                </select>
            </div>
        </div>

        <p className="text-sm mt-3 mb-1 text-gray-700">Código del producto</p>
        <div className="flex rounded-md border overflow-hidden w-1/2 max-w-md font-[sans-serif]">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text" placeholder="Código del producto" className="w-full border-none outline-none bg-white text-gray-600 text-sm px-3 py-2" />
            <button onClick={generateQRCode} type='button' className="flex items-center justify-center bg-[#007bff] px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className='text-white' width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M3 11h8V3H3zm2-6h4v4H5zM3 21h8v-8H3zm2-6h4v4H5zm8-12v8h8V3zm6 6h-4V5h4zm-5.99 4h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm4 0h2v2h-2zm2 2h2v2h-2zm-4 0h2v2h-2zm2-6h2v2h-2zm2 2h2v2h-2z"></path></svg>

            </button>
        </div>
      {qrCode && (
        <div className='border mt-2 w-fit'>
          <img src={qrCode} alt="QR Code" className='h-30'/>
        </div>
      )}
      <button 
        onClick={registrarProducto} 
        disabled={isSubmitting}
        className="items-center justify-center bg-blue-500 px-5 py-2 mt-3 text-sm text-white rounded-sm disabled:opacity-50"
      >
        {isSubmitting ? 'Registrando...' : 'Registrar'}
      </button>
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
      {success && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate-fade-in-up">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p>{success}</p>
          </div>
        </div>
      )}
    </div>
  );
}
