import { createRoot } from 'react-dom/client'
import './index.css'

import AppRouter from './router/AppRouter.tsx';
// Mantine UI
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
// Redux
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
// react-hot-toast
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <Provider store={store}>
      <AppRouter />
      <Toaster />
    </Provider>
  </MantineProvider>
);
