<template>
  <header class="app-header bg-main text-white pb-1 text-lg">
    <div class="page-content flex items-center justify-between">
      <div
        class="header-left relative md:static w-full md:w-auto pr-3 md:pr-0 flex justify-between md:justify-start items-center"
      >
        <nuxt-link to="/" class="logo py-4 pl-2 mr-6">
          <img
            v-if="!showSearchBar"
            class="hidden xs:block w-40 md:w-48"
            src="/images/logos/nashma_logo.png"
            alt="nashma-logo"
          />
          <img
            class="xs:hidden block w-16"
            src="/images/icons/nashma-icon.png"
            alt="nashma logo"
          />
        </nuxt-link>
      </div>

      <div class="header-right mr-6 hidden md:block">
        <nav class="header-navigation flex items-center">
          <nuxt-link to="/about" class="mr-6">A Propos</nuxt-link>
          <nuxt-link to="/contact">Nous Contacter</nuxt-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      searchKey: '',
      sortBy: 'most_recent',
      showMenu: false,
      showFilter: false,
      showSearchBar: false,
    };
  },

  watch: {
    searchKey(newVal) {
      this.$store.dispatch('modules/searchModule', newVal);
    },

    sortBy(newVal) {
      this.$store.dispatch('modules/sortModules', newVal);
    },
  },
};
</script>

<style lang="scss">
.header-navigation {
  a {
    transition: 0.3s;
    border-radius: 4px;
    padding: 3px 9px;
    &:hover {
      background: white;
      color: #203864;
    }
  }
}
</style>
