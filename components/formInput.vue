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
      class="w-full input-wrapper border border-gray-400 rounded p-2 flex justify-between flex items-center bg-white"
    >
      <div v-if="isTel" class="mr-1">{{ countryCode }}</div>
      <label class="w-full" :for="name">
        <input
          v-model="fieldValue"
          :disabled="disabled"
          class="focus:outline-none w-full"
          :placeholder="placeholder"
          :value="value"
          :type="type"
          @input="updateValue($event.target.value)"
        />
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
  name: 'FormInput',

  props: {
    type: {
      default: 'text',
      type: String,
    },
    isTel: {
      default: false,
      type: Boolean,
    },
    countryCode: {
      default: '237',
      type: String,
    },
    // eslint-disable-next-line vue/require-prop-type-constructor
    initialValue: String | Number,
    name: String,
    errorMessage: {
      default: '',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    value: String,
    placeholder: String,
    label: String,
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
    // we set the value of the field to the initial value if there is one.
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
    margin-bottom: 15px;
  }
}
</style>
