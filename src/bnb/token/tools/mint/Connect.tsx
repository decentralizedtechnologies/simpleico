import { Box, Container, Paper, Theme, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { RouteComponentProps } from "react-router";
import { StepsSidebar, ToolbarPadding } from "../../../../components";
import routes from "../../../../routes";
import { ConnectWalletWidget, SidebarFooter } from "../../../components";
import { SidebarNavigation } from "./SidebarNavigation";

interface IConnect extends RouteComponentProps<{ id: string }> {
  classes: any;
}

export const Connect = withStyles((theme: Theme) => ({}))(
  ({ classes, history, ...props }: IConnect) => {
    const onNext = () => {
      history.push(routes.bnb.token.tools.mint.params);
    };

    const onBack = () => {
      history.push(routes.bnb.token.tools.select);
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
                <Typography gutterBottom>Step 1 · Connect your Binance Chain wallet</Typography>
                <ConnectWalletWidget onNext={onNext} onBack={onBack} onNextWithKeystoreFile={onNextWithKeystoreFile} history={history} {...props} />
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    );
  },
);
