import {
  Backdrop,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { History } from "history";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { TransactionReceipt } from "web3-core";
import { SidebarNavigation } from ".";
import { StepsSidebar, ToolbarPadding } from "../../../components";
import routes from "../../../routes";
import { styles } from "../../../theme";
import ls from "../../../utils/ls";
import {
  enableEthereumWallet,
  ERC20,
  getClient,
  isEthereumEnabled,
  isWeb3Compatible,
  networkNameByVersion,
  Networks,
  networks,
  setClientProviderByNetwork,
} from "../../client";
import { SidebarFooter } from "../../components";

interface ICreate extends RouteComponentProps<{ id: string }> {
  classes: any;
  history: History;
}

export const Create = withStyles((theme: Theme) => ({
  ...styles(theme),
  networkSelect: {
    paddingBottom: 12,
    paddingTop: 12,
  },
  walletConnected: {
    "& svg": {
      fontSize: "1rem",
    },
  },
}))(({ classes, history, ...props }: ICreate) => {
  const [network, setNetwork] = React.useState<Networks>(networks.mainnet);
  const [address, setAddress] = React.useState("");
  const [balance, setBalance] = React.useState("0.00");
  const [isGettingAccount, setIsGettingAccount] = React.useState(false);
  const [isIssuingToken, setIsIssuingToken] = React.useState(false);
  const [isWalletEnabled, setIsWalletEnabled] = React.useState(isEthereumEnabled());

  React.useEffect(() => {
    getAddress();
  }, [isWalletEnabled]);

  const onEnableEthereumClient = async () => {
    await enableEthereumWallet();
    setTimeout(() => {
      setIsWalletEnabled(isEthereumEnabled());
    }, 1500);
  };

  const onCreate = async () => {
    try {
      setIsIssuingToken(true);
      const name = ls.get("eth", "erc20.name");
      const symbol = ls.get("eth", "erc20.symbol");
      const supply = Number(ls.get("eth", "erc20.supply"));
      const client = setClientProviderByNetwork(await getClient(network), network);
      const txObject = await ERC20.deploy(client)(name, symbol, supply, 18);
      const res = await txObject
        .send({ from: address })
        .on("receipt", (receipt: TransactionReceipt) => {
          ls.update("eth", { erc20: { network, receipt } });
          history.push(routes.eth.erc20.new.finish);
        });
      console.log(res);
    } catch (error) {
      setIsIssuingToken(false);
      console.error(error);
    }
  };

  const onBack = () => {
    history.push(routes.eth.erc20.new.params);
  };

  const getAddress = async (): Promise<void> => {
    try {
      if (!isWeb3Compatible() || !isWalletEnabled) {
        return;
      }

      setIsGettingAccount(true);
      setAddress("");

      let client = await getClient();
      const version = await client.eth.net.getId();
      const _network = networkNameByVersion[version];
      setNetwork(_network);
      client = setClientProviderByNetwork(client, _network);
      console.log(client);
      const _address = (await (window as any).ethereum.enable())[0];
      const _balance = await client.eth.getBalance(_address);
      setAddress(_address);
      setBalance(client.utils.fromWei(_balance, "ether"));
      setIsGettingAccount(false);
    } catch (error) {
      console.error(error);
      setAddress("");
      setIsGettingAccount(false);
    }
  };

  return (
    <Box display="flex">
      <Backdrop className={classes.backdrop} open={isGettingAccount || isIssuingToken}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <StepsSidebar footer={<SidebarFooter history={history} {...props} />}>
        <SidebarNavigation history={history} {...props} />
      </StepsSidebar>
      <Container maxWidth="xl">
        <ToolbarPadding />
        <Box mb={4}>
          <Paper elevation={1}>
            <Box p={2}>
              {isWeb3Compatible() ? (
                <>
                  {!isWalletEnabled ? (
                    <>
                      <Typography gutterBottom variant="body2" className={classes.walletConnected}>
                        Your browser supports Web3 wallets <CheckCircleOutlineIcon />
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          onEnableEthereumClient();
                        }}
                      >
                        Enable Web3 to continue
                      </Button>
                    </>
                  ) : (
                    <Box>
                      {Boolean(address) && Boolean(balance) && (
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
                      )}
                    </Box>
                  )}
                </>
              ) : (
                <>
                  <Typography gutterBottom variant="body2" className={classes.walletConnected}>
                    Your Ethereum wallet is not connected <CancelOutlinedIcon />
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    You need to install a{" "}
                    <a href="https://metamask.io/" target="_blank" rel="nofollow">
                      Web3 compatible browser extension
                    </a>{" "}
                    like metamask or open SimpleICO.com in a{" "}
                    <a href="https://www.opera.com/crypto" target="_blank" rel="nofollow">
                      browser that supports Web3
                    </a>
                    .
                  </Typography>
                </>
              )}
            </Box>
          </Paper>
        </Box>
        <Box mb={4}>
          <Paper elevation={1}>
            <Box p={2}>
              <Typography gutterBottom>Step 2 · Create your token</Typography>
              <Typography variant="body2">
                In this step you will sign a transaction in the Ethereum {network} network. Confirm
                your information and then click "Create".
              </Typography>
              <Box mt={4}>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Name · <Link to={routes.eth.erc20.new.params}>edit</Link>
                  </Typography>
                  <Typography>{ls.get("eth", "erc20.name")}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Symbol · <Link to={routes.eth.erc20.new.params}>edit</Link>
                  </Typography>
                  <Typography>{ls.get("eth", "erc20.symbol")}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Supply · <Link to={routes.eth.erc20.new.params}>edit</Link>
                  </Typography>
                  <Typography>{ls.get("eth", "erc20.supply")}</Typography>
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onCreate}
                      disabled={!Boolean(address) || balance === "0.00"}
                    >
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
