<template>
  <div class="popup-window flex justify-center items-center">
    <div
      class="popup-wrapper rounded shadow-lg p-5 w-11/12 sm:w-7/12 lg:w-5/12 flex flex-col items-center"
    >
      <img src="/images/home/safira.png" alt="safira logo" />
      <h1 class="text-white text-6xl">Platform en Construction</h1>
      <p class="text-white text-3xl mb-5">
        Notre plateforme Web Safira3D est encore en chantier. Vous pouvez déjà
        vous y promener et la voir, mais certaines choses ne sont pas encore en
        place. Nous l'aurons terminée d'ici quelques semaines !
      </p>

      <button
        class="px-20 py-8 tracking-wider bg-main rounded text-white text-4xl hover:bg-blue-700 transition-all cursor-pointer"
        @click="hidePopup"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConstructionPopup',
  data() {
    return {
      showPopup: true,
    };
  },

  methods: {
    hidePopup() {
      this.$emit('closePopup');
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-window {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
  backdrop-filter: blur(5px);

  .popup-wrapper {
    background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
      ),
      url('/images/home/homebg.png');
    background-size: cover;
    background-position: center center;
    overflow: hidden;
  }
}
</style>
