// @flow

import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import AppRoutes from "./AppRoutes";
import reducers from "./redux/reducers";
import { Container } from "./utils/Common";
import { setLocalNotification } from "./utils/NotificationUtils";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, promiseMiddleware()))
);

export default class App extends React.Component<{}, {}> {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <Container>
          <AppRoutes />
        </Container>
      </Provider>
    );
  }
}
