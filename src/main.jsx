import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ViewContextProvider from "./context/ViewContext";

createRoot(document.getElementById("root")).render(
  <ViewContextProvider>
    <App />
  </ViewContextProvider>
);
