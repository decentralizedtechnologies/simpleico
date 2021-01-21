import { AppBar, Box, Drawer, Theme, Toolbar, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import routes from "../routes";

export const drawerWidth = 420;
export const drawerWidthMD = 280;

interface Props extends WithStyles, RouteComponentProps {
  footer?: any;
}

const Component: React.FC<Props> = ({ classes, history, children, footer }) => (
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
          <Box
            className={classes.logoBox}
            onClick={() => {
              history.push(routes.root);
            }}
          >
            <img src="/svg/logo-simpleico-white.svg" width="100%" height="auto" />
          </Box>
        </Toolbar>
      </AppBar>
      {children}
      {footer && footer}
    </Box>
  </Drawer>
);

export const StepsSidebar = withStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down("md")]: {
      width: drawerWidthMD,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "& svg": {
      color: "white",
    },
    [theme.breakpoints.down("md")]: {
      width: drawerWidthMD,
    },
  },
  logoBox: {
    minHeight: 98,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 120,
    "&:hover": {
      cursor: "pointer",
    },
  },
}))(Component);
