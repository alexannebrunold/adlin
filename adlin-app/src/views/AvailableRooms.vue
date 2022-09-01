<template>
  <div class="about">
    <h1>Les salles disponibles à la réservations</h1>
    <label for="meeting-time">Sélectionne une date et une heure:</label>

    <input
      type="datetime-local"
      id="reservation-time-start"
      name="reservation-time-start"
      value="2022-06-12T19:30"
      min="2000-06-07T00:00"
      max=""
      v-model="startDate"
    />

    <!-- <input
    v-if="startDate.length"
      type="datetime-local"
      id="reservation-time-end"
      name="reservation-time-end"
      value="2022-06-12T19:30"
      :min=""
      max=""
      v-model="dateEnd"
    /> -->

    <div v-if="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>

    <li class="rooms-flex" v-if="startDate">
      <RoomCard
        :room="rooms"
        v-for="rooms in rooms"
        :key="rooms.name"
        @getCardInformations="createReservationWithRoomInformations"
      ></RoomCard>
    </li>
    <p v-if="rooms && startDate">Pas de room</p>
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
      startDate: "",
      dateEnd: "",
      errorMessage: '',
    };
  },
  watch: {
    startDate() {
     this.getAvailableRoomsForSelectedDate(this.startDate)
    }
  },
  methods: {
    getAvailableRoomsForSelectedDate(selectedStartDate) {
      axios
        .post(
          "http://localhost:8000/api/roomByDate",
          { date: selectedStartDate },
          {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          }
        )
        .then((rooms) => {
          this.rooms = rooms.data;
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
    createReservationWithRoomInformations(roomInfos) {
      axios
        .post(
          "http://localhost:8000/api/createReservation",
          { roomName: roomInfos.name, date: this.date },
          {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          }
        )
        .then((result) => {
          return result;
        })
        .catch((error) => {
          return (this.error = error);
        });
    },
  },
};
</script>

<style scoped style="css">
.rooms-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.error {
  border: 1px solid red;
  padding: 32px;
  width: 180px;
}
</style>
