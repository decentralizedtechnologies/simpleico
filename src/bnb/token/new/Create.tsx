import { Box, Button, Container, FormControlLabel, Grid, Paper, Switch, Theme, Typography, withStyles } from "@material-ui/core";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { History } from "history";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { StepsSidebar, ToolbarPadding } from "../../../components";
import routes from "../../../routes";
import ls from "../../../utils/ls";
import ss from "../../../utils/ss";
import { getClient, networks } from "../../client";

interface ICreate extends RouteComponentProps<{ id: string }> {
  classes: any;
  history: History;
}

export const Create = withStyles((theme: Theme) => ({
  walletConnected: {
    "& svg": {
      fontSize: "1rem",
    },
  },
}))(({ classes, match, history, ...props }: ICreate) => {
  const [network, setNetwork] = React.useState(networks.mainnet);
  const [address, setAddress] = React.useState(null);
  const [isGettingAccount, setIsGettingAccount] = React.useState(false);
  const [balance, setBalance] = React.useState("0.00");

  React.useEffect(() => {
    getAddress();
  }, [network]);

  const onNetworkChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    setNetwork(network === networks.mainnet ? networks.testnet : networks.mainnet);
  };

  const onCreate = () => {};

  const onBack = () => {
    history.push(routes.bnb.token.new.connect);
  };

  const getAddress = async (): Promise<void> => {
    try {
      setIsGettingAccount(true);
      setAddress(null);
      const privateKey = ss.get("bnb", "keystoreFile.privateKey", null);
      const client = getClient(network);
      client.chooseNetwork(network);
      await client.setPrivateKey(privateKey);
      await client.initChain();
      const address = client.getClientKeyAddress();
      setAddress(address);
      const account = await client.getAccount(address);
      console.log(account);
      const balance = account.result.balances.filter((b: any) => b.symbol === "BNB")[0].free;
      setBalance(balance);
      setIsGettingAccount(false);
    } catch (error) {
      console.error(error);
      setAddress(null);
      setIsGettingAccount(false);
    }
  };

  return (
    <Box display="flex">
      <StepsSidebar>
        <h1></h1>
      </StepsSidebar>
      <Container maxWidth="xl">
        <ToolbarPadding />
        <Box mb={4}>
          <Paper elevation={1}>
            <Box p={2}>
              {Boolean(ss.get("bnb", "keystoreFile.privateKey", null)) ? (
                <>
                  <Typography gutterBottom variant="body2" className={classes.walletConnected}>
                    Your Binance Chain wallet is connected <CheckCircleOutlineIcon />
                  </Typography>
                  <Box mt={2}>
                    {Boolean(address) ? (
                      <Grid container spacing={2}>
                        <Grid item>
                          <Typography variant="body2" display="block" gutterBottom>
                            <span style={{ textTransform: "uppercase" }}>{network}</span> address
                          </Typography>
                          <Typography>{address}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" display="block" gutterBottom>
                            Balance
                          </Typography>
                          <Typography>{balance}</Typography>
                        </Grid>
                      </Grid>
                    ) : isGettingAccount ? (
                      <Typography>Checking your wallet balance...</Typography>
                    ) : (
                      <Typography>
                        Your {network} account balance is 0.00. Please add {network} balance to your
                        wallet in order to proceed.
                      </Typography>
                    )}
                  </Box>
                </>
              ) : (
                <>
                  <Typography gutterBottom variant="body2" className={classes.walletConnected}>
                    Your binance chain wallet is not connected <CancelOutlinedIcon />
                  </Typography>
                  <Link to={routes.bnb.token.new.connect}>Connect</Link>
                </>
              )}
            </Box>
          </Paper>
        </Box>
        <Box mb={4}>
          <Paper elevation={1}>
            <Box p={2}>
              <Typography gutterBottom>Step 3 · Create your token.</Typography>
              <Typography variant="body2">
                In this step you will sign a transaction in the Binance {network}. Confirm your
                information, choose a network and then click "Create".
              </Typography>
              <Box mt={4}>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Name · <Link to={routes.bnb.token.new.params}>edit</Link>
                  </Typography>
                  <Typography>{ls.get("bnb", "token.name")}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Symbol · <Link to={routes.bnb.token.new.params}>edit</Link>
                  </Typography>
                  <Typography>{ls.get("bnb", "token.symbol")}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Supply · <Link to={routes.bnb.token.new.params}>edit</Link>
                  </Typography>
                  <Typography>{ls.get("bnb", "token.supply")}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Is Mintable · <Link to={routes.bnb.token.new.params}>edit</Link>
                  </Typography>
                  <Typography>{ls.get("bnb", "token.isMintable", false) ? "Yes" : "No"}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" display="block" gutterBottom>
                    Network
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={network === networks.mainnet}
                        onChange={onNetworkChange}
                        color="primary"
                      />
                    }
                    label={network}
                  />
                </Box>
              </Box>
              <Box mt={4}>
                <Grid container spacing={2} justify="space-between">
                  <Grid item>
                    <Button variant="contained" onClick={onBack}>
                      Back
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={onCreate} disabled={!Boolean(address) && balance !== "0.00"}>
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
});
