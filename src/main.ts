import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

import BaseDialog from './components/ui/ConfigDialog.vue'
import BaseCard from './components/ui/BaseCard.vue'

const pinia = createPinia()
const app = createApp(App)

app.component("base-card", BaseCard)
app.component("base-dialog", BaseDialog)
app.use(pinia)
app.mount('#app')