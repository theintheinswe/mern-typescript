# 🗂️ Task Management System

A full-stack **Task Management System** with **Role-Based Access Control (RBAC)** built using:

- **Backend:** Node.js, Express, TypeScript, MongoDB, Passport (JWT & Local)
- **Frontend:** React, Vite, TypeScript, TailwindCSS, TanStack Query, Radix UI

This project allows **ADMIN** and **MEMBER** to manage tasks with distinct permissions and secure authentication.

---

## 👥 Roles & Permissions

### 🔹 Admin
- Create, edit, and delete members  
- Create, edit, and delete tasks  
- View all members and all tasks  

### 🔹 Member
- View only their own tasks  
- Create and edit their own tasks  

---

## 🧾 User Registration & Role Assignment

- When a **new user registers**, they are automatically assigned the **`MEMBER`** role by default.  
- To make a user an **ADMIN**, you must **manually update their role** in the database for now.
- This project uses MongoDB Transactions for consistent multi-document operations (for example, creating related        records in one atomic action).Therefore, the backend only works correctly with MongoDB Atlas (or a local replica set). 

---

## ⚙️ Tech Stack

### 🧩 Backend
- **Express.js** for RESTful APIs  
- **MongoDB + Mongoose** for data modeling  
- **Passport.js (JWT & Local)** for authentication  
- **bcryptjs** for password hashing  
- **dotenv** for environment configuration  
- **Zod** for input validation  
# Example .env:
```bach
PORT=
NODE_ENV=
MONGO_URI=

JWT_SECRET=
JWT_EXPIRATION_SECONDS=
JWT_ALGORITHM=
BCRYPT_SALTROUNDS=
FRONTEND_ORIGIN=
```

### 🎨 Frontend
- **React 19 + Vite** for modern, fast development  
- **TailwindCSS** for styling  
- **Radix UI** for accessible UI components  
- **TanStack Query** for server state management  
- **React Hook Form + Zod** for form validation  
- **Axios** for API requests  
# Example .env:
```bash
VITE_API_BASE_URL=
```
---

### Getting Started
# Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env

# Seed default roles
npm run seed


# Run the development server
npm run dev
```
# Frontend Setup
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env

# Run the development server
npm run dev
```
