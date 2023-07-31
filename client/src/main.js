import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);



app.use(store).use(router).use(Toast, Option).mount('#app')
