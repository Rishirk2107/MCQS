import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContentProvider } from "./context/ContentContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
    <ContentProvider>
      <App />
    </ContentProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
