import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/dashboard",
  async rewrites() {
    return [
      {
        source: "/socket.io/:path*",
        destination: "http://localhost:3003/socket.io/:path*",
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
