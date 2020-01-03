import { crypto } from "@binance-chain/javascript-sdk";
import { Backdrop, Box, Button, Container, FormControlLabel, Grid, Paper, Switch, Theme, Typography, withStyles } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { History } from "history";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { StepsSidebar, ToolbarPadding } from "../../../components";
import routes from "../../../routes";
import { styles } from "../../../theme";
import ls from "../../../utils/ls";
import ss from "../../../utils/ss";
import { getClient, networks } from "../../client";
import token from "../../client/token";

interface ICreate extends RouteComponentProps<{ id: string }> {
  classes: any;
  history: History;
}

export const Create = withStyles((theme: Theme) => ({
  ...styles(theme),
  walletConnected: {
    "& svg": {
      fontSize: "1rem",
    },
  },
}))(({ classes, match, history, ...props }: ICreate) => {
  const [network, setNetwork] = React.useState(networks.testnet);
  const [address, setAddress] = React.useState("");
  const [isGettingAccount, setIsGettingAccount] = React.useState(false);
  const [isIssuingToken, setIsIssuingToken] = React.useState(false);
  const [balance, setBalance] = React.useState("0.00");
  const [client, setClient] = React.useState(getClient(network));

  React.useEffect(() => {
    getAddress();
  }, [network]);

  const onNetworkChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    setNetwork(network === networks.mainnet ? networks.testnet : networks.mainnet);
  };

  const onCreate = async () => {
    try {
      setIsIssuingToken(true);
      const senderAddress = address;
      const tokenName = ls.get("bnb", "token.name");
      const symbol = ls.get("bnb", "token.symbol");
      const totalSupply = Number(ls.get("bnb", "token.supply"));
      const mintable = ls.get("bnb", "token.isMintable");
      await token.issue(client)(senderAddress, tokenName, symbol, totalSupply, mintable);
    } catch (error) {
      setIsIssuingToken(false);
      console.error(error);
    }
  };

  const onBack = () => {
    history.push(routes.bnb.token.new.connect);
  };

  const getAddress = async (): Promise<void> => {
    try {
      setIsGettingAccount(true);
      setAddress("");
      const privateKey = ss.get("bnb", "keystoreFile.privateKey", null);
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
      setAddress("");
      setIsGettingAccount(false);
    }
  };

  return (
    <Box display="flex">
      <Backdrop
        className={classes.backdrop}
        open={isIssuingToken}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
                information and then click "Create".
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
