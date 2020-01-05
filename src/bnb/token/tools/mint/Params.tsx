import { crypto } from "@binance-chain/javascript-sdk";
import { Backdrop, Box, Button, Card, CardActions, CardContent, Container, Fade, FormControlLabel, Grid, Modal, Paper, Switch, TextField, Theme, Typography, withStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { SidebarNavigation } from ".";
import { StepsSidebar, ToolbarPadding } from "../../../../components";
import routes from "../../../../routes";
import { styles } from "../../../../theme";
import { ls, ss } from "../../../../utils";
import { getClient, networks } from "../../../client";
import token from "../../../client/token";
import { SidebarFooter } from "../../../components";

interface IParams extends RouteComponentProps<{ id: string }> {
  classes: any;
}

export const Params = withStyles((theme: Theme) => ({
  ...styles(theme),
}))(({ classes, history, ...props }: IParams) => {
  const [network, setNetwork] = React.useState(networks.testnet);
  const [address, setAddress] = React.useState("");
  const [isGettingAccount, setIsGettingAccount] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isMintingToken, setIsMintingToken] = React.useState(false);
  const [balances, setBalances] = React.useState([]);
  const [keystore] = React.useState(ss.get("bnb", "keystore", ""));
  const [publicKey] = React.useState(ss.get("bnb", "publicKey", ""));
  const [amount, setAmount] = React.useState("0.00");
  const [symbol, setSymbol] = React.useState(ls.get("bnb", "token.symbol", ""));
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    getAddress();
  }, [network]);

  const onNetworkChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    setNetwork(checked ? networks.mainnet : networks.testnet);
  };

  const getAddress = async (): Promise<void> => {
    try {
      setIsGettingAccount(true);
      setAddress("");
      const client = await getClient(network);
      await client.initChain();
      const prefix = network === networks.mainnet ? "bnb" : "tbnb";
      const address = crypto.getAddressFromPublicKey(publicKey, prefix);
      setAddress(address);
      const account = await client.getAccount(address);
      console.log(account);
      setBalances(account.result.balances.filter((a: any) => a.symbol !== "BNB"));
      setIsGettingAccount(false);
    } catch (error) {
      console.error(error);
      setAddress("");
      setIsGettingAccount(false);
    }
  };

  const onSetAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  const onMint = async () => {
    try {
      setOpen(false);
      setIsMintingToken(true);
      const pwd = (passwordRef.current as HTMLInputElement).value;
      const privateKey = crypto.getPrivateKeyFromKeyStore(keystore, pwd);
      const senderAddress = address;
      const client = await getClient(network);
      await client.initChain();
      await client.setPrivateKey(privateKey);
      const res = await token.mint(client)(senderAddress, symbol, Number(amount));
      if (res.status === 200) {
        ls.update("bnb", { token: { symbol, network, amount, result: res.result[0] } });
        history.push(routes.bnb.token.tools.mint.finish);
      }
    } catch (error) {
      setIsMintingToken(false);
      console.error(error);
    }
  };

  const onSelectToken = (symbol: string): void => {
    setSymbol(symbol);
    setOpen(true);
  };

  return (
    <Box display="flex">
      <Backdrop className={classes.backdrop} open={isGettingAccount || isMintingToken}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box maxWidth="25vw" minWidth="25vw">
            <Card>
              <CardContent>
                <TextField type="password" label="Type your wallet password" autoFocus fullWidth inputRef={passwordRef} />
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {onMint();}}
                  color="primary"
                  variant="contained"
                  style={{ marginLeft: "auto" }}
                >
                  Confirm
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Fade>
      </Modal>
      <StepsSidebar footer={<SidebarFooter history={history} {...props} />}>
        <SidebarNavigation history={history} {...props} />
      </StepsSidebar>
      <Container maxWidth="xl">
        <ToolbarPadding />
        <Box mb={4}>
          <Paper elevation={1}>
            <Box p={2}>
              <Box mt={4}>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <Box>
                      <Typography variant="body2">Binance Chain network</Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
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
                  </Grid>
                </Grid>
              </Box>
              <Box mt={4}>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <Box>
                      <Typography variant="body2">Binance Chain account</Typography>
                      <Link to={routes.bnb.token.tools.mint.connect}>Load another account</Link>
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <TextField fullWidth label="Address" disabled value={address} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box mb={4}>
          <Paper elevation={1}>
            <Box p={2}>
              <Typography gutterBottom>Step 2 · Select an existing token</Typography>
              <Box mt={4}>
                <Grid container spacing={2}>
                  <Grid item lg={2}>
                    <Typography variant="overline">Symbol</Typography>
                  </Grid>
                  <Grid item lg={2}>
                    <Typography variant="overline">Free</Typography>
                  </Grid>
                  <Grid item lg={2}>
                    <Typography variant="overline">Frozen</Typography>
                  </Grid>
                  <Grid item lg={2}>
                    <Typography variant="overline">Locked</Typography>
                  </Grid>
                  <Grid item lg={2}>
                    <Typography variant="overline">Amount</Typography>
                  </Grid>
                  <Grid item lg={2}></Grid>
                </Grid>
                {balances.map((token: any, i: number) => (
                  <Grid container spacing={2} key={i}>
                    <Grid item lg={2}>
                      <Box
                        display="flex"
                        minHeight={46}
                        flexDirection="column"
                        justifyContent="center"
                      >
                        <Typography variant="body2">{token.symbol}</Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={2}>
                      <Box
                        display="flex"
                        minHeight={46}
                        flexDirection="column"
                        justifyContent="center"
                      >
                        <Typography variant="body2">{token.free}</Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={2}>
                      <Box
                        display="flex"
                        minHeight={46}
                        flexDirection="column"
                        justifyContent="center"
                      >
                        <Typography variant="body2">{token.frozen}</Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={2}>
                      <Box
                        display="flex"
                        minHeight={46}
                        flexDirection="column"
                        justifyContent="center"
                      >
                        <Typography variant="body2">{token.locked}</Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={2}>
                      <Box
                        display="flex"
                        minHeight={46}
                        flexDirection="column"
                        justifyContent="center"
                      >
                        <TextField
                          fullWidth
                          autoFocus={i === 0}
                          onChange={onSetAmount}
                          placeholder={token.free}
                        />
                      </Box>
                    </Grid>
                    <Grid item lg={2}>
                      <Box
                        display="flex"
                        minHeight={46}
                        flexDirection="column"
                        justifyContent="center"
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            onSelectToken(token.symbol);
                          }}
                        >
                          Mint
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
});
