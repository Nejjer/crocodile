import { FC } from "react";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/sign_up/SignUp.tsx";
import { theme } from "./theme.ts";

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Routes>
          <Route path={"/sign-up"} element={<SignUp />} />
          <Route path={"/"} element={<Navigate to={"/sign-up"} />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};
