/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Empfohlen für eine bessere Entwicklungs-Erfahrung
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    },
  };
  
  export default nextConfig;