"use client"
import { jsPDF } from "jspdf";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import debounce from 'lodash.debounce';

export default function Home() {
    const inputRef = useRef(null);
    const resultsRef = useRef(null);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const [dataCategoria, setDataCategoria] = useState([]);
    const [lastSearch, setLastSearch] = useState('');
    const [dniRuc, setDniRuc] = useState('');
    const [clientData, setClientData] = useState(null);
    const [nombre, setNombre] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [tableData, setTableData] = useState([]);

    const generarPDF = useCallback(() => {
        const doc = new jsPDF();
        doc.text("Hola, este es un PDF generado con jsPDF", 10, 10);
        doc.text("Hola, este es un PDF generado con jsPDF", 10, 20);
        doc.text("Hola, este es un PDF generado con jsPDF", 10, 30);
        doc.save("ejemplo.pdf"); // Esto descarga el PDF
    }, []);

    const getValueSearch = useCallback(() => {
        const currentValue = inputRef.current.value.trim();
        if (currentValue.length >= 2 && currentValue !== lastSearch) { // Verificar si el valor tiene al menos  caracteres y ha cambiado
            setSearch(currentValue);
            setLastSearch(currentValue); // Actualizar la última búsqueda
            setShowResults(true);
        }
    }, [lastSearch]);

    const handleResultClick = useCallback((item) => {
        setShowResults(false);
        setTableData((prevData) => {
            const existingItem = prevData.find(dataItem => dataItem.idProducto === item.idProducto);
            if (existingItem) {
                return prevData.map(dataItem =>
                    dataItem.idProducto === item.idProducto
                        ? { ...dataItem, cantidad: dataItem.cantidad + 1, importe: (dataItem.cantidad + 1) * dataItem.precio }
                        : dataItem
                );
            } else {
                return [...prevData, { ...item, cantidad: 1, importe: item.precio }];
            }
        });
    }, []);

    const handleCantidadChange = (idProducto, newCantidad) => {
        setTableData((prevData) =>
            prevData.map((item) =>
                item.idProducto === idProducto ? { ...item, cantidad: newCantidad, importe: newCantidad * item.precio } : item
            )
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                resultsRef.current &&
                !resultsRef.current.contains(event.target) &&
                !inputRef.current.contains(event.target)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if(!search) return;
          try {
            const response = await axios.get(`/api/producto/search?search=${search}` ,
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
          }
        };
  
        fetchData();
      }, [search]);

    const handleDniRucChange = (e) => {
        const value = e.target.value;
        setDniRuc(value);
        debouncedFetchData(value);
    };

    const fetchData = async (value) => {
        if (value.length === 11) {
            try {
                const response = await axios.get(`https://consultaruc.win/api/ruc/${value}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                if (response.data && response.data.result && response.data.result.razon_social) {
                    setClientData(response.data);
                    setNombre(response.data.result.razon_social);
                    setSelectValue('factura');
                } else {
                    setNombre("");
                    setError('No se encontró la razón social para el DNI/RUC proporcionado');
                }
            } catch (err) {
                setError('Error al obtener los datos del cliente');
            }
        } else if (value.length === 8) {
            const url = "https://search-name-client.vercel.app/consulta_dni";
            const data = JSON.stringify({ dni: value });
            try {
                const response = await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                setNombre(response.data.nombre);
                // Handle the response here
            } catch (err) {
                setError('Error al obtener los datos del cliente');
            }
        }
    };

    const debouncedFetchData = useRef(debounce((value) => {
        fetchData(value);
    }, 1000)).current;

    useEffect(() => {
        return () => {
            debouncedFetchData.cancel();
        };
    }, [debouncedFetchData]);

  return (
    <div className="relative h-[calc(100vh-5rem)]">
        <div className="flex relative rounded-md border overflow-hidden mx-3 max-w-md font-[sans-serif]">

            <input ref={inputRef} type="text" placeholder="Buscar producto..."
            className="w-full border-none outline-none bg-white text-gray-600 text-sm px-3 py-2" 
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    getValueSearch();
                }
            }}
            onFocus={() => {
                if (data.length > 0) {
                    setShowResults(true);
                }
            }}
            />

            <button onClick={getValueSearch} type='button' className="flex items-center justify-center bg-[#007bff] px-5">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white">
                    <path
                    d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                    </path>
                </svg>
            </button> 
        </div>
        <div className="relative mx-3">
            {/* Resultados de la busqueda */}
            {showResults && data.length > 0 && (
                    <div
                        ref={resultsRef}
                        className="absolute bg-white w-full max-w-md z-20 h-30 left-0 top-[0.1rem] shadow-md overflow-y-auto border top-4 border-gray-300"
                    >
                        {data.map((item, index) => (
                            <div key={index} className="text-sm hover:bg-gray-100 cursor-pointer px-2 py-1" onClick={() => handleResultClick(item)}>
                                {item.nombre}
                            </div>
                        ))}
                    </div>
                )}
        </div>
        {/* Tabla  */}
        <div className="font-[sans-serif] overflow-x-auto my-3 mx-3 overflow-y-auto h-[calc(100vh-19rem)]">
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className=" min-w-full inline-block align-middle">
                <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-900">
                        <tr className="">
                        <th scope="col" className="w-4 p-2">
                            <div className="flex items-center h-2 justify-center">
                                <input id="hs-table-checkbox-all" type="checkbox" className="border-gray-200 h-4 w-4 text-xs rounded text-blue-600 focus:ring-blue-500"/>
                                <label htmlFor="hs-table-checkbox-all" className="sr-only">Checkbox</label>
                            </div>
                        </th>
                            <th scope="col" className="px-2 border-x border-gray-500 py-2 text-start text-[.79rem] font-medium text-white">Código</th>
                            <th scope="col" className="px-2 border-x border-gray-500 py-2 text-start text-[.79rem] font-medium text-white">Nombre del producto</th>
                            <th scope="col" className="px-2 border-x border-gray-500 py-2 text-start text-[.79rem] font-medium text-white">Precio U.</th>
                            <th scope="col" className="px-2 border-x border-gray-500 py-2 text-start text-[.79rem] font-medium text-white">Cantidad</th>
                            <th scope="col" className="px-2 border-x border-gray-500 py-2 text-start text-[.79rem] font-medium text-white">Importe</th>
                            <th scope="col" className="px-2 py-2 pe-4 text-end text-[.74rem] font-medium text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tableData.map((item, index) => (
                        <tr key={index}>
                            <td className="w-4 px-2">
                                <div className="flex items-center h-1 justify-center">
                                    <input id="hs-table-checkbox-all" type="checkbox" className="border-gray-200 text-xs h-4 w-4 rounded text-blue-600 focus:ring-blue-500"/>
                                    <label htmlFor="hs-table-checkbox-all" className="sr-only">Checkbox</label>
                                </div>
                            </td>
                            <td className="px-2 border-x whitespace-nowrap text-start text-[.8rem] font-medium text-gray-800">{item.idProducto}</td>
                            <td className="px-2 border-x whitespace-nowrap text-start text-[.8rem] text-gray-800">{item.nombre}</td>
                            <td className="px-2 border-x whitespace-nowrap text-start text-[.8rem] text-gray-800">{item.precio}</td>
                            <td className="border-x w-20 text-gray-800">
                                <input 
                                    type="number" 
                                    value={item.cantidad} 
                                    onChange={(e) => handleCantidadChange(item.idProducto, parseInt(e.target.value))} 
                                    className="border-none px-2 py-1 text-[.8rem] w-20" 
                                    min={1}
                                />
                            </td>
                            <td className="px-2 border-x whitespace-nowrap text-start text-[.8rem] text-gray-800">{item.importe}</td>

                            <td className="px-2 whitespace-nowrap text-end text-sm font-medium">
                                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
        </div>
        <div className="border-t px-4 py-3 bg-white w-full bottom-0 flex gap-2 h-40 absolute">
            <div className="space-y-2">
                <p className="font-bold text-black">Cliente</p>
                <input
                        className="border border-gray-300 w-[21rem] rounded px-2 text-sm py-1"
                        type="text"
                        placeholder="DNI / RUC"
                        value={dniRuc}
                        onChange={handleDniRucChange}
                        maxLength={11}
                    /><br />
                <input
                        className="border border-gray-300 w-[21rem] rounded px-2 text-sm py-1"
                        type="text"
                        placeholder="Nombres"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    /><br />
            </div>

            <div className="space-y-2">
                <p className="font-bold text-black">Detalles</p>
                <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}
                    className="bg-transparent placeholder:text-slate-400 text-slate-700 w-[10rem] text-sm border border-gray-300 rounded px-2 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                    >
                    <option value="factura">Factura</option>
                    <option value="boleta">Boleta</option>
                </select>
                <br/>
                <select
                    className="bg-transparent placeholder:text-slate-400 text-slate-700 w-[10rem] text-sm border border-gray-300 rounded px-2 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                    <option value="">Efectivo</option>
                    <option value="">Tarjeta</option>
                </select><br/>
            </div>
            <div className="ms-auto">
                <p className="font-bold">IGV</p>
                <p className="font-bold">Subtotal</p>
                <p className="font-bold">Total</p>
                <button onClick={generarPDF} className="bg-blue-500 mt-3 text-white px-4 py-3 text-md">Realizar operación</button>
            </div>
        </div>
    </div>
  );
}
