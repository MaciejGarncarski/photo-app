import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'node',
		globals: true,
		coverage: {
			include: ['src/modules/**/*.ts'],
			exclude: [
				'src/**/*.route.ts',
				'src/**/*.schema.ts',
				'src/modules/plugins/**/*.ts',
			],
			provider: 'v8',
		},
	},
})
