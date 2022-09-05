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
    <p v-if="created">La réservation est créer :)</p>

    <li class="rooms-flex" v-if="startDate">
      <div v-if="!created">
        <RoomCard
          :room="rooms"
          v-for="rooms in rooms"
          :key="rooms.name"
          @getCardInformations="createReservationWithRoomInformations"
          :buttonIsLoading="buttonIsLoading"
        ></RoomCard>
      </div>
    </li>

    <p v-if="rooms.length <= 0 && startDate">Pas de room</p>
  </div>
</template>

<script>
import httpService from "../plugins/httpService";
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
      errorMessage: "",
      buttonIsLoading: false,
      isReservationCreated: false,
    };
  },
  watch: {
    startDate() {
      console.log('x');
      this.getAvailableRoomsForSelectedDate(this.startDate);
    },
  },
  computed: {
    created() {
      return this.isReservationCreated;
    },
  },
  methods: {
    getAvailableRoomsForSelectedDate(selectedStartDate) {
      return httpService
        .post({
          path: "/roomByDate",
          body: {
            date: selectedStartDate,
          },
        })
        .then((rooms) => {
          console.log(rooms);
          this.rooms = rooms;
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
    createReservationWithRoomInformations(roomInfos) {
      this.buttonIsLoading = true;
      httpService
        .post({
          path: "/createReservation",
          body: {
            roomName: roomInfos.name,
            date: this.date,
          },
        })
        .then((result) => {
          this.buttonIsLoading = false;
          this.iseCreated(result);
          return result;
        })
        .catch((error) => {
          this.buttonIsLoading = false;
          return (this.error = error);
        });
    },
    iseCreated(result) {
      return result.message === "created"
        ? (this.isReservationCreated = true)
        : (this.isReservationCreated = false)
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
  margin-top: 32px;
}

.error {
  border: 1px solid red;
  padding: 32px;
  width: 180px;
}
</style>
