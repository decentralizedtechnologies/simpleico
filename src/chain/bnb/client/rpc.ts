import { rpc as rpcClient } from "@binance-chain/javascript-sdk";

export const getRpcClient = async (network: string): Promise<any> =>
  new Promise((resolve, reject) => {
    const client = new rpcClient("https://testnet-dex.binance.org:443");
    resolve(client);
  });