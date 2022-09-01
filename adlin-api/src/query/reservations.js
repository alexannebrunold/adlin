import fs from 'fs'


function getAllReservations(req, res) {
  fs.readFile("./reservations.json", "utf8", (error, allReservations) => {
  if (error || !allReservations.includes('name')) {
    return res.json({ 
      message: error 
    })
  } else {
    const cleanedJSONReservationsDatas = JSON.parse(allReservations)
    return res.json(cleanedJSONReservationsDatas)
  }
  
})}

const roomReservation = {
  id: 1234,
  room_id: reservation.roomId,
  date: reservation.date,
  hour: reservation.hour
}

function createReservation(req, res, reservation) {
  const stringifyJson = JSON.stringify(reservation)
  
  fs.writeFile("./reservations.json", stringifyJson, (error) => {
    if (error) {
      return res.json({ 
        message: 'error wrinting file' + error 
      })
    }
    else {
      return res.status(200).json({
        message : 'created'
      })}
    })  
}

export default {
  getAllReservations,
  createReservation,
}