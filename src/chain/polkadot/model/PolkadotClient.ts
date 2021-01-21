import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable, web3FromAddress } from "@polkadot/extension-dapp";
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
    const allInjected = await web3Enable("Simple ICO");
    // const rpcProviders = await web3ListRpcProviders("polkadot-js");
    const accounts = await web3Accounts();
    if (accounts.length) {
      console.log(accounts);
      const [account] = accounts;
      this.account = account;
      const injector = await web3FromAddress(account.address);
      this.injector = injector;
      console.log(injector);
      const provider = new WsProvider("wss://b800595c9ec4.ngrok.io");
      console.log(provider);
      if (provider.isReady) {
        const api = await ApiPromise.create({ provider });
        this.api = api;
        console.log(api);
        if (api.isReady) {
          const accountData = await api.query.system.account(account.address);
          console.log(accountData);
          const chain = await api.rpc.system.chain();
          console.log(chain);
          const lastHeader = await api.rpc.chain.getHeader();
          console.log(lastHeader);
        }
      }
    }
  }
}
