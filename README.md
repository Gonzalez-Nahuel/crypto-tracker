# Crypto Tracker

A fullstack cryptocurrency tracking platform built with Next.js, TypeScript, PostgreSQL and modern DevOps practices.

The application displays the top 100 cryptocurrencies by market capitalization in real time, including detailed information pages, interactive charts, crypto news, user authentication, email verification and personalized watchlists.

Inspired by the design patterns and user experience of CoinMarketCap.

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

## Architecture

```text
    Internet
    │
    ▼
Nginx Reverse Proxy
    │
    ▼
Next.js Application
    │
    ▼
PostgreSQL Database
Infrastructure Overview
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions CI/CD
    │
    ├── Lint
    ├── Unit Tests
    ├── Integration Tests
    ├── Docker Build
    ├── Push Image to GHCR
    ▼
AWS EC2
    │
    ▼
Docker Compose
    ├── Nginx Container
    ├── Crypto Tracker Container
    └── PostgreSQL Container
```

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

### Testing

- Vitest
- Unit Testing
- Integration Testing

### DevOps

- Docker
- Docker Compose
- Nginx Reverse Proxy
- GitHub Actions
- GitHub Container Registry (GHCR)
- AWS EC2

### External APIs

- [CoinGecko API](https://docs.coingecko.com)
- [AlternativeMe](https://alternative.me/crypto/api/)
- [CryptoCompare API](https://developers.coindesk.com/#introduction)
- [CryptoNews API](https://cryptonews-api.com/)
- [Resend](https://resend.com/home)

---

## Authentication & Security

- JWT-based authentication
- Access Token & Refresh Token strategy
- HttpOnly cookies
- SameSite cookie protection
- Email verification workflow
- Verification tokens linked to users
- Environment variable management
- Password hashing
- Protected routes

---

## Testing

The project includes automated testing strategies to ensure application reliability.

### Unit Tests

- Credential validation logic
- Data formatting utilities
- Business rule validation

Current test files:

```text
tests/unit/
├── credentials-validator.unit.test.ts
└── formatters.unit.test.ts
```

### Integration Tests

- User registration flow
- Signup API route behavior
- Database interaction during signup

Current test files:

```text
tests/integration/
└── signup-route.integration.test.ts
```

All tests are executed automatically before Docker images are published and deployed to production.

---

## DevOps & Deployment

### Docker Architecture

The production environment is fully containerized using Docker Compose.

### Services:

- Nginx Reverse Proxy
- Crypto Tracker Application
- PostgreSQL Database

### CI/CD Pipeline

Every push triggers:

- Linting
- Unit Tests
- Database Migrations
- Integration Tests
- Docker Image Build
- Push to GitHub Container Registry
- Automatic Deployment to AWS EC2

### Production Environment

- AWS EC2 Instance
- Docker Compose Orchestration
- Nginx Reverse Proxy
- Persistent PostgreSQL Storage
- Automated Deployments via GitHub Actions

---

## Demo Account

```txt
Email: demo@tracker-app.com
Password: Demo1234!
```

---

## Environment Variables

### Create a .env file using the following template:

- DATABASE_URL=
- DIRECT_URL=
- NEWS_API_KEY=
- ACCESS_SECRET=
- REFRESH_SECRET=
- ACCESS_TOKEN_EXPIRES=
- REFRESH_TOKEN_EXPIRES=
- RESEND_API_KEY=
- APP_URL=

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

## Docker Development

Build and Run the project using docker compose:

```bash
docker compose -f compose.dev.yaml up --build
```

---

## Future Improvements

- Password reset flow
- OAuth authentication
- Advanced chart tools
- Real-time websocket updates
- Multi-language support
- HTTPS with custom domain and SSL certificates

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

[AWS demo](http://32.195.176.19:80)
