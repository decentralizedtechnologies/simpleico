import { Box, Theme, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { routes } from "../../../routes";
import { styles } from "../../../theme";

export const drawerWidth = 420;

interface ISidebarNavigationProps extends RouteComponentProps<{ id: string }> {
  classes: any;
}

export const SidebarNavigation = withStyles((theme: Theme) => ({
  ...styles(theme),
}))(({ classes, history, match }: ISidebarNavigationProps) => {
  const isSelected = (route: string): boolean => {
    const regexp = new RegExp(route, "gi");
    return regexp.test(history.location.pathname);
  };

  return (
    <Box px={3}>
      <Box width={140} mb={4}>
        <img src="/svg/logo-binance-dex.svg" width="100%" height="auto" />
      </Box>
      <Box>
        <Typography
          variant="body2"
          className={
            isSelected(routes.bnb.token.tools.select)
              ? `${classes.sidebarNavigationSelectedLink} ${classes.sidebarNavigationLink}`
              : classes.sidebarNavigationLink
          }
        >
          Select
        </Typography>
      </Box>
    </Box>
  );
});
