/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, //
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    },
  };
  
  export default nextConfig;