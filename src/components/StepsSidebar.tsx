import { AppBar, Box, Drawer, Theme, Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { History } from "history";
import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";

export const drawerWidth = 420;

interface IStepsSidebarProps {
  classes: any;
  history?: History;
  children: any;
}

export const StepsSidebar = withStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "& svg": {
      color: "white",
    },
  },
  logoBox: {
    minHeight: 98,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 120,
  },
}))(({ classes, history, children }: IStepsSidebarProps) => (
  <Drawer
    className={classes.drawer}
    variant="permanent"
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
      <AppBar position="relative" elevation={0}>
        <Toolbar>
          <Box className={classes.logoBox}>
            <Link to={routes.root}>
              <img src="/svg/logo-simpleico-white.svg" width="100%" height="auto" />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box>{children}</Box>
      <Box minHeight="15vh"></Box>
    </Box>
  </Drawer>
));
