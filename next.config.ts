import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.43.106.115"],

  async redirects() {
    return [
      // aliases
      {
        source: "/sujan",
        destination: "/dev",
        permanent: true,
      },

      // social
      {
        source: "/suhan/fb",
        destination: "https://www.facebook.com/suhan831",
        permanent: true,
      },
      {
        source: "/suhan/yt",
        destination: "https://youtube.com/@currentscope5",
        permanent: true,
      },

      // developer
      {
        source: "/dev",
        destination: "https://skrsportfolio.netlify.app",
        permanent: true,
      },
      {
        source: "/dev/github",
        destination: "https://github.com/skr0411",
        permanent: true,
      },
      {
        source: "/dev/linkedin",
        destination: "https://linkedin.com/in/skr0411",
        permanent: true,
      },
      {
        source: "/dev/facebook",
        destination: "https://facebook.com/sujanroy0411",
        permanent: true,
      },

      // github issues
      {
        source: "/issue",
        destination: "https://github.com/SKR0411/Knowlet/issues",
        permanent: true,
      },

      // old asset redirect
      {
        source: "/assets/knowlet_declaration",
        destination: "/declaration",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
