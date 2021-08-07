<template>
  <div
    class="page-content registration-form flex items-center justify-center h-screen"
  >
    <form
      autocomplete="true"
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
      <input
        id="confirm-password"
        v-model="formData.confirmPassword"
        style="text-align-last: center"
        class="border border-main py-1 mb-4 px-3 w-full"
        type="password"
        name="password"
        placeholder="Confirmer Votre Mot de Passe"
      />

      <input
        type="submit"
        value="Créer"
        class="bg-main w-5/12 text-white py-2 px-6 cursor-pointer"
        @click.prevent="register"
      />

      <div class="text-md mt-4">
        Vous avez déjà un compte?
        <nuxt-link to="/auth/login" class="text-blue-700"
          >connectez vous</nuxt-link
        >
      </div>
    </form>
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
        confirmPassword: '',
      },
    };
  },

  methods: {
    async register() {
      const loading = this.$vs.loading();

      if (this.formData.name.length === 0) {
        this.$vs.notification({
          text: "Le nom d'utilisateur ne doit pas etre vide",
          color: 'danger',
          duration: 4000,
        });
      } else if (this.formData.password.length < 6) {
        this.$vs.notification({
          text: 'Le mot de passe doit avoir au moins 6 charactères',
          color: 'danger',
          duration: 4000,
        });
      } else if (this.formData.password !== this.formData.confirmPassword) {
        this.$vs.notification({
          text: 'Les deux mots de passes ne sont pas les memes',
          color: 'danger',
          duration: 4000,
        });
      } else {
        try {
          await this.$store.dispatch('users/createUser', this.formData);
          this.$router.push(
            `/auth/email-verification?email=${this.formData.email}`
          );
        } catch (err) {
          this.$vs.notification({
            text: err,
            color: 'danger',
            duration: 4000,
          });
        }
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
