export const state = () => {
  return {};
};

export const mutations = {};

export const actions = {
  resetPassword(_, formData) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/api/auth/password/reset', formData)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
};
