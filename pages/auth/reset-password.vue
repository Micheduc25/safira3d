<template>
  <div class="reset-container flex h-screen items-center justify-center">
    <vs-card class="w-full flex justify-center">
      <template #title>
        <h1 class="text-5xl font-bold">Réinitialisez Mot de Passe</h1>
      </template>
      <template #text>
        <form class="password-reset-form w-full text-3xl mx-auto p-4">
          <form-input
            v-model="formData.email"
            label="Addresse Email"
            placeholder="email"
            type="email"
          />
          <form-input
            v-model="formData.newpassword"
            label="Nouveau Mot de Passe"
            placeholder="Mot de Passe"
            type="password"
          />

          <div class="submit-button flex justify-center mt-4">
            <vs-button border @click.prevent="sendRequest"> Envoyer </vs-button>
          </div>
        </form>
      </template>
    </vs-card>
  </div>
</template>

<script>
import { Joi } from 'vue-joi-validation';

import formInput from '~/components/formInput';

export default {
  name: 'ResetPassword',
  components: {
    formInput,
  },

  data() {
    return {
      formData: {
        email: '',
        newpassword: '',
      },
    };
  },

  methods: {
    async sendRequest() {
      const loading = this.$vs.loading();
      const { error } = Joi.object({
        email: Joi.string().email().required(),
        newpassword: Joi.string().min(5).required(),
      }).validate(this.formData);

      if (!error) {
        try {
          await this.$store.dispatch('password/resetPassword', this.formData);
          this.$router.push({
            path: '/auth/email-sent',
            query: { email: this.formData.email },
          });
        } catch (err) {
          this.$vs.notification({
            text: 'Un erreur est servenu lors de la requete',
            duration: 3000,
            color: 'danger',
          });
        }
      } else {
        this.$vs.notification({
          text: `${error.details[0].message}`,
          duration: 3000,
          color: 'danger',
        });
      }

      loading.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-container {
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
}
</style>
