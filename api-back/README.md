# Adjuvo API (Back-End)

Welcome to the **Adjuvo API**!  
This back-end is built with **TypeScript**, **Node.js**, **Express**, **Mongoose**, and **MongoDB**, following a **clean architecture**. It provides CRUD operations for managing **Apps**, **Builders**, **Missions**, **Notifications**, **Mission Submissions**, and **Reports**.

---

## Table of Contents

- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Architecture](#architecture)  
- [Available CRUD Operations](#available-crud-operations)  
- [Testing](#testing)  
- [Notes](#notes)

---

## Getting Started

1. Install dependencies:  
```bash
npm install
````

2. Start the application:

```bash
docker-compose up
```

3. Run in development mode:

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
ENV_REPOSITORIES=mongo
SECRET_TOKEN=YOUR_TOKEN
URI_MONGO=YOUR_MONGO_DB_URI
SECRET_TOKEN_BUILDER=YOUR_SECRET
SECRET_TOKEN_HEDERA_APP=YOUR_SECRET
PORT=9000
```

> You will need Docker and Hedera account keys.

---

## Architecture

The project follows a **clean architecture** with **TypeScript**:

```
src/
├─ controllers/       # Handle HTTP requests and responses
├─ entities/          # Core domain entities
├─ frameworks/        # Implementation frameworks
│  ├─ common/         # Adapters, utilities, helpers
│  ├─ database/       # Database connection and repository implementation
│  ├─ express/        # Express setup and routing
│  └─ repository/     # Data persistence layer
├─ services/          # Business logic
├─ useCases/          # Application-specific use cases
├─ types/             # TypeScript types/interfaces
└─ test/              # Unit and integration tests
```

This structure ensures **modularity, scalability, and testability**.

---

## Available CRUD Operations

* **Apps**: create, read, update, delete
* **Builders**: create, read, update, delete
* **Missions**: create, read, update, delete
* **Notifications**: create, read, update, delete
* **Mission Submissions**: create, read, update, delete
* **Reports**: create, read, update, delete

---

## Testing

Run tests with:

```bash
npm test
```

Tests are organized under `src/test/` and cover **unit and integration scenarios**.

---

## Notes

* Make sure your MongoDB instance is running and accessible.
* Use your Hedera keys for blockchain-related operations.
* This is the **back-end only**; the front-end interacts via API endpoints.
