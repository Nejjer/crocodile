import { FC, useContext, useEffect, useState } from 'react';
import { SplitContainer } from '../../containers/SplitContainer/SplitContainer.tsx';
import { DataInputContainer } from '../../containers/DataInputContainer/DataInputContainer.tsx';
import { TextField } from '@mui/material';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { useQuery } from 'react-query';
import { profileApi } from '../../api/ProfileAPI.ts';
import { useNavigate } from 'react-router-dom';
import Info from './Info.tsx';

const SignUp: FC = () => {
  const {
    appStore: { roomStore },
  } = useContext<AppStoreContext>(StoreCtx);
  const [name, setName] = useState('');
  const loginFetch = useQuery({
    queryKey: 'login',
    queryFn: () => profileApi.login(roomStore.id, name),
    onSuccess: (data) => (roomStore.id = data.data),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!roomStore.id) navigate('/welcome');
  });

  return (
    <SplitContainer
      leftChild={<Info />}
      rightChild={
        <DataInputContainer
          text={'Придумайте ник'}
          btnText={'Войти'}
          onClick={loginFetch.refetch}
          loading={loginFetch.isFetching}
        >
          <TextField onChange={(e) => setName(e.target.value)} value={name} />
        </DataInputContainer>
      }
    />
  );
};

const connected = observer(SignUp);
export { connected as SignUp };
