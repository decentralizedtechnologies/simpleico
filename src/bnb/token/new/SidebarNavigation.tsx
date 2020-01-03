import { Box, Theme, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { routes } from "../../../routes";

export const drawerWidth = 420;

interface ISidebarNavigationProps extends RouteComponentProps<{ id: string }> {
  classes: any;
}

export const SidebarNavigation = withStyles((theme: Theme) => ({
  link: {
    color: "white",
    textDecoration: "none",
  },
  selected: {
    fontWeight: 700,
    "& p": {
      fontWeight: 700,
    },
  },
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
              ? `${classes.selected} ${classes.link}`
              : classes.link
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
              ? `${classes.selected} ${classes.link}`
              : classes.link
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
              ? `${classes.selected} ${classes.link}`
              : classes.link
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
              ? `${classes.selected} ${classes.link}`
              : classes.link
          }
        >
          Finish
        </Typography>
      </Box>
    </Box>
  );
});
