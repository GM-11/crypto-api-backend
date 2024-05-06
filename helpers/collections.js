import client from "./mongoClient.js";

const DATABASE_NAME = "DATABASE";

export const TRANSACTION_DATA_COLLECTION = client
  .db(DATABASE_NAME)
  .collection("transactionData");

export const PRICES_COLLECTION = client.db(DATABASE_NAME).collection("prices");
