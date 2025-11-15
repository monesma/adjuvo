import { encryptObject } from "../../helpers/encryptObject";
import { useWalletInterface } from "../wallets/useWalletInterface";

interface StoreToTopic {
  companyId: string;
  receiverId: string;
  data: unknown;
  topicId: string;
}

export const useStoreMessageToTopic = () => {
  const { walletInterface } = useWalletInterface();

  const store = async ({ companyId, receiverId, data, topicId }: StoreToTopic) => {
    if (!walletInterface) {
      return {
        status: 500,
        error: "No wallet connected",
        content: null,
      };
    }

    if (!companyId || !receiverId || !data || !topicId) {
      return {
        status: 400,
        error: "Missing required fields (companyId, receiverId, data, topicId)",
        content: null,
      };
    }

    try {
      const encrypted = await encryptObject(data);

      const payload = JSON.stringify({
        companyId,
        receiverId,
        timestamp: new Date().toISOString(),
        encrypted: {
          iv: encrypted.iv,
          content: encrypted.content,
        },
      });

      const txStatus = await walletInterface.storeMessageToTopic(topicId, payload);
      if (txStatus && typeof txStatus === 'object' && 'status' in txStatus) {
        return {
          status: 200,
          error: null,
          content: {
            topicId,
            transactionStatus: txStatus.status,
            messageId: txStatus.transactionId
          }
        };
      } else {
        return {
          status: 500,
          error: "Transaction failed",
          content: null,
        };
      }
    } catch (err) {
      return {
        status: 500,
        error: err instanceof Error ? err.message : String(err),
        content: null,
      };
    }
  };

  return { store };
};