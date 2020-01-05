import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Paper, TextField, Theme, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { RouteComponentProps } from "react-router";
import { SidebarNavigation } from ".";
import { StepsSidebar, ToolbarPadding } from "../../../components";
import routes from "../../../routes";
import ls from "../../../utils/ls";
import { SidebarFooter } from "../../components";

interface IParams extends RouteComponentProps<{ id: string }> {
  classes: any;
}

export const Params = withStyles((theme: Theme) => ({}))(
  ({ classes, history, ...props }: IParams) => {
    const [name, setName] = React.useState(ls.get("bnb", "token.name", ""));
    const [symbol, setSymbol] = React.useState(ls.get("bnb", "token.symbol", ""));
    const [supply, setSupply] = React.useState(ls.get("bnb", "token.supply", "90000000000"));
    const [isMintable, setIsMintable] = React.useState(ls.get("bnb", "token.isMintable", false));

    const onSetName = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setName(e.target.value);
      ls.update("bnb", { token: { name: e.target.value } });
    };

    const onSetSymbol = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSymbol(e.target.value);
      ls.update("bnb", { token: { symbol: e.target.value } });
    };

    const onSetSupply = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const supply = Number(e.target.value);
      setSupply(e.target.value);
      ls.update("bnb", { token: { supply: e.target.value } });
    };

    const onSetMintable = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
      setIsMintable(checked);
      ls.update("bnb", { token: { isMintable: checked } });
    };

    const onNext = () => {
      history.push(routes.bnb.token.new.connect);
    };

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
                <Typography gutterBottom variant="body2">
                  Welcome to the easiest way of creating a digital title in the Binance DEX
                  blockchain.
                </Typography>
                <Typography variant="body2">
                  During the creation process, Simple ICO will NOT store any sensitive data such as
                  private keys or personal information.
                </Typography>
              </Box>
            </Paper>
          </Box>
          <Box mb={4}>
            <Paper elevation={1}>
              <Box p={2}>
                <Typography gutterBottom>Step 1 · Set a name, supply and symbol.</Typography>
                <Box mt={4}>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <Box>
                        <Typography variant="body2">
                          Choose wisely. A good token name is important for a successful funding
                          campaign. A token name and symbol represents the value of a product, an
                          object or a whole company. eg. Ether (the name) &amp; ETH (the symbol)
                          represents the currency of an entire blockchain network.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={6}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                      >
                        <TextField
                          fullWidth
                          label="Name"
                          placeholder="eg. Binance DEX Token"
                          autoFocus
                          onChange={onSetName}
                          value={name}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={4}>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <Box>
                        <Typography variant="body2">
                          The symbol commonly consists of 3 uppercase characters and is limited to 8
                          characters. In the case of the Binance Chain, your chosen symbol will be
                          appended 3 unique characters, eg. TOKEN-D23.{" "}
                          <a href="https://docs.binance.org/tokens.html#issue" target="_blank">
                            Learn more.
                          </a>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={6}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                      >
                        <TextField
                          fullWidth
                          label="Symbol"
                          placeholder="eg. BNB"
                          onChange={onSetSymbol}
                          value={symbol}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={4}>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <Box>
                        <Typography variant="body2">
                          The initial supply of your token if mintable or maximum supply otherwise. This is up to you, but it commonly
                          represents the amount of shares your company is selling, or a fraction of
                          it. It can also represent only 1 object, like a car, and its price would
                          be the actual value of the vehicle determined by the market. The max total supply is 90 billion. Our professional services can help you determine the correct supply.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={6}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                      >
                        <TextField
                          fullWidth
                          label="Supply"
                          placeholder="eg. 1000"
                          onChange={onSetSupply}
                          value={supply}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={4}>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <Box>
                        <Typography variant="body2">
                          Is this token mintable? A mintable token allows the issuer to increase the
                          supply at will.
                        </Typography>
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
                            <Checkbox
                              checked={isMintable}
                              value="checkedB"
                              color="primary"
                              onChange={onSetMintable}
                            />
                          }
                          label="Mintable"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={4}>
                  <Grid container spacing={2} justify="flex-end">
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
  },
);
