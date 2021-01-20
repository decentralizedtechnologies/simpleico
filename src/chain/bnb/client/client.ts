import BNBApiClient from "@binance-chain/javascript-sdk";

export const networks = {
  mainnet: "mainnet",
  testnet: "testnet",
};

export const mainnetExplorerURI = "https://explorer.binance.org";
export const testnetExplorerURI = "https://testnet-explorer.binance.org";

export const explorers = {
  mainnet: mainnetExplorerURI,
  testnet: testnetExplorerURI,
};

const mainnetURI = "https://dex.binance.org/";
const testnetURI = "https://testnet-dex.binance.org/";

export const getNetworkURI = (network: string) => {
  return network === networks.mainnet ? mainnetURI : testnetURI;
};

export const getClient = async (network: string): Promise<any> =>
  new Promise((resolve, reject) => {
    const client = new BNBApiClient(getNetworkURI(network));
    client.chooseNetwork(network);
    resolve(client);
  });
