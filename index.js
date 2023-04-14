import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { UserRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.M_URL;
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
})
app.use("/auth", UserRouter);
app.use("/recipes", recipesRouter);

// Serve static files from the React build directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

mongoose.connect(`${dbUrl}`,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.log('MongoDB connection error: ', err);
});

app.listen(port, () => console.log(`SERVER STARTED ${port}`));
