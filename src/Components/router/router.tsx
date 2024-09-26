// src/Components/router/router.tsx

import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardLayout } from "../Layouts/DashboardLayout";
import { LoginFormComponent } from "../Forms/Login/LoginForm.component";
import { RegisterFormComponent } from "../Forms/Register/RegisterForm.component";
import { RegisterDataForm } from "../Forms/RegisterData/RegisterDataForm"; // Importa el componente

// Definir las rutas internas del Dashboard
export const dashboardRoutes = [
  {
    to: "/dashboard", 
    title: "Dashboard",
    description: "Panel de control",
    component: <div></div>, // Placeholder para la página principal
  },
  {
    to: "/login",
    title: "Login",
    description: "Iniciar sesión",
    component: <LoginFormComponent />, // Componente de Login
  },
  {
    to: "/register",
    title: "Register",
    description: "Crear cuenta",
    component: <RegisterFormComponent />,
  },
  {
    to: "/register-data", // Nueva ruta para RegisterDataForm
    title: "Register Data",
    description: "Registrar datos",
    component: <RegisterDataForm />, // Componente para mostrar
  },
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
