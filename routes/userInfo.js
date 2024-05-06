/*
Mandatory Task 3:

Fetching the current price of ethereum and value of ethereum held by the user.
*/
import express from "express";
import { TRANSACTION_DATA_COLLECTION } from "../helpers/collections.js";

const router = express.Router();

const getUserInfo = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address || !address.startsWith("0x")) {
      return res.status(400).send("Invalid Ethereum Address");
    }

    const priceResponse = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );
    const {
      ethereum: { inr: ethPrice },
    } = await priceResponse.json();

    const addressExists = await TRANSACTION_DATA_COLLECTION.findOne({
      address,
    });

    let transactions;
    if (addressExists) {
      transactions = addressExists.transactions;
    } else {
      const transactionsResponse = await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=B3GH9BRKNNGTB4RG7PAW4QRB4QQRZ1XD3T`
      );
      transactions = (await transactionsResponse.json()).result;
    }

    const value = transactions.reduce((acc, tx) => {
      const txValue = parseInt(BigInt(tx.value).toString());
      const gasUsed = parseInt(BigInt(tx.gasUsed).toString());
      const addressLowerCase = address.toLowerCase();

      return tx.to.toLowerCase() === addressLowerCase
        ? acc + txValue
        : acc - (txValue + gasUsed);
    }, 0);
    res.status(200).json({ ethPrice, value: value / 10 ** 18 });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

router.get("/", getUserInfo);

export default router;
