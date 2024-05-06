import express from "express";
import transactionData from "./routes/transactionData.js";

const app = express();

app.use(express.json());

app.use("/transactionData", transactionData);

const port = 3000;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
