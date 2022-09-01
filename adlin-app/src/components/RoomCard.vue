<template>
  <div class="card-container">
    <h1>{{ room.name }}</h1>
    <p>{{ room.description }}</p>
    <p>{{ room.capacity }}</p>
    <div v-if="room.equipements.length > 1">
      <li v-for="equipements in room.equipements" :key="equipements.name">
        {{ equipements.name }}
      </li>
    </div>
    <BaseButton @click="$emit('getCardInformations', room)">RESERVER</BaseButton>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  name: "RoomCard",
  components: {
    BaseButton,
  },
  props: {
    room: Object,
  },
};
</script>

<style scoped lang="css">
.card-container {
  width: 361px;
  height: 230px;
  border: 2px solid rgb(31, 31, 156);
  border-radius: 8px;
}
</style>
