import {
  TokenCreateTransaction,
  TokenMintTransaction,
  TokenNftInfoQuery,
  TokenType,
  TokenSupplyType,
  AccountId,
  PrivateKey,
  Client,
  Transaction,
  Hbar,
  TransactionResponse,
  TransactionReceipt,
  NftId,
} from "@hashgraph/sdk";

import type {
  NFTReceiptData,
  NFTRewardData,
  NFTMintResult,
  DecodedReceiptMetadata,
  DecodedRewardMetadata,
  NFTInfo,
} from "../../types/nft-types";

interface ExecutionResult {
  txResponse: TransactionResponse;
  receipt: TransactionReceipt;
}

interface RewardTypeMap {
  [key: string]: number;
}

interface ReverseRewardTypeMap {
  [key: number]: string;
}

export class NFTService {
  private client: Client;
  private operatorId: AccountId;
  private operatorKey: PrivateKey;

  constructor() {
    const accountId = import.meta.env.VITE_HEDERA_ACCOUNT_ID;
    const privateKey = import.meta.env.VITE_HEDERA_PRIVATE_KEY;

    if (!accountId || !privateKey)
      throw new Error("Hedera credentials missing");

    this.operatorId = AccountId.fromString(accountId);
    this.operatorKey = PrivateKey.fromString(privateKey);

    this.client = Client.forTestnet();
    this.client.setOperator(this.operatorId, this.operatorKey);
  }

  private async executeTransaction(
    transaction: Transaction
  ): Promise<ExecutionResult> {
    const frozenTx = await transaction.freezeWith(this.client);
    const signedTx = await frozenTx.sign(this.operatorKey);
    const txResponse = await signedTx.execute(this.client);
    const receipt = await txResponse.getReceipt(this.client);
    return { txResponse, receipt };
  }

  async createReceiptNFTCollection(): Promise<string | null> {
    try {
      const tx = new TokenCreateTransaction()
        .setTokenName("Mission Payment Receipts")
        .setTokenSymbol("MPR")
        .setTokenType(TokenType.NonFungibleUnique)
        .setTreasuryAccountId(this.operatorId)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(10000)
        .setSupplyKey(this.operatorKey)
        .setAdminKey(this.operatorKey)
        .setTokenMemo("NFT receipts for mission payments")
        .setMaxTransactionFee(new Hbar(10));

      const { receipt } = await this.executeTransaction(tx);
      const tokenId = receipt.tokenId?.toString() ?? null;
      if (tokenId) console.log("✅ Receipt NFT collection created:", tokenId);
      return tokenId;
    } catch (err: unknown) {
      console.error("❌ Error creating receipt NFT collection:", err);
      return null;
    }
  }

  async createRewardNFTCollection(): Promise<string | null> {
    try {
      const tx = new TokenCreateTransaction()
        .setTokenName("Builder Achievement Badges")
        .setTokenSymbol("BAB")
        .setTokenType(TokenType.NonFungibleUnique)
        .setTreasuryAccountId(this.operatorId)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(5000)
        .setSupplyKey(this.operatorKey)
        .setAdminKey(this.operatorKey)
        .setTokenMemo("NFT badges for builder achievements")
        .setMaxTransactionFee(new Hbar(10));

      const { receipt } = await this.executeTransaction(tx);
      const tokenId = receipt.tokenId?.toString() ?? null;
      if (tokenId) console.log("✅ Reward NFT collection created:", tokenId);
      return tokenId;
    } catch (err: unknown) {
      console.error("❌ Error creating reward NFT collection:", err);
      return null;
    }
  }

  private extractNumericId(id: string): number {
    if (!id) return 0;

    const hederaMatch = id.match(/0\.0\.(\d+)/);
    if (hederaMatch) {
      return parseInt(hederaMatch[1]);
    }

    if (id.length === 24 && /^[0-9a-fA-F]+$/.test(id)) {
      const hexPart = id.slice(0, 6);
      return parseInt(hexPart, 16);
    }

    if (id.startsWith("0x")) {
      const hexPart = id.slice(2, 8);
      return parseInt(hexPart, 16) || 0;
    }

    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      const char = id.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash) % 100000;
  }

  private extractTransactionNumericId(txHash: string): number {
    if (!txHash) return 0;

    const formats = [/0\.0\.(\d+)@/, /0\.0\.(\d+)/, /(\d+)@/];

    for (const regex of formats) {
      const match = txHash.match(regex);
      if (match) {
        return parseInt(match[1]);
      }
    }

    let hash = 0;
    for (let i = 0; i < txHash.length; i++) {
      const char = txHash.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash) % 100000;
  }

  generateReceiptMetadata(data: NFTReceiptData): string {
    const fromValue =
      data.from === "unknown" ? this.operatorId.toString() : data.from;

    const buffer = new ArrayBuffer(50);
    const view = new DataView(buffer);

    view.setUint16(0, Math.floor(data.amount * 100), true); // Montant sur 2 bytes (max 655.35 HBAR)
    view.setUint32(2, Math.floor(data.timestamp / 1000), true);
    view.setUint8(6, 1);
    view.setUint8(7, 1);

    this.storeCompactString(view, 8, data.missionId.slice(0, 12), 12);

    const fromNumber = fromValue.replace("0.0.", "");
    this.storeCompactString(view, 20, fromNumber, 8);

    const toNumber = data.to.replace("0.0.", "");
    this.storeCompactString(view, 28, toNumber, 8);

    const shortTx = data.transactionHash.slice(0, 14);
    this.storeCompactString(view, 36, shortTx, 14);

    const bytes = new Uint8Array(buffer);

    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    const base64 = btoa(binary);

    if (base64.length > 100) {
      console.error("❌ Metadata trop grande même en format compact!");
      return this.generateMinimalReceiptMetadata(data);
    }

    return base64;
  }

  generateRewardMetadata(data: NFTRewardData): string {
    const missionId = this.extractNumericId(data.missionId);
    const timestamp = Math.floor(data.timestamp / 1000);

    const rewardTypeMap: RewardTypeMap = {
      completion: 1,
      quality: 2,
      speed: 3,
      innovation: 4,
    };

    const rewardTypeCode = rewardTypeMap[data.rewardType] || 0;

    const buffer = new ArrayBuffer(64);
    const view = new DataView(buffer);

    view.setUint32(0, missionId, true);
    view.setUint8(4, rewardTypeCode);
    view.setUint8(5, data.level);
    view.setUint32(6, this.hashString(data.appName), true);
    view.setUint32(10, this.hashString(data.builderName), true);

    view.setUint32(14, timestamp, true);
    view.setUint8(18, 1);

    const missionDisplay =
      data.missionId.length > 12
        ? data.missionId.slice(0, 9) + "..."
        : data.missionId;
    this.storeCompactString(view, 19, missionDisplay, 12);

    this.storeCompactString(view, 31, data.appName, 17);

    this.storeCompactString(view, 48, data.builderName, 16);

    const bytes = new Uint8Array(buffer);
    if (bytes.length > 100) {
      console.warn("⚠️  Metadata reward trop grande");
    }

    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    const base64 = btoa(binary);
    return base64;
  }

  private storeCompactString(
    view: DataView,
    offset: number,
    str: string,
    maxLength: number
  ): void {
    if (!str) return;

    const length = Math.min(str.length, maxLength);
    for (let i = 0; i < length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }

    for (let i = length; i < maxLength; i++) {
      view.setUint8(offset + i, 0);
    }
  }

  private readCompactString(
    view: DataView,
    offset: number,
    maxLength: number
  ): string {
    let result = "";
    for (let i = 0; i < maxLength; i++) {
      const charCode = view.getUint8(offset + i);
      if (charCode === 0) break;
      result += String.fromCharCode(charCode);
    }
    return result;
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private decodeCompactReceiptMetadata(
    bytes: Uint8Array
  ): DecodedReceiptMetadata | null {
    try {
      const view = new DataView(bytes.buffer);

      const amount = view.getUint16(0, true) / 100;
      const timestamp = view.getUint32(2, true) * 1000;
      const hasImage = view.getUint8(7) === 1;

      const missionIdPartial = this.readCompactString(view, 8, 12);
      const fromNumber = this.readCompactString(view, 20, 8);
      const toNumber = this.readCompactString(view, 28, 8);
      const transactionPartial = this.readCompactString(view, 36, 14);

      const result: DecodedReceiptMetadata = {
        missionId: missionIdPartial + "...",
        from: "0.0." + fromNumber,
        to: "0.0." + toNumber,
        amount: amount,
        timestamp: timestamp,
        hasImage: hasImage,
        transactionHash: transactionPartial + "...",
        topicId: "Inclus dans metadata",
      };

      if (result.hasImage) {
        result.imageUrl =
          "https://bafybeibh2mx2icnq4i5qpxw2n6tr5fjztrgk44hql7fu2smdemooy3yl5i.ipfs.w3s.link/nft-adjuvo.png";
      }

      return result;
    } catch (err) {
      console.error("❌ Error decoding compact format:", err);
      return null;
    }
  }

  private decodeLegacyReceiptMetadata(
    bytes: Uint8Array
  ): DecodedReceiptMetadata | null {
    try {
      const view = new DataView(bytes.buffer);

      const missionId = this.readCompactString(view, 12, 24);
      const from = this.readCompactString(view, 36, 22);
      const to = this.readCompactString(view, 58, 22);

      const result: DecodedReceiptMetadata = {
        missionId: missionId,
        from: from,
        to: to,
        amount: view.getUint32(0, true) / 100,
        timestamp: view.getUint32(4, true) * 1000,
        hasImage: view.getUint8(8) === 1,
        transactionHash: "Voir transaction NFT",
        topicId: "Inclus dans metadata",
      };

      return result;
    } catch (err) {
      console.error("❌ Error decoding legacy format:", err);
      return null;
    }
  }

  private decodeJSONReceiptMetadata(
    metadata: string
  ): DecodedReceiptMetadata | null {
    try {
      const decodedString = decodeURIComponent(escape(atob(metadata)));
      const obj = JSON.parse(decodedString);

      const result: DecodedReceiptMetadata = {
        missionId: obj.m + "...",
        from: "0.0." + obj.f,
        to: "0.0." + obj.t,
        amount: obj.a / 100,
        timestamp: obj.ts * 1000,
        hasImage: true,
        transactionHash: "Voir transaction NFT",
        topicId: "Inclus dans metadata",
      };
      result.imageUrl =
        "https://bafybeibh2mx2icnq4i5qpxw2n6tr5fjztrgk44hql7fu2smdemooy3yl5i.ipfs.w3s.link/nft-adjuvo.png";

      return result;
    } catch (err) {
      console.error("❌ Error decoding JSON format:", err);
      return null;
    }
  }

  decodeReceiptMetadata(metadata: string): DecodedReceiptMetadata | null {
    try {
      const binary = atob(metadata);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      if (bytes.length === 50) {
        return this.decodeCompactReceiptMetadata(bytes);
      } else if (bytes.length === 80) {
        return this.decodeLegacyReceiptMetadata(bytes);
      } else {
        return this.decodeJSONReceiptMetadata(metadata);
      }
    } catch (err: unknown) {
      console.error("❌ Error decoding receipt metadata:", err);
      return null;
    }
  }

  decodeRewardMetadata(metadata: string): DecodedRewardMetadata | null {
    try {
      const binary = atob(metadata);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      const view = new DataView(bytes.buffer);

      const rewardTypeMap: ReverseRewardTypeMap = {
        1: "completion",
        2: "quality",
        3: "speed",
        4: "innovation",
      };

      const originalMissionId = this.readCompactString(view, 19, 12);
      const originalAppName = this.readCompactString(view, 31, 17);
      const originalBuilderName = this.readCompactString(view, 48, 16);

      const result: DecodedRewardMetadata = {
        missionId: `0.0.${view.getUint32(0, true)}`,
        rewardType: rewardTypeMap[view.getUint8(4)] || "unknown",
        level: view.getUint8(5),
        appNameHash: view.getUint32(6, true),
        builderNameHash: view.getUint32(10, true),
        timestamp: view.getUint32(14, true) * 1000,
        hasImage: view.getUint8(18) === 1,
        originalMissionId: originalMissionId,
        originalAppName: originalAppName,
        originalBuilderName: originalBuilderName,
        originalRewardType: rewardTypeMap[view.getUint8(4)] || "unknown",
      };

      if (result.hasImage) {
        result.imageUrl =
          "https://bafybeibh2mx2icnq4i5qpxw2n6tr5fjztrgk44hql7fu2smdemooy3yl5i.ipfs.w3s.link/nft-adjuvo.png";
      }

      return result;
    } catch (err: unknown) {
      console.error("❌ Error decoding reward metadata:", err);
      return null;
    }
  }

  async mintNFT(
    tokenId: string,
    metadata: string
  ): Promise<NFTMintResult | null> {
    const metadataBuffer = new TextEncoder().encode(metadata);

    try {
      const tx = new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata([metadataBuffer])
        .setMaxTransactionFee(new Hbar(5));

      const { txResponse, receipt } = await this.executeTransaction(tx);
      const serialNumber = receipt.serials?.[0]?.toNumber();
      if (serialNumber === undefined) return null;

      console.log("✅ NFT minted successfully");
      return {
        serialNumber,
        transactionId: txResponse.transactionId.toString(),
        metadata: metadata,
      };
    } catch (err: unknown) {
      console.error("❌ Error minting NFT:", err);
      return null;
    }
  }

  getHashScanUrl(tokenId: string, serialNumber: number): string {
    return `https://hashscan.io/testnet/token/${tokenId}?serial=${serialNumber}`;
  }

  async getNFTInfo(
    tokenId: string,
    serialNumber: number
  ): Promise<NFTInfo | null> {
    try {
      const query = new TokenNftInfoQuery()
        .setNftId({ tokenId, serialNumber } as NftId)
        .setMaxQueryPayment(new Hbar(1));

      const nftInfo = await query.execute(this.client);

      if (nftInfo && nftInfo.length > 0) {
        const nft = nftInfo[0];

        const metadataBytes = nft.metadata;
        const metadataString = new TextDecoder().decode(metadataBytes);

        return {
          nftId: nft.nftId,
          accountId: nft.accountId?.toString() || null,
          creationTime: nft.creationTime,
          metadata: metadataString,
          spenderId: nft.spenderId?.toString() || null,
          ledgerId: nft.ledgerId,
        };
      }

      return null;
    } catch (err: unknown) {
      console.error("❌ Error fetching NFT info:", err);
      return null;
    }
  }
}
