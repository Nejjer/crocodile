import { createTheme } from '@mui/material';
import Geometria from './assets/Geometria.ttf';

const borderRadius = 15;
export const theme = createTheme({
  typography: {
    fontFamily: '"Geometria Regular", sans-serif',
  },
  palette: {
    primary: {
      main: '#92b4f4',
    },
    secondary: {
      main: '#92b4f4',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius,
          boxShadow: '2px 6px 10px 1px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          height: '100%',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'none',
          borderRadius: 10,
          fontSize: '1.15rem',
        },
      },
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          sx: {
            borderRadius: '10px',
            borderWidth: 5,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Geometria';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Geometria'), local('Geometria-Regular'), url(${Geometria}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});
