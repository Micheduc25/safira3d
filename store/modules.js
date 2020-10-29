/* eslint-disable require-await */
export const state = () => {
  return {
    modules: [],
    filtered_modules: [],
    has_modules_set: false,
  };
};

export const mutations = {
  SET_MODULES(state, modules) {
    state.modules = modules;
    state.filtered_modules = modules;
    state.has_modules_set = true;
  },

  ADD_MODULE(state, newModule) {
    state.modules.unshift(newModule);
  },

  SEARCH_MODULE(state, searchKey) {
    const search = searchKey.toLowerCase();
    if (search.length === 0) {
      state.filtered_modules = state.modules;
    } else {
      const results = [];
      state.modules.forEach((mod) => {
        //  we check the categories of the module to see if there's a match
        let categoryMatch = false;
        for (const cat of mod.categories) {
          if (cat.toLowerCase().match(search)) {
            categoryMatch = true;
            break;
          }
        }
        if (
          mod.title.toLowerCase().match(search) ||
          mod.description.toLowerCase().match(search) ||
          mod.location.toLowerCase().match(search) ||
          categoryMatch
        ) {
          results.push(mod);
        }
      });

      state.filtered_modules = results;
    }
  },
};

export const actions = {
  async fetchAllModules({ commit, state }) {
    if (!state.has_modules_set) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get('/api/modules')
          .then((res) => {
            commit('SET_MODULES', res.data);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    }
  },

  async createModule({ commit }, data) {
    const formData = new FormData();

    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((item) => {
          formData.set(`${key}[]`, item);
        });
      } else {
        formData.set(`${key}`, data[key]);
      }
    }

    return new Promise((resolve, reject) => {
      this.$axios
        .post('/api/modules', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjlhMWIzNTZjNTM0YjE0MGM5YzkxYzUiLCJlbWFpbCI6Im5kam9ja2p1bmlvckBnbWFpbC5jb20iLCJuYW1lIjoiTmRqb2NrIEp1bmlvciIsImlhdCI6MTYwMzk3MTUyMH0.vEPkyZ6O5rrmhZk_3vfO7cex4X4BngtMORQEJWBRFgI',
          },
        })
        .then((res) => {
          commit('ADD_MODULE', res.data.data);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  searchModule({ commit }, searchKey) {
    commit('SEARCH_MODULE', searchKey);
  },
};

export const getters = {
  modules: (state) => state.modules,
  filtered_modules: (state) => state.filtered_modules,
};
