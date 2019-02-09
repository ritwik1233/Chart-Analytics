import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, reducers)
let store = createStore(persistedReducer,{},applyMiddleware(reduxThunk))
let persistor = persistStore(store)

window.axios=axios;
ReactDOM.render(
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
      </PersistGate>
</Provider>
, document.getElementById('root'));

