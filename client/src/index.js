import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store/store";
import persistStore from "redux-persist/es/persistStore";
const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(store);
//store를 persistStore로 바꿈
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
