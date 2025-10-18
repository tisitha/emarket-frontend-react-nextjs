import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vkfoqofwqjtogkypgrxx.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/Emarket-files/**",
      },
    ],
  },
};

export default nextConfig;
