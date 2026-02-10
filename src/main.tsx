/**
 * Application entry point
 *
 * Author: Om Pandey
 * Initializes and mounts the React application
 */

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);
