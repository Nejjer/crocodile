import { FC, useContext } from 'react';
import { Container, CssBaseline, Snackbar, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage/WelcomePage.tsx';
import { theme } from './theme.ts';
import { AppStoreContext, StoreCtx } from './stores/WithStore.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SignUp } from './pages/SignUp/SignUp.tsx';
import { SNACKBAR_DELAY } from './stores/snackbarStore.ts';
import { observer } from 'mobx-react';
import { ROUTES } from './constants.ts';
import { Game } from './pages/Game/Game.tsx';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      enabled: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
const App: FC = () => {
  const {
    appStore: { snackbarStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Container>
          <Routes>
            <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.GAME} element={<Game />} />
            <Route index element={<Navigate to={ROUTES.WELCOME} />} />
          </Routes>
          <Snackbar
            open={snackbarStore.isOpen}
            autoHideDuration={SNACKBAR_DELAY}
            onClose={() => snackbarStore.onClose()}
            message={snackbarStore.message}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
        </Container>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const connected = observer(App);
export { connected as App };
