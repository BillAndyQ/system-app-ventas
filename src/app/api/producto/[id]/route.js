export async function GET(request, context) {
  try {
    // Obtener los parámetros dinámicos de manera asincrónica
    const { params } = context;

    if (!params || !params.id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { id } = params;

    // Llamada a la API externa con el parámetro `id`
    const response = await fetch(`https://ventas2024-production.up.railway.app/producto/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.statusText}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
