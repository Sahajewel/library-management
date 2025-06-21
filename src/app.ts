import express from "express";
import { booksRouter } from "./app/book/bookController";
import { borrowRouter } from "./app/borrow/borrowController";

const app = express();
app.use(express.json());


app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowRouter)
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
