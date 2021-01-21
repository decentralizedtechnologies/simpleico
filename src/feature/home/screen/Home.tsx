import {
  Box,
  Card,
  CardContent,
  CardHeader,
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
import { SidebarNavigation } from "../component";

interface Props extends WithStyles, RouteComponentProps {}

const Component: React.FC<Props> = ({ classes, history, ...props }) => {
  return (
    <Box display="flex">
      <StepsSidebar>
        <SidebarNavigation history={history} {...props} />
      </StepsSidebar>
      <Container maxWidth="xl">
        <ToolbarPadding />
        <Box mb={4}>
          <Paper elevation={1}>
            <Box p={2}>
              <Typography variant="body2" gutterBottom>
                BEP2 token tools
              </Typography>
              <Typography variant="body2">
                Select an option, connect your wallet and run the desired BEP2 token function.
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
                <CardHeader title="Issue" />
                <CardContent className={classes.cardContent}>
                  Create a new BEP2 asset on Binance Chain.
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={4}>
              <Card
                className={classes.card}
                onClick={() => {
                  history.push(routes.bnb.token.tools.mint.connect);
                }}
              >
                <CardHeader title="Mint" />
                <CardContent className={classes.cardContent}>
                  Increase the supply of a mintable BEP2 token.
                </CardContent>
              </Card>
            </Grid>
            {/* <Grid item lg={4}>
              <Card
                className={classes.card}
                onClick={() => {
                  history.push(routes.bnb.token.tools.mint.params);
                }}
              >
                <CardHeader title="Burn" />
                <CardContent className={classes.cardContent}>
                  Decrease the supply of a mintable BEP2 token.
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={4}>
              <Card
                className={classes.card}
                onClick={() => {
                  history.push(routes.bnb.token.tools.mint.params);
                }}
              >
                <CardHeader title="Freeze" />
                <CardContent className={classes.cardContent}>
                  Freeze some amount of token.
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={4}>
              <Card
                className={classes.card}
                onClick={() => {
                  history.push(routes.bnb.token.tools.mint.params);
                }}
              >
                <CardHeader title="Unfreeze" />
                <CardContent className={classes.cardContent}>
                  Unfreeze some amount of token.
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={4}>
              <Card
                className={classes.card}
                onClick={() => {
                  history.push(routes.bnb.token.tools.mint.params);
                }}
              >
                <CardHeader title="Timelock" />
                <CardContent className={classes.cardContent}>Lock token for a while.</CardContent>
              </Card>
            </Grid>
            <Grid item lg={4}>
              <Card
                className={classes.card}
                onClick={() => {
                  history.push(routes.bnb.token.tools.mint.params);
                }}
              >
                <CardHeader title="Time unlock" />
                <CardContent className={classes.cardContent}>Unlock locked tokens.</CardContent>
              </Card>
            </Grid>
            <Grid item lg={4}>
              <Card
                className={classes.card}
                onClick={() => {
                  history.push(routes.bnb.token.tools.mint.params);
                }}
              >
                <CardHeader title="Time relock" />
                <CardContent className={classes.cardContent}>
                  Lock more token or increase locked period.
                </CardContent>
              </Card>
            </Grid> */}
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
  cardContent: {
    minHeight: 80,
  },
}))(Component);
