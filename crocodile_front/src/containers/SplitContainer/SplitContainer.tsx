import { FC, ReactElement } from "react";
import { Box, Paper } from "@mui/material";
import classes from "./styles.module.scss";

interface Props {
  leftChild: ReactElement;
  rightChild: ReactElement;
}
export const SplitContainer: FC<Props> = ({ leftChild, rightChild }) => {
  return (
    <Paper className={classes.container}>
      <Box className={classes.leftBox}>{leftChild}</Box>
      <Box className={classes.rightBox}>{rightChild}</Box>
    </Paper>
  );
};
