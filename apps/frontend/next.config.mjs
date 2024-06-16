/** @type {import('next').NextConfig} */
export default {
	experimental: {
		ppr: true,
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
