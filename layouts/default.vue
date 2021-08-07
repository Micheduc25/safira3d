<template>
  <div>
    <app-header />
    <Nuxt class="my-nuxt" />
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '~/components/AppFooter.vue';
import AppHeader from '~/components/DefaultHeader.vue';
export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="scss">
.my-nuxt {
  min-height: 80vh;
}
</style>
