<template>
  <div
    class="page-content verif-page flex flex-col h-screen items-center justify-center"
  >
    <h1 class="font-bold text-4xl mb-10">Verification de l'addresse E-mail</h1>

    <div class="shadow-lg rounded-md p-8 bg-white">
      <div class="mb-6">
        <span class="font-bold text-2xl text-center">
          Nous avons envoyé un code de confirmation à
          {{ $store.getters.new_register_data || $route.query.email }}</span
        >
      </div>

      <div class="flex flex-col">
        <label for="code-input">Code:</label>
        <input
          id="code-input"
          v-model="code"
          placeholder="X X X X X X"
          type="text"
          name="code-input"
          class="code-input"
        />
      </div>

      <div class="flex justify-center mt-4">
        <vs-button color="#203864" size="large" border @click="verifyEmail"
          >Vérifier</vs-button
        >
      </div>
      <div class="text- flex justify-center items-center">
        Vous navez pas reçu de code?
        <button class="bg-transparent focus:outline-none text-blue-800">
          renvoyer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailVerification',
  data() {
    return {
      code: '',
    };
  },

  methods: {
    async verifyEmail() {
      const loading = this.$vs.loading();
      try {
        await this.$store.dispatch('users/verifyEmail', {
          email: this.$route.query.email,
          code: this.code,
        });
        this.$router.replace(`/auth/login?email=${this.$route.query.email}`);
      } catch (err) {
        this.$vs.notification({
          text: 'Le code de vérification est incorrect',
          color: 'danger',
          duration: 4000,
        });
      }
      loading.close();
    },
    async sendEmailVerification() {
      const loading = this.$vs.loading();

      try {
        await this.$store.dispatch('users/sendEmailVerification', {
          email: this.$route.query.email,
        });

        this.$vs.notification({
          text: 'Le code de vérification a été envoyé',
          color: 'success',
          duration: 4000,
        });
      } catch (err) {
        this.$vs.notification({
          text: "Nous n'avons pas pu renvoyer le code",
          color: 'danger',
          duration: 4000,
        });
      }
      loading.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.verif-page {
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
.code-input {
  border: 1px solid #203864;
  width: 100%;
  text-align-last: center;
}
</style>
