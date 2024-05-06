import express from "express";
import path from "path";
import transactionData from "./routes/transactionData.js";
import ethPrice from "./routes/ethPrice.js";
import userInfo from "./routes/userInfo.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/transactionData", transactionData);
app.use("/ethPrice", ethPrice);
app.use("/userInfo", userInfo);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const fetchPriceEvery10mins = async () => {
  const fetchURL = `http://localhost:${port}/ethPrice`;

  await fetch(fetchURL, {
    method: "GET",
    headers: {
      "Content-Type": "applications/json",
    },
  });
};

setInterval(fetchPriceEvery10mins, 1000 * 60 * 10); // 10 minutes

const port = 3000;

export default app.listen(port, () => {
  console.log(`Server started`);
});
