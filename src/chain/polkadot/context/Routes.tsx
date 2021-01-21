import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "../../../routes";
import {
  Create as DOT_ERC20NewCreate,
  Finish as DOT_ERC20NewFinish,
  Params as DOT_ERC20NewParams,
} from "../erc20/new";
import { container, DependencyContext } from "./DependencyContext";

export const Routes: React.FC = () => (
  <DependencyContext.Provider value={container}>
    <Router>
      <Route path={routes.polkadot.erc20.new.params} component={DOT_ERC20NewParams} />
      <Route path={routes.polkadot.erc20.new.create} component={DOT_ERC20NewCreate} />
      <Route path={routes.polkadot.erc20.new.finish} component={DOT_ERC20NewFinish} />
    </Router>
  </DependencyContext.Provider>
);
