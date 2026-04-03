
---

```markdown
# FinanceHub

> A modern personal finance dashboard built as part of the Zorvyn Frontend Assignment.

**Live Demo → [https://zorvyn-frontend-assignment-d9v746i5j-d3vs-projects.vercel.app/](https://zorvyn-frontend-assignment-d9v746i5j-d3vs-projects.vercel.app/)**

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration Notes](#configuration-notes)
- [Author](#author)

---

## Overview

FinanceHub is a single-page finance dashboard application that gives users a clear, real-time view of their financial health. Built entirely on the frontend with React.js and Vite, it demonstrates component architecture, interactive data visualization, live state reactivity, role-based access control, and polished UI design — all without a backend or database.

The application uses mock data to simulate a real financial environment, keeping the focus on frontend engineering quality: layout, interactivity, responsiveness, and visual consistency.

---

## Live Demo

🔗 **[https://zorvyn-frontend-assignment-d9v746i5j-d3vs-projects.vercel.app/](https://zorvyn-frontend-assignment-d9v746i5j-d3vs-projects.vercel.app/)**

Deployed on **Vercel** with automatic builds from the `main` branch.

---

## Features

### 1. Summary Stats Cards
Three metric cards at the top of the dashboard display **Total Balance**, **Income**, and **Expenses** at a glance. Each card has a distinct icon and color theme. The Expenses card additionally shows a **percentage change vs last month**, giving users an immediate sense of financial movement over time.

### 2. Interactive Balance Trend Chart
A full-width area/line chart built with **Recharts** visualizes the user's running balance over time. Hovering over any data point reveals a tooltip showing the exact date and balance value. The chart responds dynamically to any data change — adding, editing, or deleting a transaction instantly updates the curve.

### 3. Spending Breakdown — Donut Chart
A donut chart on the right side of the dashboard breaks down total spending by category. Each category (Shopping, Groceries, Dining, etc.) is assigned a distinct color, with a legend below listing each category alongside its exact amount.

### 4. Auto-Calculated Insights Panel
A dedicated Insights card surfaces three metrics computed directly from the transaction data:
- **Top Spending Category** — the category with the highest cumulative spend
- **Monthly Comparison** — percentage change in spending compared to the previous month
- **Average Transaction** — the mean value across all expense entries

All three values recalculate automatically whenever transaction data changes.

### 5. Transactions Table with Full CRUD
A sortable transactions table lists every entry with columns for Date, Description, Category, Type, and Amount. Income entries are highlighted in green and expenses in red with labeled badges. Admin users can:
- **Add** a new transaction via the `+ Add Transaction` button
- **Edit** any existing row using the inline edit action
- **Delete** any row, with all charts and metrics updating immediately on confirmation

### 6. Live Search and Multi-Filter
The transactions table includes a live search bar that filters by description as the user types. Two dropdown filters work in combination with it:
- **Type** — All Types, Income, or Expense
- **Category** — Salary, Freelance, Investment, Groceries, Dining, Transportation, Entertainment, Utilities, Shopping, Healthcare, or Other

Filters stack together, so a user can search within a specific type and category simultaneously. An empty state message is shown when no results match.

### 7. Role-Based Access Control (Admin / Viewer)
A role switcher in the top navigation bar toggles between two access levels:
- **Admin** — full read/write access; can add, edit, and delete transactions
- **Viewer** — read-only access; the Actions column is hidden and no mutations are permitted

This simulates a production-style RBAC pattern implemented entirely on the frontend.

### 8. Dark Mode
A theme toggle button in the navbar switches the entire interface between light and dark modes. The transition is instant and applies across all components using CSS variable-based theming from the shadcn/ui design system.

### 9. Real-Time Data Reactivity
Every section of the dashboard — stat cards, balance trend chart, spending donut, and insights panel — responds in real time to any data change. No page reload is needed; state is managed in React and propagated immediately across all components.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI and state management |
| Vite 8 | Build tool with fast HMR |
| Tailwind CSS | Utility-first styling |
| shadcn/ui + Radix UI | Accessible, themeable component primitives |
| Recharts | Interactive charts (line chart, donut chart) |
| Framer Motion | Animations and transitions |
| Lucide React | Icon library |
| class-variance-authority | Component variant management |
| tailwind-merge | Conflict-free Tailwind class merging |
| Geist Variable Font | Typography |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or above
- **npm**

### Installation

**1. Clone the repository:**

```bash
git clone https://github.com/d3vpratap/Zorvyn-frontend-assignment.git
cd Zorvyn-frontend-assignment
```

**2. Install dependencies:**

```bash
npm install
```

**3. Start the development server:**

```bash
npm run dev
```

**4. Open in your browser:**

```
http://localhost:5173
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server with HMR |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

---

## Project Structure

```
Zorvyn-frontend-assignment/
├── public/                  # Static assets
├── src/
│   ├── main.jsx             # Application entry point
│   ├── App.jsx              # Root component
│   ├── components/
│   │   ├── ui/              # shadcn/ui base components
│   │   └── ...              # Feature components (charts, table, cards, etc.)
│   ├── lib/
│   │   └── utils.js         # Utility helpers
│   └── index.css            # Global styles and Tailwind directives
├── index.html               # HTML entry point
├── package.json             # Project metadata and dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── components.json          # shadcn/ui configuration
├── jsconfig.json            # Path alias configuration
└── eslint.config.js         # ESLint configuration
```

---

## Configuration Notes

- **Path aliases** are configured in `jsconfig.json`, enabling clean imports using `@/components`, `@/lib`, and `@/hooks` instead of relative paths.
- **shadcn/ui** is set up in `components.json` with the `radix-nova` style, Lucide as the icon library, and Tailwind CSS variables for theming.
- **Dark mode** is powered by CSS variables defined in `index.css`, toggled at the root level so all components respond to the theme change consistently.

---

## Author

[@d3vpratap](https://github.com/d3vpratap)
- [https://www.linkedin.com/in/d3vpratap/]

Built as part of the **Zorvyn Frontend Assignment**.
```
