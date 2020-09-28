import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import App from "./App";
import {rootReducer} from "./store/reducers";
import {rootEpic} from './store/epics';

import { createEpicMiddleware } from 'redux-observable';

import "./theme/bootstrap.min.css";
import "./theme/styles.css";

const epicMiddleware = createEpicMiddleware();

function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);

  return store;
}

const store = configureStore();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
  ,
  rootElement
);
