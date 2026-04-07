import { Global } from '@emotion/react';
import AppRouter from './AppRouter';
import QueryProvider from './providers/QueryProvider';
import { globalStyles } from './styles/global';

function App() {
  return (
    <QueryProvider>
      <Global styles={globalStyles} />
      <AppRouter />
    </QueryProvider>
  );
}

export default App;
