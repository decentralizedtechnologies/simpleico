import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "../../../routes";
import { Create, Finish, Params } from "../erc20/new";
import { container, DependencyContext } from "./DependencyContext";

export const Routes: React.FC = () => (
  <DependencyContext.Provider value={container}>
    <Router>
      <Route exact path={routes.polkadot.erc20.new.params} component={Params} />
      <Route exact path={routes.polkadot.erc20.new.create} component={Create} />
      <Route exact path={routes.polkadot.erc20.new.finish} component={Finish} />
    </Router>
  </DependencyContext.Provider>
);
