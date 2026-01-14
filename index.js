import React from "react";
import { createRoot } from "react-dom/client";

// App was attached to window in App.js
const container = document.getElementById("root");
const App = window.App;

console.log("container:", container);
console.log("window.App:", App);

if (!container) {
  console.error("Root container #root not found");
} else if (!App) {
  console.error("window.App is not defined");
} else {
  const root = createRoot(container);
  root.render(<App />);
}
