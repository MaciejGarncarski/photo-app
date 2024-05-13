<p align="center">
  <img width="192" height="192" src="https://raw.githubusercontent.com/MaciejGarncarski/photo-app/main/.github/logo.png">
</p>

# PhotoApp

- [PhotoApp](#photoapp)
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
In this app, you can create posts, comment them and chat with other users. It was my first attempt to create such a complicated app. It was tough expirence, but in the end I learned a lot of things.

## Live

<https://photoapp.maciej-garncarski.pl/>

## Installation and running

### Install node dependencies

```bash
pnpm install
```

### Add .env

```
# .env 

NEXT_PUBLIC_API_ROOT=
```

### Start dev server

```bash
pnpm dev
```

## Features

- Authentication
- Chat based on websocket
- Adding posts, liking and commenting them
- Edit account

## Tech used

### Backend

[Backend repo](https://github.com/MaciejGarncarski/photo-app-backend)

### Frontend

- TypeScript
- SASS with css-modules
- [Next.js](https://nextjs.org/)
- [Tanstack Query React](https://tanstack.com/query/latest/docs/react/overview)
- [Tabler icons](https://tabler-icons.io/)

### Testing

- Vitest
- React Testing Library
- MSW

### Tools

- Eslint
- Prettier
- Husky
- Conventional Commits config
- Github Actions CI

## Screenshots


### Home
![home](https://raw.githubusercontent.com/MaciejGarncarski/photo-app/main/.github/screenshots/home.png)

### Create post
![create post](https://raw.githubusercontent.com/MaciejGarncarski/photo-app/main/.github/screenshots/create-post.png)

### Profile
![profile](https://raw.githubusercontent.com/MaciejGarncarski/photo-app/main/.github/screenshots/profile.png)

### Chat
![create post](https://raw.githubusercontent.com/MaciejGarncarski/photo-app/main/.github/screenshots/chat.png)

