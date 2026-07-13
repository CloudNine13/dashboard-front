import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/dashboard",
  allowedDevOrigins:
    process.env.NEXT_PUBLIC_ALLOWED_DEV_ORIGINS?.split(",") || [],
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    return [
      {
        source: "/socket.io/:path*",
        destination: `${backendUrl}/socket.io/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/socket.io/:path*",
        headers: [
          {
            key: "Connection",
            value: "Upgrade",
          },
          {
            key: "Upgrade",
            value: "websocket",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
