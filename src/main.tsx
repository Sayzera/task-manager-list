import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layouts/dashboard.tsx";
import TaskManager from "./pages/task-manager/index.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

const router = createBrowserRouter([
  {
    Component: App, // root layout route
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "",
            Component: () => <TaskManager />,
          },
          {
            path: "/task-manager",
            Component: () => <TaskManager />,
          },
          {
            path: "/dashboard",
            Component: () => <TaskManager />,
          },
          {
            path: "/reports",
            Component: () => <TaskManager />,
          },
          {
            path: "/messages",
            Component: () => <TaskManager />,
          },
          {
            path: "/mega-menu",
            Component: () => <TaskManager />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
