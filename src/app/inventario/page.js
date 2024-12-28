"use client"
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'flowbite';
import { initFlowbite } from 'flowbite';

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [productoAEliminar, setProductoAEliminar] = useState(null);
    const [dataCategoria, setDataCategoria] = useState([]);
    const [idCategoria, setIdCategoria] = useState('');

    const inputRef = useRef(null);

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

    const getValueSearch = () => {
        setSearch(inputRef.current.value);
        
    }

    useEffect(() => {
        // Inicializar componentes de Flowbite
        initFlowbite();
    }, []); // Se ejecuta solo una vez al montar el componente

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            search 
              ? `/api/producto/search?search=${search}`
              : '/api/producto/traer',
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }
          );
          setData(response.data);
        } catch (err) {
          setError('Error al obtener los datos');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [search]);

    const handleDelete = async () => {
        if (!productoAEliminar) return;
        
        try {
            const response = await axios.delete(`/api/producto/delete/${productoAEliminar}`);
            console.log('Respuesta del servidor:', response.data);
            
            const mensaje = typeof response.data === 'string' 
                ? response.data 
                : response.data.mensaje;
            
            setData(prevData => prevData.filter(item => item.idProducto !== productoAEliminar));
            setProductoAEliminar(null);
            
            // Simplemente ocultamos el modal usando clases
            const modal = document.getElementById('popup-modal');
            if (modal) {
                modal.classList.add('hidden');
            }

        } catch (err) {
            console.error('Error completo:', err);
            console.error('Respuesta del error:', err.response?.data);
            setError(`Error al eliminar el producto: ${err.response?.data?.error || err.message}`);
        }
    };

    const handleOpenModal = (idProducto) => {
        setProductoAEliminar(idProducto);
        const modal = document.getElementById('popup-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    };

    const handleCloseModal = () => {
        setProductoAEliminar(null);
        const modal = document.getElementById('popup-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    };

  return (
    <div className="relative h-[calc(100vh-5rem)]">
        <div className="flex w-full items-center gap-2 px-3">
            <div className="flex rounded-md border border-gray-300 overflow-hidden  w-1/2 max-w-md font-[sans-serif]">
                    <input ref={inputRef} type="text" placeholder="Buscar producto..."
                className="w-full outline-none border-none text-gray-600 text-sm px-3 py-2" />
                <button onClick={getValueSearch} type='button' className="flex items-center justify-center bg-[#007bff] px-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white">
                    <path
                    d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                    </path>
                </svg>
                </button>
                
            </div>
            
            <select
                    value={idCategoria}
                    onChange={(e) => setIdCategoria(e.target.value)}
                    className="w-min bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                    <option value="">Categoría</option>
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
            <Link href="/inventario/nuevoProducto" className="ms-auto">
                <button className="items-center justify-center bg-[#007bff] px-5 py-2 text-nowrap text-sm text-white rounded-md">Agregar producto</button>
            </Link>
        </div>
        <ul>
        
      </ul>
        {/* Tabla  */}
        {loading && <div>Cargando...</div>}
        {error && <div className="text-red-500">{error}</div>}
        
        {!loading && !error && (
          <div className="font-[sans-serif] overflow-x-auto my-3 mx-3 overflow-y-auto h-[calc(100vh-19rem)]">
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-800 whitespace-nowrap sticky top-0">
                <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-white">
                    Código
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-white">
                    Nombre producto
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-white">
                    Categoria
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-white">
                    Precio
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-white">
                    Stock
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-white">
                    Ultima actualización
                    </th>
                    <th className="py-3 px-.5 text-sm font-medium text-white">
                    </th>
                </tr>
                </thead>
                <tbody className="whitespace-nowrap">
                {Array.isArray(data) && data.map((post) => (
                <tr className="even:bg-blue-50 text-sm text-black" key={post.idProducto}>
                    <td className="py-1.5 px-4">{post.idProducto}</td>
                    <td className="py-1.5 px-4">{post.nombre}</td>
                    <td className="py-1.5 px-4">{post.categoria.nombre}</td>
                    <td className="py-1.5 px-4">{post.precio}</td>
                    <td className="py-1.5 px-4">{post.stock}</td>
                    <td className="py-1.5 px-4"></td>
                    <td className="py-1.5 px-.5 space-x-1 text-center">
                      <Link href={`/inventario/editar/${post.idProducto}`}>
                        <button className="" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-[1.1rem] fill-blue-500 hover:fill-blue-700"
                            viewBox="0 0 348.882 348.882">
                            <path
                                d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                                data-original="#000000" />
                            <path
                                d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                data-original="#000000" />
                            </svg>
                        </button>
                      </Link>
                        <button 
                            type="button"
                            className="" 
                            title="Delete"
                            onClick={() => handleOpenModal(post.idProducto)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-[1.1rem] fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                            <path
                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                data-original="#000000" />
                            <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                data-original="#000000" />
                            </svg>
                        </button>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
          </div>
        )}
        
        <div className="border-t px-4 py-3 bg-white w-full bottom-0 flex gap-2 h-40 absolute">
          <div id="popup-modal" tabIndex="-1" className="hidden fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow">
                    <button 
                        type="button" 
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        onClick={handleCloseModal}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Cerrar modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">¿Está seguro que desea eliminar este producto?</h3>
                        <button 
                            type="button" 
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                            onClick={handleDelete}
                        >
                            Sí, eliminar
                        </button>
                        <button 
                            type="button" 
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                            onClick={handleCloseModal}
                        >
                            No, cancelar
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  );
}
