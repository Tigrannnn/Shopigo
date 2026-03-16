# Shopigo Marketplace

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, full-stack e-commerce marketplace that empowers sellers and delights buyers with seamless shopping experiences, advanced search, and intuitive management tools.

![Shopigo Marketplace](https://via.placeholder.com/800x400?text=Shopigo+Marketplace+Screenshot)

## Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **Secure Authentication** | JWT-based user authentication with Google OAuth integration |
| 🛒 **Smart Shopping Cart** | Persistent cart with real-time updates and inventory management |
| 💳 **Order Management** | Complete order lifecycle from placement to fulfillment |
| 👨‍💼 **Seller Dashboard** | Comprehensive tools for product management and sales analytics |
| 🔍 **Advanced Search** | Full-text search with filters and recently viewed items |
| ❤️ **Favorites & Recommendations** | Personalized product recommendations and favorite lists |
| 📊 **Admin Panel** | Administrative controls for user and product moderation |
| 📱 **Responsive Design** | Mobile-first UI built with Bootstrap and custom SCSS |

## Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks and concurrent features
- **Redux & Zustand** - State management for complex application state
- **React Query** - Efficient server state management and caching
- **React Router** - Declarative routing for SPA navigation
- **Bootstrap 5** - Responsive CSS framework with custom SCSS
- **Axios** - HTTP client for API communication

### Backend
- **Node.js & Express** - Scalable server-side JavaScript runtime
- **Sequelize ORM** - Database abstraction with PostgreSQL support
- **JWT Authentication** - Secure token-based authentication
- **bcrypt** - Password hashing for security
- **Nodemailer** - Email service for notifications and verification
- **Cloudinary** - Cloud-based image storage and optimization

### Database & Caching
- **PostgreSQL** - Robust relational database for data persistence
- **Redis** - High-performance caching and session storage
- **ioredis** - Redis client with connection pooling

### DevOps & Tools
- **Docker & Docker Compose** - Containerization for consistent deployments
- **Nginx** - Reverse proxy and load balancing
- **ESLint** - Code linting and quality assurance
- **CRACO** - Create React App Configuration Override for advanced builds

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- Docker and Docker Compose
- PostgreSQL 15 (if running locally without Docker)
- Redis (if running locally without Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shopigo-marketplace.git
   cd shopigo-marketplace
   ```

2. **Install dependencies**
   ```bash
   # Backend dependencies
   cd backend
   npm install

   # Frontend dependencies
   cd ../frontend
   npm install

   # Root dependencies (if any)
   cd ..
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` files in both `backend/` and `frontend/` directories:

   **Backend (.env)**
   ```env
   DB_SYNC_ALTER=false
   NODE_ENV=development
   PORT=5000
   DB_NAME=shopigo
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_URL=postgresql://your_db_url
   REDIS_URL=redis://localhost:6379
   REDIS_TEST_URL=redis://127.0.0.1:6379
   JWT_ACCESS_SECRET_KEY=your_access_secret
   JWT_REFRESH_SECRET_KEY=your_refresh_secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_email_password
   FRONTEND_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CLOUDINARY_URL=cloudinary://your_cloudinary_credentials
   ```

   **Frontend (.env)**
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Database Setup**
   ```bash
   # Database tables are created automatically via Sequelize sync on startup
   # No manual setup required - tables sync when the backend starts
   ```

### Running the Project

**Using Docker (Recommended)**
```bash
docker-compose up --build
```
Access the application at `http://localhost`

**Manual Setup**
```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
cd frontend
npm start

# Terminal 3: Start Redis (if not using Docker)
redis-server

# Terminal 4: Start PostgreSQL (if not using Docker)
# Use your PostgreSQL service
```

## Project Structure

```
shopigo-marketplace/
├── backend/
│   ├── controllers/     # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic layer
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   └── db/             # Database configuration
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── store/      # State management
│   │   ├── hooks/      # Custom React hooks
│   │   └── utils/      # Frontend utilities
│   └── public/         # Static assets
├── docker-compose.yml  # Container orchestration
├── nginx.conf         # Reverse proxy configuration
└── README.md
```

## Roadmap

- [ ] **Mobile App** - Native iOS and Android applications
- [ ] **AI-Powered Recommendations** - Machine learning for personalized product suggestions
- [ ] **Multi-language Support** - Internationalization for global markets
- [ ] **Advanced Analytics** - Real-time dashboards for sellers and admins
- [ ] **Payment Integration** - Stripe/PayPal integration for secure transactions
- [ ] **Real-time Chat** - Buyer-seller communication system

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Shopigo Marketplace** - Revolutionizing e-commerce with modern technology and user-centric design.