import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/configStore'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import {AuthProvider} from "./context/authContext"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <BrowserRouter>
  <Provider store={store}>
    <App />
    </Provider>
    <ToastContainer />
    </BrowserRouter>
    </AuthProvider>
);

