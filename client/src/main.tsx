import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"

import AuthLayout from "./layouts/AuthLayout/AuthLayout"
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout"

import LandingPage from "./pages/LandingPage/LandingPage"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import ErrorPage from "./pages/ErrorPage/ErrorPage"

import './index.css'

import { DashboardComponent } from "./loaders/conditional_components"
import { indexLoader, protectedRoute, adminRoute, participantRoute, volunteerRoute } from "./loaders/auth_loaders"

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { 
        index: true, 
        loader: indexLoader,
        Component: LandingPage
      },
      // Protected Routes
      {
        loader: protectedRoute,
        Component: DefaultLayout,
        children: [
          // Routes which are available to all users
          { 
            path: "dashboard",
            Component: DashboardComponent
          },
          // Routes available to admin only
          {
            path: "admin",
            loader: adminRoute,
            children: []
          },
          // Routes available to participants only
          {
            path: "participant",
            loader: participantRoute,
            children: [],
          },
          // Routes available to volunteers only
          {
            path: "volunteer",
            loader: volunteerRoute,
            children: [],
          }
        ]
      },
      { 
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login },
          { path: "signup", Component: Signup }
        ]
      },
      {
	path: "error",
	children: [
	  { path: ":statusCode", Component: ErrorPage }
	]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)