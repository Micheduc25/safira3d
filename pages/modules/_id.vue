<template>
  <section class="module-container">
    <section v-if="selected_module" class="module-screen">
      <vs-dialog v-model="showDeletePopUp">
        <template #header>
          <h2 class="text-4xl font-bold">Suprimer Module</h2>
        </template>
        <p class="con-content text-3xl">
          Voulez vous vraiment suprimer ce module? ({{ selected_module.title }})
        </p>

        <template #footer>
          <div class="flex justify-end">
            <vs-button border class="mr-4" @click="showDeletePopUp = false"
              >Annuler</vs-button
            >
            <vs-button border color="danger" @click="deleteModule"
              >Suprimer</vs-button
            >
          </div>
        </template>
      </vs-dialog>
      <div
        :style="{ backgroundImage: `url(${selected_module.background_image})` }"
        class="top-band relative"
      >
        <div
          v-if="
            $auth.loggedIn &&
            ($auth.user.role === 'admin' ||
              $auth.user._id === selected_module.creator._id)
          "
          class="module-actions"
        >
          <div
            class="edit-icon-abs"
            @click="
              $router.push({
                path: '/modules/create-module',
                query: { editmode: true, moduleId: selected_module._id },
              })
            "
          >
            <fa-icon :icon="faEdit" />
          </div>
          <div class="delete-icon-abs" @click="showDeletePopUp = true">
            <fa-icon :icon="faDelete" />
          </div>
        </div>
        <div class="module_title font-bold">
          {{ selected_module.title }}
        </div>
      </div>

      <div class="location text-center text-3xl font-bold my-4">
        situé à : {{ selected_module.location }}
      </div>
      <div class="module description text-3xl py-6 px-4 flex justify-center">
        {{ selected_module.description }}
      </div>

      <div v-if="$auth.loggedIn" class="rate-module flex flex-col items-center">
        <div class="text-4xl">Notez ce Module</div>

        <client-only>
          <star-rating
            :show-rating="false"
            :star-size="30"
            :read-only="!$auth.loggedIn"
            :rating="rating"
            @rating-selected="ratingSelected"
          />

          <template #placeholder><div>ratings</div></template>
        </client-only>
      </div>

      <div class="images-title mb-4">
        <h1 class="text-6xl text-center font-bold tracking-wider">
          Images du Module
        </h1>
      </div>
      <div class="module_images flex justify-around">
        <img :src="selected_module.foreground_image" alt="module image" />
      </div>

      <div class="visit-but flex justify-center items-center">
        <a
          :href="selected_module.visit_url"
          class="action-but px-6 py-4 text-white mt-8 inline-block"
        >
          Aller a la visite
        </a>
      </div>

      <div class="px-6 module_creator">
        <span>Ajouté par: </span
        ><span class="font-bold text-4xl">{{
          selected_module.creator.name
        }}</span>
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
const rating = process.client ? require('vue-star-rating/src') : {};
export default {
  name: 'ModuleId',
  components: {
    StarRating: rating.default,
  },
  middleware: 'auth',
  data() {
    return {
      rating: 0,
      showDeletePopUp: false,
    };
  },

  computed: {
    ...mapGetters('modules', ['selected_module']),

    faEdit() {
      return SolidIcons.faEdit;
    },

    faDelete() {
      return SolidIcons.faTrash;
    },
  },
  async created() {
    // const loading = this.$vs.loading();
    try {
      //  we fetc the selected module

      await this.$store.dispatch('modules/fetchModule', this.$route.params.id);
      this.rating = this.selected_module.rating;

      //  if the user has not yet viewed the module we make him view!
      if (
        this.$auth.loggedIn &&
        !this.selected_module.viewers.includes(this.$auth.user._id)
      ) {
        await this.$store.dispatch(
          'modules/viewModule',
          this.selected_module._id
        );
      }
    } catch (err) {
      console.log(err);
    }
    // loading.close();
  },

  methods: {
    async ratingSelected(val) {
      //   const loading = this.$vs.loading();
      await this.$store.dispatch('modules/rateModule', {
        moduleId: this.selected_module._id,
        value: val,
      });
      this.$vs.notification({
        text: 'Votre note a été considéré! ',
        color: 'success',
        duration: 3000,
      });

      //   loading.close();
    },

    async deleteModule() {
      this.showDeletePopUp = false;
      const loading = this.$vs.loading();
      try {
        await this.$store.dispatch(
          'modules/deleteModule',
          this.selected_module._id
        );
        this.$router.replace('/');
      } catch (err) {
        this.$vs.notification({
          text: 'Une erreur est survenu lors de la supression du module',
          color: 'danger',
          duration: 4000,
        });
      }

      loading.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.module-screen {
  .top-band {
    height: 50vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .module-actions {
      position: absolute;
      width: max-content;
      top: 30px;
      right: 30px;
      color: white;
      font-size: 25px;
      display: flex;
      background-color: rgba(0, 0, 0, 0.4);
      padding: 0 5px;
    }
    .edit-icon-abs {
      cursor: pointer;
      transition: color 0.3s;
      margin-right: 10px;
      &:hover {
        color: yellow;
      }
    }

    .delete-icon-abs {
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: red;
      }
    }

    .module_title {
      font-size: 40px;
      width: max-content;
      color: white;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.4);
      padding: 2px;
    }
    .module_description {
      width: max-content;
      font-size: 25px;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
        sans-serif;
    }
  }
}
</style>
