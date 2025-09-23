/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow any domain
        port: "", // optional, leave blank
        pathname: "/**", // allow any path
      },
    ],
  },
};

export default nextConfig;
