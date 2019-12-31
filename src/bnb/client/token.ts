import TokenManagement from "@binance-chain/javascript-sdk";
import { client } from "./client";

const issue = (
  senderAddress: string,
  tokenName: string,
  symbol: string,
  totalSupply: number,
  mintable: boolean,
) => {
  const token = new TokenManagement(client);
};

export default {
  issue,
};
