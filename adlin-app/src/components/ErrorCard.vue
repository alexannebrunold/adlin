<template>
  <div class="error-card-container">
    <h1 class="title">La salle est réservée 🎉</h1>
  </div>
</template>

<script>
export default {
  name: 'ErrorCard',
  props: {
    errorMessage: {
      type: String,
      default: '',
    },
  },
}
</script>
