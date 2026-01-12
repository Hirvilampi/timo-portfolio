# Timo Lampinen – Portfolio

This repository contains the source code for my personal portfolio website.

The site showcases my work, background, and selected productions, and is built with modern web technologies focusing on performance, clarity, and maintainability.

🌐 Live site: https://timolampinen.com  
📦 Hosted on: Vercel

---

## 🚀 Tech Stack

- **Next.js** – React framework with App Router
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Utility-first styling
- **Supabase** – Database and image data for productions
- **Vercel** – Hosting and deployment

---

## 🗂️ Features

- Responsive, mobile-first layout
- Server Components with async data fetching
- Production and portfolio data stored in Supabase
- Image handling optimized for the web
- Clean and minimal UI
- Custom domain (`timolampinen.com`) forwarding to Vercel

---

## 🧠 Architecture Overview

### Frontend
- Next.js App Router
- Server Components with async data fetching
- Tailwind CSS for layout and typography
- Modular, maintainable component structure

### Backend / Data
- Supabase used for:
  - Productions
  - Metadata (year, role, company, links)
  - Image references
- Data rendered server-side for fast load times

---

## 🧪 Development

### Install dependencies

````bash
npm install

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables for Vercel

Create a .env.local file:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

## License

This repository is intended as a personal portfolio.

You are welcome to explore the code for learning purposes,
but please do not reuse the design, content, or branding without permission.
