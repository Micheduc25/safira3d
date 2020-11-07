/* eslint-disable require-await */
export const state = () => {
  return {
    modules: [],
    filtered_modules: [],
    has_modules_set: false,
    selected_module: null,
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

  EDIT_MODULE(state, updatedModule) {
    const moduleIndex = state.modules.findIndex(
      (mod) => mod._id === updatedModule._id
    );

    if (moduleIndex > -1) {
      state.modules.splice(moduleIndex, 1, updatedModule);
      console.log('module updated!');
    }
  },

  REMOVE_MODULE(state, moduleId) {
    const moduleIndex = state.modules.findIndex((m) => m._id === moduleId);
    if (moduleIndex > -1) {
      state.modules.splice(moduleIndex, 1);
    }
  },

  SET_SELECTED_MODULE(state, module) {
    state.selected_module = module;
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

  SORT_MODULES(state, sortBy) {
    switch (sortBy) {
      case 'most_recent':
        state.modules = state.modules.sort((prev, next) => {
          const prevDate = new Date(prev.date);
          const nextDate = new Date(next.date);
          return nextDate - prevDate;
        });
        break;

      case 'least_recent':
        state.modules = state.modules.sort((prev, next) => {
          const prevDate = new Date(prev.date);
          const nextDate = new Date(next.date);

          return prevDate - nextDate;
        });
        break;

      case 'most_popular':
        state.modules = state.modules.sort((prev, next) => {
          return next.rating - prev.rating;
        });

        break;

      default:
        break;
    }
    console.log(state.modules);
  },

  LIKE_MODULE(state, moduleId) {
    const module = state.modules.find((m) => m._id === moduleId);
    if (module && !module.likers.includes(this.$auth.user._id)) {
      module.likers.push(this.$auth.user._id);
      module.likes += 1;
    }
  },
  UNLIKE_MODULE(state, moduleId) {
    //  we find the said module
    const module = state.modules.find((m) => {
      if (m._id === moduleId) {
        return true;
      }

      return false;
    });

    //  if the user's id is found in the likers we find the index of the id and remove it
    if (module && module.likers.includes(this.$auth.user._id)) {
      const idIndex = module.likers.findIndex(
        (val) => val === this.$auth.user._id
      );

      if (idIndex > -1) {
        module.likers.splice(idIndex, 1);
        module.likes -= 1;
      }
    }
  },

  VIEW_MODULE(state, moduleId) {
    const module = state.modules.find((m) => m._id === moduleId);
    if (module && !module.viewers.includes(this.$auth.user._id)) {
      module.viewers.push(this.$auth.user._id);
      module.views += 1;
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

  async fetchModule({ commit }, moduleId) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/api/modules/${moduleId}`)
        .then((res) => {
          commit('SET_SELECTED_MODULE', res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
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
            'x-auth-token': this.$auth.getToken('local'),
          },
        })
        .then((res) => {
          commit('ADD_MODULE', res.data.data);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  async editModule({ commit }, { moduleId, data }) {
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
        .put(`/api/modules/${moduleId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': this.$auth.getToken('local'),
          },
        })
        .then((res) => {
          commit('EDIT_MODULE', res.data.data);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  deleteModule({ commit }, moduleId) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`/api/modules/${moduleId}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': this.$auth.getToken('local'),
          },
        })
        .then((res) => {
          commit('REMOVE_MODULE', moduleId);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  searchModule({ commit }, searchKey) {
    commit('SEARCH_MODULE', searchKey);
  },

  async rateModule(context, { moduleId, value }) {
    return new Promise((resolve, reject) => {
      if (!this.$auth.loggedIn) reject(Error('unauthorized'));
      this.$axios
        .put(
          `/api/modules/rate/${moduleId}`,
          {
            rating: value,
          },
          {
            headers: {
              'x-auth-token': this.$auth.getToken('local'),
            },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async likeModule({ commit }, moduleId) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(`/api/modules/like/${moduleId}`, {
          headers: {
            'x-auth-token': this.$auth.getToken('local'),
          },
        })
        .then((res) => {
          commit('LIKE_MODULE', moduleId);
          resolve(res);
        })

        .catch((err) => reject(err));
    });
  },
  async unlikeModule({ commit }, moduleId) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(`/api/modules/unlike/${moduleId}`, {
          headers: {
            'x-auth-token': this.$auth.getToken('local'),
          },
        })
        .then((res) => {
          commit('UNLIKE_MODULE', moduleId);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  async viewModule({ commit }, moduleId) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(`/api/modules/view/${moduleId}`, {
          headers: {
            'x-auth-token': this.$auth.getToken('local'),
          },
        })
        .then((res) => {
          commit('VIEW_MODULE', moduleId);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  sortModules({ commit }, sortBy) {
    commit('SORT_MODULES', sortBy);
  },
};

export const getters = {
  modules: (state) => state.modules,
  filtered_modules: (state) => state.filtered_modules,
  selected_module: (state) => state.selected_module,
};
