import TokenManagement from "@binance-chain/javascript-sdk";
import { getClient } from "./client";

const issue = (network: string) => {
  return (
    senderAddress: string,
    tokenName: string,
    symbol: string,
    totalSupply: number,
    mintable: boolean,
  ) => {
    const token = new TokenManagement(getClient(network));
  };
};

export default {
  issue,
};
