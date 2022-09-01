<template>
  <div class="about">
    <h1>Les salles disponibles à la réservations</h1>
    <RoomCard></RoomCard>
  </div>
</template>

<script>
import RoomCard from '../components/RoomCard.vue'

export default {
  components: {
    RoomCard
  }
}
</script>