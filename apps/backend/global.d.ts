declare namespace NodeJS {
	interface ProcessEnv {
		DATABASE_URL: string
		SECRET: string
		IMG_KIT_PRIVATE: string
		IMG_KIT_PUBLIC: string
		IMG_KIT_ENDPOINT: string
		APP_URL: string
		BACKEND_URL: string
		GOOGLE_CLIENT_ID: string
		GOOGLE_CLIENT_SECRET: string
		COOKIE_DOMAIN: string
		STATUS: 'production' | 'development'
	}
}
