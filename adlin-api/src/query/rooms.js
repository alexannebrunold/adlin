import fs from 'fs'


function getAllRooms(req, res) {
  fs.readFile("./salles.json", "utf8", (error, allRooms) => {
  if (error) {
    return res.json({ 
      message: error 
    })
  }

  const cleanedJSONRoomsDatas = JSON.parse(allRooms)
  return res.json(cleanedJSONRoomsDatas)
})}

export default {
  getAllRooms,
  getRoomById,
}