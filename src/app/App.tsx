import { Global } from '@emotion/react';
import AppRouter from './AppRouter';
import { globalStyles } from './styles/global';

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <AppRouter />
    </>
  );
}

export default App;
