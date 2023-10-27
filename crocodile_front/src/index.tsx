import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { WithStore } from './stores/WithStore.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <WithStore>
      <App />
    </WithStore>
  </BrowserRouter>,
);
