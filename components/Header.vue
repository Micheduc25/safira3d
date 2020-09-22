<template>
  <header
    class="app-header bg-main flex text-white items-center justify-between"
  >
    <div class="header-left w-7/12 flex items-center">
      <div class="logo w-4/12 py-4 pl-2 mr-6">
        <img src="/images/logos/nashma_logo.png" alt="nashma-logo" />
      </div>

      <div class="search-section w-6/12 text-white flex items-center">
        <div class="mr-1">Rechercher:</div>
        <div class="search-bar w-full ml-2 flex items-center">
          <label for="search" class="w-full">
            <input
              v-model="searchKey"
              class="text-black w-full p-2 border border-black"
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
            />
          </div>
        </div>
      </div>
    </div>

    <div class="header-right w-5/12">
      <div class="filter-section flex items-center w-8/12 mx-auto">
        <div class="mr-2 w-5/12">Classer les Safiras :</div>
        <div class="filter-select w-7/12 text-black w-full">
          <select v-model="filterBy" class="p-3 w-full">
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
    };
  },
};
</script>

<style lang="scss">
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
</style>
