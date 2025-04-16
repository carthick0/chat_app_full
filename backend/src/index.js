import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

import path from "path";
dotenv.config();
const __dirname = path.resolve();
// ✅ Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

const origins = [
  "http://localhost:5173",
  "https://chat-app-full-git-main-carthick0s-projects.vercel.app",
  "https://chat-app-full-seven.vercel.app",
  "https://chat-app-full-nupfn0ym3-carthick0s-projects.vercel.app/signup",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Database Connection
connectDB();

const PORT = process.env.PORT;
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
