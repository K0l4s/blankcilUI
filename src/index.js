import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import homepage_en from './locales/en/homepage.json';
import hompage_vi from './locales/vi/homepage.json';
import navbar_en from './locales/en/navbar.json';
import navbar_vi from './locales/vi/navbar.json';
import auth_en from './locales/en/auth.json';
import auth_vi from './locales/vi/auth.json';
import leftbar_en from './locales/en/leftbar.json';
import leftbar_vi from './locales/vi/leftbar.json';
i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'vi',                              // language to use
  resources: {
    en: {
      homepage: homepage_en ,
      navbar: navbar_en,
      auth: auth_en,
      lefbar: leftbar_en
    },
    vi: {
      homepage: hompage_vi,
      navbar: navbar_vi,
      auth: auth_vi,
      leftbar: leftbar_vi
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
