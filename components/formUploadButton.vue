<template>
  <div class="mx-auto md:mx-0 w-full justify-left form-input items-center flex">
    <div
      class="mr-4 text-xl w-3/12 font-bold text-center md:text-left text-left mb-2 input-label"
    >
      {{ label }}
    </div>
    <div class="input-wrapper rounded bg-white">
      <label class="w-full" :for="name">
        <div class="upload-btn-wrapper">
          <button class="btn">{{ text }}</button>
          <input
            ref="upload"
            :multiple="multiple"
            :accept="
              fileMimes
                ? fileMimes
                : `image/*, application/pdf, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document`
            "
            type="file"
            :name="name"
            @change="onFileSelected"
          />
        </div>
      </label>
    </div>
    <div class="w-full text-left mt-1 text-red-500 text-sm">
      {{ errorMessage }}
    </div>
    <div v-if="files" class="w-full text-left mt-1 text-sm">
      <span v-for="file in files" :key="file.name" class="block">{{
        file.name
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormUploadButton',
  props: {
    label: String,
    name: String,
    multiple: {
      type: Boolean,
      default: false,
    },
    fileMimes: String,
    text: {
      type: String,
      default: 'Choissir un Fichier',
    },
    errorMessage: String,
  },

  data() {
    return {
      file: null,
      files: null,
    };
  },

  methods: {
    onFileSelected() {
      this.files = this.$refs.upload.files;
      const myfiles = [];
      if (this.multiple) {
        for (let i = 0; i < this.files.length; i++) {
          myfiles.push(this.files[i]);
        }
      }
      //  in case of multiple files, we send an array containing the files
      this.$emit('fileSelected', this.multiple ? myfiles : this.files[0]);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn {
  border: 2px solid #017da4;
  color: black;
  background-color: white;
  padding: 5px 20px;
  border-radius: 8px;
  font-size: 17px;
  font-weight: bold;
}

.upload-btn-wrapper input[type='file'] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.form-input {
  &:not(:last-child) {
    margin-bottom: 15px;
  }
}
</style>
