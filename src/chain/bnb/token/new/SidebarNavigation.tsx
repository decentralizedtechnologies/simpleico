import { Box, Theme, Typography, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { routes } from "../../../../routes";
import { styles } from "../../../../theme";

export const drawerWidth = 420;

interface ISidebarNavigationProps extends WithStyles, RouteComponentProps {
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
      <Box mb={2}>
        <Link
          to={routes.bnb.token.new.params}
          className={
            isSelected(routes.bnb.token.new.params)
              ? `${classes.sidebarNavigationSelectedLink} ${classes.sidebarNavigationLink}`
              : classes.sidebarNavigationLink
          }
        >
          <Typography variant="body2">Params</Typography>
        </Link>
      </Box>
      <Box mb={2}>
        <Link
          to={routes.bnb.token.new.connect}
          className={
            isSelected(routes.bnb.token.new.connect)
              ? `${classes.sidebarNavigationSelectedLink} ${classes.sidebarNavigationLink}`
              : classes.sidebarNavigationLink
          }
        >
          <Typography variant="body2">Connect</Typography>
        </Link>
      </Box>
      <Box mb={2}>
        <Link
          to={routes.bnb.token.new.create}
          className={
            isSelected(routes.bnb.token.new.create)
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
            isSelected(routes.bnb.token.new.finish)
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
