<template>
  <div class="module-form">
    <div class="form-wrapper w-7/12 mx-auto text-4xl">
      <div class="title font-bold mb-8 mt-4 text-5xl text-center">
        Créer un Module Safira
      </div>
      <form-input
        v-model="formData.title"
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
        label="Location"
        name="location"
        type="text"
      />
      <form-input
        v-model="formData.main_color"
        label="Couleur Princiale"
        name="main_color"
        type="color"
      />
      <form-input
        v-model="formData.secondary_color"
        label="Couleur de Fond"
        name="secondary_color"
        type="color"
      />
      <form-select-input
        :multiple="true"
        name="category"
        :options="['ecole', 'business', 'monument', 'ville']"
        label="Catégories"
        @valueSelected="categoriesSelected"
      />
      <form-upload-button
        v-model="formData.title"
        file-mimes="images/*"
        text="Choisir"
        label="Image Primaire"
        @fileSelected="foreImageSelected"
      />
      <form-upload-button
        v-model="formData.title"
        file-mimes="images/*"
        text="Choisir"
        label="Image de Fond"
        @fileSelected="backImageSelected"
      />

      <div class="flex justify-center items-end">
        <button
          :disabled="isCreating"
          class="py-4 px-8 my-8 bg-blue-600 text-white text-4xl rounded"
          @click="createModule"
        >
          Créer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import formInput from '~/components/formInput';
import formSelectInput from '~/components/formSelectInput';
import formTextArea from '~/components/formTextArea';
import formUploadButton from '~/components/formUploadButton';
export default {
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
      },

      isCreating: false,
    };
  },

  methods: {
    categoriesSelected(val) {
      this.formData.categories = val;
    },
    foreImageSelected(val) {
      this.formData.foreground_image = val;
    },
    backImageSelected(val) {
      this.formData.background_image = val;
    },

    async createModule() {
      this.isCreating = true;
      const loading = this.$vs.loading();
      try {
        await this.$store.dispatch('modules/createModule', this.formData);
      } catch (err) {
        console.error(err);
      }
      loading.close();
      this.isCreating = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
