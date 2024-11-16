import { SolidAuth } from "@solid-mediakit/auth";
import { authOpts } from "../../../auth";

export const { GET, POST } = SolidAuth(authOpts);
