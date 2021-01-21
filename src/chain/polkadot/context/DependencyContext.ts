import { Container } from "inversify";
import React from "react";
import { ERC20ContractModel, PolkadotClient } from "../model";

export const container = new Container();

container
  .bind<ERC20ContractModel>(ERC20ContractModel.type)
  .to(ERC20ContractModel)
  .inSingletonScope();

container.bind<PolkadotClient>(PolkadotClient.type).to(PolkadotClient).inSingletonScope();

export const DependencyContext = React.createContext(container);
