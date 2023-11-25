import { createApp } from 'vue'
import App from './App.vue'
import routes from '@/router/routes.js'
import pinia from '@/stores/index.js' //外部创建pinia，为了能在组件外用！！

const app = createApp(App);

app.use(pinia);
app.use(routes);
app.mount('#app');
