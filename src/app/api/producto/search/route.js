export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    
    // Aquí haces la solicitud a tu API real y devuelves la respuesta
    const response = await fetch(`https://ventas2024-production.up.railway.app/producto/search/${search}`);
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}
  