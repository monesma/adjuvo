import { useState } from "react";
import { useWalletInterface } from "../wallets/useWalletInterface"

export const useCreateTopic = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { walletInterface } = useWalletInterface();

  const createTopic = async (
    memo: string = "App Topic",
    feeAmount: number = 1 // 1 HBAR par défaut
  ): Promise<{
    status: number;
    error: string | null;
    content: { topicId: string | null } | null;
  }> => {
    setLoading(true);

    try {
      if (!walletInterface) {
        throw new Error("Wallet non connecté");
      }
      const topicId = await walletInterface.createMonetizedTopic(memo, feeAmount);
      return {
        status: 200,
        error: null,
        content: { topicId },
      };
    } catch (err) {
      console.log("err catch", err)
      return {
        status: 500,
        error: err instanceof Error ? err.message : String(err),
        content: null,
      };
    } finally {
      setLoading(false);
    }
  };

  return { createTopic, loading };
};