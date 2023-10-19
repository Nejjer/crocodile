import { Box, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { FC } from 'react';
import classes from './styles.module.scss';

interface Props {
  text: string;
  author: string;
}

const Message: FC<Props> = ({ author, text }) => {
  return (
    <Stack direction={'column'}>
      <Typography
        fontWeight={'bold'}
        color={'secondary'}
        sx={{ paddingLeft: 1 }}
      >
        {author}:
      </Typography>
      <Box className={classes.boxMessage}>
        <Typography>{text}</Typography>
      </Box>
    </Stack>
  );
};

const connected = observer(Message);
export { connected as Message };
