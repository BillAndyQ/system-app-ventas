/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/producto/traer',
          destination: 'https://ventas2024-production.up.railway.app/producto/traer',
        },
      ];
    },
  };
  
  export default nextConfig;
  