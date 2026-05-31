/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Legacy single-roadmap URLs → the SE roadmap course.
      { source: "/guide", destination: "/course/se-roadmap", permanent: true },
      {
        source: "/guide/overview",
        destination: "/course/se-roadmap",
        permanent: true,
      },
      { source: "/overview", destination: "/course/se-roadmap", permanent: true },
      {
        source: "/guide/:slug",
        destination: "/course/se-roadmap/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
