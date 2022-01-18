import { createStore } from 'vuex'
import musicStore from './music'


export default createStore({

  modules: {
    music: musicStore,
  }

})