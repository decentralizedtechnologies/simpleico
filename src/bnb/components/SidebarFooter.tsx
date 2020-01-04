import { Box, Theme, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { routes } from "../../routes";

export const drawerWidth = 420;

interface ISidebarFooterProps extends RouteComponentProps<{ id: string }> {
  classes: any;
}

export const SidebarFooter = withStyles((theme: Theme) => ({
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
}))(({ classes, history, match }: ISidebarFooterProps) => {
  return (
    <Box px={3} minHeight="10vh" display="flex" flexDirection="column" justifyContent="center">
      <Typography variant="body2">
        <Link to={routes.bnb.token.tools.select} className={classes.link}>
          BEP2 token tools
        </Link>
      </Typography>
    </Box>
  );
});
