import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/ads.txt",
        destination: "https://srv.adstxtmanager.com/19390/unitlab.org",
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
