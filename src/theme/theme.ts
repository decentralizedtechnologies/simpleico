import { createMuiTheme } from "@material-ui/core/styles";
import { darken, lighten } from "polished";

export const spacingUnit = 16;

export const palette = {
  pink: {
    main: "#ff40b4",
    light: lighten(0.05, "#ff40b4"),
    dark: darken(0.05, "#ff40b4"),
  },
};

export const theme = createMuiTheme({
  spacing: 8,
  palette: {
    action: {
      active: "#434343",
    },
    background: {
      default: "whitesmoke",
    },
    primary: {
      light: lighten(0.05, "#3f2f90"),
      main: "#3f2f90",
      dark: darken(0.05, "#3f2f90"),
    },
    secondary: {
      light: lighten(0.05, "#ffdd00"),
      main: "#ffdd00",
      dark: darken(0.05, "#ffdd00"),
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    subtitle2: {
      fontSize: "1.1rem",
    },
  },
});
