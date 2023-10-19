import { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Chat } from '../../components/Chat';
import { ROUTES } from '../../constants.ts';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { useNavigate } from 'react-router-dom';
import { DrawTable } from '../../components/Canvas';

const Game: FC = () => {
  const {
    appStore: { roomStore },
  } = useContext<AppStoreContext>(StoreCtx);

  const navigate = useNavigate();

  useEffect(() => {
    if (!roomStore.id) navigate(ROUTES.WELCOME);
  });

  return (
    <div>
      <Chat />
      <DrawTable />
    </div>
  );
};

const connected = observer(Game);
export { connected as Game };
