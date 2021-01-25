import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Accounts, web3FromAddress } from "@polkadot/extension-dapp";
import { InjectedAccountWithMeta, InjectedExtension } from "@polkadot/extension-inject/types";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class PolkadotClient {
  static type = "PolkadotClient";

  account: InjectedAccountWithMeta | undefined;
  api: ApiPromise | undefined;
  injector: InjectedExtension | undefined;

  async init() {
    const accounts = await web3Accounts();
    if (accounts.length) {
      const [account] = accounts;
      this.account = account;
      const injector = await web3FromAddress(account.address);
      this.injector = injector;
      const provider = new WsProvider("wss://d8669ff4c2af.ngrok.io");
      if (provider.isReady) {
        const api = await ApiPromise.create({ provider });
        this.api = api;
      }
    }
  }
}
