<template>
  <div
    :style="{
      'border-color': secondaryColor,
      'background-image': `url(${imageBack})`,
    }"
    class="item-main text-white"
  >
    <div class="item-info flex">
      <img class="item-image" :src="imageMain" alt="image" />
      <div
        :style="{ 'background-color': `${mainColor}77` }"
        class="description-main"
      >
        <h1 class="desc-title font-bold">
          {{ title }}
        </h1>
        <div class="location font-bold text-3xl">
          {{ location }}
        </div>

        <div class="desc">
          <slot name="description"></slot>
        </div>
        <div class="categories font-bold">
          {{ categories }}
        </div>

        <div class="action-buttons">
          <button class="explorer">
            Explorer! <img src="/images/icons/stickman.png" class="person" />
          </button>
          <button class="download">
            Télécharger
            <img src="/images/icons/download.png" class="download" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SafiraItem',
  props: {
    imageMain: {
      required: true,
      type: String,
    },
    imageBack: {
      required: true,
      type: String,
    },
    title: String,
    location: String,
    categories: String,
    mainColor: String,
    secondaryColor: String,
  },
  data() {
    return {
      item: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.item-main {
  min-height: 40vh;
  padding: 30px;
  border-top: 15px solid black;
  border-bottom: 15px solid black;
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: 410px) {
    padding: 10px;
  }

  .item-info {
    img {
      height: 263px;
      @media (max-width: 1000px) {
        height: 320px;
      }
    }
    @media (max-width: 950px) {
      flex-direction: column;
      align-items: center;
      img.item-image {
        height: auto;
        width: 500px;
      }
    }

    .description-main {
      width: 100%;
      padding: 15px;

      .desc-title {
        font-size: 40px;
        @media (max-width: 600px) {
          text-align: center;
        }
      }
      .desc,
      .categories {
        font-family: sans-serif;
        font-size: 1.4rem;
      }
      .action-buttons {
        display: flex;
        margin-top: 20px;
        @media (max-width: 600px) {
          justify-content: center;
        }
        button {
          background-color: #203864;
          display: flex;
          align-items: center;
          transition: 0.3s;

          border-top: 2px solid white;
          border-bottom: 2px solid white;
          border-left: 2px solid transparent;
          border-right: 2px solid transparent;
          &:hover {
            border-left: 2px solid white;
            border-right: 2px solid white;
          }

          &:not(:last-child) {
            margin-right: 20px;
            padding: 5px 30px;
            img {
              // width: 30px;
              height: 25px;
              margin-left: 5px;
            }
          }
          &:nth-child(2) {
            padding: 5px 20px;
            img {
              // width: 30px;
              height: 21px;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
