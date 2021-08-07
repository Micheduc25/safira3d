<template>
  <section class="page-content home-page flex justify-end pb-10 relative">
    <div class="home-link absolute">
      <nuxt-link to="/">
        <img
          class="hidden xs:block w-40 md:w-48"
          src="/images/logos/nashma_logo.png"
          alt="nashma-logo"
        />
      </nuxt-link>
    </div>
    <div class="home-content flex flex-col items-end">
      <div class="content-upper w-full flex md:flex-col flex-col-reverse">
        <div class="text-main text-3xl w-full mb-2 mt-4 text-center font-bold">
          Connectez Vous !
        </div>
        <div class="login w-full flex items-center flex-col mb-20">
          <input
            id="email"
            v-model="email"
            style="text-align-last: center"
            class="border border-main py-1 mb-4 px-3 w-5/12"
            type="email"
            name="email"
            placeholder="Votre Email"
          />

          <input
            id="password"
            v-model="password"
            style="text-align-last: center"
            class="border border-main py-1 mb-4 px-3 w-5/12"
            type="password"
            name="password"
            placeholder="Votre Mot de Passe"
          />

          <!-- <label for="rememberme" class="my-4 flex items-center"
            >Se souvenir de moi
            <input
              type="checkbox"
              name="rememberme"
              id="rememberme"
              v-model="rememberme"
              class="w-8 h-8 ml-2"
          /></label> -->

          <input
            class="bg-main w-5/12 text-white py-2 px-6"
            type="submit"
            value="Connexion"
            @click="login('local')"
          />

          <div class="forgot-password w-full justify-center text-center">
            <nuxt-link
              to="/auth/reset-password"
              class="text-main underline pb-1 text-3xl font-bold"
              >J'ai oublié mon mot de passe</nuxt-link
            >
          </div>
          <div class="my-4">---------- ou ------------</div>
          <nuxt-link to="/auth/register" class="bg-main text-white py-2 px-2">
            Créer un compte
          </nuxt-link>
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
            @click="altLogin('google')"
          >
            <img
              class="w-16 h-16 mr-4"
              src="/images/icons/google.png"
              alt="google signup"
            />
            <span class="text-4xl">Se connecter avec Google </span>
          </button>
          <button
            class="shadow-lg px-6 py-1 flex items-center bg-main text-white mb-4"
            @click="altLogin('facebook')"
          >
            <img
              class="w-16 h-16 mr-4"
              src="/images/icons/facebook.png"
              alt="facebook signup"
            />
            <span class="text-4xl">Se connecter avec Facebook </span>
          </button>
          <!-- <button
         
            class="shadow-lg px-6 py-1 flex items-center bg-main text-white"
          >
            <img
              class="w-16 h-16 mr-4"
              src="/images/icons/envelop.png"
              alt="email signup"
            />
            <span class="text-4xl">Je me connecte avec mon Email </span>
          </button> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Login',
  // middleware: 'auth',
  data() {
    return {
      email: '',
      password: '',
      // rememberme: false,
    };
  },

  computed: {
    ...mapGetters('users', ['new_register_data']),
  },
  created() {
    if (this.$route.query.email) {
      this.email = this.$route.query.email;
    }
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

          // after login we check if the user is verified, if not we redirect him to verification page

          if (
            this.new_register_data.email.length > 0 &&
            this.new_register_data.password.length > 0
          ) {
            this.$store.dispatch('users/setRegisterData', {
              email: '',
              password: '',
            });
          }

          if (this.$route.query.nextlink) {
            this.$router.replace(this.$route.query.nextlink);
          } else this.$router.replace('/');
        } catch (err) {
          this.$vs.notification({
            text: err.response.data,
            color: 'danger',
            duration: 3000,
          });

          if (err.response.data === "L'utilisateur n'a pas été vérifié") {
            this.$router.push(`/auth/email-verification?email=${this.email}`);
          }
        }
        loading.close();
      }
    },

    async altLogin(strategy) {
      const res = await this.$auth.loginWith(strategy);
      console.log('after login google ====>', res);
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
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 1)
    ),
    url('/images/home/homebg.png');
  //   height: 100vh;
  background-size: cover;

  .home-content {
    flex-basis: 600px;
  }

  .home-link {
    top: 20px;
    left: 30px;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 7px;
  }
}
</style>
