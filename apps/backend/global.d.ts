declare namespace NodeJS {
	interface ProcessEnv {
		DATABASE_URL: string
		SECRET: string
		CLOUDINARY_CLOUD_NAME: string
		CLOUDINARY_API_KEY: string
		CLOUDINARY_API_SECRET: string
		APP_URL: string
		BACKEND_URL: string
		GOOGLE_CLIENT_ID: string
		GOOGLE_CLIENT_SECRET: string
		COOKIE_DOMAIN: string
	}
}
