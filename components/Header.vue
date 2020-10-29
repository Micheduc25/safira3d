<template>
  <header
    class="app-header bg-main flex text-white items-center justify-between"
  >
    <div
      class="header-left relative md:static w-full md:w-auto pr-3 md:pr-0 flex justify-between md:justify-start items-center"
    >
      <div class="logo py-4 pl-2 mr-6">
        <img
          v-if="!showSearchBar"
          class="hidden xs:block w-40 md:w-48"
          src="/images/logos/nashma_logo.png"
          alt="nashma-logo"
        />
        <img
          class="xs:hidden block w-16"
          src="/images/icons/nashma-icon.png"
          alt="nashma-logo"
        />
      </div>

      <div class="hereee flex items-center">
        <div class="search-section text-white flex items-center">
          <div class="mr-1 hidden md:block">Rechercher:</div>
          <div class="search-bar ml-2 flex items-center md:mr-0 mr-4">
            <label for="search" class="">
              <input
                v-model="searchKey"
                :class="{ 'w-102': showSearchBar }"
                class="text-black xs:px-2 py-1 border border-black w-0 transition-all duration-300 xs:w-102"
                placeholder="un lieu, un pays, une ville, un quartier ou une catégorie de sites
          "
              />
            </label>
            <div class="search-but px-3">
              <img
                src="/images/icons/searchbar.png"
                width="17"
                height="17"
                alt="search bar"
                @click="showSearchBar = !showSearchBar"
              />
            </div>
          </div>

          <div
            class="small-filter mr-2 md:hidden"
            @click="showFilter = !showFilter"
          >
            <img
              src="/images/icons/filter.png"
              class="w-10 xs:w-12"
              alt="filter"
            />
          </div>
        </div>

        <transition name="fade">
          <div
            v-if="showFilter"
            class="filter-menu rounded-sm shadow-md absolute bg-white text-black p-2"
          >
            <div class="font-bold mb-2">Classer Safira par:</div>
            <div class="">Plus recents en premier</div>
            <div class="">Plus recents en dernier</div>
          </div>
        </transition>

        <div
          style="width: max-content"
          class="block md:hidden menu-icon text-3xl cursor-pointer"
          @click="showMenu = !showMenu"
        >
          <img src="/images/icons/menu.png" class="w-10 xs:w-12" alt="filter" />
        </div>
      </div>
    </div>

    <div class="header-right mr-6 hidden md:block">
      <div class="filter-section flex items-center mx-auto">
        <div class="mr-2">Classer les Safiras :</div>
        <div class="filter-select text-black">
          <select v-model="filterBy" class="p-2 w-full">
            <option value="recent_first">Plus recents en premier</option>
            <option value="oldest_first">Plus recents en dernier</option>
          </select>
        </div>
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
      filterBy: 'recent_first',
      showMenu: false,
      showFilter: false,
      showSearchBar: false,
    };
  },

  watch: {
    searchKey(newVal) {
      this.$store.dispatch('modules/searchModule', newVal);
    },
  },
};
</script>

<style lang="scss">
.search-section {
  @media (max-width: 1017px) {
    .search-bar {
      margin-left: 0;
    }

    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 769px) {
    flex-direction: row;
    align-items: center;
  }
}
.search-bar {
  align-items: stretch;

  //   width: max-content;
  border: 1px solid black;
  input[type='text'] {
    border-radius: 0;
    border: none;
  }

  .search-but {
    border: 1px groove black;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
.filter-section {
  @media (max-width: 1017px) {
    .filter-select {
      width: 200px;
    }

    flex-direction: column;
    align-items: flex-start;
  }
}
.filter-select {
  width: 300px;
}

.filter-menu {
  top: 100%;
  right: 15%;
  width: 50%;
  z-index: 50;
}
</style>
