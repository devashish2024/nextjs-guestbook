# Re-Usable Guestbook App with Next.js

A simple, plug-and-play guestbook application built with Next.js, integrating shadcn/ui, Clerk, Prisma, and Perspective API. 🔥

This is a simple guestbook application built with Next.js, integrating shadcn/ui, Clerk, Prisma, and Perspective API.
Check it out live at [nextjs-reusable-guestbook.vercel.app](https://nextjs-reusable-guestbook.vercel.app/)!

Feel free to implement the guestbook feature based on this project to your portfolio.

## Features
- **Authentication**: Users can sign in using Google or GitHub. The app uses Clerk for authentication, so it can be customized to support more providers.
- **Guestbook Entries**: Users can submit guestbook entries with their name and message. They can also update their entries later, anytime.
- **Limit**: The app limits one user to only send one entry to ensure that the guestbook is not spammed.
- **Theme**: Uses `Next Themes` to provide a light and dark theme. Everything, including Clerk popups, changes based on the theme. No flashes!
- **Social**: Those who login with their GitHub account will also share their github username automatically, allowing people to see their GitHub profile.
- **Perspective API**: The app uses the Perspective API to analyze the sentiment of guestbook messages and filter out toxic content.

## Getting Started

### Environment Variables

First, set up your environment variables. Create a `.env.local` file based on `.env.example` and replace placeholders with actual keys:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key # Public key from Clerk
CLERK_SECRET_KEY=your_secret_key # Secret key from Clerk

DATABASE_URL=your_database_url # Database URL for Prisma
PERSPECTIVE_API_KEY=your_api_key # API key for Perspective API
```

> **Note**: you may have to apply for Perspective API [here](https://support.perspectiveapi.com/s/docs-get-started?language=en_US) before you can get an API key.

### Install Dependencies
Install dependencies using npm or your preferred package manager:

```bash
npm install
```

### Prisma Database Setup
Apply migrations and seed your database using Prisma:

```bash
npx prisma db push
npx prisma generate
```

### Start the Development Server
Run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the guestbook app.

## Deployment
For deployment, consider using Vercel, the recommended platform for Next.js applications. Follow the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.

## License
This project is open source and available under the [MIT License](LICENSE). Feel free to copy this to your project, but if possible, thank you for giving credit to the original author by linking back to [this repository](https://github.com/devashish2024/nextjs-guestbook).
