# Express.js Backend Template

A robust and scalable Express.js backend template with built-in authentication, session management, and MongoDB integration. This template provides a solid foundation for building secure and maintainable web applications.

## Features

- 🔐 Authentication system with Passport.js
- 📦 MongoDB integration
- 🔑 Session management
- 🛡️ CORS enabled
- 🌍 Environment variables support
- 📁 Modular project structure

## Project Structure

```
src/
├── controllers/    # Request handlers and business logic
├── db/            # Database configuration and connection
├── middleware/    # Custom middleware functions
├── models/        # MongoDB models/schemas
├── routers/       # Route definitions
├── utils/         # Utility functions and helpers
└── index.ts       # Application entry point
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `PORT`: Server port number (default: 8080)
- `MONGODB_URI`: MongoDB connection string
- `SESSION_SECRET`: Secret key for session management

## Available Scripts

- `npm run dev`: Start the development server with hot-reload
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server

## API Endpoints

### Authentication
- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login user
- `GET /auth/logout`: Logout user

### Base Route
- `GET /`: Health check endpoint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
