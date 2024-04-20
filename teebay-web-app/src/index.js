import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import './assets/css/style.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo-client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
