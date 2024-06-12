import { cookie } from './consts/cookie.js';
import { authorize } from './middlewares/auth.middleware.js';
import { routerPlugin } from './modules/plugins/router.plugin.js';
import { envVariables } from './utils/envVariables.js';
import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import fastifySensible from '@fastify/sensible';
import { fastifySession, type SessionStore } from '@fastify/session';
import fastifySwagger from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import Fastify from 'fastify';
import fastifyMultipart, { ajvFilePlugin } from '@fastify/multipart';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export const buildApp = async () => {
  const server = Fastify({
    // logger: {
    //   level: 'info',
    //   transport: {
    //     target: 'pino-pretty',
    //   },
    // },
    ajv: {
      plugins: [ajvFilePlugin],
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  await server.register(fastifySensible);
  await server.register(fastifyCookie);

  const PrismaStore = new PrismaSessionStore(new PrismaClient(), {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
  });

  await server.register(fastifySwagger, {
    mode: 'dynamic',
    openapi: {
      info: {
        title: 'PhotoApp api swagger',
        description: 'testing the PhotoApp api',
        version: '0.0.0',
      },
    },
  });

  await server.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
    },
  });

  await server.register(fastifyMultipart, {
    attachFieldsToBody: true,
    limits: {
      fileSize: 6500000,
    },
  });
  await server.register(cors, {
    credentials: true,
    origin: [`${envVariables.APP_URL}`],
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  server.decorate('authorize', authorize);

  await server.register(fastifySession, {
    secret: envVariables.SECRET,
    cookie: cookie,
    saveUninitialized: false,
    rolling: true,
    store: PrismaStore as SessionStore,
  });
  await server.register(routerPlugin, { prefix: '/' });

  return server;
};
