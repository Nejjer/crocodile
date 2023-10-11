import { FC, useContext, useState } from 'react';
import { SplitContainer } from '../../containers/SplitContainer/SplitContainer.tsx';
import { DataInputContainer } from '../../containers/DataInputContainer/DataInputContainer.tsx';
import { TextField } from '@mui/material';
import { useQuery } from 'react-query';
import { roomApi } from '../../api/RoomAPI.ts';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { useNavigate } from 'react-router-dom';

const WelcomePage: FC = () => {
  const {
    appStore: { roomStore },
  } = useContext<AppStoreContext>(StoreCtx);
  const [roomId, setRoomId] = useState('');
  const createFetch = useQuery({
    queryKey: 'create',
    queryFn: roomApi.create,
    onSuccess: (data) => onSuccess(data.data),
  });
  const joinFetch = useQuery({
    queryKey: 'join',
    queryFn: () => roomApi.join(roomId),
    onSuccess: (data) => onSuccess(data.data),
  });
  const navigate = useNavigate();
  const onSuccess = (id: string) => {
    roomStore.id = id;
    navigate('/sign-up');
  };

  return (
    <SplitContainer
      leftChild={
        <DataInputContainer
          btnText={'Присоединиться'}
          text={'Идентификатор комнаты:'}
          onClick={joinFetch.refetch}
          loading={joinFetch.isFetching}
        >
          <TextField
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
          />
        </DataInputContainer>
      }
      rightChild={
        <DataInputContainer
          btnText={'Создать комнату'}
          text={
            'Создайте комнату, к вам смогут присоединиться ваши друзья по идентификатору комнаты.'
          }
          onClick={createFetch.refetch}
          loading={createFetch.isFetching}
        />
      }
    />
  );
};

const connected = observer(WelcomePage);
export { connected as WelcomePage };
