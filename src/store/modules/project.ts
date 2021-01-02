import { Module } from 'vuex'
import http from '@/api'
import { IRootState, IProjectState } from '../interfaces'
import { AnyLayerType, INodeProps } from '@/entities/interfaces'


export const projectModule: Module<IProjectState, IRootState> = {
  namespaced: true,
  state: {
    config: {} as INodeProps,
    parentLayer: null,
  },
  mutations: {
    setProjects(state, payload: INodeProps) {
      state.config = payload
    },
    setLayers(state, payload: AnyLayerType) {
      state.parentLayer = payload
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
    },
    setLayers({ commit }, payload: AnyLayerType) {
      commit('setLayers', payload)
    },
  }
}

export default projectModule
