import { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { SessionProvider } from "@solid-mediakit/auth/client";

import "./app.css";
import { Nav } from "./components/Nav";

export default function App() {
  return (
    <Router
      root={(props) => (
        <Suspense>
          <Nav />
          <SessionProvider>{props.children}</SessionProvider>
        </Suspense>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
