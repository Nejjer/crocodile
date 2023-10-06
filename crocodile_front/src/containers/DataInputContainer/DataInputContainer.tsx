import { FC, ReactElement } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import classes from './styles.module.scss';
import { LoadingButton } from '@mui/lab';

interface Props {
  text: string;
  onClick: () => void;
  btnText: string;
  loading: boolean;
  children?: ReactElement;
}
export const DataInputContainer: FC<Props> = ({
  btnText,
  text,
  onClick,
  children,
  loading,
}) => {
  return (
    <Paper className={classes.container}>
      <Stack justifyContent={'space-between'} height={'100%'}>
        <Stack spacing={1}>
          <Typography variant={'h5'}>{text}</Typography>
          {children}
        </Stack>
        <LoadingButton
          variant={'contained'}
          onClick={onClick}
          loading={loading}
        >
          {btnText}
        </LoadingButton>
      </Stack>
    </Paper>
  );
};
