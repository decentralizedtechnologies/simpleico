import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Connect as BNBTokenNewConnect, Create as BNBTokenNewCreate, Finish as BNBTokenNewFinish, Params as BNBTokenNewParams } from "./bnb/token/new";
import { routes } from "./routes";

const App: React.FC = () => (
  <Router>
    {/* <Route path={routes.root} component={StockUnitIndex} /> */}
    <Route path={routes.bnb.token.new.params} component={BNBTokenNewParams} />
    <Route path={routes.bnb.token.new.connect} component={BNBTokenNewConnect} />
    <Route path={routes.bnb.token.new.create} component={BNBTokenNewCreate} />
    <Route path={routes.bnb.token.new.finish} component={BNBTokenNewFinish} />
  </Router>
);

export default App;
