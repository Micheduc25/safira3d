<template>
  <div class="module-form">
    <div class="form-wrapper w-7/12 mx-auto text-4xl">
      <div class="title font-bold mb-8 mt-4 text-5xl text-center">
        {{ !isEditMode ? 'Ajouter un Module Safira' : 'Modifier Module' }}
      </div>
      <form-input
        v-model="formData.title"
        :initial-value="formData.title"
        label="Titre"
        name="title"
        type="text"
      />
      <form-text-area
        v-model="formData.description"
        label="Description"
        name="description"
      />
      <form-input
        v-model="formData.location"
        :initial-value="formData.location"
        label="Location"
        name="location"
        type="text"
      />
      <form-input
        v-model="formData.visit_url"
        :initial-value="formData.visit_url"
        label="Url du Module"
        name="visiturl"
        type="url"
      />
      <form-input
        v-model="formData.apk_url"
        :initial-value="formData.apk_url"
        label="Url de l'APK"
        name="apkurl"
        type="url"
      />
      <form-input
        v-model="formData.app_id"
        :initial-value="formData.app_id"
        label="Identifiant Apk"
        name="apkid"
        type="text"
      />

      <form-input
        v-model="formData.main_color"
        :initial-value="formData.main_color"
        label="Couleur Princiale"
        name="main_color"
        type="color"
      />
      <form-input
        v-model="formData.secondary_color"
        :initial-value="formData.secondary_color"
        label="Couleur de Fond"
        name="secondary_color"
        type="color"
      />
      <form-select-input
        :multiple="true"
        name="category"
        :options="[
          'Monument',
          'Site Historique',
          'Site Touristique',
          'Site Culturel',
        ]"
        label="Catégories"
        :initial-value="formData.categories"
        @valueSelected="categoriesSelected"
      />
      <form-upload-button
        file-mimes="images/*"
        text="Choisir"
        label="Image Primaire"
        @fileSelected="foreImageSelected"
      />
      <img id="fgimg" class="mb-10" :src="formData.foreground_image" alt="" />
      <form-upload-button
        file-mimes="images/*"
        text="Choisir"
        label="Image de Fond"
        @fileSelected="backImageSelected"
      />
      <img id="bgimg" class="" :src="formData.background_image" alt="" />

      <div class="flex justify-center items-end">
        <button
          :disabled="isCreating"
          class="py-4 px-8 my-8 bg-blue-600 text-white text-4xl rounded"
          @click="() => (isEditMode ? updateModule() : createModule())"
        >
          {{ isEditMode ? 'Modifier' : 'Créer' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import formInput from '~/components/formInput';
import formSelectInput from '~/components/formSelectInput';
import formTextArea from '~/components/formTextArea';
import formUploadButton from '~/components/formUploadButton';
export default {
  name: 'CreateModule',
  middleware: 'auth',
  components: {
    formInput,
    formSelectInput,
    formTextArea,
    formUploadButton,
  },
  data() {
    return {
      formData: {
        title: '',
        description: '',
        location: '',
        main_color: '',
        secondary_color: '',
        categories: [],
        foreground_image: null,
        background_image: null,
        visit_url: '',
        apk_url: '',
        app_id: '',
      },

      isEditMode: false,
      editModule: null,

      isCreating: false,
    };
  },

  computed: {
    ...mapGetters('modules', ['selected_module']),
  },

  async created() {
    //  we check if we are in edit mode
    this.isEditMode = this.$route.query.editmode === 'true';
    if (this.isEditMode) {
      try {
        await this.$store.dispatch(
          'modules/fetchModule',
          this.$route.query.moduleId
        );
        if (
          this.selected_module.creator._id !== this.$auth.user._id ||
          this.$auth.user.role !== 'admin'
        ) {
          this.$router.replace('/');
        } else {
          this.formData.description = this.selected_module.description;
          this.formData.title = this.selected_module.title;
          this.formData.visit_url = this.selected_module.visit_url;
          this.formData.location = this.selected_module.location;
          this.formData.main_color = this.selected_module.main_color;
          this.formData.secondary_color = this.selected_module.secondary_color;
          this.formData.categories = this.selected_module.categories;
          this.formData.foreground_image = this.selected_module.foreground_image;
          this.formData.background_image = this.selected_module.background_image;
        }
      } catch (err) {
        console.log('an error occured====>', err);
        this.$router.replace('/');
      }
    }
  },

  methods: {
    categoriesSelected(val) {
      this.formData.categories = val;
    },
    foreImageSelected(val) {
      this.formData.foreground_image = val;
      this.readImage(val, 'fgimg');
    },
    backImageSelected(val) {
      this.formData.background_image = val;
      this.readImage(val, 'bgimg');
    },

    async createModule() {
      this.isCreating = true;
      const loading = this.$vs.loading();
      try {
        await this.$store.dispatch('modules/createModule', this.formData);
        this.$vs.notification({
          color: 'success',
          text: 'Module Créé avec succès',
        });
      } catch (err) {
        this.$vs.notification({
          color: 'danger',
          text: 'Un erreur est survenu lors de la création du module',
        });
        // console.error(err);
      }
      loading.close();
      this.isCreating = false;
    },

    async updateModule() {
      console.log('going to update');
      this.isCreating = true;
      const loading = this.$vs.loading();

      try {
        await this.$store.dispatch('modules/editModule', {
          moduleId: this.$route.query.moduleId,
          data: this.formData,
        });
        this.$vs.notification({
          text: 'Module modifié avec succès',
          color: 'success',
          duration: 3000,
        });
        this.$router.back();
      } catch (err) {
        this.$vs.notification({
          text: 'Une erreur est survenu lors de la modification du module',
          color: 'danger',
          duration: 3000,
        });
      }
      loading.close();
      this.isCreating = false;
    },

    readImage(file, elId = 'fgimg') {
      const reader = new FileReader();
      const imageEl = document.getElementById(elId);
      reader.onload = (e) => {
        imageEl.src = e.target.result;
      };

      reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss" scoped></style>
