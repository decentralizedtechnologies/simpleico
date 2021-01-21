import {
  Backdrop,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { SidebarNavigation } from ".";
import { StepsSidebar, ToolbarPadding } from "../../../../components";
import routes from "../../../../routes";
import { styles } from "../../../../theme";
import ls from "../../../../utils/ls";
import {
  enableEthereumWallet,
  isEthereumEnabled,
  isWeb3Compatible,
  Networks,
  networks,
} from "../../client";
import { SidebarFooter } from "../../components";
import { NAMESPACE } from "../../constants";
import { DependencyContext } from "../../context";
import { PolkadotClient } from "../../model";
import { ERC20ContractModel } from "../../model/ERC20ContractModel";

interface Props extends WithStyles, RouteComponentProps {}

const Component: React.FC<Props> = ({ classes, history, ...props }) => {
  const [network, setNetwork] = React.useState<Networks>(networks.mainnet);
  const [address, setAddress] = React.useState("");
  const [balance, setBalance] = React.useState("0.00");
  const [isGettingAccount, setIsGettingAccount] = React.useState(false);
  const [isIssuingToken, setIsIssuingToken] = React.useState(false);
  const [isWalletEnabled, setIsWalletEnabled] = React.useState(false);

  const container = React.useContext(DependencyContext);
  const ERC20Contract = container.get<ERC20ContractModel>(ERC20ContractModel.type);
  const Client = container.get<PolkadotClient>(PolkadotClient.type);

  React.useEffect(() => {
    getAddress();
  }, [isWalletEnabled]);

  React.useEffect(() => {
    (async () => {
      await Client.init();
    })();
  }, []);

  const onEnableEthereumClient = async () => {
    await enableEthereumWallet();
    setTimeout(() => {
      setIsWalletEnabled(isEthereumEnabled());
    }, 1500);
  };

  const onCreate = async () => {
    try {
      setIsIssuingToken(true);

      const name = ls.get(NAMESPACE, "erc20.name");
      const symbol = ls.get(NAMESPACE, "erc20.symbol");
      const supply = Number(ls.get(NAMESPACE, "erc20.supply"));

      await ERC20Contract.deploy(Client);

      history.push(routes.polkadot.erc20.new.finish);
    } catch (error) {
      console.error(error);
      setIsIssuingToken(false);
    }
  };

  const onBack = () => {
    history.push(routes.polkadot.erc20.new.params);
  };

  const getAddress = async (): Promise<void> => {
    try {
    } catch (error) {
      console.error(error);
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
                    Your Polkadot wallet is not connected <CancelOutlinedIcon />
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
                In this step you will sign a transaction in the Polkadot {network} network. Confirm
                your information and then click "Create".
              </Typography>
              <Box mt={4}>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Name · <Link to={routes.polkadot.erc20.new.params}>edit</Link>
                  </Typography>
                  <Typography>{ls.get(NAMESPACE, "erc20.name")}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Symbol · <Link to={routes.polkadot.erc20.new.params}>edit</Link>
                  </Typography>
                  <Typography>{ls.get(NAMESPACE, "erc20.symbol")}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Supply · <Link to={routes.polkadot.erc20.new.params}>edit</Link>
                  </Typography>
                  <Typography>{ls.get(NAMESPACE, "erc20.supply")}</Typography>
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
                    <Button variant="contained" color="primary" onClick={onCreate}>
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
};

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
}))(Component);
