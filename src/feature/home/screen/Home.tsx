import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { StepsSidebar, ToolbarPadding } from "../../../components";
import routes from "../../../routes";
import { styles } from "../../../theme";
import { SidebarFooter, SidebarNavigation } from "../component";

interface Props extends WithStyles, RouteComponentProps {}

const Component: React.FC<Props> = ({ classes, history, ...props }) => {
  return (
    <Box display="flex">
      <StepsSidebar footer={<SidebarFooter />} history={history} {...props}>
        <SidebarNavigation history={history} {...props} />
      </StepsSidebar>
      <Container maxWidth="xl">
        <ToolbarPadding />
        <Box mb={4}>
          <Paper elevation={1}>
            <Box p={2}>
              <Typography variant="h4" gutterBottom>
                Simple Smart Contract tools
              </Typography>
              <Typography variant="body2">
                Select a chain below and deploy smart contracts, easily.
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Box mb={4}>
          <Grid container spacing={2}>
            <Grid item lg={4}>
              <Card
                className={classes.card}
                onClick={() => {
                  history.push(routes.bnb.token.new.params);
                }}
              >
                <Box className={classes.media}>
                  <img src="/svg/logo-binance-dex.svg" width="100%" height="auto" />
                </Box>
                <CardContent className={classes.cardContent}>
                  Create a new BEP2 asset on the Binance Chain.
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={4}>
              <Card
                className={classes.card}
                onClick={() => {
                  history.push(routes.eth.erc20.new.params);
                }}
              >
                <Box className={classes.media}>
                  <img src="/eth/logo-ethereum-black-horizontal.png" width="100%" height="auto" />
                </Box>
                <CardContent className={classes.cardContent}>
                  Create a new ERC20 token on the Ethereum Chain.
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={4}>
              <Card
                className={classes.card}
                onClick={() => {
                  history.push(routes.polkadot.erc20.new.params);
                }}
              >
                <Box className={classes.media}>
                  <img src="/polkadot/logo-polkadot.png" width="100%" height="auto" />
                </Box>
                <CardContent className={classes.cardContent}>
                  Create a new ERC20 token on the Polkadot Chain.
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export const Home = withStyles((theme: Theme) => ({
  ...styles(theme),
  card: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  media: {
    height: 156,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    "& img": {
      width: "100%",
      height: "auto",
    },
  },
  cardContent: {
    minHeight: 80,
  },
}))(Component);
