<template>
  <button
    class="button-style"
    :form="formId"
    :disabled="showButtonLoading"
    @click="$emit('button-click')"
  >
    <div v-if="showButtonLoading" class="loader" />
    <slot v-else />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    formId: {
      type: String,
      default: "",
    },
    typeOfButton: {
      type: String,
      default: "primaryButton",
    },
    showButtonLoading() {
      return this.loading && this.typeOfButton !== "cancelButton";
    },
  },
};
</script>

<style scoped>
.base-button-padding {
  padding: var(--padding-top-bottom) var(--padding-left-right);
}

.button-style,
.base-button-padding {
  color: white;
  border: 2px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blue;
  border-radius: 8px;
}

.button-style:hover {
  background-color: blue;
  outline: none;
}

.button-style:focus-visible {
  outline-offset: 4px;
  outline: 2px solid blue;
}
</style>
