import fs from 'fs'


function getAllReservations(req, res, next) {
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

const customer = {
  name: "Newbie Co.",
  order_count: 0,
  address: "Po Box City",
}

function createReservation(req, res, next) {
  const stringifyJson = JSON.stringify(customer)
  
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