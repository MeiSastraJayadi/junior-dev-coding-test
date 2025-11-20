import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui';
import store from './store'
import "./main.css"

const app = createApp(App)

app.use(router)
app.use(naive)
app.use(store)
app.mount('#app')
