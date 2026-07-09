# Pizza Ordering System

> Sprint 1 — Group Project

## Quick Start (clone & run)

### 1. Clone the repo
```bash
git clone https://github.com/mtarico/PizzaOrderingGroupProject.git
cd PizzaOrderingGroupProject
```

### 2. Start the backend
```bash
cd backend
npm install
npm run db:setup    # creates SQLite DB and seeds menu data
npm run dev         # runs on http://localhost:3001
```

### 3. Start the frontend (new terminal)
```bash
cd frontend
npm install
npm run dev         # runs on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Tech Stack

| Layer    | Tech                              |
|----------|-----------------------------------|
| Frontend | React + Vite                      |
| Backend  | Node.js + Express                 |
| Database | SQLite (dev) / PostgreSQL (later) |
| ORM      | Prisma v5                         |

## Project Structure

```
pizza-ordering-system/
├── frontend/
│   └── src/
│       ├── pages/       # Home, Menu, PizzaDetail, Cart, Checkout, Orders, Confirmation, Admin
│       ├── components/  # Navbar, CategoryCard
│       ├── context/     # CartContext (global cart state)
│       ├── api/         # menuApi.js (fetch wrapper for all backend calls)
│       └── data/        # menuData.js (categories, promos)
├── backend/
│   ├── src/
│   │   └── routes/      # menu.js, billing.js, orders.js
│   └── prisma/          # schema.prisma, seed.js, migrations/
└── .gitignore
```

## API Endpoints

| Method | Route                  | Description                                           |
|--------|------------------------|-------------------------------------------------------|
| GET    | `/menu`                | All menu items (filter: `?category=pizza`)            |
| POST   | `/menu`                | Create menu item (admin auth required)                |
| PUT    | `/menu/:id`            | Update menu item (admin auth required)                |
| DELETE | `/menu/:id`            | Delete menu item (admin auth required)                |
| POST   | `/menu/admin/login`    | Admin login → returns token                          |
| GET    | `/menu/admin/me`       | Verify admin token                                    |
| POST   | `/calculate`           | `{ items: [{price, qty}] }` → `{ subtotal, tax, total }` |
| GET    | `/orders`              | All past orders with line items                       |
| POST   | `/orders`              | Place a new order → returns saved order with ID       |
| GET    | `/health`              | Server health check                                   |

---

## Pages

| Route          | Page         | Description                                          |
|----------------|--------------|------------------------------------------------------|
| `/`            | Home         | Hero, promotions banner, category browse grid        |
| `/menu`        | Menu         | Category tabs, live menu from backend, add to cart   |
| `/menu/:id`    | PizzaDetail  | Customize size, sauce, crust, and quantity           |
| `/cart`        | Cart         | Review items, adjust quantities, apply discount      |
| `/checkout`    | Checkout     | Delivery address + fake payment form                 |
| `/orders`      | Orders       | Full order history with collapsible order cards      |
| `/admin`       | Admin        | Add, edit, and remove menu items (login required)    |

---

## Checkout Flow

```
Home → Menu → (PizzaDetail for pizzas) → Cart → Checkout → Orders
```

1. Add items to cart from the Menu page
2. Pizzas go through a customization screen (size, sauce, crust)
3. Review the cart and apply an optional discount
4. Fill in delivery address and payment info on the Checkout page
5. Order is saved to the database and you land on the Order History page

> **Note:** Payment is fake — no real charge is made. Use any 16-digit card number (e.g. `4242 4242 4242 4242`), any future expiry (e.g. `12/27`), and any 3-digit CVV.

---

## Admin Dashboard

Visit `/admin` to manage menu items. Demo credentials: `admin` / `admin123`.

---

## Sprint 1 Tasks

### Frontend
- TSK-001 Wireframes
- TSK-002 Homepage
- TSK-003 Responsive layout
- TSK-004 Menu page
- TSK-007 Final bill display
- TSK-008 Confirmation page

### Backend
- TSK-006 Bill calculation
- TSK-022 Environment setup

### QA
- TSK-009 UI/UX testing
- TSK-010 Bug reporting

## Sprint 1 Goal

By end of week, a user should be able to:

**Open site → View Menu → Add Pizza → Remove Pizza → See Total → Checkout → View Order History**
