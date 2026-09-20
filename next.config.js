// Strapi serves the uploaded media, so its host must be allowed for next/image.
// Derived from NEXT_PUBLIC_API_URL so local dev (http://localhost:1337) works
// without editing this file. A missing or malformed value must never break the
// build, so it just adds no extra pattern.
const apiUrl = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL);
  } catch {
    return null;
  }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.designo.developermajd.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      ...(apiUrl
        ? [
            {
              protocol: apiUrl.protocol.replace(":", ""),
              hostname: apiUrl.hostname,
              port: apiUrl.port,
            },
          ]
        : []),
    ],
  },
};

module.exports = nextConfig;
