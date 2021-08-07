<template>
  <div
    :style="{
      'border-color': secondaryColor,
      'background-image': `url('${imageBack}')`,
    }"
    class="item-main text-white"
  >
    <div
      class="item-info flex items-center"
      :style="{
        'background-color': `${mainColor}77`,
      }"
    >
      <img class="item-image" :src="imageMain" alt="image" />
      <div class="description-main">
        <h1 class="desc-title font-bold">
          {{ title }}
        </h1>
        <div class="location font-bold text-3xl">
          {{ location }}
        </div>

        <div class="desc">
          <slot name="description"></slot>
        </div>
        <div class="categories font-bold">Categories: {{ categories }};</div>

        <client-only>
          <star-rating
            :show-rating="false"
            :star-size="30"
            :read-only="true"
            :rating="rating"
            @rating-selected="ratingSelected"
          />

          <template #placeholder><div>ratings</div></template>
        </client-only>

        <div class="stats mt-4">
          <!-- <span class="mr-4 cursor-pointer" @click="likeModule">
            <fa-icon :icon="hasUserLikedModule ? fullHeart : emptyHeart" />
            {{ likes }}</span
          > -->
          <span
            ><fa-icon :icon="hasUserViewedModule ? faEyeFull : faEye" />
            {{ views }}</span
          >
        </div>

        <div v-if="visit_url" class="action-buttons">
          <nuxt-link
            class="explorer"
            :to="'/modules/' + _id"
            @click.prevent="checkAuth"
          >
            Explorer! <img src="/images/icons/stickman.png" class="person" />
          </nuxt-link>

          <button class="download">
            Télécharger
            <img src="/images/icons/download.png" class="download" />
          </button>
        </div>
        <div v-else class="italics text-xl">
          En cours de réalisation et prochainement disponible sur Safira3D.net !
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as RegularIcons from '@fortawesome/free-regular-svg-icons';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';

const rating = process.client ? require('vue-star-rating/src') : {};

export default {
  name: 'SafiraItem',

  components: {
    StarRating: rating.default,
  },
  props: {
    _id: {
      required: true,
      type: String,
    },
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
    visit_url: String,
    likes: {
      type: Number,
      default: 0,
    },
    likers: Array[String],
    views: {
      type: Number,
      default: 0,
    },
    viewers: Array[String],
    rating: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showRating: false,
      hasUserLikedModule: false,
      hasUserViewedModule: false,
    };
  },

  computed: {
    emptyHeart() {
      return RegularIcons.faHeart;
    },

    fullHeart() {
      return SolidIcons.faHeart;
    },

    faEye() {
      return RegularIcons.faEye;
    },
    faEyeFull() {
      return SolidIcons.faEye;
    },
  },
  created() {
    if (this.$auth.loggedIn) {
      this.hasUserLikedModule = this.likers.includes(this.$auth.user._id);
      this.hasUserViewedModule = this.viewers.includes(this.$auth.user._id);
    }
  },

  methods: {
    ratingSelected(val) {
      this.$store.dispatch('modules/rateModule', {
        moduleId: this._id,
        value: val,
      });
    },

    async likeModule() {
      if (!this.hasUserLikedModule) {
        try {
          await this.$store.dispatch('modules/likeModule', this._id);
          this.hasUserLikedModule = true;
        } catch (err) {
          console.log('an error occured', err);
        }
      } else {
        try {
          await this.$store.dispatch('modules/unlikeModule', this._id);
          this.hasUserLikedModule = false;
        } catch (err) {
          console.log('an error occured', err);
        }
      }
    },

    // checkAuth() {
    //   if (!this.$auth.isLoggedIn) {
    //     this.$vs
    //   }
    // }
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
        button,
        a.explorer {
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
