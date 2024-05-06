# KoinX Assignment - Blockchain+Backend Intern

This repository contains the completed assignment for the Blockchain+Backend Intern role at KoinX. The assignment is implemented as an Express.js API backend. All tasks have been successfully completed, and the API has been deployed for public access, demonstrating a production-ready solution.


## Mandatory Tasks
Their code is available in the routes folder

### Task 1: Fetching and storing crypto transactions of a user.
This task involves fetching and storing crypto transactions for a given user address. It accepts a body parameter address, fetches the corresponding crypto transactions, and stores them in the MongoDB database.  
Route: ```transactionData```

### Task 2: Fetching price of Ethereum every 10 minutes.
A separate route has been implemented to fetch the current price of Ethereum from an external API. The scheduled task to fetch the price every 10 minutes has been set up in the ```index.js``` file.  
Route: ```ethPrice```

### Task 3: GET API for fetching Ether owned by user and current price of ethereum
This task involves creating a GET API endpoint that retrieves the total Ether owned by a user based on their transaction history, as well as the current price of Ethereum. The ether owned value is calculated by analyzing the user's transactions, and the current price is fetched from an external API.  
Route: ```userInfo```

## Optional Tasks
All the optional tasks have been completed.

### Deploying the database.
MongoDB Atlas has been used and has been deployed.

### Deploying the backend
The express.js backend has been deployed on [**Render**](https://render.com) platform due to it's easy to use and free deployment plans.  


Link for the API: [https://koinx-assignment-x2zh.onrender.com](https://koinx-assignment-x2zh.onrender.com)