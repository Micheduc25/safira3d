<template>
  <div
    class="page-content home-or-loader flex flex-col items-center justify-center relative"
  >
    <transition name="fade">
      <construction-popup
        v-if="showHomePopup"
        @closePopup="$store.dispatch('views/setShowPopup', false)"
      />
    </transition>
    <loader v-show="showLoader" />
    <div
      v-show="!showLoader"
      class="search-bar flex flex-row- items-center w-full xs:hidden"
    >
      <button
        class="search-but px-3 w-16 rounded-none bg-main flex items-center justify-center focus:outline-none"
      >
        <img src="/images/icons/searchbar.png" class="" alt="search bar" />
      </button>
      <input
        v-model="searchKey"
        type="search"
        class="text-black flex-grow px-2 py-2 rounded-none border border-black w-0 transition-all duration-300"
        placeholder="un lieu, un pays, une ville, un quartier ou une catégorie de sites
            "
      />
    </div>
    <div v-show="!showLoader" class="home-main">
      <div class="upper-band relative">
        <div class="upper-band-content w-5/12">
          <div class="band-content-upper">
            <img src="/images/home/safira.png" alt="safira" />
            <p class="mt-4 text-4xl">
              Bienvenue sur
              <span class="font-bold text-4xl">Safira3D.net</span>, la première
              plateforme web de réalité virtuelle consacrée aux plus grands
              lieux du patrimoine culturel, historique et naturel du Cameroun et
              de l’Afrique !
            </p>
            <div class="font-bold w-full text-left text-3xl">
              Explorez – Découvrez – Apprenez !
            </div>
          </div>

          <div v-if="!$auth.user" class="auth-options mb-4 flex mt-3 ml-auto">
            <nuxt-link to="/auth/login" class="auth-button mr-6 mb-3"
              >Se connecter</nuxt-link
            >
            <nuxt-link to="/auth/register" class="auth-button mb-3"
              >Créer un compte</nuxt-link
            >
          </div>
        </div>
      </div>
      <transition-group name="fade">
        <safira-item
          v-for="module in currentPageItems"
          :key="module._id"
          :_id="module._id"
          :views="module.views"
          :rating="module.rating"
          :likes="module.likes"
          :image-main="module.foreground_image"
          :image-back="module.background_image"
          :title="module.title"
          :location="module.location"
          :categories="module.categories.join('-')"
          :main-color="module.main_color"
          :secondary-color="module.secondary_color"
          :likers="module.likers"
          :viewers="module.viewers"
          :visit_url="module.visit_url"
        >
          <template #description>
            {{ module.description }}
          </template>
        </safira-item>
      </transition-group>

      <!-- If no module is available we display some messages-->
      <div
        v-if="modules.length === 0"
        class="text-gray-600 text-4xl font-bold text-center mt-6"
      >
        Aucun module n'est diponible pour le moment
      </div>
      <div
        v-else-if="filtered_modules.length === 0"
        class="text-gray-600 text-4xl font-bold text-center mt-6"
      >
        Aucun résultat trouvé
      </div>

      <div class="more">
        <p class="w-7/12 mx-auto text-center text-3xl">
          Notre plateforme web de réalité virtuelle évolue tous les jours.
          Retrouvez très prochainement ici d’avantages de lieux uniques et
          magnifiques à explorer
        </p>

        <div
          v-if="filtered_modules.length > step"
          class="mt-6 text-4xl center con-pagination"
        >
          <vs-pagination
            v-model="page"
            color="#203864"
            circle
            :length="totalPages"
          />
        </div>
      </div>

      <div class="bg-main w-full">
        <div class="last-section page-content px-6 py-6 text-white">
          <div class="text-4xl font-bold">
            Voudriez-vous que votre site apparaisse également ici?
          </div>
          <div
            style="font-family: sans-serif; font-size: 16px"
            class="font-normal"
          >
            Vous êtes responsable d’un site touristique, hôtel, parc, campus
            scolaire ou universitaire, bureau… ou de tout autres lieux que vous
            voudriez faire découvrir au Monde? Vous voudriez attirer plus de
            visiteurs ou de clients vers votre activité? Alors remplissez le
            formulaire maintenant!
          </div>

          <div class="formulaire flex justify-center mt-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeHtxIITPPq9SmgfIyzRp2kbcFS_nHo_mAFRhgp807OFD4_Mw/viewform"
              target="_blank"
              class="formulaire-but text-3xl"
            >
              Remplir le formulaire
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import SafiraItem from '~/components/SafiraItem';
import loader from '~/components/loader';
import ConstructionPopup from '~/components/ConstructionPopup.vue';
export default {
  name: 'HomePage',
  layout: 'baseLayout',
  components: {
    SafiraItem,
    loader,
    ConstructionPopup,
  },
  data() {
    return {
      showLoader: true,
      page: 1,
      step: 5,
      searchKey: '',
    };
  },
  computed: {
    ...mapGetters('modules', ['modules', 'filtered_modules']),
    ...mapGetters('views', ['showHomePopup']),
    currentPageItems() {
      return this.filtered_modules.slice(
        (this.page - 1) * this.step,
        this.page * this.step + this.step - 1
      );
    },

    totalPages() {
      return Math.ceil(this.filtered_modules.length / this.step);
    },
  },
  watch: {
    searchKey(newVal) {
      this.$store.dispatch('modules/searchModule', newVal);
    },
  },

  async created() {
    try {
      await this.$store.dispatch('modules/fetchAllModules');
    } catch (err) {
      this.$vs.notification({
        text: 'Une erreur est survenu lors du chargement des modules',
        color: 'danger',
        duration: 3000,
      });
    } finally {
      this.showLoader = false;
    }
  },

  mounted() {
    const isFirstLoad = localStorage.getItem('isFirstLoad');
    if (isFirstLoad === null) {
      this.$store.dispatch('views/setShowPopup', true);
      localStorage.setItem('isFirstLoad', 'false');
    }
  },
};
</script>

<style lang="scss">
.home-main {
  .upper-band {
    background-image: url('/images/home/picture1.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center left;
    min-height: 70vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .auth-button {
      background: #203864;
      border-radius: 5px;
      @apply shadow-lg;
      padding: 5px 15px;
      color: white;
      display: block;
      transition: 0.3s;
      text-align: center;

      &:hover {
        background: lighten($color: #203864, $amount: 20);
      }
    }

    .upper-band-content {
      transform: translateX(50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      min-width: 600px;
      color: #203864;
      padding: 5px;
      .band-content-upper {
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0)
        );
        font-weight: 600;
        padding: 20px 10px;
      }
      @media only screen and (max-width: 1200px) {
        transform: translateX(0);
      }
      @media only screen and (max-width: 822px) {
        .band-content-upper {
          background: rgba(255, 255, 255, 0.5);
        }
      }
      @media only screen and (max-width: 650px) {
        width: 90%;
        min-width: auto;
        padding: 5px;
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.1),
          rgba(0, 0, 0, 0)
        );
        color: white !important;

        .band-content-upper {
          background: none;
        }
        .auth-options {
          @apply mx-auto;
        }
        img {
          width: 200px !important;
        }
      }
      @media only screen and (max-width: 465px) {
        img {
          width: 170px !important;
        }
      }
      @media only screen and (max-width: 389px) {
        width: 97%;
        padding: 5px;
        // background: rgba(0, 0, 0, 0.4);

        color: white;

        img {
          width: 180px;
        }
      }

      img {
        width: 250px;
      }
    }
  }

  .more {
    min-height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .last-section {
    .formulaire-but {
      background-color: #262626;
      padding: 10px;
      transition: 0.3s;
      &:hover {
        background-color: #3b3b3b;
      }
    }
  }
}
</style>
