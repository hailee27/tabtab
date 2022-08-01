import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Admin from "@/pages/Admin";
import Card from "@/pages/Card";
import Error from "@/pages/Error";

import { AuthLayout } from "@/layout";

// const Admin = lazy(() => import("../pages/Admin"));
export const publishRoute = [
  { path: "/", component: Home },
  { path: "/login", component: Login, layout: AuthLayout },
  { path: "/register", component: Register, layout: AuthLayout },
  { path: "/:username", component: Profile, layout: null },
  { path: "*", component: Error, layout: null },
];
export const privateRoute = [
  { path: "/admin", component: Admin, layout: AuthLayout },
  { path: "/admin/card", component: Card, layout: AuthLayout },
  { path: "*", component: Error, layout: null },
];
