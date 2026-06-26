# 📝 Scalable Blogging Platform using Microservices & Dual Databases

A modern, scalable blogging platform designed using **microservices architecture**, **polyglot persistence**, and **asynchronous communication** to overcome the limitations of traditional monolithic systems.

---

## 🚀 Project Overview

Blogging platforms play a crucial role in sharing knowledge and creative content. However, traditional monolithic architectures face serious challenges such as poor scalability, performance bottlenecks, and complex maintenance as user traffic grows.

This project addresses these challenges by implementing a **microservices-based blogging platform** combined with a **dual-database approach**, ensuring high performance, fault tolerance, and a smooth user experience.

---

## 🎯 Key Features

- 🔹 Microservices-based modular architecture  
- 🔹 Dual database (PostgreSQL + MongoDB)  
- 🔹 Secure authentication using Google OAuth 2.0  
- 🔹 Asynchronous communication with RabbitMQ  
- 🔹 High-performance caching using Redis  
- 🔹 Fault isolation and independent service scaling  
- 🔹 Efficient blog creation, editing, and publishing  

---

## 🧩 System Architecture

The system is divided into independent services, each responsible for a specific functionality:

- **API Gateway** – Central entry point for client requests  
- **Auth Service** – Handles authentication using Google OAuth  
- **User Service** – Manages user profiles  
- **Blog Service** – Handles blog CRUD operations  
- **Message Broker (RabbitMQ)** – Enables asynchronous event processing  
- **Cache Layer (Redis)** – Improves response time and reduces DB load  

---

## 🗄️ Dual Database Design (Polyglot Persistence)

| Database | Purpose |
|--------|--------|
| **PostgreSQL** | Structured data such as blogs, comments, saved blogs |
| **MongoDB** | Semi-structured OAuth-based user profile data |

This separation ensures optimal data handling, scalability, and performance.

---

## ⚡ Technologies Used

### Frontend
- React.js

### Backend
- Node.js
- RESTful APIs

### Databases
- PostgreSQL (Neon)
- MongoDB (Atlas)

### Messaging & Caching
- RabbitMQ
- Redis

### Authentication
- Google OAuth 2.0

### Deployment Ready
- Docker (containerization)

---

## 🔐 Authentication Flow

- Users log in using **Google OAuth**
- No passwords are stored in the system
- OAuth user data is securely stored in MongoDB
- Token-based authentication is used for API access

---

## 🔁 Data Flow Summary

1. User interacts with the React frontend  
2. Requests are routed via API Gateway  
3. Authentication handled using Google OAuth  
4. Blog operations processed via Blog Service  
5. Redis cache checked before database access  
6. PostgreSQL handles structured data  
7. MongoDB handles user authentication data  
8. RabbitMQ processes background events asynchronously  

---

## ✅ Advantages of the System

- High scalability and performance  
- Fault isolation and reliability  
- Reduced database load using caching  
- Secure authentication without password management  
- Modular and extensible architecture  

---

## 🚧 Future Enhancements

- Kubernetes-based auto-scaling  
- CI/CD pipeline integration  
- AI-based blog recommendations  
- Advanced monitoring and logging  
- Mobile application support  

---

## 📌 Project Status

✔️ Core functionality implemented  
✔️ Architecture validated  
✔️ Deployment-ready (not publicly deployed due to academic scope)

---

## 👨‍💻 Team Members

- **Sahana Nandigavi**
- **Nithyashree M R**
- **Mokshitha V**
- **Prerana P**

---

## 🙏 Acknowledgement

We sincerely thank our project guide and faculty for their continuous guidance and support throughout the development of this project.

---

## 📄 License

This project is developed for academic and learning purposes.

---

⭐ *If you find this project useful, feel free to star the repository!*
