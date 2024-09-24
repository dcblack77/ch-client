// src/routes.tsx

import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from './Components/DashboardLayout'; // Asegúrate de crear este componente
import LoginForm from './Components/Forms/Login/LoginForm';
import RegisterForm from './Components/Forms/Register/RegisterForm'; // Componente de registro

// Definir las rutas del menú
export const menuRoutes = [
  {
    to: "/dashboard", // Asegúrate de que esto coincida con el path en el DashboardLayout
    title: "Dashboard",
    description: "Panel de control",
    component: <DashboardLayout /> // Puedes usar este componente para la ruta del dashboard
  },
  {
    to: "/register",
    title: "Register",
    description: "Crear cuenta",
    component: <RegisterForm />
  },
  {
    to: "/login",
    title: "Login",
    description: "Iniciar sesión",
    component: <LoginForm />
  },
  // Puedes añadir más rutas aquí
];

// Configurar las rutas de la aplicación
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />, // Redirigir a la página de login
  },
  {
    path: "/login",
    element: <LoginForm />, // Componente para la página de login
  },
  {
    path: "/register",
    element: <RegisterForm />, // Componente para la página de registro
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />, // Componente del Dashboard
    children: [
      ...menuRoutes.map((route) => ({
        path: route.to.replace('/', ''), // Reemplazamos '/' para que coincidan con las rutas hijas
        element: route.component
      })),
      {
        path: "",
        element: <Navigate to={menuRoutes[0].to} />, // Redirigir a la primera ruta del menú
      },
    ]
  },
  {
    path: "*",
    element: <Navigate to="/login" />, // Redirigir a la página de login si la ruta no existe
  }
]);



















// import { /* Navigate,*/ createBrowserRouter } from "react-router-dom";

// export const menuRoutes = [
//   /* 
//   TODO: Define your routes here
//   EXAMPLES:
  
//   {
//     to: "/orthography",
//     icon: "fa-solid fa-spell-check",
//     title: "Ortografía",
//     description: "Corregir ortografía",
//     component: <OrthographyPage />
//   },
//   {
//     to: "/pros-cons",
//     icon: "fa-solid fa-code-compare",
//     title: "Pros & Cons",
//     description: "Comparar pros y contras",
//     component: <ProsConsPage />
//   },
//   {
//     to: "/pros-cons-stream",
//     icon: "fa-solid fa-water",
//     title: "Como stream",
//     description: "Con stream de mensajes",
//     component: <ProsConsStreamPage />
//   },
//   {
//     to: "/translate",
//     icon: "fa-solid fa-language",
//     title: "Traducir",
//     description: "Textos a otros idiomas",
//     component: <TranslatePage />
//   },
//   {
//     to: "/text-to-audio",
//     icon: "fa-solid fa-podcast",
//     title: "Texto a audio",
//     description: "Convertir texto a audio",
//     component: <TextToAudioPage />
//   },
//   {
//     to: "/image-generation",
//     icon: "fa-solid fa-image",
//     title: "Imágenes",
//     description: "Generar imágenes",
//     component: <ImageGenerationPage />
//   },
//   {
//     to: "/image-tunning",
//     icon: "fa-solid fa-wand-magic",
//     title: "Editar imagen",
//     description: "Generación continua",
//     component: <ImageTunningPage />
//   },
//   {
//     to: "/audio-to-text",
//     icon: "fa-solid fa-comment-dots",
//     title: "Audio a texto",
//     description: "Convertir audio a texto",
//     component: <AudioToTextPage />
//   },
//   {
//     to: "/assistant",
//     icon: "fa-solid fa-user",
//     title: "Asistente",
//     description: "Información del asistente",
//     component: <AssistantPage />
//   }, */
// ];


// export const routes = createBrowserRouter([
//   /* {
//     path: "/",
//     element: <DashboardLayout />, // TODO: Create DashboardLayout component
//     children: [
//       ...menuRoutes.map((route) => ({
//         path: route.to,
//         element: route.component
//       })),
//       {
//         path: "",
//         element: <Navigate to={ menuRoutes[0].to }/>
//       }
//     ]
//   } */
// ])