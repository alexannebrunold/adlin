import fs from 'fs'

function getAllRooms(req, res) {
  fs.readFile('./salles.json', 'utf8', (error, allRooms) => {
    if (error) {
      return res.json({
        message: error,
      })
    }

    const cleanedJSONRoomsDatas = JSON.parse(allRooms)
    return res.json(cleanedJSONRoomsDatas)
  })
}

function getAvailableRoomByDate(req, res) {
  const date = req.body.date

  fs.readFile('./reservations.json', 'utf8', (error, rooms) => {
    if (error) {
      return res.json({
        message: error,
      })
    } else {
      const parsedJson = JSON.parse(rooms)
      const availableRoomsForDate = parsedJson.reservations.filter(
        (room) => room.date === date
      )


      fs.readFile('./salles.json', 'utf8', (error, rooms) => {
        if (error) {
          return res.json({
            message: error,
          })
        } else {
          const parsedJson = JSON.parse(rooms)
          const nameOfAvailableRooms = availableRoomsForDate.map(availableRoom => 
          availableRoom.name
            )

          let allInformationsForRooms = parsedJson.rooms.filter(
            (room, index) => nameOfAvailableRooms[index] !== room.name)


          return res.json(allInformationsForRooms)
        }
      })
    }
  })
}

export default {
  getAllRooms,
  getAvailableRoomByDate,
}
