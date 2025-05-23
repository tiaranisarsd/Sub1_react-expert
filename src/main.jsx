import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./states/index.js";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/style.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </Provider>
);
