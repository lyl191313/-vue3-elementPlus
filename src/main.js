import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import message from './composition/useMessage'
import  { debounce }  from './composition/useDebounce'
import * as echarts from 'echarts'

const app = createApp(App)
installElementPlus(app)
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$message = message
app.config.globalProperties.$debounce = debounce

app.use(store).use(router).mount('#app')
