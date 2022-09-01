import fs from 'fs'


function getAllRooms(req, res, next) {
  fs.readFile("./salles.json", "utf8", (error, allRooms) => {
  if (error) {
    return res.json({ 
      message: error 
    })
  }

  const cleanedJSONRoomsDatas = JSON.parse(allRooms)
  return res.json(cleanedJSONRoomsDatas)
})}


// function getRoomById(req, res, next) {
//  db('rooms')
//     .select('*')
//     .where('user_id', '=', req.currentUserId.userId)
//     .andWhere('id', '=', req.body.id)
//     .first()
// }

export default {
  getAllRooms,
  getRoomById,
}