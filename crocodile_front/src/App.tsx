import { FC } from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage/WelcomePage.tsx';
import { theme } from './theme.ts';
import { WithStore } from './stores/WithStore.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SignUp } from './pages/SignUp/SignUp.tsx';

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
export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <WithStore>
          <CssBaseline />
          <Container>
            <Routes>
              <Route path={'/welcome'} element={<WelcomePage />} />
              <Route path={'/sign-up'} element={<SignUp />} />
              <Route path={'/'} element={<Navigate to={'/welcome'} />} />
            </Routes>
          </Container>
        </WithStore>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
