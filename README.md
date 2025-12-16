
🍽️ S2O Restaurant Web

**S2O Restaurant Web** (`s2o-restaurant-web`) is the restaurant-facing management dashboard of the **S2O (Scan2Order)** multi-tenant SaaS platform.

This web application allows restaurant owners and staff to manage menus, orders, tables, branches, staff roles, and daily operations in real time.

---

## 📌 Role in the S2O Ecosystem

According to the S2O system architecture and repository definitions, this application is responsible for **restaurant-level operations**, while other repositories handle admin, guest, mobile, AI, and infrastructure concerns.

**This application is used by:**
- Restaurant owners  
- Restaurant managers  
- Restaurant staff  

---

## 🧩 Key Responsibilities

Based on `REPOSITORIES.md`, this application provides:

- Menu management (categories, items, pricing, promotions)
- Real-time order management
- Table status tracking (available / occupied / reserved)
- QR code generation & management
- Staff accounts, roles, and permissions (RBAC)
- Branch-level configuration
- Restaurant analytics & reporting
- Integration with S2O Backend API
- Real-time updates via WebSocket

---

## 🏗️ Architecture Overview

This project follows the **S2O multi-tenant SaaS architecture**:

- Frontend-only application (no direct DB access)
- All data accessed through **S2O Backend API**
- Tenant context resolved via authentication & routing
- Role-Based Access Control (RBAC)
- Stateless frontend with real-time updates

For full system architecture, see:  
📐 **[ARCHITECTURE.md](https://github.com/your-org/s2o-docs/blob/main/ARCHITECTURE.md)**

---

## 🧱 Tech Stack

Based on S2O web standards:

- **Framework**: React / Next.js  
- **Language**: TypeScript  
- **State Management**: Client-side store (per feature/domain)  
- **API Communication**: REST + WebSocket  
- **Styling**: CSS / CSS Modules / utility-based styles  
- **Linting & Formatting**: ESLint + Prettier  

---

## 📂 Project Structure (High Level)
s2o-restaurant-web/
├── src/
│ ├── app/ # Pages & routing
│ ├── components/ # Reusable UI components
│ ├── features/ # Domain-based business logic
│ ├── services/ # API & WebSocket clients
│ ├── hooks/ # Custom React hooks
│ ├── store/ # State management
│ ├── utils/ # Helpers & utilities
│ ├── types/ # TypeScript types
│ └── middleware.ts # Auth, tenant, RBAC handling
│
├── public/ # Static assets
├── tests/ # Unit & integration tests
├── docs/ # Setup & internal docs
└── README.md