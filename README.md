# School Accessories Mart Backend

This is the backend API for the School Accessories Mart application, built with Node.js, Express, and PostgreSQL using Sequelize ORM.

## Tech Stack

- **Node.js & Express**
- **PostgreSQL** (Database)
- **Sequelize** (ORM)
- **JWT** (Authentication)
- **express-validator** (Input Validation)
- **UUID** (Primary Keys)

## Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your database credentials.

### Database Setup

1. Create the database:
   ```bash
   npx sequelize-cli db:create
   ```
2. Run migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
3. Seed the admin user:
   ```bash
   npx sequelize-cli db:seed:all
   ```

### Running the App

- Development mode:
  ```bash
  npm run dev
  ```
- Build & Run:
  ```bash
  npm start
  ```

## API Documentation

The API documentation is provided via a Postman collection in the root directory: `SchoolMart.postman_collection.json`.

### Default Admin Credentials

- **Email**: `admin@schoolmart.com`
- **Password**: `Admin@1234`

## Project Structure

- `src/config`: Database configuration
- `src/constants`: Application constants (Roles, Statuses)
- `src/controllers`: Request handlers
- `src/helpers`: Utility functions (JWT, Bcrypt)
- `src/middleware`: Custom middlewares (Auth, Validation, Error Handling)
- `src/migration-query`: Database migrations
- `src/models`: Sequelize models
- `src/routes`: API endpoint definitions
- `src/services`: Business logic layer
- `src/utils`: Response handlers and error codes
