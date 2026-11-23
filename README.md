# SalonBook Client

Responsive Next.js frontend for discovering salon services, requesting appointments, managing dashboards, and paying for confirmed bookings.

## Features

- Salon homepage, service search, category filters, and price sorting
- Authenticated service details and customer appointment booking
- Separate customer and administrator dashboards
- Service, appointment, user, profile, and transaction management
- Stripe Checkout redirects and webhook-aware payment status
- Responsive layout, loading states, accessible inline errors, and global toast notifications

## Stack

Next.js, React, TypeScript, CSS, Better Auth, Express REST API, Stripe, MongoDB, ImgBB.

## Local setup

```bash
npm install
copy .env.example .env.local # Windows
# cp .env.example .env.local # macOS/Linux
npm run dev
```

The client runs on `http://localhost:3000` and expects the API at `NEXT_PUBLIC_API_URL`.

## Environment variables

Set this name only; never commit the value:

`NEXT_PUBLIC_API_URL`

For production, set it to the deployed server URL, for example `https://your-api.example.com`.

## Production deployment

Deploy the client repository to Vercel with the project root set to this repository. Use `npm run build` as the build command, keep the default Next.js output, and add `NEXT_PUBLIC_API_URL` in the Production environment. Redeploy after changing environment variables. Verify `/`, `/services`, `/sign-in`, and `/dashboard` after deployment.

## Repositories

- Client: https://github.com/SabikunEthika/SalonBook-Client
- Server: https://github.com/SabikunEthika/SalonBook-Server
