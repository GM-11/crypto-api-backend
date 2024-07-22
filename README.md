
### Fetching and storing crypto transactions of a user.
Fetches and stores crypto transactions for a given user address. It accepts a body parameter address, fetches the corresponding crypto transactions, and stores them in the MongoDB database.  
Route: ```transactionData```

### Fetching price of Ethereum every 10 minutes.
A separate route to fetch the current price of Ethereum from an external API. The scheduled task to fetch the price every 10 minutes has been set up in the ```index.js``` file.  
Route: ```ethPrice```

### GET API for fetching Ether owned by user and current price of ethereum
Created a GET API endpoint that retrieves the total Ether owned by a user based on their transaction history, as well as the current price of Ethereum. The ether owned value is calculated by analyzing the user's transactions, and the current price is fetched from an external API.  
Route: ```userInfo```
