import { FC, ReactElement } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import classes from "./styles.module.scss";

interface Props {
  text: string;
  onClick: () => void;
  btnText: string;
  children?: ReactElement;
}
export const DataInputContainer: FC<Props> = ({
  btnText,
  text,
  onClick,
  children,
}) => {
  return (
    <Paper className={classes.container}>
      <Stack justifyContent={"space-between"} height={"100%"}>
        <Stack spacing={1}>
          <Typography variant={"h5"}>{text}</Typography>
          {children}
        </Stack>
        <Button variant={"contained"} onClick={onClick}>
          {btnText}
        </Button>
      </Stack>
    </Paper>
  );
};
