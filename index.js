import React from "react";
import { createRoot } from "react-dom/client";

// App was attached to window in App.js
const App = window.App;

const container = document.getElementById("root");

// Basic safety check
if (!container) {
  console.error("Root container #root not found");
} else if (!App) {
  console.error("window.App is not defined");
} else {
  const root = createRoot(container);
  root.render(<App />);
}
