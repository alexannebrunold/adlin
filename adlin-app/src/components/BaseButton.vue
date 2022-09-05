<template>
  <button
    class="button-style"
    :form="formId"
    @click="$emit('button-click')"
  >
    <div v-if="loading" class="loader" />
    <slot v-else />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    formId: {
      type: String,
      default: "",
    },
    typeOfButton: {
      type: String,
      default: "primaryButton",
    },
    watch: {
loading() {
      return this.loading
    },
    }
    
  },
};
</script>
