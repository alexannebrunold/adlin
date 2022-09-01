<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="header">
    <h1>Adlin</h1>
    <slot />
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 80px;
  background-color: blue;
  color: #fafafa;
}

h1 {
  font-size: 56px;
}
</style>
