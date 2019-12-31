import BNBApiClient from "@binance-chain/javascript-sdk";
import axios from "axios";

const network = "https://testnet-dex.binance.org/";

export const client = new BNBApiClient(network);
export const httpClient = axios.create({ baseURL: network });
