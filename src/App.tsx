import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Params as BNBTokenNewParams } from "./bnb/token/new";
import { routes } from "./routes";

const App: React.FC = () => (
  <Router>
    {/* <Route path={routes.root} component={StockUnitIndex} /> */}
    <Route path={routes.bnb.token.new.params} component={BNBTokenNewParams} />
  </Router>
);

export default App;
