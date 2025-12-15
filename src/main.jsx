import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { RecipeProvider } from "./context/RecipeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/progetti/veggieBox/dist/">
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </BrowserRouter>
  </StrictMode>
);
