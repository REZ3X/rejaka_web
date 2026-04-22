import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      /* Discord avatars and default avatars */
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      /* Spotify album art served via Lanyard */
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
};

export default nextConfig;
