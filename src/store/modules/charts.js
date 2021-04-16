const state = {
  center: [],
}

const mutations = {
  ADD_CENTER: (state, center) => {
    state.center = center
  },
  CLEAR_CENTER: (state) => {
    state.center = []
  },
}

const actions = {
  addCENTER({ commit }, center) {
    commit('ADD_CENTER', center)
  },
  clearCENTER({ commit }) {
    commit('CLEAR_CENTER')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
