export type NetworkName = "testnet";
export type ChainId = '0x128';
export type NetworkConfig = {
  network: NetworkName,
  jsonRpcUrl: string,
  mirrorNodeUrl: string,
  chainId: ChainId,
}

export type NetworkConfigs = {
  [key in NetworkName]: {
    network: NetworkName,
    jsonRpcUrl: string,
    mirrorNodeUrl: string,
    chainId: ChainId,
  }
};

export type AppConfig = {
  networks: NetworkConfigs,
}
