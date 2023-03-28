
# Table of contents

- [Table of contents](#table-of-contents)
  - [Overview](#overview)
  - [Live](#live)
  - [Installation \& running](#installation--running)
    - [Install node dependencies](#install-node-dependencies)
    - [Add .env](#add-env)
    - [Start dev server](#start-dev-server)
  - [Features](#features)
  - [Tech used](#tech-used)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Testing](#testing)
    - [Tools](#tools)
  - [Screenshots](#screenshots)
    - [Home](#home)
    - [Chat selection](#chat-selection)
    - [Chat room](#chat-room)
    - [Create post](#create-post)
    - [Profile](#profile)

## Overview

PhotoApp is social media application created in the modern tech stack.
In this app, you can create posts, comment on them, follow and chat with other users. It was my first attempt to create a backend in Next.js, so I learned a
lot of things while creating PhotoApp.

## Live

<https://photo-app-orpin.vercel.app/>

## Installation & running

### Install node dependencies

```bash
yarn install
```

### Add .env

```
# .env 

DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
IMG_KIT_PRIVATE=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

NEXT_PUBLIC_IMG_KIT_PUBLIC=
NEXT_PUBLIC_IMG_KIT_ENDPOINT=
NEXT_PUBLIC_WS_URL=
```


### Start dev server

```bash
yarn dev
```

## Features

- Authentication
- Chat
- Uploading post system
- Post likes system
- Post comments system

## Tech used

### Frontend

- TypeScript
- Next.js
- SASS with css-modules
- React Query

### Backend

- Next API routes
- Next-auth
- Prisma
- Websockets server
- Planetscale

### Testing

- Jest
- React Testing Library
- MSW

### Tools

- Eslint
- Prettier
- Husky
- Conventional Commits config
- Github Actions CI
- Vercel

## Screenshots


### Home
![home](https://raw.githubusercontent.com/MaciejGarncarski/photo-app/main/.github/screenshots/home.png)

### Chat selection
![chat](https://raw.githubusercontent.com/MaciejGarncarski/photo-app/main/.github/screenshots/chat.png)

### Chat room
![create post](https://raw.githubusercontent.com/MaciejGarncarski/photo-app/main/.github/screenshots/chat-room.png)

### Create post
![create post](https://raw.githubusercontent.com/MaciejGarncarski/photo-app/main/.github/screenshots/create-post.png)

### Profile
![profile](https://raw.githubusercontent.com/MaciejGarncarski/photo-app/main/.github/screenshots/profile.png)

