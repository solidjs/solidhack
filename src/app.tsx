import { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { SessionProvider } from "@solid-mediakit/auth/client";
import { Nav } from "./components/Nav";

import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <SessionProvider>
          <Suspense>
            <Nav />
            {props.children}
          </Suspense>
        </SessionProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
