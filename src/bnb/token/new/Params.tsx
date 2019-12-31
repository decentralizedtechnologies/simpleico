import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Theme,
  Typography,
  withStyles,
  Button,
} from "@material-ui/core";
import { History } from "history";
import React from "react";
import { RouteComponentProps } from "react-router";
import { StepsSidebar, ToolbarPadding } from "../../../components";

interface IParams extends RouteComponentProps<{ id: string }> {
  classes: any;
  history: History;
}

export const Params = withStyles((theme: Theme) => ({}))(
  ({ classes, match, history, ...props }: IParams) => {
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
                <Typography gutterBottom>Step 1</Typography>
                <Typography gutterBottom variant="body2">
                  Name, supply and symbol.
                </Typography>
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
                          The symbol commonly consists (but is not limited to) of 3 uppercase
                          characters, eg. BNB, BTC, ETH.
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
                        <TextField fullWidth label="Symbol" placeholder="eg. BNB" />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={4}>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <Box>
                        <Typography variant="body2">
                          The initial supply of your token. This is up to you, but it commonly
                          represents the amount of shares your company is selling, or a fraction of
                          it. It can also represent only 1 object, like a car, and its price would
                          be the actual value of the vehicle.
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
                        <TextField fullWidth label="Supply" placeholder="eg. 1000" />
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
                          control={<Checkbox checked={false} value="checkedB" color="primary" />}
                          label="Mintable"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={4}>
                  <Grid container spacing={2} justify="flex-end">
                    <Grid item>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                      >
                        <Button variant="contained" color="primary">Next</Button>
                      </Box>
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
