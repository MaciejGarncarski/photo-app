/** @type {import('next').NextConfig} */
export default {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'ik.imagekit.io',
			},
		],
	},
	experimental: {
		optimizeCss: true
	}
}
