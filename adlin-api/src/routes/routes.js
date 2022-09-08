import express from 'express'
import roomsLoader from '../query/rooms.js'
import reservationsLoader from '../query/reservations.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.json('HomePage')
})

//Rooms
router.get('/allRooms', roomsLoader.getAllRooms)
router.post('/roomByDate', roomsLoader.getAvailableRoomByDate)

//Reservations
router.get('/allReservations', reservationsLoader.getAllReservations)
router.post('/createReservation', reservationsLoader.createReservation)

export default router