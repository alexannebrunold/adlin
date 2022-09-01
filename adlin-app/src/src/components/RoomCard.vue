<template>
  <div class="card-container">
    <h1>Coucou</h1>
<BaseButton>cc</BaseButton>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue'

export default {
  name: "RoomCard",
  components: {
    BaseButton
  },
  props: {
    msg: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-container {
  width: 361px;
  height: 230px;
  border: 2px solid rgb(31, 31, 156);
  border-radius: 8px;
}
</style>
