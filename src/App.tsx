import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Connect as BNBTokenNewConnect,
  Create as BNBTokenNewCreate,
  Finish as BNBTokenNewFinish,
  Params as BNBTokenNewParams,
} from "./chain/bnb/token/new";
import { Select as BNBTokenToolsSelect } from "./chain/bnb/token/tools";
import {
  Connect as BNBTokenToolsMintConnect,
  Finish as BNBTokenToolsMintFinish,
  Params as BNBTokenToolsMintParams,
} from "./chain/bnb/token/tools/mint";
import {
  Create as ETH_ERC20NewCreate,
  Finish as ETH_ERC20NewFinish,
  Params as ETH_ERC20NewParams,
} from "./chain/eth/erc20/new";
import { Routes as DOTRoutes } from "./chain/polkadot/context";
import { Home } from "./feature/home/screen";
import { routes } from "./routes";

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path={routes.root} exact strict sensitive component={Home} />

      {/* Binance Chain */}
      <Route exact path={routes.bnb.token.new.params} component={BNBTokenNewParams} />
      <Route exact path={routes.bnb.token.new.connect} component={BNBTokenNewConnect} />
      <Route exact path={routes.bnb.token.new.create} component={BNBTokenNewCreate} />
      <Route exact path={routes.bnb.token.new.finish} component={BNBTokenNewFinish} />

      <Route exact path={routes.bnb.token.tools.select} component={BNBTokenToolsSelect} />
      <Route
        exact
        path={routes.bnb.token.tools.mint.connect}
        component={BNBTokenToolsMintConnect}
      />
      <Route exact path={routes.bnb.token.tools.mint.params} component={BNBTokenToolsMintParams} />
      <Route exact path={routes.bnb.token.tools.mint.finish} component={BNBTokenToolsMintFinish} />

      {/* Ethereum */}
      <Route exact path={routes.eth.erc20.new.params} component={ETH_ERC20NewParams} />
      <Route exact path={routes.eth.erc20.new.create} component={ETH_ERC20NewCreate} />
      <Route exact path={routes.eth.erc20.new.finish} component={ETH_ERC20NewFinish} />

      {/* Polkadot */}
      <DOTRoutes />
    </Switch>
  </Router>
);

export default App;
