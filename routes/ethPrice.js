/*
Mandatory Task 2:

Fetching and storing price of Ethereum in INR. The functionality of fetching the price is implemented on index.js page.

*/


import express from "express";
import { PRICES_COLLECTION } from "../helpers/collections.js";

const router = express.Router();

const fetchAndUpdateEthPrice = async (req, res) => {
  try {
    const priceResponse = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );

    if (!priceResponse.ok) {
      return res.status(500).json({ error: "Failed to fetch Ethereum price" });
    }

    const {
      ethereum: { inr: priceInINR },
    } = await priceResponse.json();

    await PRICES_COLLECTION.createIndex({ token: 1 }, { unique: true });
    await PRICES_COLLECTION.updateOne(
      { token: "Ethereum" },
      { $set: { priceInINR } },
      { upsert: true }
    );

    res.status(200).json({ priceInINR });
  } catch (error) {
    console.error("Error fetching and updating Ethereum price:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

router.get("/", fetchAndUpdateEthPrice);

export default router;
