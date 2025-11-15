import { useCallback, useEffect } from "react";
import type { WalletInterface } from "../walletInterface";
import {
  AccountId,
  ContractExecuteTransaction,
  ContractId,
  LedgerId,
  TokenAssociateTransaction,
  TokenId,
  TransferTransaction,
  Client,
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
  TransactionId,
  CustomFixedFee,
} from "@hashgraph/sdk";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";
import { appConfig } from "../../../config";
import type { SignClientTypes } from "@walletconnect/types";
import {
  DAppConnector,
  HederaJsonRpcMethod,
  HederaSessionEvent,
  HederaChainId,
} from "@hashgraph/hedera-wallet-connect";
import EventEmitter from "events";
import { useDispatch } from "react-redux";
import {
  setAccountId,
  setIsConnected,
} from "../../../redux/walletConnect/walletConnectReducer";
import { Buffer } from "buffer";
const refreshEvent = new EventEmitter();

const walletConnectProjectId = "62269f64a1ff47be7a6cde82fb2518ca";
const currentNetworkConfig = appConfig.networks.testnet;
const hederaNetwork = currentNetworkConfig.network;
const hederaClient = Client.forName(hederaNetwork);

const metadata: SignClientTypes.Metadata = {
  name: "ARZE technologies",
  description: "Your contributions, forever on the Hashgraph.",
  url: window.location.origin,
  icons: [window.location.origin + "/public/arze.svg"],
};

const dappConnector = new DAppConnector(
  metadata,
  LedgerId.fromString(hederaNetwork),
  walletConnectProjectId,
  Object.values(HederaJsonRpcMethod),
  [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
  [HederaChainId.Testnet]
);

let walletConnectInitPromise: Promise<void> | undefined = undefined;
const initializeWalletConnect = async () => {
  if (walletConnectInitPromise === undefined) {
    walletConnectInitPromise = dappConnector.init();
  }
  await walletConnectInitPromise;
};

// eslint-disable-next-line react-refresh/only-export-components
export const openWalletConnectModal = async () => {
  try {
    await initializeWalletConnect();

    await dappConnector.openModal();

    refreshEvent.emit("sync");
  } catch (error) {
    console.error("Error during openWalletConnectModal:", error);
  }
};

class WalletConnectWallet implements WalletInterface {
  private getSigner() {
    if (dappConnector.signers.length === 0) {
      throw new Error("No signers found!");
    }
    return dappConnector.signers[0];
  }

  private getAccountId() {
    return AccountId.fromString(this.getSigner().getAccountId().toString());
  }

  private getEnvWalletClient(): Client {
    const accountId = import.meta.env.VITE_HEDERA_ACCOUNT_ID;
    const privateKey = import.meta.env.VITE_HEDERA_PRIVATE_KEY;

    if (!accountId || !privateKey) {
      throw new Error(
        "Les variables d'environnement pour le wallet de collecte sont manquantes"
      );
    }

    return Client.forTestnet().setOperator(accountId, privateKey);
  }

  async transferHBAR(toAddress: AccountId, amount: number) {
    const transferHBARTransaction = new TransferTransaction()
      .addHbarTransfer(this.getAccountId(), -amount)
      .addHbarTransfer(toAddress, amount);

    const signer = this.getSigner();
    await transferHBARTransaction.freezeWithSigner(signer);
    const txResult = await transferHBARTransaction.executeWithSigner(signer);
    return txResult ? txResult.transactionId : null;
  }

  async transferFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    amount: number
  ) {
    const transferTokenTransaction = new TransferTransaction()
      .addTokenTransfer(tokenId, this.getAccountId(), -amount)
      .addTokenTransfer(tokenId, toAddress.toString(), amount);
    const signer = this.getSigner();
    await transferTokenTransaction.freezeWithSigner(signer);
    const txResult = await transferTokenTransaction.executeWithSigner(signer);
    return txResult ? txResult.transactionId : null;
  }

  async transferNonFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    serialNumber: number
  ) {
    const transferTokenTransaction = new TransferTransaction().addNftTransfer(
      tokenId,
      serialNumber,
      this.getAccountId(),
      toAddress
    );

    const signer = this.getSigner();
    await transferTokenTransaction.freezeWithSigner(signer);
    const txResult = await transferTokenTransaction.executeWithSigner(signer);
    return txResult ? txResult.transactionId : null;
  }

  async associateToken(tokenId: TokenId) {
    const associateTokenTransaction = new TokenAssociateTransaction()
      .setAccountId(this.getAccountId())
      .setTokenIds([tokenId]);

    const signer = this.getSigner();
    await associateTokenTransaction.freezeWithSigner(signer);
    const txResult = await associateTokenTransaction.executeWithSigner(signer);
    return txResult ? txResult.transactionId : null;
  }

  async executeContractFunction(
    contractId: ContractId,
    functionName: string,
    functionParameters: ContractFunctionParameterBuilder,
    gasLimit: number
  ) {
    const tx = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(gasLimit)
      .setFunction(functionName, functionParameters.buildHAPIParams());

    const signer = this.getSigner();
    await tx.freezeWithSigner(signer);
    const txResult = await tx.executeWithSigner(signer);

    return txResult ? txResult.transactionId : null;
  }

  async createTopic(memo: string): Promise<string | null> {
    try {
      const transaction = new TopicCreateTransaction().setTopicMemo(memo);
      const signer = this.getSigner();
      await transaction.freezeWithSigner(signer);
      const txResponse = await transaction.executeWithSigner(signer);
      const receipt = await txResponse.getReceipt(hederaClient);
      const topicId = receipt.topicId;

      return topicId ? topicId.toString() : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async createMonetizedTopic(
    memo: string = "App Topic",
    feeAmount: number = 1 // 1 HBAR par défaut
  ): Promise<string | null> {
    try {
      const envClient = this.getEnvWalletClient();
      const feeCollectorId = envClient.operatorAccountId;
      if (!feeCollectorId) {
        throw new Error("Impossible de déterminer le compte collecteur");
      }
      const customFee = new CustomFixedFee()
        .setAmount(feeAmount)
        .setFeeCollectorAccountId(feeCollectorId);

      const transaction = new TopicCreateTransaction()
        .setTopicMemo(memo)
        .setCustomFees([customFee]);

      const signer = this.getSigner();
      await transaction.freezeWithSigner(signer);
      const txResponse = await transaction.executeWithSigner(signer);
      const receipt = await txResponse.getReceipt(hederaClient);

      return receipt.topicId?.toString() || null;
    } catch (error) {
      console.error("Erreur création topic monétisé:", error);
      return null;
    }
  }

  async storeMessageToTopic(
    topicId: string,
    payload: string
  ): Promise<{ status: string; transactionId: TransactionId } | null> {
    try {
      const tx = new TopicMessageSubmitTransaction()
        .setTopicId(topicId)
        .setMessage(Buffer.from(payload));

      const signer = this.getSigner();

      await tx.freezeWithSigner(signer);
      const response = await tx.executeWithSigner(signer);
      const receipt = await response.getReceipt(hederaClient);

      return {
        status: receipt.status.toString(),
        transactionId: response.transactionId,
      };
    } catch (err) {
      console.error("Failed to store message to topic:", err);
      return null;
    }
  }

  disconnect() {
    dappConnector.disconnectAll().then(() => {
      refreshEvent.emit("sync");
    });
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const walletConnectWallet = new WalletConnectWallet();

export const WalletConnectClient = () => {
  const dispatch = useDispatch();

  const syncWithWalletConnectContext = useCallback(() => {
    const accountId = dappConnector.signers[0]?.getAccountId()?.toString();
    if (accountId) {
      dispatch(setAccountId(accountId));
      dispatch(setIsConnected(true));
    } else {
      dispatch(setAccountId(""));
      dispatch(setIsConnected(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAccountId, setIsConnected]);

  useEffect(() => {
    refreshEvent.addListener("sync", syncWithWalletConnectContext);

    initializeWalletConnect().then(() => {
      syncWithWalletConnectContext();
    });

    return () => {
      refreshEvent.removeListener("sync", syncWithWalletConnectContext);
    };
  }, [syncWithWalletConnectContext]);
  return null;
};
