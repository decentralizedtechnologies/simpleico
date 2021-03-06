import Web3 from "web3";

export interface IProviders {
  [key: string]: string;
}

export interface INetworks {
  [key: string]: Networks;
}

export type Networks = "mainnet" | "ropsten" | "kovan" | "rinkeby" | "goerly";

export const networks: INetworks = {
  mainnet: "mainnet",
  ropsten: "ropsten",
  kovan: "kovan",
  rinkeby: "rinkeby",
  goerly: "goerly",
};

export const networkNameByVersion: INetworks = {
  "1": "mainnet",
  "3": "ropsten",
  "42": "kovan",
  "4": "rinkeby",
  "5": "goerly",
};

export const mainnetExplorerURI = "https://etherscan.io";
export const ropstenExplorerURI = "https://ropsten.etherscan.io";
export const kovanExplorerURI = "https://kovan.etherscan.io";
export const rinkebyExplorerURI = "https://rinkeby.etherscan.io";
export const goerlyExplorerURI = "https://goerly.etherscan.io";

export const explorers = {
  mainnet: mainnetExplorerURI,
  ropsten: ropstenExplorerURI,
  kovan: kovanExplorerURI,
  rinkeby: rinkebyExplorerURI,
  goerly: goerlyExplorerURI,
};

export const mainnetProviderURI = "https://mainnet.infura.io/v3/3ffb5509990b4964acd6de7991d5750d";
export const ropstenProviderURI = "https://ropsten.infura.io/v3/3ffb5509990b4964acd6de7991d5750d";
export const kovanProviderURI = "https://kovan.infura.io/v3/3ffb5509990b4964acd6de7991d5750d";
export const rinkebyProviderURI = "https://rinkeby.infura.io/v3/3ffb5509990b4964acd6de7991d5750d";
export const goerlyProviderURI = "https://goerly.infura.io/v3/3ffb5509990b4964acd6de7991d5750d";

export const providers: IProviders = {
  mainnet: mainnetProviderURI,
  ropsten: ropstenProviderURI,
  kovan: kovanProviderURI,
  rinkeby: rinkebyProviderURI,
  goerly: goerlyProviderURI,
};

export const getNetworkURI = (network: Networks): string => {
  return providers[network];
};

export const getExplorerURI = (network: Networks): string => {
  return explorers[network];
};

export const setClientProviderByNetwork = (client: Web3, network: Networks = "mainnet"): Web3 => {
  const web3 = (window as any).web3;
  const provider = new Web3.providers.HttpProvider(getNetworkURI(network));
  (window as any).web3.setProvider(provider);
  client.setProvider(web3.currentProvider);
  return client;
};

export const getClient = async (network: Networks = "mainnet"): Promise<Web3> =>
  new Promise((resolve, reject) => {
    const ethereum = (window as any).ethereum;
    const web3 = (window as any).web3;
    let client;
    if (typeof ethereum !== "undefined") {
      client = new Web3(ethereum);
    } else if (typeof web3 !== "undefined") {
      client = new Web3(web3.currentProvider);
    } else {
      client = new Web3(getNetworkURI(network));
    }
    resolve(client);
  });
