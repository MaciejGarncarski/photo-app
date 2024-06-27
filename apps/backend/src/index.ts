import { buildApp } from './app.js'

const app = await buildApp()

const port = parseInt(process.env.PORT || '3001')

try {
	app.listen({ port, host: '0.0.0.0' }, (err) => {
		if (err) {
			// eslint-disable-next-line no-console
			console.log(err)
			process.exit(1)
		}
		// eslint-disable-next-line no-console
		console.log('App running on port: ', port)
	})
} catch (err) {
	app.log.error(err)
	process.exit(1)
}
