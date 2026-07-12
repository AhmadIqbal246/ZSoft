/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/:path*",
                has: [{ type: "host", value: "protonixs.com" }],
                destination: "https://www.protonixs.com/:path*",
                permanent: true,
            },
        ];
    },
    images: {
        formats: ["image/avif", "image/webp"],
    },
};

export default nextConfig;
