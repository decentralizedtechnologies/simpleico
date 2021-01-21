import { Box, Grid, Theme, WithStyles } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { withStyles } from "@material-ui/styles";
import React from "react";

interface ISidebarFooterProps extends WithStyles {}

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
}))(({ classes }: ISidebarFooterProps) => {
  return (
    <Box px={3} minHeight="10vh" display="flex" flexDirection="column" justifyContent="center">
      <Grid container>
        <Grid item lg={10}></Grid>
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
