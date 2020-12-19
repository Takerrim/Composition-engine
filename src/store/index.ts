import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import projectModule from './modules/project'
import { IRootState } from './interfaces'

export const key: InjectionKey<Store<IRootState>> = Symbol()

const store = createStore<IRootState>({
  modules: {
    project: projectModule
  }
})

export default store
