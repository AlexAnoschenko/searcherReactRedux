//import { Provider } from "react-redux";
//import { store } from "./components/store/store";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";


ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();