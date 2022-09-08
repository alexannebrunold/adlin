<template>
  <div class="available-rooms-container">
    <h1 class="title">Les salles disponibles à la réservations</h1>

    <div class="meeting-time">
      <label for="meeting-time">Sélectionne une date et une heure : </label>

      <input
        type="datetime-local"
        id="reservation-time-start"
        name="reservation-time-start"
        value="2022-06-12T19:30"
        min="2000-06-07T00:00"
        max=''
        v-model="startDate"
      />
    </div>

    <div class="margin-top-16">
      <label for="select">Sélectionne un équipement </label>
      <Select
        :listOfOptions="equipementOfRooms"
        @selectedOption="getSelectedOption"
        name="select"
      />
    </div>

    <div class="margin-top-16">
      <label for="input" class="margin-top-16">
        Écris la capacité de la salle dont tu as besoin
      </label>
      <Input
        name="input"
        :type="'number'"
        :min="0"
        :max="1000"
        @selectedOption="getSelectedInputInformations"
      />
    </div>

    <ErrorCard v-if="errorMessage" class="error margin-top-16" :errorMessage="errorMessage" />

    <SuccessCard v-if="reservationCreated" class="margin-top-16"/>

    <li class="rooms-flex" v-if="condition">
      <RoomCard
        :room="room"
        v-for="room in roomsFiltered"
        :key="room.name"
        @getCardInformations="createReservationWithRoomInformations"
        :buttonIsLoading="buttonIsLoading"
      />
    </li>

    <p v-if="roomsFiltered.length <= 0 && startDate">
      Il y a pas de salles disponibles
    </p>
  </div>
</template>

<script>
import httpService from '../plugins/httpService'
import RoomCard from '../components/RoomCard.vue'
import { roomsEquipementsEnum } from '../common/enum/roomsEquipementsEnum'
import SuccessCard from '../components/SuccessCard.vue'
import ErrorCard from '../components/ErrorCard.vue'
import Select from '../components/SelectOption.vue'
import Input from '../components/Input.vue'

export default {
  components: {
    RoomCard,
    SuccessCard,
    ErrorCard,
    Select,
    Input,
  },
  data() {
    return {
      rooms: [],
      roomsFiltered: [],
      startDate: '',
      dateEnd: '',
      errorMessage: '',
      buttonIsLoading: false,
      isReservationCreated: false,
      equipementOfRooms: Object.values(roomsEquipementsEnum),
      selectedOption: '',
      selectedNumber: '',
    }
  },
  watch: {
    startDate() {
      this.getAvailableRoomsForSelectedDate(this.startDate)
    },
    selectedOption() {
      this.filteredRoomsByConditions()
    },
    selectedNumber() {
      this.filteredRoomsByConditions()
    },
    rooms() {
      this.filteredRoomsByConditions()
    },
  },
  computed: {
    reservationCreated() {
      return this.isReservationCreated
    },
    condition() {
      return this.startDate && !this.reservationCreated
    },
  },
  methods: {
    getAvailableRoomsForSelectedDate(selectedStartDate) {
      this.isReservationCreated = false

      return httpService
        .post({
          path: "/roomByDate",
          body: {
            date: selectedStartDate,
          },
        })
        .then((rooms) => {
          this.rooms = rooms
          this.roomsFiltered = rooms
        })
        .catch((error) => {
          this.error = error.message
        })
    },
    createReservationWithRoomInformations(roomInfos) {
      this.buttonIsLoading = true
      httpService
        .post({
          path: "/createReservation",
          body: {
            roomName: roomInfos.name,
            date: this.startDate,
          },
        })
        .then((result) => {
          this.buttonIsLoading = false
          this.selectedOption = ''
          this.selectedNumber = ''
          this.isReservationCreated = result
          return result
        })
        .catch((error) => {
          this.buttonIsLoading = false
          return (this.error = error)
        })
    },
    filteredRoomsByConditions() {
      const isOptionNotSelectedOrOptionSelectedIsEqualToSpecificWord =
        !this.selectedOption || this.selectedOption === "Aucun"

      if (
        isOptionNotSelectedOrOptionSelectedIsEqualToSpecificWord &&
        !this.selectedNumber
      ) {
        return (this.roomsFiltered = this.rooms)
      }
      if (this.selectedOption) {
        this.roomsFiltered = this.rooms.filter((room) =>
          room.equipements
            .map((equipement) => equipement.name)
            .includes(this.selectedOption)
        )
      }
      if (this.selectedNumber) {
        this.roomsFiltered = this.rooms.filter(
          (room) => room.capacity.toString() === this.selectedNumber
        )
      }
    },
    getSelectedOption(option) {
      return (this.selectedOption = option)
    },
    getSelectedInputInformations(number) {
      return (this.selectedNumber = number)
    },
  },
}
</script>
