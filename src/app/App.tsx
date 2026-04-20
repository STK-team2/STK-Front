import { Global } from '@emotion/react';
import AppRouter from './AppRouter';
import QueryProvider from './providers/QueryProvider';
import { globalStyles } from './styles/global';
import Toast from '../shared/ui/Toast';

function App() {
  return (
    <QueryProvider>
      <Global styles={globalStyles} />
      <Toast />
      <AppRouter />
    </QueryProvider>
  );
}

export default App;
