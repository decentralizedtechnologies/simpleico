import { Box, Theme, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
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
      <Box mb={4}>
        <Box width={140} mb={1}>
          <img src="/svg/logo-ethereum-white-horizontal.svg" width="100%" height="auto" />
        </Box>
        <Typography style={{ color: "white" }}>ERC20 Token Tools · Create</Typography>
      </Box>
      <Box mb={2}>
        <Link
          to={routes.eth.erc20.new.params}
          className={
            isSelected(routes.eth.erc20.new.params)
              ? `${classes.sidebarNavigationSelectedLink} ${classes.sidebarNavigationLink}`
              : classes.sidebarNavigationLink
          }
        >
          <Typography variant="body2">Params</Typography>
        </Link>
      </Box>
      <Box mb={2}>
        <Link
          to={routes.eth.erc20.new.create}
          className={
            isSelected(routes.eth.erc20.new.create)
              ? `${classes.sidebarNavigationSelectedLink} ${classes.sidebarNavigationLink}`
              : classes.sidebarNavigationLink
          }
        >
          <Typography variant="body2">Create</Typography>
        </Link>
      </Box>
      <Box>
        <Typography
          variant="body2"
          className={
            isSelected(routes.eth.erc20.new.finish)
              ? `${classes.sidebarNavigationSelectedLink} ${classes.sidebarNavigationLink}`
              : classes.sidebarNavigationLink
          }
        >
          Finish
        </Typography>
      </Box>
    </Box>
  );
});
