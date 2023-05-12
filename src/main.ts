import { createApp } from "vue";

// Vue Router
import { router } from "./router";

import App from "~/App.vue";

// reset css
import "@kirklin/reset-css/kirklin.css";
import "~/styles/main.css";
import "uno.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
