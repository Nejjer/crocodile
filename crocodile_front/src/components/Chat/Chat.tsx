import { FC, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { Button, Paper, Stack, TextField } from '@mui/material';
import { chatAPI } from '../../api/ChatAPI.ts';
import { Message } from '../Message';

const Chat: FC = () => {
  const [message, setMessage] = useState('');

  const {
    appStore: { chatStore, roomStore, profileStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    chatStore.init().then((connectionId) => {
      connectionId &&
        chatAPI.joinChatHub({ connectionId, roomId: roomStore.id });
    });
  }, [chatStore, roomStore.id]);

  const handleSendMessage = () => {
    chatAPI
      .sendMessage(message, roomStore.id, profileStore.name)
      .then(() => setMessage(''));
  };

  return (
    <Paper sx={{ padding: 1 }}>
      <Stack>
        {chatStore.messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            author={message.author}
          />
        ))}
      </Stack>
      <Stack direction={'row'} gap={1} sx={{ marginTop: 1 }}>
        <TextField
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button disabled={!message} onClick={handleSendMessage}>
          Send
        </Button>
      </Stack>
    </Paper>
  );
};

const connected = observer(Chat);
export { connected as Chat };
