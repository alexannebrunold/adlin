import fs from "fs";
import {v4 as uuidv4} from 'uuid';
const uuid = uuidv4();


function getAllReservations(req, res) {
  fs.readFile("./reservations.json", "utf8", (error, allReservations) => {
    if (error || !allReservations.includes("name")) {
      return res.json({
        message: error,
      });
    } else {
      const cleanedJSONReservationsDatas = JSON.parse(allReservations);
      return res.json(cleanedJSONReservationsDatas);
    }
  });
}

// const roomReservation = {
//   id: 1234,
//   room_id: 1,
//   date: 12,
//   hour: 2
// }

function createReservation(req, res) {
  // const roomReservation = {
  //   id: uuid,
  //   name: roomReservation.name,
  //   //  room_id: reservation.roomId,
  //   date: room.date,
  //   hour: room.hour,
  // }
  const stringifyJson = JSON.stringify(roomReservation);

  fs.writeFile("./reservations.json", stringifyJson, (error) => {
    if (error) {
      return res.status(500).json({
        message: "error wrinting file" + error,
      });
    } else {
      return res.status(200).json({
        message: "created",
      });
    }
  });
}

export default {
  getAllReservations,
  createReservation,
};
