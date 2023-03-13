import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { dbConnect } from "./mongo/dbConnection.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(morgan("combined"));
import articleRoute from "./routes/article.route.js";

dbConnect();

app.use("/article", articleRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server connected successfully on port ${process.env.PORT}`);
});
2;
