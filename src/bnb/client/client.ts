import BNBApiClient from "@binance-chain/javascript-sdk";

export const networks = {
  mainnet: "mainnet",
  testnet: "testnet",
};

const testnetURI = "https://testnet-dex.binance.org/";
const mainnetURI = "https://dex.binance.org/";

// export const client = new BNBApiClient(network);
// export const httpClient = axios.create({ baseURL: network });

export const getNetworkURI = (network: string) => {
  return network === "mainnet" ? mainnetURI : testnetURI;
};

export const getClient = (network: string) => {
  return new BNBApiClient(getNetworkURI(network));
};
