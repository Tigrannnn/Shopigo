require("dotenv").config();
const express = require("express");
const sequelize = require("./db/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const path = require("path");
const { getUploadDir } = require("./utils/storage");
const errorMiddleware = require("./middleware/errorMiddleware");
const models = require("./models");

const app = express();

app.get('/loaderio-560c4ce9cd09db5d90c5673eb2b5b861.txt', (req, res) => {
  res.send('loaderio-560c4ce9cd09db5d90c5673eb2b5b861');
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://shopigo-psi.vercel.app"],
    credentials: true,
  }),
);

app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(getUploadDir()));
app.use("/api", router);
app.use(errorMiddleware);

const syncDatabase = async () => {
  try {
    const shouldAlter = process.env.DB_SYNC_ALTER === "true";
    console.log(`DB_SYNC_ALTER is set to: ${shouldAlter}`);

    if (shouldAlter) {
      await sequelize.sync({ alter: true });
      console.log("Database synchronized with alter: true");
    } else {
      await sequelize.sync();
      console.log("Database synchronized");
    }
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

const start = async () => {
  await syncDatabase();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();

module.exports = app;
