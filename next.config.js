const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"],
};

export default nextConfig;