export async function DELETE(req, { params }) {
    const { id } = params;
    
    try {
        const response = await fetch(
            `https://ventas2024-production.up.railway.app/producto/borrar/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }

        const mensaje = await response.text();
        return new Response(JSON.stringify({ mensaje }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}
  