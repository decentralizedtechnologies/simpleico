import Web3 from "web3";
import { AbiItem } from "web3-utils";
import * as SimpleERC20 from "./abi/SimpleERC20.json";

const deploy = (client: Web3) => {
  return async (name: string, symbol: string, supply: number, decimals = 18) => {
    try {
      const abi = SimpleERC20.abi as AbiItem[];
      const contract = new client.eth.Contract(abi);
      return await contract.deploy({
        data: SimpleERC20.bytecode,
        arguments: [
          client.utils.toBN(supply).toString(),
          name,
          symbol,
          client.utils.toBN(decimals).toString(),
        ],
      });
    } catch (error) {
      throw error;
    }
  };
};

export const ERC20 = {
  deploy,
};

export default ERC20;
