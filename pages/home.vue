<template>
  <section class="home-page flex justify-end pb-10">
    <div class="home-content flex flex-col items-end">
      <div class="content-upper w-full flex md:flex-col flex-col-reverse">
        <div class="text-main text-3xl w-full mb-2 mt-4 text-center font-bold">
          Connectez Vous !
        </div>
        <div class="login w-full flex justify-around mb-6">
          <input
            id="email"
            v-model="email"
            style="text-align-last: center"
            class="border border-main py-1 px-3 w-5/12"
            type="email"
            name="email"
            placeholder="Votre Email"
          />

          <input
            id="password"
            v-model="password"
            style="text-align-last: center"
            class="border border-main py-1 px-3 w-5/12"
            type="password"
            name="password"
            placeholder="Votre Mot de Passe"
          />

          <button class="bg-main text-white py-2 px-6" @click="login('local')">
            OK
          </button>
        </div>

        <div class="forgot-password w-full justify-center text-center mb-20">
          <a href="#" class="text-main underline pb-1 text-3xl font-bold"
            >J'ai oublié mon mot de passe</a
          >
        </div>

        <div
          style="height: 250px"
          class="safira-logo flex w-full justify-center mb-40"
        >
          <img
            class="h-full"
            src="/images/home/safira2.png"
            alt="safira logo"
          />
        </div>
      </div>

      <!-----------------------------login methods ----------------------------------------->

      <div class="create-account sm:w-9/12 md:w-7/12 mx-auto">
        <div class="text-main text-4xl font-bold text-center w-full">
          Créez un nouveau compte
        </div>

        <div class="connection-methods flex flex-col items-stretch">
          <button
            class="shadow-lg px-6 py-1 flex items-center bg-main text-white mb-4"
          >
            <img
              class="w-16 h-16 mr-4"
              src="/images/icons/google.png"
              alt="google signup"
            />
            <span class="text-4xl">Je me connecte avec Google </span>
          </button>
          <button
            class="shadow-lg px-6 py-1 flex items-center bg-main text-white mb-4"
          >
            <img
              class="w-16 h-16 mr-4"
              src="/images/icons/facebook.png"
              alt="facebook signup"
            />
            <span class="text-4xl">Je me connecte avec Facebook </span>
          </button>
          <button
            class="shadow-lg px-6 py-1 flex items-center bg-main text-white"
          >
            <img
              class="w-16 h-16 mr-4"
              src="/images/icons/envelop.png"
              alt="email signup"
            />
            <span class="text-4xl">Je me connecte avec mon Email </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login(strategy) {
      if (this.email.length > 0 && this.password.length > 0) {
        const loading = this.$vs.loading();
        try {
          await this.$auth.loginWith(strategy, {
            data: {
              email: this.email,
              password: this.password,
            },
          });
        } catch (err) {
          console.error('err==>', err);
        }
        loading.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 1)
    ),
    url('/images/home/homebg.png');
  //   height: 100vh;
  background-size: cover;

  .home-content {
    flex-basis: 600px;
  }
}
</style>
