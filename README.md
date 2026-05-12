# Backend REST API

Node.js + Express + MySQL REST API with JWT authentication.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env and fill in your values
cp .env.example .env

# 3. Start in development mode
npm run dev

# 4. Start in production
npm start
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js                  # Entry point
│   ├── config/
│   │   └── database.js         # Sequelize + MySQL config
│   ├── controllers/
│   │   └── authController.js   # Auth logic
│   ├── middleware/
│   │   ├── auth.js             # JWT middleware
│   │   └── errorHandler.js     # Global error handler
│   ├── models/
│   │   └── User.js             # User model
│   ├── routes/
│   │   ├── index.js            # Route aggregator
│   │   └── auth.js             # Auth routes
│   └── utils/
│       └── logger.js           # Winston logger
├── logs/                       # Log files (git-ignored)
├── .env                        # Environment variables (git-ignored)
├── .env.example                # Env template
└── package.json
```

## 📡 API Endpoints

| Method | Endpoint              | Access  | Description        |
|--------|-----------------------|---------|--------------------|
| GET    | /api/v1/health        | Public  | Health check       |
| POST   | /api/v1/auth/register | Public  | Register user      |
| POST   | /api/v1/auth/login    | Public  | Login              |
| GET    | /api/v1/auth/me       | Private | Get current user   |

## 🔒 Auth

All protected routes require:
```
Authorization: Bearer <token>
```

## 🛠 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express 4
- **Database**: MySQL via Sequelize ORM
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **Validation**: express-validator
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting
