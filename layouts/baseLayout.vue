<template>
  <div>
    <e-header />
    <nuxt class="my-nuxt" />
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '~/components/AppFooter.vue';
import EHeader from '~/components/Header';

export default {
  components: {
    EHeader,
    AppFooter,
  },
};
</script>

<style lang="scss" scoped>
.my-nuxt {
  min-height: 80vh;
}
</style>
