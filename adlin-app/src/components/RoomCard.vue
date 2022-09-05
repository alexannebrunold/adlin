<template>
  <div class="card-container">
    <h1 class="title">{{ room.name }}</h1>
    <p v-if="room.description">Description : {{ room.description }}</p>
    <p v-if="room.capacity">Capacité : {{ room.capacity }}</p>
    <div v-if="room.equipements">
      Équipements :
      <li v-for="equipements in room.equipements" :key="equipements.name">
        {{ equipements.name }}
      </li>
    </div>
    <BaseButton
      @button-click="$emit('getCardInformations', room)"
      class="button-position"
      :loading="buttonIsLoading"
      >
      RESERVER
      </BaseButton>
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
    buttonIsLoading: Boolean,
  },
  watch: {
    buttonIsLoading() {
      console.log(this.buttonIsLoading);
    },
  },
};
</script>

<style scoped lang="css">
.card-container {
  width: 361px;
  height: 230px;
  border: 2px solid rgb(31, 31, 156);
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  position: relative;
}

.title {
  display: flex;
  font-size: 32px;
  align-self: center;
  padding-bottom: 8px;
}

.button-position {
  display: flex;
  align-self: flex-end;
  justify-self: flex-end;
  position: absolute;
  bottom: 16px;
  right: 16px;
}
</style>
