import { ContractId, AccountId } from "@hashgraph/sdk";
import { TokenId } from "@hashgraph/sdk";
import { ethers } from "ethers";
import { useEffect } from "react";
import { appConfig } from "../../../config";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";
import type { WalletInterface } from "../walletInterface";
import { useDispatch } from "react-redux";
import { setMetamaskAccountAddress } from "../../../redux/metamask/metamaskReducer";

const currentNetworkConfig = appConfig.networks.testnet;

const getMetamaskProvider = () => {
  const anyWindow = window as unknown;

  if (anyWindow.ethereum?.providers?.length) {
    // Si plusieurs wallets sont présents
    return anyWindow.ethereum.providers.find((p: unknown) => p.isMetaMask);
  }

  // Si un seul wallet est présent
  if (anyWindow.ethereum?.isMetaMask) {
    return anyWindow.ethereum;
  }

  throw new Error("Metamask is not installed or not detected.");
};

// eslint-disable-next-line react-refresh/only-export-components
export const switchToHederaNetwork = async () => {
  const ethereum = getMetamaskProvider();
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: currentNetworkConfig.chainId }],
    });
  } catch (error: unknown) {
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: `Hedera (${currentNetworkConfig.network})`,
              chainId: currentNetworkConfig.chainId,
              nativeCurrency: {
                name: "HBAR",
                symbol: "HBAR",
                decimals: 18,
              },
              rpcUrls: [currentNetworkConfig.jsonRpcUrl],
            },
          ],
        });
      } catch (addError) {
        console.error(addError);
      }
    }
    console.error(error);
  }
};

const { ethereum } = window as unknown;
const getProvider = () => {
  const ethereum = getMetamaskProvider();
  return new ethers.BrowserProvider(ethereum);
};

// eslint-disable-next-line react-refresh/only-export-components
export const connectToMetamask = async () => {
  const provider = getProvider();

  let accounts: string[] = [];

  try {
    await switchToHederaNetwork();
    accounts = await provider.send("eth_requestAccounts", []);
  } catch (error: unknown) {
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.warn("Please connect to Metamask.");
    } else {
      console.error(error);
    }
  }

  return accounts;
};

class MetaMaskWallet implements WalletInterface {
  private convertAccountIdToSolidityAddress(accountId: AccountId): string {
    const accountIdString =
      accountId.evmAddress !== null
        ? accountId.evmAddress.toString()
        : accountId.toSolidityAddress();

    return `0x${accountIdString}`;
  }
  async getClient() {
    return null;
  }
  // Purpose: Transfer HBAR
  // Returns: Promise<string>
  // Note: Use JSON RPC Relay to search by transaction hash
  async transferHBAR(toAddress: AccountId, amount: number) {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const tx = await signer.populateTransaction({
      to: this.convertAccountIdToSolidityAddress(toAddress),
      value: ethers.parseEther(amount.toString()),
    });
    try {
      const { hash } = await signer.sendTransaction(tx);
      await provider.waitForTransaction(hash);

      return hash;
    } catch (error: unknown) {
      console.warn(error.message ? error.message : error);
      return null;
    }
  }

  async transferFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    amount: number
  ) {
    const hash = await this.executeContractFunction(
      ContractId.fromString(tokenId.toString()),
      "transfer",
      new ContractFunctionParameterBuilder()
        .addParam({
          type: "address",
          name: "recipient",
          value: this.convertAccountIdToSolidityAddress(toAddress),
        })
        .addParam({
          type: "uint256",
          name: "amount",
          value: amount,
        }),
      appConfig.constants.METAMASK_GAS_LIMIT_TRANSFER_FT
    );

    return hash;
  }

  async transferNonFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    serialNumber: number
  ) {
    const provider = getProvider();
    const addresses = await provider.listAccounts();
    const hash = await this.executeContractFunction(
      ContractId.fromString(tokenId.toString()),
      "transferFrom",
      new ContractFunctionParameterBuilder()
        .addParam({
          type: "address",
          name: "from",
          value: addresses[0],
        })
        .addParam({
          type: "address",
          name: "to",
          value: this.convertAccountIdToSolidityAddress(toAddress),
        })
        .addParam({
          type: "uint256",
          name: "nftId",
          value: serialNumber,
        }),
      appConfig.constants.METAMASK_GAS_LIMIT_TRANSFER_NFT
    );

    return hash;
  }

  async associateToken(tokenId: TokenId) {
    // send the transaction
    // convert tokenId to contract id
    const hash = await this.executeContractFunction(
      ContractId.fromString(tokenId.toString()),
      "associate",
      new ContractFunctionParameterBuilder(),
      appConfig.constants.METAMASK_GAS_LIMIT_ASSOCIATE
    );

    return hash;
  }

  // Purpose: build contract execute transaction and send to hashconnect for signing and execution
  // Returns: Promise<TransactionId | null>
  async executeContractFunction(
    contractId: ContractId,
    functionName: string,
    functionParameters: ContractFunctionParameterBuilder,
    gasLimit: number
  ) {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const abi = [
      `function ${functionName}(${functionParameters.buildAbiFunctionParams()})`,
    ];

    // create contract instance for the contract id
    // to call the function, use contract[functionName](...functionParameters, ethersOverrides)
    const contract = new ethers.Contract(
      `0x${contractId.toSolidityAddress()}`,
      abi,
      signer
    );
    try {
      const txResult = await contract[functionName](
        ...functionParameters.buildEthersParams(),
        {
          gasLimit: gasLimit === -1 ? undefined : gasLimit,
        }
      );
      return txResult.hash;
    } catch (error: unknown) {
      console.warn(error.message ? error.message : error);
      return null;
    }
  }
  async createTopic(memo: string): Promise<string | null> {
    console.log("Impossible in Metamask", memo);
    return null;
  }

  async createMonetizedTopic(
    memo: string = "App Topic",
    feeAmount: number = 1 // 1 HBAR par défaut
  ): Promise<string | null> {
    console.log("Impossible in Metamask", memo, feeAmount);
    return null;
  }
  async storeMessageToTopic(
    topicId: string,
    payload: string
  ): Promise<string | null> {
    console.log("Impossible in Metamask", topicId, payload);
    return null;
  }

  /*async createTopic(memo: string): Promise<string | null> {
    try {
      // Utiliser un contrat intelligent qui crée des topics
      const topicFactoryContractId = ContractId.fromString(currentNetworkConfig.topicFactoryContractId);
      
      const hash = await this.executeContractFunction(
        topicFactoryContractId,
        'createTopic',
        new ContractFunctionParameterBuilder()
          .addParam({
            type: "string",
            name: "memo",
            value: memo
          }),
        appConfig.constants.METAMASK_GAS_LIMIT_TOPIC_CREATION
      );

      return hash;
    } catch (error) {
      console.error("Error creating topic via MetaMask:", error);
      return null;
    }
  }

  async createMonetizedTopic(
    memo: string = "App Topic", 
    feeAmount: number = 1
  ): Promise<string | null> {
    try {
      const topicFactoryContractId = ContractId.fromString(currentNetworkConfig.topicFactoryContractId);
      const feeCollectorAddress = this.convertAccountIdToSolidityAddress(
        AccountId.fromString(import.meta.env.VITE_HEDERA_ACCOUNT_ID)
      );

      const hash = await this.executeContractFunction(
        topicFactoryContractId,
        'createMonetizedTopic',
        new ContractFunctionParameterBuilder()
          .addParam({
            type: "string",
            name: "memo",
            value: memo
          })
          .addParam({
            type: "uint256",
            name: "feeAmount",
            value: ethers.parseEther(feeAmount.toString()).toString()
          })
          .addParam({
            type: "address",
            name: "feeCollector",
            value: feeCollectorAddress
          }),
        appConfig.constants.METAMASK_GAS_LIMIT_TOPIC_CREATION
      );

      return hash;
    } catch (error) {
      console.error("Error creating monetized topic via MetaMask:", error);
      return null;
    }
  }

  async storeMessageToTopic(
    topicId: string, 
    payload: string
  ): Promise<{ status: string; transactionId: string } | null> {
    try {
      const topicContractId = ContractId.fromString(topicId);
      
      const hash = await this.executeContractFunction(
        topicContractId,
        'submitMessage',
        new ContractFunctionParameterBuilder()
          .addParam({
            type: "string",
            name: "message",
            value: payload
          }),
        appConfig.constants.METAMASK_GAS_LIMIT_MESSAGE_SUBMIT
      );

      return hash ? { 
        status: "SUCCESS", 
        transactionId: hash 
      } : null;
    } catch (error) {
      console.error("Error storing message via MetaMask:", error);
      return null;
    }
  }*/
  disconnect() {
    alert("Please disconnect using the Metamask extension.");
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const metamaskWallet = new MetaMaskWallet();

export const MetaMaskClient = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // set the account address if already connected
    try {
      const provider = getProvider();
      provider.listAccounts().then((signers: unknown) => {
        if (signers.length !== 0) {
          dispatch(setMetamaskAccountAddress(signers[0]));
        } else {
          dispatch(setMetamaskAccountAddress(""));
        }
      });

      // listen for account changes and update the account address
      ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length !== 0) {
          dispatch(setMetamaskAccountAddress(accounts[0]));
        } else {
          dispatch(setMetamaskAccountAddress(""));
        }
      });

      // cleanup by removing listeners
      return () => {
        ethereum.removeAllListeners("accountsChanged");
      };
    } catch (error: unknown) {
      console.error(error.message ? error.message : error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMetamaskAccountAddress]);

  return null;
};
