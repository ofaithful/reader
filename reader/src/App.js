import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { post } from './requests/base';

import { store, history } from './store/store';
import Routes from './routes/routes';

import './App.css';
import {NO_TOKEN_VERIFICATION, USER_LOGIN_SUCCESS, USER_LOGOUT} from './actionTypes';

if (localStorage.br_token) {
    post('/auth/token-verify/', {}, {
        'Authorization': 'Bearer ' + localStorage.br_token
        })
        .then(() => {
            store.dispatch({ type: USER_LOGIN_SUCCESS });
        })
        .catch(() => {
            store.dispatch({ type: USER_LOGOUT });
        });
} else {
    store.dispatch({type: NO_TOKEN_VERIFICATION});
}

const App = () => {

    return (
        <Provider store={ store }>
            <div className="App">
                <Router history={history}>
                    <Routes />
                </Router>
            </div>
        </Provider>
    );
}

export default App;
