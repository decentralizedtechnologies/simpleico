import { Box, Container, Paper, Theme, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { SidebarNavigation } from ".";
import { StepsSidebar, ToolbarPadding } from "../../../components";
import routes from "../../../routes";
import { styles } from "../../../theme";
import { ls } from "../../../utils";
import { getExplorerURI, networks } from "../../client";
import { SidebarFooter } from "../../components";

interface IFinish extends RouteComponentProps<{ id: string }> {
  classes: any;
}

export const Finish = withStyles((theme: Theme) => ({
  ...styles(theme),
}))(({ classes, history, ...props }: IFinish) => {
  const [receipt] = React.useState(ls.get("eth", "erc20.receipt"));
  const [name] = React.useState(ls.get("eth", "erc20.name"));
  const [symbol] = React.useState(ls.get("eth", "erc20.symbol"));
  const [supply] = React.useState(ls.get("eth", "erc20.supply"));
  const [transactionHash] = React.useState(ls.get("eth", "erc20.receipt.transactionHash", ""));
  const [network] = React.useState(ls.get("eth", "erc20.network", networks.testnet));

  React.useEffect(() => {
    setTimeout(() => {
      ls.update("eth", { erc20: "" });
    }, 5000);
  }, []);

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
                    Congratulations! You've successfully created an ERC20 token in the Ethereum
                    chain.
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Now what?
                  </Typography>
                  <Typography variant="body2">
                    <Link to={routes.eth.erc20.tools.select}>Explore the token tools</Link>
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
                    <Link to={routes.eth.erc20.new.params}>Create an ERC20 token now</Link>
                  </Typography>
                </>
              )}
            </Box>
          </Paper>
        </Box>
        {Boolean(transactionHash) && (
          <Box mb={4}>
            <Paper elevation={1}>
              <Box p={2}>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Transaction hash
                  </Typography>
                  <a
                    href={`${getExplorerURI(network)}/tx/${transactionHash}`}
                    target="_blank"
                    rel="nofollow"
                  >
                    <Typography>{transactionHash}</Typography>
                  </a>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Name
                  </Typography>
                  <Typography>{name}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Symbol
                  </Typography>
                  <Typography>{symbol}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Total supply
                  </Typography>
                  <Typography>{supply}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Owner
                  </Typography>
                  <Typography>{receipt.from}</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
});
