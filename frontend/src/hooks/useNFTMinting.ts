import { useState } from "react";
import { NFTService } from "../services/hedera/NFTService";
import type {
  NFTReceiptData,
  NFTRewardData,
  NFTMintResult,
  DecodedReceiptMetadata,
  DecodedRewardMetadata,
} from "../types/nft-types";
import { AccountId, PrivateKey } from "@hashgraph/sdk";

interface UseNFTMintingReturn {
  mintPaymentReceipt: (data: NFTReceiptData) => Promise<NFTMintResult | null>;
  mintAchievementBadge: (data: NFTRewardData) => Promise<NFTMintResult | null>;
  decodeReceiptMetadata: (metadata: string) => DecodedReceiptMetadata | null;
  decodeRewardMetadata: (metadata: string) => DecodedRewardMetadata | null;
  getHashScanUrl: (tokenId: string, serialNumber: number) => string;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  clearStoredTokenIds: () => void;
}

export const useNFTMinting = (): UseNFTMintingReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateHederaCredentials = (): boolean => {
    try {
      const accountId = import.meta.env.VITE_HEDERA_ACCOUNT_ID;
      const privateKey = import.meta.env.VITE_HEDERA_PRIVATE_KEY;
      if (!accountId || !privateKey) throw new Error("Missing credentials");
      AccountId.fromString(accountId);
      PrivateKey.fromString(privateKey);
      return true;
    } catch {
      return false;
    }
  };

  const mintPaymentReceipt = async (
    data: NFTReceiptData
  ): Promise<NFTMintResult | null> => {
    setLoading(true);
    setError(null);
    try {
      if (!validateHederaCredentials())
        throw new Error("Invalid Hedera credentials");

      const nftService = new NFTService();
      let tokenId = localStorage.getItem("receipt_nft_token_id");
      if (!tokenId) {
        tokenId = await nftService.createReceiptNFTCollection();
        if (!tokenId) throw new Error("Failed to create NFT collection");
        localStorage.setItem("receipt_nft_token_id", tokenId);
      }

      const metadata = nftService.generateReceiptMetadata(data);
      console.log("🔍 Minting receipt NFT with token:", tokenId);
      const result = await nftService.mintNFT(tokenId, metadata);
      console.log("🔍 Receipt NFT result:", result);
      return result;
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
      console.error("❌ Error minting receipt NFT:", errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const mintAchievementBadge = async (
    data: NFTRewardData
  ): Promise<NFTMintResult | null> => {
    setLoading(true);
    setError(null);
    try {
      if (!validateHederaCredentials())
        throw new Error("Invalid Hedera credentials");

      const nftService = new NFTService();
      let tokenId = localStorage.getItem("reward_nft_token_id");
      if (!tokenId) {
        tokenId = await nftService.createRewardNFTCollection();
        if (!tokenId) throw new Error("Failed to create NFT collection");
        localStorage.setItem("reward_nft_token_id", tokenId);
      }

      const metadata = nftService.generateRewardMetadata(data);
      console.log("🔍 Minting reward NFT with token:", tokenId);
      const result = await nftService.mintNFT(tokenId, metadata);
      console.log("🔍 Reward NFT result:", result);
      return result;
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
      console.error("❌ Error minting reward NFT:", errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const decodeReceiptMetadata = (
    metadata: string
  ): DecodedReceiptMetadata | null => {
    const nftService = new NFTService();
    return nftService.decodeReceiptMetadata(metadata);
  };

  const decodeRewardMetadata = (
    metadata: string
  ): DecodedRewardMetadata | null => {
    const nftService = new NFTService();
    return nftService.decodeRewardMetadata(metadata);
  };

  const getHashScanUrl = (tokenId: string, serialNumber: number): string => {
    const nftService = new NFTService();
    return nftService.getHashScanUrl(tokenId, serialNumber);
  };

  const clearError = (): void => setError(null);
  const clearStoredTokenIds = (): void => {
    localStorage.removeItem("receipt_nft_token_id");
    localStorage.removeItem("reward_nft_token_id");
  };

  return {
    mintPaymentReceipt,
    mintAchievementBadge,
    decodeReceiptMetadata,
    decodeRewardMetadata,
    getHashScanUrl,
    loading,
    error,
    clearError,
    clearStoredTokenIds,
  };
};
