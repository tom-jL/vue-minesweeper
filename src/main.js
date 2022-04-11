import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faRotateLeft, faFlag, faBomb, faFaceDizzy, faSkullCrossbones, faSkull, faFaceSmile, faFaceLaughBeam, faFaceLaughSquint, faBreadSlice, faExplosion, faTrophy,faFlagCheckered, faStopwatch, faStar, faRankingStar  } from '@fortawesome/free-solid-svg-icons'

dom.watch();
library.add(faRotateLeft, faFlag, faBomb, faFaceDizzy, faSkullCrossbones,  faSkull, faFaceSmile, faFaceLaughBeam, faFaceLaughSquint, faBreadSlice, faExplosion, faTrophy, faFlagCheckered, faStopwatch, faStar, faRankingStar);

import './assets/index.css' //tailwind postcss
import 'flowbite';

const app = createApp(App);

app.use(createPinia())
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
