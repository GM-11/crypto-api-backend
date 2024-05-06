/*
Mandatory Task 1:

Fetching and storing the list of transactions of a user
*/


import express from "express";
import dotenv from "dotenv";
import { TRANSACTION_DATA_COLLECTION } from "../helpers/collections.js";

dotenv.config;
const router = express.Router();

const fetchAndStoreTransactions = async (req, res) => {
  const { address } = req.body;

  if (!address || !address.startsWith("0x")) {
    return res.status(400).send("Invalid Ethereum Address");
  }

  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.API_KEY}`
    );

    if (!response.ok) {
      return res.status(500).send("Failed to fetch transaction data");
    }

    const responseJson = await response.json();
    const transactions = responseJson.result;

    await TRANSACTION_DATA_COLLECTION.createIndex(
      { address: 1 },
      { unique: true }
    );
    await TRANSACTION_DATA_COLLECTION.updateOne(
      { address },
      { $set: { address, transactions } },
      { upsert: true }
    );

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching and storing transaction data:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.get("/", fetchAndStoreTransactions);

export default router;
