// src/app/api/producto/traer/route.js

export async function GET(req) {
    // Aquí haces la solicitud a tu API real y devuelves la respuesta
    const response = await fetch('https://ventas2024-production.up.railway.app/categoria/traer');
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  