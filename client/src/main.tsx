import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"
import './index.css'

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard"

const router = createBrowserRouter([
  {
    path: "/",
    // TODO: Navbar layout
    // TODO: 'Middleware' for conditional routing (use loader)
    children: [
      { index: true, Component: AdminDashboard }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
