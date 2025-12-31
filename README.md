**Santa’s Workshop Dashboard**

A small admin dashboard built with React + Vite for managing toys, orders and elves in Santa's workshop. The app includes authentication (Firebase), real-time database access, routing, and basic CRUD interfaces for toys, orders and tasks.

**Quick Start**

- Clone the repo:

- Install dependencies:

```bash
npm install
```

- Start dev server:

```bash
npm run dev
```

- Build for production:

```bash
npm run build
```

**Available Scripts**

- `npm run dev` — start Vite dev server
- `npm run build` — build production bundle
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint

**Features**

- User authentication with Firebase Auth (login/register/logout)
- Real-time database (Firebase RTDB) for storing toys, orders, elves and tasks
- CRUD UI for Toys, Orders and Elf Tasks
- Elf management and per-elf task lists
- Client-side routing using `react-router-dom`
- Server-state caching/requests with `@tanstack/react-query`
- Toast notifications via `react-hot-toast`
- Responsive UI styling with Tailwind CSS
- Dark mode / theme toggle (via custom hook)

**Used technologies**

- Framework: React 19 + Vite
- Styling: Tailwind CSS, PostCSS, Autoprefixer
- Routing: `react-router-dom`
- Data fetching / caching: `@tanstack/react-query`
- Firebase: `firebase` (Auth + Realtime Database)
- Notifications: `react-hot-toast`
- Linting: ESLint

You can inspect the dependency list in `package.json`.

**Configuration**

- Firebase configuration is in `firebase/firebaseConfig.js`. For production, move sensitive values to environment variables and do not commit secrets.

**Futures (Planned Improvements)**

- Add unit & integration tests and CI pipeline
- Role-based access control for elves/admins
- File uploads for toy images (Firebase Storage)
- Pagination and filtering for lists
- Improve validation and error handling in forms
- Deploy to a CDN / static host (Netlify, Vercel, Firebase Hosting)

**Contributing**

- Open an issue or submit a PR. Keep changes small and focused.

**License**

- MIT (or specify your preferred license)

