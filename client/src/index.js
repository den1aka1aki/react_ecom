import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { Router } from 'react-router-dom';
import { createStore } from './app/store/createStore';
import { Provider } from 'react-redux';
import history from './app/utils/history';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router history={history}>
        <React.StrictMode>
            <Provider store={store} >
                <App />
            </Provider>
        </React.StrictMode>
    </Router>
);
