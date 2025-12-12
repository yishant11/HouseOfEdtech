# House of EdTech - Full Stack CRUD Application

A full-stack CRUD (Create, Read, Update, Delete) application built with TypeScript, Node.js, Express, MongoDB, and Next.js.

## Project Structure

- `backend/` - RESTful API built with Node.js, Express, and MongoDB
- `frontend/` - User interface built with Next.js and React

## Features

- User authentication (register/login)
- Product management (CRUD operations)
- Responsive UI with Tailwind CSS
- Form validation
- Error handling

## Tech Stack

### Backend
- Node.js with TypeScript
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

### Frontend
- Next.js 16
- React 19
- Tailwind CSS
- TypeScript
- Shimmer UI

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database (local or cloud)

### Installation

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with your MongoDB URI and JWT secret
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the backend directory with:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Available Scripts

### Backend
- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## License

This project is licensed under the MIT License.
