import { RouterProvider } from 'react-router-dom';
import { appRoutersConfig } from '@lib/configs/RouterConfig';
import { GlobalStyles } from '@lib/theme/globalStyles';
import { DefaultToastOptions, Toaster } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
import { Provider } from 'react-redux';
import { store } from './store';

const TOAST_OPTIONS: DefaultToastOptions = { style: { fontSize: 15 } };

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" toastOptions={TOAST_OPTIONS} />
      <GlobalStyles />
      <RouterProvider router={appRoutersConfig} />
    </Provider>
  );
}

export default App;
