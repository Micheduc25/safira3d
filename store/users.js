export const state = () => {
  return {
    //  data of the newly registered member
    new_register_data: {
      id: '',
      email: '',
      password: '',
      role: '',
      is_verified: '',
    },
  };
};

export const mutations = {
  SET_REGISTER_DATA(state, payload) {
    state.new_register_data = payload;
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
          commit('SET_REGISTER_DATA', res.data);
          resolve(res);
        })
        .catch((err) => reject(err.response.data));
    });
  },

  verifyEmail({ commit }, { email, code }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/api/users/verify', { email, code })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err.response.data));
    });
  },

  sendEmailVerification({ commit }, { email }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/api/users/verification', { email })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err.response.data));
    });
  },
};

export const getters = {
  new_register_data: (state) => state.new_register_data,
};
