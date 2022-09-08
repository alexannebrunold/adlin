<template>
  <input
    :type="type"
    :min="min"
    :max="max"
    v-model="selectedOption"
    @input="$emit('selectedOption', selectOption)"
    :class="inputClass"
  />
</template>

<script>
export default {
  name: 'SelectOption',
  data() {
    return {
      selectedOption: '',
    }
  },
  props: {
    selectedNumber: Number,
    type: {
      type: String,
      default: '',
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1000,
    },
    inputClass: {
      type: String,
      default: 'input-container',
    },
  },
  computed: {
    selectOption() {
      return this.selectedOption
    },
  },
}
</script>
