import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  Connect as BNBTokenNewConnect,
  Create as BNBTokenNewCreate,
  Finish as BNBTokenNewFinish,
  Params as BNBTokenNewParams,
} from "./bnb/token/new";
import { Select as BNBTokenToolsSelect } from "./bnb/token/tools";
import {
  Connect as BNBTokenToolsMintConnect,
  Finish as BNBTokenToolsMintFinish,
  Params as BNBTokenToolsMintParams,
} from "./bnb/token/tools/mint";
import {
  Create as ETH_ERC20NewCreate,
  Finish as ETH_ERC20NewFinish,
  Params as ETH_ERC20NewParams,
} from "./eth/erc20/new";
import { routes } from "./routes";

const App: React.FC = () => (
  <Router>
    <Route path={routes.root} exact component={ETH_ERC20NewParams} />
    {/* Binance Chain */}
    <Route path={routes.bnb.token.new.params} component={BNBTokenNewParams} />
    <Route path={routes.bnb.token.new.connect} component={BNBTokenNewConnect} />
    <Route path={routes.bnb.token.new.create} component={BNBTokenNewCreate} />
    <Route path={routes.bnb.token.new.finish} component={BNBTokenNewFinish} />

    <Route path={routes.bnb.token.tools.select} component={BNBTokenToolsSelect} />
    <Route path={routes.bnb.token.tools.mint.connect} component={BNBTokenToolsMintConnect} />
    <Route path={routes.bnb.token.tools.mint.params} component={BNBTokenToolsMintParams} />
    <Route path={routes.bnb.token.tools.mint.finish} component={BNBTokenToolsMintFinish} />

    {/* Ethereum */}
    <Route path={routes.eth.erc20.new.params} component={ETH_ERC20NewParams} />
    <Route path={routes.eth.erc20.new.create} component={ETH_ERC20NewCreate} />
    <Route path={routes.eth.erc20.new.finish} component={ETH_ERC20NewFinish} />
  </Router>
);

export default App;
