import { createApp } from 'vue'
import App from './App.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'

dom.watch();
library.add(faRotateLeft);

import './assets/index.css' //tailwind postcss

const app = createApp(App);

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
