import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import path from "path";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import subUserRoutes from "./routes/subUserRoutes.js";
import permissionRoutes from "./routes/permissionRoutes.js";
import globalLinkRoutes from "./routes/Links Management/globalLinkRoutes.js";
import primaryLinkRoutes from "./routes/Links Management/primaryLinkRoutes.js";
import contentRoutes from "./routes/Content Management/contentRoutes.js";
import tenderRoutes from "./routes/Manage Application/tenderRoutes.js";
import officerProfileRouters from "./routes/Content Management/officerProfileRouters.js";
import documentRouters from "./routes/Manage Application/documentRouters.js";
import newsUpdateRouters from "./routes/Manage Application/newsUpdateRouters.js";
import importantLinkRouters from "./routes/Manage Application/importantLinkRouters.js";
import videoRoutes from "./routes/Manage Application/videoRouter.js";
import logoRoutes from "./routes/Manage Application/logoRouter.js";
import bannerRoutes from "./routes/Manage Application/bannerRouter.js";
import whatsNewRoutes from "./routes/Manage Application/whatsNewRouter.js";
import galleryRouters from "./routes/Manage Application/galleryRouters.js";
import feedbackRoutes from "./routes/Manage Application/feedbackRouter.js";
import achievementRoutes from "./routes/Manage Application/achievementRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();



connectDB();

const app = express(); // main thing
app.use(cors());
// app.use(cors({origin: 'https://websyetem.online'}));http://localhost:5000/
app.use(express.json()); // to accept json data

app.use("/api/notes", noteRoutes);
app.use("/api/officersprofiles", officerProfileRouters);
app.use("/api/users", userRoutes);
app.use("/api/subUsers", subUserRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/globallinks", globalLinkRoutes);
app.use("/api/primarylinks", primaryLinkRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/tenders", tenderRoutes);

// Manage Application
app.use("/api/documents", documentRouters);
app.use("/api/newsUpdates", newsUpdateRouters);
app.use("/api/importantLinks", importantLinkRouters);
app.use("/api/videos", videoRoutes);
app.use("/api/logos", logoRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/whatsNews", whatsNewRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/gallerys", galleryRouters);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);
