# 📝 Scalable Blogging Platform using Microservices & Dual Databases

A scalable, cloud-ready blogging platform built using **Microservices Architecture**, **Polyglot Persistence**, and **Event-Driven Communication**. The system leverages multiple independent services, dual databases, caching, and message queues to deliver a highly available and maintainable blogging application.

---

## 🚀 Project Overview

Traditional monolithic blogging platforms become difficult to scale and maintain as user traffic increases. This project overcomes those limitations by adopting a **microservices architecture**, where each service is independently deployable and scalable.

The platform also implements **polyglot persistence** by using different databases for different types of data, ensuring better performance, flexibility, and scalability.

---

## ✨ Key Features

* 🏗️ Microservices-based modular architecture
* 🗄️ Polyglot persistence using PostgreSQL and MongoDB
* 🔐 Secure authentication with Google OAuth 2.0
* 📨 Asynchronous communication using RabbitMQ
* ⚡ High-performance caching using Redis
* 📚 Blog creation, editing, publishing, and management
* 👤 User profile management
* 🔄 Fault isolation with independent service deployment
* 📈 Scalable and cloud-ready architecture

---

## 🏛️ System Architecture

The application is divided into independent services:

* **API Gateway** – Central entry point for all client requests
* **Authentication Service** – Handles Google OAuth authentication
* **User Service** – Manages user profiles
* **Blog Service** – Handles blog CRUD operations
* **RabbitMQ** – Processes asynchronous events
* **Redis** – Caches frequently accessed data

---

## 🗄️ Database Design (Polyglot Persistence)

| Database   | Purpose                                                 |
| ---------- | ------------------------------------------------------- |
| PostgreSQL | Blogs, comments, saved blogs, and other structured data |
| MongoDB    | Google OAuth user profiles and authentication data      |

Using separate databases allows each service to use the most suitable storage technology.

---

## 🛠️ Technology Stack

### Frontend

* React.js

### Backend

* Node.js
* Express.js
* REST APIs
* TypeScript

### Databases

* PostgreSQL (Neon)
* MongoDB Atlas

### Messaging & Caching

* RabbitMQ
* Redis

### Authentication

* Google OAuth 2.0

### DevOps

* Docker

---

## 🔐 Authentication Flow

1. User signs in using Google OAuth.
2. Google verifies the user identity.
3. User profile information is stored in MongoDB.
4. Authentication tokens are generated.
5. Protected APIs are accessed using secure token-based authentication.

---

## 🔄 Application Workflow

```text
React Frontend
        │
        ▼
API Gateway
        │
 ┌──────┴────────┐
 │               │
 ▼               ▼
Auth Service   Blog Service
 │               │
 ▼               ▼
MongoDB      PostgreSQL
        │
        ▼
      Redis Cache
        │
        ▼
      RabbitMQ
```

---

## 📦 Project Structure

```text
Microservices-Blogging-Platform/

├── gateway/
├── services/
│   ├── auth/
│   ├── user/
│   ├── blog/
├── frontend/
├── docker/
└── README.md
```

---

## ▶️ Getting Started

### Clone the repository

```bash
git clone https://github.com/preranap636/Microservices-Blogging-Platform.git
```

### Install dependencies

```bash
npm install
```

### Start the services

```bash
npm run dev
```

> Configure PostgreSQL, MongoDB, RabbitMQ, Redis, and Google OAuth credentials before running the application.

---

## ✅ Advantages

* High scalability
* Improved maintainability
* Independent deployment of services
* Fault isolation
* Faster response through Redis caching
* Secure OAuth-based authentication
* Better database performance with polyglot persistence

---

## 🚀 Future Enhancements

* Kubernetes orchestration
* CI/CD pipeline
* AI-powered blog recommendations
* Advanced monitoring and logging
* Mobile application
* Notification service
* Search optimization with Elasticsearch

---

## 📌 Project Status

* ✅ Core functionality implemented
* ✅ Microservices architecture completed
* ✅ Deployment-ready
* 🚧 Public cloud deployment pending

---

## 👨‍💻 Team Members

* Sahana Nandigavi
* Nithyashree M R
* Mokshitha V
* Prerana P

---

## 🙏 Acknowledgement

We sincerely thank our project guide and faculty members for their continuous guidance, encouragement, and valuable support throughout the development of this project.

---

## 📄 License

This project was developed for academic and learning purposes.

---

⭐ **If you found this project useful, consider giving it a star!**
