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

| Layer    | Tech                        |
|----------|-----------------------------|
| Frontend | React + Vite                |
| Backend  | Node.js + Express           |
| Database | SQLite (dev) / PostgreSQL (later) |
| ORM      | Prisma v5                   |

## Project Structure

```
pizza-ordering-system/
├── frontend/
│   └── src/
│       ├── pages/       # Home, Menu, PizzaDetail, Cart, Confirmation
│       ├── components/  # Navbar, CategoryCard
│       ├── context/     # CartContext (global cart state)
│       └── data/        # menuData.js (sample data)
├── backend/
│   ├── src/
│   │   └── routes/      # menu.js, billing.js
│   └── prisma/          # schema.prisma, seed.js
└── .gitignore
```

## API Endpoints

| Method | Route        | Description                        |
|--------|--------------|------------------------------------|
| GET    | `/menu`      | All menu items (filter: `?category=pizza`) |
| POST   | `/calculate` | `{ items: [{price, qty}] }` → `{ subtotal, tax, total }` |
| GET    | `/health`    | Server health check                |

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

**Open site → View Menu → Add Pizza → Remove Pizza → See Total**

Payment is fake, database is optional for Sprint 1.
