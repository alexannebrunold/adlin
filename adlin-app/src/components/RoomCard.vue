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
import BaseButton from './BaseButton.vue'

export default {
  name: 'RoomCard',
  components: {
    BaseButton,
  },
  props: {
    room: Object,
    buttonIsLoading: Boolean,
  },
  watch: {
    buttonIsLoading() {
      this.buttonIsLoading
    },
  },
}
</script>
