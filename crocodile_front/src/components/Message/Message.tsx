import { Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { FC } from 'react';

interface Props {
  text: string;
  author: string;
}

const Message: FC<Props> = ({ author, text }) => {
  return (
    <Stack direction={'column'}>
      <Typography>{author}</Typography>
      <Typography>{text}</Typography>
    </Stack>
  );
};

const connected = observer(Message);
export { connected as Message };
