import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { createPinia } from "pinia";
import router from "./router";
import { useAuthStore } from "./store/auth";

const app = createApp(App);
export const pinia = createPinia();

app.use(pinia);
app.use(router);

// Wait until the user is hydrated BEFORE mounting the app
const authStore = useAuthStore();
authStore.hydrateUser().finally(() => {
  app.mount("#app");
});
