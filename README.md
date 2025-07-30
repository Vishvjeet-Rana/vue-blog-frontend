# 📝 Blog Management App

A full-stack blog platform built with **NestJS**, **Prisma**, and **PostgreSQL** for the backend, and **Vue 3 + Pinia** for the frontend. The app includes features for user authentication, profile management, blog post CRUD operations, and a role-based admin system for managing users.

---

## 📦 Tech Stack

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Validation**: Zod
- **Authentication**: JWT-based with Guards and Role-based Access Control
- **File Upload**: Multer (profile pictures, post images)
- **Swagger**: API documentation for all routes

### Frontend
- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: Vue Router
- **HTTP**: Axios
- **Styling**: Tailwind CSS
- **State Management**: Pinia

---

## 🔐 Features

### 👤 Authentication
- Register with profile image
- Login
- Forgot / Reset Password
- Change Password
- Token-based session management

### 🙍‍♂️ Profile
- View profile
- Update profile details
- Upload / Update profile picture

### 📝 Blog Posts
- Create, Read, Update, Delete posts
- Only the author or an admin can edit/delete
- Public "Feed" page accessible to all (even unauthenticated)

### 🛡️ Admin Panel
- View all users
- View individual user details
- Create new user (send welcome mail in real projects)
- Edit existing users
- Delete users
- Role: `admin` vs `user` enforced via guards

---

## 💡 Author
**Made with ❤️ by [Vishvjeet Rana](https://vishvjeet.com/)**
