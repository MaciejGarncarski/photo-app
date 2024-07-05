<p align="center">
  <img width="192" height="192" src="https://raw.githubusercontent.com/MaciejGarncarski/photo-app/main/.github/logo.png">
</p>

# PhotoApp Overview

PhotoApp is a social app inspired by Instagram. Users can create posts, like them and add comments to them. There is a chat feature in the app that uses WebSocket for communication. For the frontend I used the Next.js framework, TypeScript, Tanstack Query and TailwindCSS, while for the backend I used Fastify, TypeScript and ImageKit to store images added by users. For database communication, I used PostgreSQL and Prisma. For communication between the frontend and backend, I used openapi-typescript.

## Live

<https://photoapp.maciej-garncarski.pl/>

## Installation and running

### Install node dependencies

```bash
pnpm install
```

### Add .env for frontend (/apps/frontend/.env)

```
# .env

NEXT_PUBLIC_API_ROOT=
```

### Add .env for backend (/apps/backend/.env)

```
# .env

DATABASE_URL=
SECRET=
IMG_KIT_PRIVATE=
IMG_KIT_PUBLIC=
IMG_KIT_ENDPOINT=
APP_URL=
COOKIE_DOMAIN=
BACKEND_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STATUS="production | development"
```

### Start dev server

```bash
turbo dev
```

## Features

- Authentication
- Adding posts, liking and commenting them
- Chat based on websocket
- Edit account

## Tech used

### Backend

- [Fastify](https://www.fastify.io/)
- [Planetscale database](https://planetscale.com/)
- Socket.IO
- ImageKit
- Vitest

### Frontend

- TypeScript
- SASS with css-modules
- [Next.js](https://nextjs.org/)
- [Tanstack Query React](https://tanstack.com/query/latest/docs/react/overview)

### Tools

- Eslint
- Prettier
- Husky
- Conventional Commits config
