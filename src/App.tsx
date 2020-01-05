import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Connect as BNBTokenNewConnect, Create as BNBTokenNewCreate, Finish as BNBTokenNewFinish, Params as BNBTokenNewParams } from "./bnb/token/new";
import { Select as BNBTokenToolsSelect } from "./bnb/token/tools";
import { Connect as BNBTokenToolsMintConnect, Params as BNBTokenToolsMintParams } from "./bnb/token/tools/mint";
import { routes } from "./routes";

const App: React.FC = () => (
  <Router>
    {/* <Route path={routes.root} component={StockUnitIndex} /> */}
    <Route path={routes.bnb.token.new.params} component={BNBTokenNewParams} />
    <Route path={routes.bnb.token.new.connect} component={BNBTokenNewConnect} />
    <Route path={routes.bnb.token.new.create} component={BNBTokenNewCreate} />
    <Route path={routes.bnb.token.new.finish} component={BNBTokenNewFinish} />

    <Route path={routes.bnb.token.tools.select} component={BNBTokenToolsSelect} />
    <Route path={routes.bnb.token.tools.mint.connect} component={BNBTokenToolsMintConnect} />
    <Route path={routes.bnb.token.tools.mint.params} component={BNBTokenToolsMintParams} />
  </Router>
);

export default App;
