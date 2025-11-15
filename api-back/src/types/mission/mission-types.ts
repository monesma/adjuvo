export interface MissionDtoQuery {
  contract_address?: string | null;
  app_id: string;
  builder_id?: string | null;
  title: string;
  description: string;
  reward: number;
  currency: string;
  status: string;
  creation_timestamp?: number;
  nftReceipt?: {
    tokenId: string | null;
    serialNumber: number;
    transactionId: string;
    metadata?: string;
  } | null;
  nftReward?: {
    tokenId: string | null;
    serialNumber: number;
    transactionId: string;
    metadata?: string;
  } | null;
}

export interface MissionQuery {
  _id: string;
  contract_address: string | null;
  app_id: string;
  builder_id: string | null;
  title: string;
  description: string;
  reward: number;
  currency: string;
  status: string;
  creation_timestamp: number;
  nftReceipt: {
    tokenId: string | null;
    serialNumber: number;
    transactionId: string;
    metadata?: string;
  } | null;
  nftReward: {
    tokenId: string | null;
    serialNumber: number;
    transactionId: string;
    metadata?: string;
  } | null;
}

export interface SmartContractMissionQuery {
    _id: string;
    contract_address: string;
    app_id: string;
    builder_id: string;
    status: string;
    creation_timestamp: number;
}

export interface DeployMissionContract {
    appId: string;
    builderId: string;
    data: any;
}

