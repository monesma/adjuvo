export interface NFTReceiptData {
  missionId: string;
  missionTitle: string;
  amount: number;
  currency: string;
  from: string;
  to: string;
  timestamp: number;
  transactionHash: string;
  topicId: string;
}

export interface NFTRewardData {
  missionId: string;
  missionTitle: string;
  appName: string;
  builderName: string;
  rewardType: 'completion' | 'excellence' | 'speed';
  level: number;
  timestamp: number;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
  external_url: string;
}

export interface NFTMintResult {
  serialNumber: number;
  transactionId: string;
  metadata?: string;
}

export interface StoredNFTInfo {
  tokenId: string | null;
  serialNumber: number;
  transactionId: string;
  metadata?: string;
}