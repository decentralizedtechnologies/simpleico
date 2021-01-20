import { Box, Grid, Theme, Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { routes } from "../../../routes";

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
      <Grid container>
        <Grid item lg={10}>
          <Typography variant="body2">
            <Link to={routes.eth.erc20.tools.select} className={classes.link}>
              ERC20 token tools
            </Link>
          </Typography>
        </Grid>
        <Grid item lg={2}>
          <Box color="white" textAlign="right">
            <a
              href="https://github.com/decentralizedtechnologies/simpleico"
              target="_blank"
              rel="nofollow"
            >
              <GitHubIcon fontSize="small" color="inherit" />
            </a>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});
