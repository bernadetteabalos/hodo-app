const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const boardsRouter = require("./routes/boards");
const app = express();

const db = require("./db");
const dbHelpers = require("./helpers/dbHelpers")(db);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter(dbHelpers));
app.use("/api/boards", boardsRouter(dbHelpers));
app.use("/", indexRouter);
// app.use("/users", usersRouter);

module.exports = app;
