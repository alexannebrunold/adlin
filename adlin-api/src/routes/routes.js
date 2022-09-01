import express from 'express'
import roomsLoader from '../query/rooms.js'
import reservationsLoader from '../query/reservations.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.json('HomePage')
})

//Rooms
router.get('/allRooms', roomsLoader.getAllRoomsHey)
// router.get('/room/:id', recipesLoader.getRoomById)

//Reservations
router.get('/x', reservationsLoader.getAllReservations)
router.post('/createReservation', reservationsLoader.createReservation)


export default router