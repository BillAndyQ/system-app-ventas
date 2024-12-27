export async function GET(req, { params }) {
    const { id } = params;
    // Aquí haces la solicitud a tu API real y devuelves la respuesta
    const response = await fetch(`https://ventas2024-production.up.railway.app/producto/${id}`);
    const data = await response.json();
    console.log(data);
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  