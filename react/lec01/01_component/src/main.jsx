import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Compo01 from "./components/Compo01.jsx";
import Compo02 from "./components/Compo02.jsx";
import Compo03 from "./components/Compo03.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}

    <Compo01 />
    <Compo02>hello</Compo02>
    <Compo03 />
  </StrictMode>,
);
