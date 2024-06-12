import { type preHandlerHookHandler } from 'fastify';
import { buildApp } from './app.js';
const port = parseInt(process.env.PORT || '3001');

declare module 'fastify' {
  interface FastifyInstance {
    authorize: preHandlerHookHandler;
  }
}

async function start() {
  try {
    const app = await buildApp();
    app.listen({ port, host: '0.0.0.0' }, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        process.exit(1);
      }
      // eslint-disable-next-line no-console
      console.log('App running on port: ', port);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
}

start();
