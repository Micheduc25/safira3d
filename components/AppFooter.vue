<template>
  <footer class="w-full bg-main">
    <div class="footer-wrapper page-content footer-distributed">
      <div class="footer-left">
        <a href="https://www.nashma.net" target="_blank">
          <img class="w-56" src="/images/home/safira.png" alt="nashma logo" />
        </a>

        <p class="footer-links">
          <nuxt-link to="/about">A Propos</nuxt-link>
          -
          <nuxt-link to="/contact">Contact</nuxt-link>
          -
          <nuxt-link to="/privacy">Privacy Policy</nuxt-link>
        </p>

        <p class="footer-company-name">Safirad3D © {{ currentYear }}</p>
      </div>

      <div class="footer-right">
        <div class="footer-icons">
          <a href="https://twitter.com/Safira3D" target="_blank"
            ><fa-icon :icon="fab.faTwitter"
          /></a>
          <a href="https://facebook.com/Safira3D" target="_blank"
            ><fa-icon :icon="fab.faFacebook"
          /></a>
          <a href="https://www.linkedin.com/showcase/safira3d/" target="_blank"
            ><fa-icon :icon="fab.faLinkedin"
          /></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { fab } from '@fortawesome/free-brands-svg-icons';
export default {
  name: 'AppFooter',

  data() {
    return {
      formData: {
        email: '',
        message: '',
      },
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
    fab() {
      return fab;
    },
  },
};
</script>

<style lang="scss" scoped></style>
