import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jsrtimnjibbkvquusjyl.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
    async redirects() {
    return [
      {
        source: "/yhteys.html",
        destination: "/",
        permanent: true, // 301
      },
      {
        source: "/:path*.html",
        destination: "/",
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;
