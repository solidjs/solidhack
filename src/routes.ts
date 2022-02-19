import { lazy } from "solid-js";
import { RouteDefinition } from "solid-app-router";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./pages/Home")),
  },
  {
    path: "/rules",
    component: lazy(() => import("./pages/Rules")),
  },
  {
    path: "/prizes",
    component: lazy(() => import("./pages/Prizes")),
  },
  {
    path: "/submit",
    component: lazy(() => import("./pages/Submit")),
  },
];
