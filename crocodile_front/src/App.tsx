import { FC } from "react";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/sign_up/SignUp.tsx";

export const App: FC = () => {
  return (
    <Container>
      <Routes>
        <Route path={"/sign-up"} element={<SignUp />} />
      </Routes>
    </Container>
  );
};