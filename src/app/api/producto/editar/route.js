
export async function PUT(req) {
  try {
      const requestData = await req.json();
      
      const apiResponse = await fetch('https://ventas2024-production.up.railway.app/producto/editar', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
      });

      const contentType = apiResponse.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
          data = await apiResponse.json();
      } else {
          data = { 
              message: await apiResponse.text(),
              success: apiResponse.ok 
          };
      }
      
      return new Response(JSON.stringify(data), {
          status: apiResponse.status,
          headers: { 'Content-Type': 'application/json' }
      });
      
  } catch (error) {
      return new Response(
          JSON.stringify({ 
              error: 'Error al procesar la solicitud',
              success: false 
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
  }
}
