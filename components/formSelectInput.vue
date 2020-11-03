/* eslint-disable vue/require-prop-type-constructor */
<!-- Built Specially for user profile select fields -->
<template>
  <div class="mx-auto md:mx-0 w-full form-input items-center flex flex-col">
    <div
      class="text-xl font-bold w-full text-center md:text-left text-left mb-2 input-label"
    >
      {{ label }}
    </div>
    <div
      class="w-full input-wrapper border border-gray-500 rounded flex justify-between bg-white"
    >
      <label class="w-full" :for="name">
        <select
          :id="name"
          ref="select"
          v-model="selectValue"
          class="focus:outline-none p-2 w-full"
          :name="name"
          :disabled="disabled"
          @change="optionSelected"
        >
          <option
            v-for="(option, index) in options"
            :key="`option${index}`"
            class="select-option"
            :value="getOptionLabel(option)"
          >
            {{ getOptionLabel(option) }}
          </option>
        </select>
      </label>
    </div>
    <div
      v-if="multiple"
      class="flex w-full justify-start wrap selected-options mt-3"
    >
      <div
        v-for="(value, index) in multiSelectValues"
        :key="`mul${index}`"
        class="selected-option p-2 bg-gray-300 mr-4 rounded shadow relative"
      >
        <span
          class="block cursor-pointer text-right absolute right-0 top-0 text-red-500 text-xs"
          @click="removeItem(value.id || value, value.id)"
          >&cross;</span
        >
        <span class="block mt-1">{{ getOptionLabel(value) }}</span>
      </div>
    </div>
    <div class="w-full text-left mt-1 text-red-500 text-sm">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormSelectInput',

  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    initialValue: String | Array,
    name: String,
    disabled: {
      default: false,
      type: Boolean,
    },
    multiple: {
      default: false,
      type: Boolean,
    },
    errorMessage: {
      default: '',
      type: String,
    },

    label: String,
    options: Array,
  },

  data() {
    return {
      selectValue: '',
      multiSelectValues: [],
    };
  },

  watch: {
    initialValue(newVal) {
      if (newVal && !this.multiple) this.selectValue = newVal;
      if (this.multiple) this.multiSelectValues = newVal;
    },
    options(newVal) {
      if (!this.multiple) this.selectValue = this.getOptionLabel(newVal[0]);
      // console.log("option changed to ", newVal[0])
    },

    multiSelectValues(newVal) {
      //  when a multiselect changes ,we set the select value to the value of the last element in the array
      if (newVal && newVal.length > 0)
        this.selectValue = this.getOptionLabel(newVal[newVal.length - 1]);
      else if (newVal.length === 0) {
        this.selectValue = '';
      }
    },
  },

  created() {
    //  we set the value of the field to the initial value if there is one.
    //  it is to be noted that initial value is a string
    //  so we need a the getOptionFromLabel method to get the corresponding object
    if (this.initialValue) {
      if (!this.multiple) this.selectValue = this.initialValue;
      if (this.multiple && Array.isArray(this.initialValue)) {
        console.log('we are here!', this.initialValue);
        this.initialValue.forEach((val) => {
          console.log('initValue', val);
          this.multiSelectValues.push(val);
        });
      }
    } else {
      // this.selectValue = this.getOptionLabel(this.options[0]);
      // this.multiSelectValues.push(this.options[0]);
    }
  },
  // mounted() {

  // },

  methods: {
    optionSelected(event) {
      if (this.multiple) {
        //  we find if the multiselectValues array contains the selected element already, if not we add it;
        let findd;
        if (this.options[0].id) {
          findd = this.multiSelectValues.find(
            (item) => item.id === this.options[event.target.selectedIndex].id
          );
        } else {
          findd = this.multiSelectValues.includes(
            this.options[event.target.selectedIndex]
          );
        }
        if (!findd)
          this.multiSelectValues.push(this.options[event.target.selectedIndex]);
      }
      this.$emit(
        'valueSelected',
        this.multiple
          ? this.multiSelectValues
          : this.options[event.target.selectedIndex]
      );
    },

    //  method to remove item from multiselect list
    removeItem(itemId, isId) {
      let index;
      if (isId) {
        index = this.multiSelectValues.findIndex((item) => item.id === itemId);
      } else index = this.multiSelectValues.indexOf(itemId);

      console.log('index is', itemId, this.multiSelectValues, index);
      if (index !== undefined) {
        this.multiSelectValues.splice(index, 1);
        this.$emit('valueSelected', this.multiSelectValues);
      }
      console.log('index was not found');
    },
    getOptionLabel(option) {
      if (option)
        return option.name ? option.name : option.title ? option.title : option;
      else return 'Aucun';
    },
    getOptionFromLabel(optionLabel) {
      //  This function finds and option's object from a given name or title
      if (this.options[0].name) {
        return this.options.find((item) => item.name === optionLabel);
      } else if (this.options[0].title) {
        return this.options.find((item) => item.title === optionLabel);
      } else return this.options.find((item) => item === optionLabel);
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
