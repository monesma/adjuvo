export interface MissionQuery {
  _id: string;
  title: string;
  description: string;
  reward: number;
  currency: string;
  status: string;
  app_id: string;
  builder_id: string;
  contract_address: string;
  creation_date: number;
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

export interface CreateNewMission {
    app_id: string;
    builder_id: string | null;
    title: string;
    description: string;
    reward: number;
    currency: string;
}  