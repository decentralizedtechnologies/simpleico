import { Box, Container, Paper, Theme, Typography, withStyles } from "@material-ui/core";
import { History } from "history";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { SidebarNavigation } from ".";
import { StepsSidebar, ToolbarPadding } from "../../../components";
import routes from "../../../routes";
import { styles } from "../../../theme";
import ls from "../../../utils/ls";
import ss from "../../../utils/ss";
import { explorers, networks } from "../../client";
import { SidebarFooter } from "../../components";

interface IFinish extends RouteComponentProps<{ id: string }> {
  classes: any;
  history: History;
}

export const Finish = withStyles((theme: Theme) => ({
  ...styles(theme),
}))(({ classes, history, ...props }: IFinish) => {
  const [data, setData] = React.useState({
    name: "",
    symbol: "",
    original_symbol: "",
    total_supply: "",
    owner: "",
    mintable: false,
  });
  const [hash, setHash] = React.useState(ls.get("bnb", "token.result.hash", ""));
  const [network, setNetwork] = React.useState(ls.get("bnb", "token.network", networks.testnet));

  React.useEffect(() => {
    setData(JSON.parse(ls.get("bnb", "token.result.data", JSON.stringify(data))));
    setTimeout(() => {
      ls.update("bnb", { token: "" });
      ss.update("bnb", { keystore: "", publicKey: "" });
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
              {Boolean(hash) ? (
                <>
                  <Typography variant="body2" gutterBottom>
                    Congratulations! You've successfully created a BEP2 token in the Binance Chain.
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Now what?
                  </Typography>
                  <Typography variant="body2">
                    <Link to={routes.bnb.token.tools.select}>Explore the token tools</Link>
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
                    <Link to={routes.bnb.token.new.params}>Create a BEP2 token now</Link>
                  </Typography>
                </>
              )}
            </Box>
          </Paper>
        </Box>
        {Boolean(hash) && (
          <Box mb={4}>
            <Paper elevation={1}>
              <Box p={2}>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Transaction hash
                  </Typography>
                  <a
                    href={`${
                      network === networks.mainnet ? explorers.mainnet : explorers.testnet
                    }/tx/${hash}`}
                    target="_blank"
                  >
                    <Typography>{hash}</Typography>
                  </a>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Name
                  </Typography>
                  <Typography>{data.name}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Symbol
                  </Typography>
                  <Typography>{data.symbol}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Original symbol
                  </Typography>
                  <Typography>{data.original_symbol}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Total supply
                  </Typography>
                  <Typography>{data.total_supply}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Owner
                  </Typography>
                  <Typography>{data.owner}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Mintable
                  </Typography>
                  <Typography>{data.mintable ? "yes" : "no"}</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
});
