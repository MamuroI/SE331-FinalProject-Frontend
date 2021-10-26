import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GStore from './store'
import './tailwind.css'
import 'nprogress/nprogress.css'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/services/AxiosInterceptorSetup.js'

// createApp(App).use(router).provide('GStore', GStore).mount('#app')

const requireComponent = require.context(
    './components',
    false,
    /Base[A-Z]\w+\.(vue|js)$/
  )
  
  // Create a reactive object
  
  const app = createApp(App)
  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)
  
    const componentName = upperFirst(
      camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
    )
  
    app.component(componentName, componentConfig.default || componentConfig)
  })
  
  app
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .provide('GStore', GStore)
    .mount('#app')
