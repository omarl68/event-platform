
# 🎉 Event Platform – Backend API

This is the backend for a **collaborative event management platform** built using **Node.js, Express.js, and MongoDB** (not MEAN), following a **monolith architecture**. It enables users to create, manage, and set number of  participate in events updates.


## ✨ Features

- 📅 **Event management**: Create, update, delete, and view events
- 🔗 **RESTful APIs** for events, users and Auth
- 🐳 **Docker support** for development and production
- 📚 **OpenAPI documentation** with Swagger
- 🏗️ **Monolith architecture** for scalability
- 🛡️ **TypeScript** for type safety
- ✅ **Data validation** with Joi

---

## 🚀 Quick Start

### 🔧 Requirements

- **Node.js** v18+
- **[pnpm](https://pnpm.io/)** (package manager)
- **Docker & Docker Compose** (optional, but recommended)

---

## 📥 Installation

### Option 1: Local Development (without Docker)

```bash
# Clone the repository
git clone https://github.com/your-org/event-platform.git
cd event-platform

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env


# Edit `.env` and configure your MongoDB URI
# Example: MONGODB_URI=mongodb://localhost:27017/event-platform

# Start the development server
pnpm run dev
```

Server will run by default on: **http://localhost:3001**

### Option 2: Docker Development

Make sure Docker and Docker Compose are installed.

#### Development Environment

```bash
make dev         # Start development environment
make dev-build   # Build and start development
make dev-down    # Stop development environment
```

#### Production Environment

```bash
make prod        # Start production environment
make prod-build  # Build and start production
make prod-down   # Stop production environment
```

#### Useful Docker Commands

```bash
make logs        # View container logs
make restart     # Restart containers
make clean       # Remove volumes and prune
make clean-dev   # Clean development environment
make test        # Run backend tests
make db-shell    # Access MongoDB shell
make help        # View all available make targets
```

---

## 📂 Project Structure

```
/project-root/
├── dist/                    # Compiled TypeScript output
├── logs/                    # Application logs
├── public/ 
├── src/
│   ├── constants/           # Enums, roles, status codes
│   ├── core/                # Auth middleware, base services
│   ├── docs/                # OpenAPI YAML files
│   ├── controllers/         # Request handlers (auth, events, users)
│   ├── services/            # Business logic and service classes
│   ├── repository/          # Data access and database queries
│   ├── models/              # Mongoose models and schemas
│   ├── routes/              # Route definitions and mapping
│   ├── config/              # Centralized configuration (env variables to app variables)
│   ├── __tests__/                # Test suites and test utilities
│   ├── types/               # TypeScript interfaces and types
│   ├── utils/               # Helper functions (jwtHelper,error handling)
│   ├── app.ts               # Express application 
│   ├── server.ts            # Application entry point
├── .env                     # Environment variables
├── .env.example             # Example environment file
├── docker-compose.dev.yml   # Development Docker configuration
├── docker-compose.yml       # Production Docker configuration
├── Makefile                 # Docker and project commands
├── package.json
└── pnpm-lock.yaml
```

---

## 📑 API Documentation

📖 The API documentation is auto-generated using **Swagger (OpenAPI)**.

- **URL**: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)
- **Format**: YAML files stored in `src/docs/`
- **Tags**: User, Auth, Role, Event, Comment

### API Endpoints Overview

- **Auth**: `/api/` - Authentication and authorization
- **Users**: `/api/users` - User management
- **Events**: `/api/events` - Event operations


---

## 🧪 Testing

Run tests using Docker or locally:

```bash
# Using Docker
make test

# Or locally
pnpm test
```

---

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/event-platform

# Server
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

```

---

## 🚀 Deployment

### Production Deployment

1. **Build the application**:
   ```bash
   pnpm run build
   ```

2. **Start production server**:
   ```bash
   pnpm run start:prod
   ```

### Docker Production

```bash
make prod-build  # Build production images
make prod        # Start production environment
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm run start:dev    # Start with nodemon
pnpm run build        # Build TypeScript
pnpm run start:prod   # Start production server

# Testing
pnpm run test         # Run tests
pnpm run test:watch   # Run tests in watch mode

# Linting
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Fix ESLint issues
```

---

## ✅ Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Language**: TypeScript
- **Documentation**: Swagger (OpenAPI)
- **Validation**: Joi
- **Authentication**: JWT
- **Containerization**: Docker & Docker Compose
- **Package Manager**: pnpm

---

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint configuration provided
- Write tests for new features
- Update documentation as needed

---

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check `MONGODB_URI` in `.env`

2. **Port Already in Use**
   - Change `PORT` in `.env`
   - Kill existing processes: `lsof -ti:3001 | xargs kill`

3. **Docker Issues**
   - Clean containers: `make clean`
   - Rebuild images: `make dev-build`

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [API Documentation](http://localhost:3001/api-docs)
2. Review the troubleshooting section
3. Open an issue on GitHub

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with the MEAN stack
- Inspired by modern event platforms
- Community contributions welcome

---

**Happy Event Planning! 🚀**