import app from "../server/src/index";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
