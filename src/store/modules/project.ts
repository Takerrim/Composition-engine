import { Module } from 'vuex'
import http from '@/api'
import { IRootState, IProjectState } from '../interfaces'
import { INodeProps } from '@/entities/interfaces'


export const projectModule: Module<IProjectState, IRootState> = {
  namespaced: true,
  state: {
    config: {} as INodeProps
  },
  mutations: {
    setProjects(state, payload) {
      state.config = payload
    },
  },
  actions: {
    async fetchProjects({ commit }) {
      try {
        const res = await http.get('get-projects').json()
        commit('setProjects', res)
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default projectModule
