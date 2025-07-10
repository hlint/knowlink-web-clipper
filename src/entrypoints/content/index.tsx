import { createShadowRootUi, defineContentScript } from "#imports";
import "@/styles/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { Provider } from "./context";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "extension-content-ui",
      position: "overlay",
      anchor: "body",
      onMount(container) {
        // Define how your UI will be mounted inside the container
        const app = document.createElement("div");
        container.append(app);
        const root = ReactDOM.createRoot(app);
        root.render(
          <React.StrictMode>
            <Provider>
              <App />
            </Provider>
          </React.StrictMode>,
        );
        return root;
      },
    });

    ui.mount();
  },
});
