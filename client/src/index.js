import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Router } from 'react-router-dom';
import { createStore } from './app/store';
import { Provider } from 'react-redux';
import history from './app/utils/history';

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
