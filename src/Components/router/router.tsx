// src/routes.tsx

import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardLayout } from "../Layouts/DashboardLayout";
import { LoginFormComponent } from "../Forms/Login/LoginForm.component";
import { RegisterFormComponent } from "../Forms/Register/RegisterForm.component";

// Definir las rutas internas del Dashboard
export const dashboardRoutes = [
  {
    to: "/dashboard", 
    title: "Dashboard",
    description: "Panel de control",
    component: <div>Welcome to the Dashboard!</div>, // Placeholder para la página principal
  },
  {
    to: "/login",
    title: "Login",
    description: "Iniciar sesión",
    component: <LoginFormComponent />,
  },
  {
    to: "/register",
    title: "Register",
    description: "Crear cuenta",
    component: <RegisterFormComponent />,
  },
  // Puedes añadir más rutas dentro del dashboard aquí
];

// Configurar las rutas de la aplicación
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />, // Mostrar siempre el DashboardLayout
    children: [
      ...dashboardRoutes.map((route) => ({
        path: route.to.replace("/", ""), // Convertir a rutas hijas
        element: route.component,
      })),
      {
        path: "",
        element: <Navigate to="/dashboard" />, // Redirigir al dashboard por defecto
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />, // Redirigir al dashboard si no existe la ruta
  },
]);
