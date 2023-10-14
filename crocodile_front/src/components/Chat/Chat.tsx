import { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { Button } from '@mui/material';
import { chatAPI } from '../../api/ChatAPI.ts';

const Chat: FC = () => {
  const {
    appStore: { chatStore, roomStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    chatStore.init().then((connectionId) => {
      connectionId &&
        chatAPI.joinChatHub({ connectionId, roomId: roomStore.id });
    });
  }, [chatStore, roomStore.id]);

  return (
    <div>
      {chatStore.messages.length}{' '}
      <Button onClick={() => chatAPI.sendMessage('texttext', roomStore.id)}>
        Send
      </Button>
    </div>
  );
};

const connected = observer(Chat);
export { connected as Chat };
