import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Vant from 'vant';
import 'vant/lib/index.css';
const app=createApp(App)
app.use(Vant).use(router).mount('#app')
app.config.globalProperties.$host1 = 'http://localhost:8010/';
