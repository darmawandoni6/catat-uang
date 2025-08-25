import type { Request, Response } from "express";
import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";

import { prisma } from "@config/prisma";
import { errorHandler, methodNotAllowed } from "@middleware/error-middleware";

import { routes as routesGoogle } from "./features/auth/auth-route";
import { routes as routesMe } from "./features/me/me-route";
import { routes as routesTransaction } from "./features/transactions/transaction-route";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.URL_CLIENT,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan(
      (tokens, req, res) => {
        return JSON.stringify({
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: Number(tokens.status(req, res)),
          response_time: Number(tokens["response-time"](req, res)),
          timestamp: new Date().toISOString(),
        });
      },
      {
        skip: (req) => !req.url.startsWith("/api"), // Hanya log request yang mulai dengan /api
      }
    )
  );
}
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript 🚀" });
});

app.use("/api", routesGoogle);
app.use("/api", routesTransaction);
app.use("/api", routesMe);

app.use("/api", methodNotAllowed);
app.use("/api", errorHandler);

// if (process.env.NODE_ENV !== "development") {
//   app.use(express.static(path.join(__dirname, "../client")));
//   // fallback ke index.html (SPA routing)
//   app.get("*", (req, res) => {
//     // Kirim index.html untuk SPA route
//     res.sendFile(path.join(__dirname, "../client/index.html"));
//   });
// }
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;

const shutdown = async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
};
process.on("SIGINT", shutdown); // Handling Ctrl + C
process.on("SIGTERM", shutdown); //
