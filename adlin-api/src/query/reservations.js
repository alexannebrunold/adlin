import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
const uuid = uuidv4()

function getAllReservations(req, res) {
  fs.readFile('./reservations.json', 'utf8', (error, allReservations) => {
    if (error || !allReservations.includes('name')) {
      return res.json({
        message: error,
      })
    } else {
      const cleanedJSONReservationsDatas = JSON.parse(allReservations)
      return res.json(cleanedJSONReservationsDatas)
    }
  })
}

function createReservation(req, res) {

  const roomReservation = {
    id: uuid,
    name: req.body.roomName,
    date: req.body.date,
  }

  fs.readFile('./reservations.json', 'utf8', (error, allReservations) => {
    if (error) {
      return res.json({
        message: error,
      })
    }

    let parsedJSON = JSON.parse(allReservations)
    parsedJSON.reservations.push(roomReservation)

    const stringifyJson = JSON.stringify(parsedJSON, null, 2)

    fs.writeFile('./reservations.json', stringifyJson, (error) => {
      if (error) {
        return res.status(500).json({
          message: 'error wrinting file' + error,
        })
      } else {
        return res.status(200).json({
          message: 'created',
        })
      }
    })
  })
}

export default {
  getAllReservations,
  createReservation,
}
