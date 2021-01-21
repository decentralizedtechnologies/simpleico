import {
  Box,
  Container,
  Paper,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { SidebarNavigation } from ".";
import { StepsSidebar, ToolbarPadding } from "../../../../components";
import routes from "../../../../routes";
import { styles } from "../../../../theme";
import { ls } from "../../../../utils";
import { networks } from "../../client";
import { SidebarFooter } from "../../components";
import { NAMESPACE } from "../../constants";
import { DependencyContext } from "../../context";
import { ERC20ContractModel, PolkadotClient } from "../../model";

interface Props extends WithStyles, RouteComponentProps<{ id: string }> {}

const Component: React.FC<Props> = ({ classes, history, ...props }) => {
  const [receipt] = React.useState(ls.get(NAMESPACE, "erc20.receipt"));
  const [name] = React.useState(ls.get(NAMESPACE, "erc20.name"));
  const [symbol] = React.useState(ls.get(NAMESPACE, "erc20.symbol"));
  const [supply] = React.useState(ls.get(NAMESPACE, "erc20.supply"));
  const [transactionHash] = React.useState(ls.get(NAMESPACE, "erc20.receipt.transactionHash", ""));
  const [network] = React.useState(ls.get(NAMESPACE, "erc20.network", networks.testnet));

  const container = React.useContext(DependencyContext);
  const ERC20Contract = container.get<ERC20ContractModel>(ERC20ContractModel.type);
  const Client = container.get<PolkadotClient>(PolkadotClient.type);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     ls.update(NAMESPACE, { erc20: "" });
  //   }, 5000);
  // }, []);

  return (
    <Box display="flex">
      <StepsSidebar footer={<SidebarFooter history={history} {...props} />}>
        <SidebarNavigation history={history} {...props} />
      </StepsSidebar>
      <Container maxWidth="xl">
        <ToolbarPadding />
        <Box mb={4}>
          <Paper elevation={1}>
            <Box p={2}>
              {Boolean(transactionHash) ? (
                <>
                  <Typography variant="body2" gutterBottom>
                    Congratulations! You've successfully created an ERC20 token in the Polkadot
                    chain.
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Now what?
                  </Typography>
                  <Typography variant="body2">
                    {/* <Link to={routes.polkadot.erc20.tools.select}>Explore the token tools</Link> */}
                    {/* {" · "}
                    <Link to={routes.root}>List your token in the DEX</Link>
                    {" · "}
                    <Link to={routes.root}>Share</Link>
                    {" · "}
                    <Link to={routes.root}>Donate</Link> */}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="body2" gutterBottom>
                    Nothing to see here.
                  </Typography>
                  <Typography variant="body2">
                    <Link to={routes.polkadot.erc20.new.params}>Create an ERC20 token now</Link>
                  </Typography>
                </>
              )}
            </Box>
          </Paper>
        </Box>
        {Boolean(ERC20Contract.contract?.address.toHuman()) && (
          <Box mb={4}>
            <Paper elevation={1}>
              <Box p={2}>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Contract address
                  </Typography>
                  <Typography>{ERC20Contract.contract?.address.toHuman()}</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export const Finish = withStyles((theme: Theme) => ({
  ...styles(theme),
}))(Component);
