# Crypto Tracker

A fullstack cryptocurrency tracking application built with Next.js, TypeScript and PostgreSQL.

The application displays the top 100 cryptocurrencies by market capitalization in real time, including detailed information pages, charts, crypto news, user authentication and personalized watchlists.

---

## Features

- Top 100 cryptocurrencies by market cap
- Real-time crypto data
- Detailed crypto pages
- Interactive price charts
- Crypto news section
- Search modal to quickly find cryptocurrencies
- User signup and login
- Email account verification
- JWT authentication
- HttpOnly and SameSite session cookies
- Personalized watchlist per user
- Responsive UI for all screen sizes
- Dark mode / Light mode

---

## Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit

### Backend

- Next.js API Routes
- Prisma ORM
- JWT Authentication

### Database

- PostgreSQL
- Supabase

### External APIs

- [CoinGecko API](https://docs.coingecko.com)
- [AlternativeMe](https://alternative.me/crypto/api/)
- [CryptoCompare API](https://developers.coindesk.com/#introduction)
- [CryptoNews API](https://cryptonews-api.com/)

### Deployment

- [Vercel](https://vercel.com)

---

## Authentication & Security

- JWT-based authentication
- HttpOnly cookies
- SameSite cookie protection
- Email verification system
- Verification tokens linked to users
- Environment variable management

---

## Demo Account

```txt
Email: demo@tracker-app.com
Password: Demo1234!
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Gonzalez-Nahuel/crypto-tracker.git

cd crypto-tracker
```

Install dependencies:

```bash
npm install
```

Setup environment variables:

```env
DATABASE_URL=
DIRECT_URL=
NEWS_API_KEY=
ACCESS_SECRET=
REFRESH_SECRET=
ACCESS_TOKEN_EXPIRES=
REFRESH_TOKEN_EXPIRES=
RESEND_API_KEY=
APP_URL=
```

Run prisma migrations:

```bash
npx prisma migrate dev
```

Generate prisma client:

```bash
npx prisma generate
```

Run the development server:

```bash
npm run dev
```

---

## Future Improvements

- Password reset flow
- OAuth authentication
- Advanced chart tools
- Real-time websocket updates
- Docker support
- Kubernetes deployment
- Unit and integration testing

---

## Screenshots

<p aling="center">
<img src="./public/readme/Captura desde 2026-05-13 15-55-02.png" width="800"></img>
<img src="./public/readme/Captura desde 2026-05-13 15-56-51.png" width="800"></img>
<img src="./public/readme/Captura desde 2026-05-13 16-09-35.png" width="400" height="400"></img>
<img src="./public/readme/Captura desde 2026-05-13 18-19-48.png" width="800"></img>
<img src="./public/readme/Captura desde 2026-05-13 15-58-28.png" width="800"></img>
</p>

---

## Live Demo

[Demo Vercel](https://crypto-tracker-alpha-jet.vercel.app/)
