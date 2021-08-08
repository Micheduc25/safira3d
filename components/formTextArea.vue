<template>
  <div
    class="mx-auto md:mx-0 w-full justify-left form-input items-center flex flex-col"
  >
    <div
      class="text-xl font-bold w-full text-center md:text-left text-left mb-2 input-label"
    >
      {{ label }}
    </div>
    <div
      class="w-full input-wrapper border border-gray-500 rounded p-2 flex justify-between bg-white"
    >
      <label class="w-full" :for="name">
        <textarea
          :id="name"
          class="focus:outline-none resize-none w-full"
          :placeholder="placeholder"
          :disabled="disabled"
          :name="name"
          :value="value"
          cols="30"
          rows="6"
          @input="updateValue($event.target.value)"
        ></textarea>
      </label>

      <transition name="fade">
        <span
          v-if="fieldValue !== '' && type !== 'password' && !disabled"
          class="cursor-pointer text-red-500 text-sm"
          @click="clearField"
          >x</span
        >
      </transition>
    </div>

    <div class="w-full text-left mt-1 text-red-500 text-sm">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormTextArea',

  props: {
    type: {
      default: 'text',
      type: String,
    },
    // eslint-disable-next-line vue/require-prop-type-constructor
    initialValue: String | Number,
    name: { type: String, default: '' },
    errorMessage: {
      default: '',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    label: { type: String, default: '' },
  },

  data() {
    return {
      fieldValue: '',
      showPassword: false,
    };
  },

  watch: {
    fieldValue(newVal) {
      this.$emit('valueChanged', newVal);
    },
    initialValue(newVal) {
      if (newVal) this.fieldValue = newVal;
    },
  },

  mounted() {
    //  we set the value of the field to the initial value if there is one.
    if (this.initialValue !== undefined && this.initialValue !== null) {
      this.fieldValue = this.initialValue;
    }
    // this.$parent.$on("cancelEdit",()=>{this.fieldValue=""});
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
    },

    clearField() {
      this.fieldValue = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.form-input {
  &:not(:last-child) {
    margin-bottom: 30px;
  }
}
</style>
