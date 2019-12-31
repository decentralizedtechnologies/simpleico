import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import { History } from "history";
import React from "react";
import { RouteComponentProps } from "react-router";
import { StepsSidebar, ToolbarPadding } from "../../../components";
import routes from "../../../routes";
import ls from "../../../utils/ls";

interface IConnect extends RouteComponentProps<{ id: string }> {
  classes: any;
  history: History;
}

export const Connect = withStyles((theme: Theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.primary.light}`,
  },
}))(({ classes, match, history, ...props }: IConnect) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, value: any): void => {
    setValue(value);
  };

  const onNext = () => {};

  const onBack = () => {
    history.push(routes.bnb.token.new.params);
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
              <Typography gutterBottom>You are creating:</Typography>
              <Grid container>
                <Grid item lg={1}>
                  <Typography variant="body2">Name:</Typography>
                </Grid>
                <Grid item lg={11}>
                  <Typography variant="body2">{ls.get("bnb", "token.name")}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item lg={1}>
                  <Typography variant="body2">Symbol:</Typography>
                </Grid>
                <Grid item lg={11}>
                  <Typography variant="body2">{ls.get("bnb", "token.symbol")}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item lg={1}>
                  <Typography variant="body2">Supply:</Typography>
                </Grid>
                <Grid item lg={11}>
                  <Typography variant="body2">{ls.get("bnb", "token.supply")}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item lg={1}>
                  <Typography variant="body2">Mintable:</Typography>
                </Grid>
                <Grid item lg={11}>
                  <Typography variant="body2">
                    {ls.get("bnb", "token.isMintable", false) ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
        <Box mb={4}>
          <Paper elevation={1}>
            <Box p={2}>
              <Typography gutterBottom>Step 2 · Connect your Binance Chain wallet.</Typography>
              <Typography gutterBottom variant="body2">
                Simple ICO will NOT store your private keys at any time.{" "}
                <a href="https://github.com/decentralizedtechnologies/simpleico" target="_blank">
                  You can check the code here,
                </a>{" "}
                and you can even run a copy of the Simple ICO dApp on your computer if in doubt.
              </Typography>
              <Box mt={4} display="flex" flexGrow={1}>
                <Tabs
                  orientation="vertical"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  className={classes.tabs}
                >
                  <Tab label="Mobile Wallet" />
                  <Tab label="Ledger Device" />
                  <Tab label="Trezor Device" />
                  <Tab label="Keystore File" />
                  <Tab label="Recovery Phrase" />
                </Tabs>
                <TabPanel index={0} value={value}>
                  Mobile Wallet
                </TabPanel>
                <TabPanel index={1} value={value}>
                  Ledger Device
                </TabPanel>
                <TabPanel index={2} value={value}>
                  Trezor Device
                </TabPanel>
                <TabPanel index={3} value={value}>
                  Keystore File
                </TabPanel>
                <TabPanel index={4} value={value}>
                  Recovery Phrase
                </TabPanel>
              </Box>
              <Box mt={4}>
                <Grid container spacing={2} justify="flex-end">
                  <Grid item>
                    <Button variant="contained" onClick={onBack}>
                      Back
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={onNext}>
                      Next
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

const TabPanel = withStyles((theme: Theme) => ({}))(
  ({
    classes,
    value,
    index,
    children,
    ...props
  }: {
    classes: any;
    value: number;
    index: number;
    children: any;
  }) => {
    return (
      <Box hidden={value !== index} role="tabpanel" p={2}>
        {children}
      </Box>
    );
  },
);
