<template>
  <div class="registration-form flex items-center justify-center h-screen">
    <div
      class="register w-11/12 xs:w-9/12 sm:w-7/12 md:w-6/12 flex items-center flex-col p-6 rounded-xl bg-white shadow"
    >
      <div class="regis-title">
        <h1 class="text-6xl font-bold tracking-wide mb-8">Créer un Compte</h1>
      </div>
      <input
        id="username"
        v-model="formData.name"
        style="text-align-last: center"
        class="border border-main py-1 mb-4 px-3 w-full"
        type="text"
        name="username"
        placeholder="Votre Nom Complet"
      />

      <input
        id="email"
        v-model="formData.email"
        style="text-align-last: center"
        class="border border-main py-1 mb-4 px-3 w-full"
        type="email"
        name="email"
        placeholder="Votre Email"
      />

      <input
        id="password"
        v-model="formData.password"
        style="text-align-last: center"
        class="border border-main py-1 mb-4 px-3 w-full"
        type="password"
        name="password"
        placeholder="Votre Mot de Passe"
      />

      <button class="bg-main w-5/12 text-white py-2 px-6" @click="register">
        Connexion
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',

  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
      },
    };
  },

  methods: {
    async register() {
      const loading = this.$vs.loading();

      try {
        await this.$store.dispatch('users/createUser', this.formData);

        this.$router.push('/auth/login');
      } catch (err) {
        this.$vs.notification({
          text: "Nous n'avons pas pu enregistrer l'utilisateur",
          color: 'danger',
          duration: 3000,
        });
      }

      loading.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.registration-form {
  background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 1)
    ),
    url('/images/home/homebg.png');
  //   height: 100vh;
  background-size: cover;
}
</style>
