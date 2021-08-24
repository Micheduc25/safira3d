<template>
  <section
    class="page-content home-page flex justify-center md:justify-end pb-10 relative"
  >
    <div class="home-content flex flex-col items-end">
      <div class="content-upper w-full flex md:flex-col flex-col-reverse">
        <form
          autocomplete="on"
          class="login w-full flex items-center flex-col mb-20"
        >
          <div
            class="text-main text-3xl w-full mb-2 mt-4 text-center font-bold"
          >
            Connectez Vous !
          </div>
          <input
            id="email"
            v-model="email"
            style="text-align-last: center"
            class="border border-main py-1 mb-4 px-3 w-10/12 sm:w-9/12 lg:w-6/12"
            type="email"
            name="email"
            placeholder="Votre Email"
          />

          <input
            id="password"
            v-model="password"
            style="text-align-last: center"
            class="border border-main py-1 mb-4 px-3 w-10/12 sm:w-9/12 lg:w-6/12"
            type="password"
            name="password"
            placeholder="Votre Mot de Passe"
          />

          <input
            class="login-but bg-main w-6/12 text-white py-2 px-6"
            type="submit"
            value="Connexion"
            @click.prevent="login('local')"
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
        </form>

        <div
          class="safira-logo flex w-full h-56 md:h-90 justify-center mb-10 md:mb-40"
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
        <div class="text-main text-3xl font-bold text-center w-full">
          Connectez vous avec un autre compte
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
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
  async mounted() {
    const loading = this.$vs.loading();
    try {
      const res = await this.$fbAuth.init();
      const res2 = await this.$googleAuth.init();
      console.log('init response', res, res2);
    } catch (err) {
      console.log(err);
    }
    loading.close();
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
          this.$store.dispatch('users/setRegisterData', {
            email: '',
            password: '',
          });

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
      } else {
        this.$vs.notification({
          text: 'Les champs du formulaire ne doivent pas etre vides',
          color: 'danger',
          duration: 3000,
        });
      }
    },

    async altLogin(strategy) {
      const loading = this.$vs.loading();
      if (strategy === 'google') {
        try {
          const res = await this.$googleAuth.signIn();

          await this.$store.dispatch('users/socialLogin', res.userData);
          this.$router.replace('/');
        } catch (error) {
          this.$vs.notification({
            text: 'Une erreure est survenue lors de la connexion',
            color: 'danger',
            duration: 4000,
          });
          console.log(error);
        }
      } else if (strategy === 'facebook') {
        try {
          const res = await this.$fbAuth.signIn();
          await this.$store.dispatch('users/socialLogin', res.userData);
          this.$router.replace('/');
        } catch (error) {
          this.$vs.notification({
            text: 'Une erreure est survenue lors de la connexion',
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
  .login-but {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: lighten($color: #203864, $amount: 10);
    }
  }
}
</style>
