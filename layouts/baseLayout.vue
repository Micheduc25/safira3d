<template>
  <div>
    <e-header />
    <nuxt class="my-nuxt" />
  </div>
</template>

<script>
import EHeader from '~/components/Header';

export default {
  components: {
    EHeader,
  },
};
</script>

<style lang="scss" scoped>
.my-nuxt {
  min-height: 80vh;
}
</style>
