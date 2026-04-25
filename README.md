# 📝 PostApp - Next.js Full-Stack Application

A full-stack Next.js app with secure authentication, posts, and comments.

## 👨‍💻 Author
**MAN MOHAN JEENGAR** - UID: `24BCY70067`

---

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + HTTP-only Cookies + Argon2
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand
- **Validation:** Zod + React Hook Form

---

## 📁 Project Structure
10b-me/
├── app/              # Pages & API routes
├── components/       # UI components
├── models/           # User, Post, Comment schemas
├── services/         # Business logic
├── lib/              # DB, JWT, API utilities
└── store/            # Zustand auth store

---

## ⚙️ Setup

1. **Install dependencies:**
```bash
pnpm install
```

2. **Configure `.env.local`:**
```env
MONGO_URI=mongodb+srv://cu:cu@cu.z8rxqlg.mongodb.net/10b_fullstack?appName=cu
JWT_SECRET=f7k2x9p4m8q1w6n3r5t0y7e2u9i4o6a1s8d3f5g7h0j2k4l6z1x3c5v7b9n2m4
```

3. **Run the app:**
```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Features

✅ User registration & login  
✅ Secure JWT authentication (HTTP-only cookies)  
✅ Create, view, delete posts  
✅ Paginated posts list  
✅ Comments on posts  
✅ Protected routes  
✅ Responsive UI  

---

## 📊 Database Models

| Model | Fields |
|-------|--------|
| **User** | name, email, password (hashed) |
| **Post** | userId, title, description |
| **Comment** | postId, userId, content |

---

## 🛠️ API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Create account |
| `/api/auth/login` | POST | Login |
| `/api/auth/logout` | POST | Logout |
| `/api/posts` | GET, POST | Get/Create posts |
| `/api/posts/mine` | GET | User's posts |
| `/api/posts/[id]` | GET, DELETE | Single post |
| `/api/posts/[id]/comments` | GET, POST | Comments |

---

## 🎯 Key Concepts

- **Secure Auth:** Argon2 password hashing + HTTP-only cookies
- **Clean Architecture:** Separated services & utilities
- **Type Safety:** TypeScript + Zod validation
- **Modern React:** Hooks, forms, state management

---

## 📄 License
Educational project - Experiment 10b

---
