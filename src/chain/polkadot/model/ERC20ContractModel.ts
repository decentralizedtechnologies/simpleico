import { ApiPromise } from "@polkadot/api";
import { CodePromise, ContractPromise } from "@polkadot/api-contract";
import { Blueprint } from "@polkadot/api-contract/base";
import { InjectedAccountWithMeta, InjectedExtension } from "@polkadot/extension-inject/types";
import { injectable } from "inversify";
import "reflect-metadata";
import ERC20Wasm from "../erc20/build/erc20.json";
import ABI from "../erc20/build/metadata.json";
import { PolkadotClient } from "./PolkadotClient";

const endowment = 1230000000000n;
const gasLimit = 100000n * 1000000n;

@injectable()
export class ERC20ContractModel {
  static type = "ERC20ContractModel";

  private blueprint: Blueprint<"promise"> | undefined;

  contract: ContractPromise | undefined;

  deploy(client: PolkadotClient): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const code = new CodePromise(client.api as ApiPromise, ABI, ERC20Wasm.wasm);

      const unsub = await code.createBlueprint().signAndSend(
        (client.account as InjectedAccountWithMeta).address,
        {
          signer: (client.injector as InjectedExtension).signer,
        },
        async (result) => {
          if (result.status.isInBlock || result.status.isFinalized) {
            this.blueprint = result.blueprint;
            await this.create(client);

            if (!Boolean((this.contract as ContractPromise).address)) {
              reject();
            }

            resolve();

            unsub();
          }
        },
      );
    });
  }

  private create(client: PolkadotClient): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const unsub = await (this.blueprint as Blueprint<"promise">).tx
        .new(endowment, gasLimit, 123)
        .signAndSend(
          (client.account as InjectedAccountWithMeta).address,
          {
            signer: (client.injector as InjectedExtension).signer,
          },
          (result) => {
            if (result.status.isInvalid || result.status.isDropped) {
              reject();
            }

            if (result.status.isInBlock || result.status.isFinalized) {
              this.contract = (result as any).contract;
              resolve();
              unsub();
            }
          },
        );
    });
  }
}
