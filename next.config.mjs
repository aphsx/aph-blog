/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/guide", destination: "/", permanent: true },
      { source: "/guide/overview", destination: "/", permanent: true },
      {
        source: "/guide/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
