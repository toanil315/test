import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { Routes } from './routes';
import theme from '@/styles/theme';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
