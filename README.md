# DineFlow – Restaurant POS & Management System

DineFlow is a full-stack Restaurant POS & Management System built to manage restaurant operations such as menu items, tables, customers, orders, payments, bills, dashboard analytics, and reports.

## 🚀 Features

* 🔐 User Authentication & Authorization
* 📊 Dashboard
* 🏷️ Category Management
* 🍽️ Menu Item Management
* 🪑 Table Management
* 👥 Customer Management
* 🛒 Order Management
* 💳 Payment Management
* 🧾 Bill Management
* 📈 Sales & Payment Reports
* 🔍 Search & Filtering
* 🔄 Refresh & Error Handling
* 🧪 End-to-End Testing with Playwright
* ✅ ESLint Code Quality

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Redux Toolkit
* Axios
* Tailwind CSS
* Lucide React
* Playwright

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## 📁 Project Repositories

### Frontend

[dineflow-frontend](#)

React.js frontend application for the DineFlow POS system.

### Backend

[dineflow-backend](#)

Node.js + Express REST API for the DineFlow POS system.

## 🏗️ Application Modules

```text
Authentication
     ↓
Dashboard
     ↓
Categories
     ↓
Menu Items
     ↓
Tables
     ↓
Customers
     ↓
Orders
     ↓
Order Items
     ↓
Payments
     ↓
Bills
     ↓
Reports
```

## 🔄 Restaurant POS Flow

```text
Customer
   ↓
Table Selection
   ↓
Create Order
   ↓
Add Menu Items
   ↓
Calculate Total
   ↓
Payment
   ↓
Generate Bill
   ↓
Print / View Bill
```

## 🖥️ Local Development

### Backend

```bash
cd dineflow-backend
yarn install
yarn dev
```

Backend runs on:

```text
http://localhost:9000
```

### Frontend

```bash
cd dineflow-frontend
yarn install
yarn dev
```

Frontend runs on:

```text
http://localhost:9001
```

## 🧪 Testing

Run Playwright tests from the frontend project:

```bash
yarn playwright test
```

Run ESLint:

```bash
yarn lint
```

## 🔐 Environment Variables

Do not commit `.env` files.

Use `.env.example` files to document required environment variables.

Example:

```env
PORT=9000
MONGO_URI=mongodb://127.0.0.1:27017/dineflow
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## 📌 Project Status

### Backend

* [x] Authentication
* [x] Categories
* [x] Menu Items
* [x] Tables
* [x] Customers
* [x] Orders
* [x] Order Items
* [x] Payments
* [x] Bills
* [x] Dashboard
* [x] Reports

### Frontend

* [x] Authentication
* [x] Dashboard
* [x] Categories
* [x] Menu Items
* [x] Tables
* [x] Customers
* [x] Orders
* [x] Payments
* [x] Bills
* [x] Reports
* [x] ESLint
* [x] Playwright

## 🎯 Future Improvements

* [ ] POS Billing Screen
* [ ] Generate Bill UI
* [ ] Print Bill
* [ ] Order Item Management UI
* [ ] Role-based Permissions
* [ ] Inventory / Stock Management
* [ ] Advanced Reports
* [ ] Responsive POS Interface

## 👨‍💻 Author

**Silambarasan K**

Frontend Developer | React.js Developer

---

⭐ If you find this project useful, feel free to star the repository.
