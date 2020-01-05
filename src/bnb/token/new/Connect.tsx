import { Box, Container, Grid, Paper, Theme, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { RouteComponentProps } from "react-router";
import { SidebarNavigation } from ".";
import { StepsSidebar, ToolbarPadding } from "../../../components";
import routes from "../../../routes";
import ls from "../../../utils/ls";
import { ConnectWalletWidget, SidebarFooter } from "../../components";

interface IConnect extends RouteComponentProps<{ id: string }> {
  classes: any;
}

export const Connect = withStyles((theme: Theme) => ({
}))(({ classes, history, ...props }: IConnect) => {
  const onNext = () => {
    history.push(routes.bnb.token.new.create);
  };

  const onBack = () => {
    history.push(routes.bnb.token.new.params);
  };

  const onNextWithKeystoreFile = () => {
    history.push(routes.bnb.token.tools.mint.params);
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
              <ConnectWalletWidget onNext={onNext} onBack={onBack} onNextWithKeystoreFile={onNextWithKeystoreFile} history={history} {...props} />
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
});
