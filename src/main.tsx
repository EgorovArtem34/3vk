import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import store from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
