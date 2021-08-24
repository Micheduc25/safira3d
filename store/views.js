export const state = () => {
  return {
    showHomePopup: false,
  };
};

export const mutations = {
  SET_SHOW_POPUP(state, value) {
    state.showHomePopup = value;
  },
};

export const actions = {
  setShowPopup({ commit }, value) {
    commit('SET_SHOW_POPUP', value);
  },
};

export const getters = {
  showHomePopup: (state) => state.showHomePopup,
};
