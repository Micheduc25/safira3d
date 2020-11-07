export const state = () => {
  return {
    //  data of the newly registered member
    new_register_data: {
      email: '',
      password: '',
    },
  };
};

export const mutations = {
  SET_REGISTER_DATA(state, data) {
    state.new_register_data = data;
  },
};

export const actions = {
  setRegisterData({ commit }, val) {
    commit('SET_REGISTER_DATA', val);
  },
  createUser({ commit }, { name, email, password }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/api/users/', {
          name,
          email,
          password,
        })
        .then((res) => {
          commit('SET_REGISTER_DATA', { email, password });
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
};

export const getters = {
  new_register_data: (state) => state.new_register_data,
};
