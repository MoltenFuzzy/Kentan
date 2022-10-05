/** @type {import('next').NextConfig} */

//https://nextjs.org/docs/advanced-features/security-headers
const securityHeaders = [
	{
		key: "Referrer-Policy",
		value: "origin-when-cross-origin",
	},
];

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	async headers() {
		return [
			{
				// Apply these headers to all routes in your application.
				source: "/home",
				headers: securityHeaders,
			},
		];
	},
};

module.exports = nextConfig;
