import express, { Application } from "express";
import booksRouter from "./app/book/bookController";
import borrowRouter from "./app/borrow/borrowController";

const app: Application = express();
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
