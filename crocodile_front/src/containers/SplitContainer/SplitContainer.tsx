import { FC, ReactElement } from "react";
import { Box, Paper } from "@mui/material";
import classes from "./styles.module.scss";
import { clsx } from "clsx";

interface Props {
  leftChild: ReactElement;
  rightChild: ReactElement;
}
export const SplitContainer: FC<Props> = ({ leftChild, rightChild }) => {
  return (
    <Paper className={classes.container}>
      <Box className={clsx(classes.leftBox, classes.box)}>{leftChild}</Box>
      <Box className={clsx(classes.rightBox, classes.box)}>{rightChild}</Box>
    </Paper>
  );
};
