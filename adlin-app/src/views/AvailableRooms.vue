<template>
  <div class="about">
    <h1>Les salles disponibles à la réservations</h1>
    <RoomCard :room='rooms' v-for="rooms in rooms" :key="rooms.name"></RoomCard>
  </div>
</template>

<script>
import axios from "axios";
import RoomCard from "../components/RoomCard.vue";

export default {
  components: {
    RoomCard,
  },
  data() {
    return {
      rooms: [],
    };
  },
  beforeCreate() {
    console.log("cc");
    axios
      .get("http://localhost:8000/api/allRooms", {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      })
      .then((rooms) => {
        this.rooms = rooms.data.rooms
        console.log(rooms.data.rooms);
      })
  },
}
</script>
