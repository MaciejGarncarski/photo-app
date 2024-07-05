/** @type {import('next').NextConfig} */
export default {
	experimental: {
		ppr: 'incremental',
	},
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
}
