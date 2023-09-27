import { createTheme } from "@mui/material";

const borderRadius = 15;
export const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius,
          boxShadow: "2px 6px 10px 1px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
  },
});
