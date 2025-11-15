# Adjuvo Front-End

Welcome to the **Adjuvo Front-End**!  
This project is built with **Vite.js**, **React**, **TypeScript**, **Tailwind CSS**, and follows **Atomic Design** principles.

It connects to the **Hedera Hashgraph** network for Web3 functionalities and mission management.

---

## Features

- **Web3 Integration**:
  - WalletConnect for connecting different Hedera wallets
  - Hedera SDK for storing and retrieving data on the Hashgraph
  - Transaction creation for missions
  - NFT generation
  - HIP-991 for generating cashflows

- **Front-End Stack**:
  - Vite.js + React + TypeScript
  - Tailwind CSS for styling
  - Atomic Design structure (Atoms, Molecules, Organisms, Templates, Pages)

---

## Getting Started

1. Install dependencies:
```npm install```

2. Run the development server:

```npm run dev```

Environment Variables

Create a .env file in the root directory with the following variables:

```
VITE_PRIVATE_KEY=
VITE_MY_ACCOUNT_ID=
VITE_PUBLIC_KEY=
VITE_LS_TOKEN_KEY=adjuvo-token
VITE_LS_ROLE_KEY=adjuvo-role
VITE_HEDERA_ACCOUNT_ID=
VITE_HEDERA_PRIVATE_KEY=
VITE_CONTRACT_SECRET_KEY=
VITE_CONTRACT_ALGORITHM=aes-256-cbc
VITE_CONTRACT_IV_LENGTH=16
VITE_API_URL=YOUR_API_URL
```

These variables are required for Hedera wallet integration, API connection, local storage, and contract encryption.

Notes

Make sure your Hedera wallet is connected using WalletConnect.

You need Hedera account keys to interact with the Hashgraph and perform transactions.

This project focuses on Web3 missions, NFTs, and community interactions.
