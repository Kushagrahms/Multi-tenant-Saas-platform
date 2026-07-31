<div align="center">
  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      BUSINESS MANAGEMENT SAAS PLATFORM

 Secure • Multi-Tenant • Dockerized • Full Stack

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 Business Management SaaS Platform

A full-stack multi-tenant business management solution built with React, Express, PostgreSQL, Prisma ORM, and Docker.

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-black?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

</div>

📖 About

Business Management SaaS Platform is a multi-tenant web application that enables businesses to manage customers, bookings, services, staff, invoices, and expenses from a single platform.

The project follows a modular backend architecture with secure JWT authentication, role-based access control, and tenant-level data isolation. It was built to demonstrate real-world backend architecture, database design, and full-stack development practices.

📸 Application Preview

# Login
<img width="400" height="300" alt="image" src="https://github.com/user-attachments/assets/ed5dbe4c-d28c-4b3c-a0e6-b7d4974490ba" />

# Dashboard
<img width="800" height="300" alt="image" src="https://github.com/user-attachments/assets/9724462a-e6e7-45da-bb62-c91ecb090dd9" />

# Customer Management
<img width="700" height="300" alt="image" src="https://github.com/user-attachments/assets/c807e316-c1e2-4e04-82c4-aa6e57c3aeef" />

# Booking Management
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/1ce1d37a-fa41-4ee5-bd2c-ecb24b6a23c1" />

# Financial Dashboard
<img width="600" height="300" alt="image" src="https://github.com/user-attachments/assets/d7040897-d508-47fc-985d-addb58dc369a" />
<img width="600" height="300" alt="image" src="https://github.com/user-attachments/assets/b16dcf71-2b62-4adf-ae3a-0db2c8aa2d21" />

✨ Features

- 🔐 JWT Authentication & Role-Based Access Control
- 🏢 Multi-Tenant Architecture
- 👥 Customer Management
- 📅 Booking Management
- 💼 Staff Management
- 💳 Invoice Management
- 💰 Expense Tracking
- 🛠 Service Management
- 📊 Business Dashboard
- 🐳 Dockerized Deployment

🏗 Architecture
```mermaid
flowchart TD

    A[👤 User] --> B[React Frontend]

    B -->|HTTP Requests| C[Express.js REST API]

    C --> D[JWT Authentication]
    D --> E[Role-Based Access Control]

    E --> F[Controllers]
    F --> G[Business Services]
    G --> H[Prisma ORM]

    H --> I[(PostgreSQL Database)]

    subgraph Multi-Tenant Database
        I --> J[Tenants]
        I --> K[Users]
        I --> L[Customers]
        I --> M[Bookings]
        I --> N[Services]
        I --> O[Invoices]
        I --> P[Expenses]
        I --> Q[Staff]
    end

    subgraph Docker Environment
        B
        C
        I
    end
```

🛠 Tech Stack

| Category | Technologies |
|-----------|--------------|
| Frontend | React.js, Axios, CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL, Prisma ORM |
| Authentication | JWT, bcrypt |
| DevOps | Docker, Docker Compose |

📂 Project Structure
Business-Management-SaaS
│
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md

 ⚙ Getting Started

# Clone Repository
```bash
git clone https://github.com/Kushagrahms/Multi-tenant-Saas-platform.git
```
# Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```
# Start the Application

```bash
# Backend
cd backend
npm run dev
```

```bash
# Frontend
cd frontend
npm run dev
```
# Docker

```bash
docker compose up --build
```
📌 Future Improvements

- Kubernetes Deployment
- Swagger API Documentation
- Email Notifications
- Reports & Analytics
- CI/CD Pipeline
  
👨‍💻 Author

**Kushagra Shrivastava**

If you found this project interesting, feel free to ⭐ the repository.
