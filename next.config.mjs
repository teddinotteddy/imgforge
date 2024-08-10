/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbeqfvaddapzkqoa.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
