import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/styles/main.sass'

// Vue.use(Vuetify, {
//   iconfont: 'md',
// })


Vue.use(Vuetify)
export default new Vuetify({ theme: {
  dark: true,
  themes: {
    light: {
      primary: '#42a5f5',
      //...
    },
    dark: {
      primary: '#2196F3'
    },
  },
},
options: {
  customProperties: true,
},
icons: {
  iconfont: 'md', // default is 'mdi'
} })
