import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Vant from 'vant';
import 'vant/lib/index.css';
const app=createApp(App)
app.use(Vant).use(router).mount('#app')
const _types=process.env.NODE_ENV === 'development' ?'http://localhost:8010/':'http://www.lcs90.top/api'
app.config.globalProperties.$host1 = _types;
