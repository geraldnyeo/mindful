# Mindful - Volunteer Management System

A modern, full-stack volunteer management system designed for MINDS organization. Mindful helps coordinate volunteers, track events, manage participants, and streamline volunteer engagement through an intuitive web application.

## Problem Statement

How might we reduce friction in activity sign-ups for both individuals and caregivers, while reducing manual effort for staff in managing and consolidating registration data?

## Features

- 🔐 **Secure Authentication**: User registration and login with role-based access control
- 👥 **Role-Based Access**: Three user roles - Admin, Volunteer, and Participant with specific permissions
- 📅 **Event Management**: Create, view, and manage events with detailed information
- 🗓️ **Calendar View**: Visual calendar interface to browse events by month
- 🔒 **JWT Sessions**: Secure session management with HttpOnly cookies
- 💾 **MongoDB Integration**: Robust data persistence with MongoDB

## Technology Stack

### Frontend
- **React 19**: Modern UI library with hooks and concurrent features
- **React Router 7**: Client-side routing with data loaders
- **Vite**: Lightning-fast build tool and dev server
- **TypeScript**: Type-safe JavaScript for better code quality
- **Tailwind CSS 4**: Utility-first CSS framework
- **Lucide React**: Beautiful, consistent icon library
- **Axios**: HTTP client for API communication

### Backend
- **Express.js 5**: Fast, unopinionated web framework
- **TypeScript**: Type-safe backend development
- **MongoDB 7**: NoSQL database for flexible data storage
- **JWT (jose)**: Secure token generation and verification
- **bcrypt**: Password hashing and security
- **CORS**: Cross-origin resource sharing for frontend communication

### Development Tools
- **ESLint**: Code linting and quality
- **Tailwind CSS Vite Plugin**: Optimized CSS bundling
- **TypeScript Compiler**: Type checking and compilation

## Project Structure

```
mindful/
├── client/                          # React frontend application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── EventAdmin/
│   │   │   ├── EventCalendar/
│   │   │   ├── EventCard/
│   │   │   ├── EventDetails/
│   │   │   ├── EventParticipants/
│   │   │   ├── EventVolunteers/
│   │   │   ├── Navbar/              # Navigation bar with profile menu
│   │   │   ├── ThemeToggle/         # Dark/light mode toggle
│   │   │   └── ui/                  # Shadcn UI components
│   │   ├── layouts/
│   │   │   ├── AuthLayout/          # Layout for login/signup pages
│   │   │   └── DefaultLayout/       # Main app layout with navbar
│   │   ├── pages/                   # Full page components
│   │   │   ├── AdminDashboard/
│   │   │   ├── CalendarPage/
│   │   │   ├── ErrorPage/
│   │   │   ├── EventCreatePage/
│   │   │   ├── EventPage/
│   │   │   ├── LandingPage/         # Public landing page
│   │   │   ├── Login/
│   │   │   ├── Signup/
│   │   │   ├── ParticipantDashboard/
│   │   │   └── VolunteerDashboard/
│   │   ├── services/                # Business logic & API calls
│   │   │   ├── AuthService.tsx      # Authentication logic
│   │   │   ├── DataService.tsx      # Data fetching
│   │   │   ├── HTTPService.tsx      # Axios instance with interceptors
│   │   │   └── UserService.tsx      # User data types
│   │   ├── loaders/                 # React Router data loaders
│   │   │   ├── auth_loaders.tsx     # Role-based access control
│   │   │   ├── conditional_components.tsx
│   │   │   └── page_loaders.tsx
│   │   ├── helpers/                 # Utility functions
│   │   │   └── text_methods.tsx     # Input validation helpers
│   │   ├── contexts/                # React contexts
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── index.css                # Global styles
│   │   └── main.tsx                 # App entry point & router config
│   ├── .env                         # Environment variables
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── server/                          # Express backend application
│   ├── src/
│   │   ├── app.ts                   # Express app setup & routes
│   │   ├── api_routes/              # API endpoints
│   │   │   ├── auth.ts              # Login/signup routes
│   │   │   ├── event.ts             # Event CRUD routes
│   │   │   └── user.ts              # User routes
│   │   ├── services/                # Business logic
│   │   │   ├── authService.ts       # Auth & JWT logic
│   │   │   ├── userService.ts       # User model & operations
│   │   │   └── eventService.ts      # Event operations
│   │   ├── lib/
│   │   │   ├── dbClient.ts          # MongoDB connection
│   │   │   └── middlewares.ts       # Express middlewares
│   │   ├── util/
│   │   │   ├── checkProperty.ts     # Type checking utilities
│   │   │   └── loadEnv.ts           # Environment config
│   │   └── tooling/
│   │       ├── populateDB.ts        # Seed database
│   │       └── nukeDB.ts            # Clear database
│   ├── dist/                        # Compiled JavaScript
│   ├── .env                         # Environment variables
│   ├── tsconfig.json
│   └── package.json
│
└── README.md                        # This file
```

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v10 or higher)
- **MongoDB** (local instance or MongoDB Atlas cloud)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/geraldnyeo/mindful.git
   cd mindful
   ```

2. **Setup Backend**

   For more information, see the README in /server

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` directory:
   ```env
   PORT=3000
   MONGODBSTRING="your_mongodb_connection_string"
   CLIENTORIGIN="http://localhost:5173"
   JWTSECRET="your_jwt_secret_key"
   ```

   For local MongoDB:
   ```env
   MONGODBSTRING="mongodb://localhost:27017/mindful"
   ```

   Place SSL certificate and private key in /server

   Build and start the server:
   ```bash
   npm run build
   npm run start
   ```

   To build and start at the same time:
   ```bash
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   ```

   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

   Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

### Running the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Database Management

**Populate database with sample data:**
```bash
cd server
npm run populate-db
```

**Clear the database:**
```bash
cd server
npm run nuke-db
```

**Clear and repopulate:**
```bash
cd server
npm run nuke-populate-db
```

## Architecture

### Authentication Flow

1. User signs up with email, username, password, and role
2. Password is hashed with bcrypt and stored securely in MongoDB
3. On login, credentials are validated and JWT token is generated
4. Token is stored in an HttpOnly cookie for security
5. Subsequent requests include the cookie for authentication
6. Role-based routing enforces access control on protected routes

### User Roles

- **Admin**: Full system access, can manage users and events
- **Volunteer**: Can view events and volunteer for activities
- **Participant**: Can register for events and view participation details
- **Guest**: Unauthenticated user (limited to landing page)

### Protected Routes

- `/dashboard` - Accessible to all authenticated users
- `/calendar/:monthyear` - Event calendar view
- `/event/:eventid` - Event details page
- `/admin` - Admin-only dashboard
- `/volunteer` - Volunteer-specific dashboard
- `/participant` - Participant-specific dashboard

## API Endpoints On Server

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/refresh` - Refresh JWT token

### Users
- `GET /api/user/me` - Get current user profile

### Events
- `GET /api/event/range` - Get events in date range
- `GET /api/event/:id` - Get event details
- `POST /api/event/create` - Create new event
- `PUT /api/event/:id` - Update event
- `DELETE /api/event/:id` - Delete event
- `POST /api/event/:id/register` - Register for event
- `POST /api/event/:id/cancel` - Cancel registration

## Development Guide

### Adding New Features

#### Creating a New Page
1. Create component in `client/src/pages/PageName/`
2. Add route in `client/src/main.tsx`
3. Create loader if needed in `client/src/loaders/`

#### Creating a New Component
1. Create component in `client/src/components/ComponentName/`
2. Include `componentName.css` for styling
3. Export from `ComponentName.tsx`

#### Adding API Routes
1. Create endpoint in `server/src/api_routes/`
2. Implement business logic in `server/src/services/`
3. Register route in `server/src/app.ts`

## Troubleshooting

### Server won't start
- Check if port 3000 is already in use: `lsof -i :3000`
- Verify MongoDB connection string is correct
- Check `.env` file has all required variables

### CORS errors
- Ensure `CLIENTORIGIN` in server `.env` matches frontend URL
- Check that frontend and backend are on the same domain or properly configured

### Database connection issues
- Verify MongoDB is running (local) or connection string is valid (cloud)
- Check credentials in MongoDB Atlas if using cloud
- Ensure network access is allowed in MongoDB settings

### Authentication not working
- Clear browser cookies and localStorage
- Check JWT secret is consistent between restarts
- Verify HttpOnly cookies are being set (check browser DevTools)