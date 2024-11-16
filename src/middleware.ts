import { authMiddleware } from "@solid-mediakit/auth";
import { createMiddleware } from "@solidjs/start/middleware";
import { authOpts } from "./auth";

const pathsToPreload = ["/"];

export default createMiddleware({
  onRequest: [authMiddleware(pathsToPreload, authOpts)],
});
