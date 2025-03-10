# ChrossChainFaucet

## **Setup and Running the Application**

This project is fully containerized using **Docker and Docker Compose**, making it easy to set up the backend, frontend, and MongoDB with a single command.

### **Prerequisites**

Before running the application, ensure you have:
- [Docker](https://www.docker.com/) installed
- [Docker Compose](https://docs.docker.com/compose/) installed
- An **RPC provider endpoint** (e.g., from Infura, Alchemy, or a public Sepolia RPC)
- A deployed smart contract from the `/contracts` folder to a testnet (Sepolia recommended)

### **Setup Steps**

#### **1. Deploy the Smart Contract**
Before running the application, deploy the smart contract located in `/contracts` to the **Sepolia testnet**.
- Take note of the **contract address** after deployment, as it will be required in the backend `.env` file.

#### **2. Create the `.env` file for the Backend**
Navigate to the `/backend` folder and create a `.env` file:

```sh
cd backend
nano .env
```

Add the following variables to `.env`:

```ini
CONTRACT_ADDRESS="your_contract_address_here"
OWNER_PRIVATE_KEY="your_private_key_here"
RPC_PROVIDER="your_rpc_provider_url_here"
```

Replace `your_contract_address_here`, `your_private_key_here`, and `your_rpc_provider_url_here` with your actual values.

#### **3. Run Docker Compose**
Navigate to the root of the project and run:

```sh
docker-compose up --build
```

This will:
- Build and start the **backend** (`localhost:3001`)
- Build and start the **frontend** (`localhost:3000`)
- Set up **MongoDB** (`localhost:27017`)

#### **4. Verify Everything is Running**

- **Backend API:**
  ```sh
  curl http://localhost:3001/faucet
  ```

- **Frontend:** Open a browser and go to `http://localhost:3000`

- **MongoDB:** Connect using:
  ```sh
  mongo mongodb://localhost:27017
  ```
  Or use [MongoDB Compass](https://www.mongodb.com/products/compass) with the connection string:
  ```
  mongodb://localhost:27017
  ```

---

## **Running the Frontend**

No additional setup is required for the frontend as everything is handled automatically by Docker Compose. Once you run `docker-compose up --build`, the frontend will be available at:

```
http://localhost:3000
```

---

## **Extra Considerations**

Due to the time spent researching **smart contracts, deployments, Solidity, validators, delegators, wallets, and blockchain interactions**, no additional optimizations were implemented.

However, one potential enhancement considered was **storing the Ether address in the claims table** to allow for future cross-referencing.

Additionally, an alternative database schema was explored, where the claims table would be split into three tables:
- **Cosmos Address Table**: Stores Cosmos addresses and assigns them unique IDs.
- **Ethereum Address Table**: Stores Ethereum addresses and assigns them unique IDs.
- **Claims Table**: Links Cosmos IDs to Ethereum IDs to track claims.

The goal of this approach was to enable better analysis of **unique Cosmos vs. Ethereum addresses**, potentially identifying cases where multiple Cosmos wallets are used to funnel tokens into a single Ethereum wallet (abuse detection). However, this restructuring was ultimately scrapped due to time constraints.

---

## **Issues Encountered**

### **1. Merging Backend and Frontend in Next.js with Docker**
Originally, the backend and frontend were merged into a single folder, with **Next.js handling both the frontend and API routes**. This worked fine locally but became an issue when Docker was introduced. Docker expected both the Next.js frontend and the Express.js backend to be compiled, but the intended behavior was to compile only the backend TypeScript code. Due to a lack of experience with Docker, resolving this took around **two hours of debugging**. The final solution was to **split the frontend and backend into separate folders**.

### **2. Understanding Delegator Addresses for Simply Staking**
Initially, there was confusion about **what it meant for a delegator address to belong to Simply Staking**. The misunderstanding was that Simply Staking would own the delegator addresses, when in fact, these were addresses that had **delegated tokens to Simply Staking**. Once this concept was correctly understood, the implementation became much clearer.

### **3. Learning and Integrating MetaMask & Reown**
Before this task, **MetaMask was completely new**. Setting up MetaMask, understanding Reown, and figuring out how to interact with wallets was a challenge. After **several hours of research**, it was successfully implemented in the frontend. This even led to purchasing **real ETH** for personal use later on.

### **4. Deploying the Smart Contract**
Deploying the smart contract was **one of the biggest challenges**:
- **SepoliaETH Availability:** Many **faucets were empty** or required certain conditions to be met.
- **Mining for SepoliaETH:** A miner was run to generate enough SepoliaETH for deployment.
- **Wallet Sync Issues:** After struggling with transactions failing due to insufficient funds, it turned out there was **a desync between the browser and the wallet**. A simple **refresh** finally allowed the contract to be deployed.

### **5. Finding a Reliable JSON RPC Node**
Originally, a **public Sepolia RPC node** was used, but it kept **timing out** with `522 errors`. Eventually, an **Alchemy project** was created, and its **Sepolia endpoint** was used for improved reliability.

### **6. Balancing Work Commitments**
This task was challenging to complete due to **conflicting work commitments**:
- A **team member resigned**, adding extra workload.
- A **critical release** required after-hours debugging and fixes.
- Due to these constraints, an **extension until Monday was requested** to allow enough time to properly research and develop this full-stack application.

---

## **Explorer Transaction of a Claim**

To verify a successful claim, you can inspect transactions on the Sepolia testnet.

### **Example Transaction Hash**
One such transaction can be found here:
[Transaction on Sepolia Etherscan](https://sepolia.etherscan.io/tx/0x48b137bd7d8f31d460bc2d5b7be35ebf2d773d667957d5c7908ce0bcf881c178)

### **Checking Transactions in MongoDB**
If you wish to view transactions executed while running the application, open **MongoDB Compass** with the following connection URI:

```
mongodb://localhost:27017
```
There is no authentication required, making it easy for debugging and direct access to stored transaction data.

---

## UI Preview

### Landing Page
<img width="873" alt="image" src="https://github.com/user-attachments/assets/9ef4abe3-8863-4505-816d-e84927124ffb" />

### Delegation Analysis - Connecting ETH Wallet
<img width="932" alt="image" src="https://github.com/user-attachments/assets/0718716e-8812-4c64-bc95-f987365c6dcf" />
<img width="934" alt="image" src="https://github.com/user-attachments/assets/6462fa9c-b03b-4cb9-b8d1-80332c5b5979" />

### Delegation Analysis - Connecting CosmosHub & Accessing Faucet
<img width="931" alt="image" src="https://github.com/user-attachments/assets/b41c76ac-57d4-4dda-8031-0aa4799a8a1f" />

### Loader
<img width="823" alt="image" src="https://github.com/user-attachments/assets/a1edafac-1fc7-4965-8f63-db2726fbdcad" />

### Successful Transaction
<img width="902" alt="image" src="https://github.com/user-attachments/assets/5fdb126d-b7eb-4945-b104-44103388bb6b" />

### Error Messages / Rejected Requests

#### Not a Simply Staking Delegator
<img width="584" alt="image" src="https://github.com/user-attachments/assets/5cdf7c34-7eb6-4128-ace9-097670dd3bd2" />

#### 3 Requests Already Made in 24 Hours
<img width="537" alt="image" src="https://github.com/user-attachments/assets/7020f9bd-8bdd-442b-af5a-51f6ff9cb749" />

#### Request Already Made in 6 hours
<img width="547" alt="image" src="https://github.com/user-attachments/assets/71db5a65-87ca-47b0-90a9-823f358f0459" />

---

