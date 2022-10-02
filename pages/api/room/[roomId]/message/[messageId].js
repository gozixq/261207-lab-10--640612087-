import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  if (req.method === "DELETE") {
    const rooms = readDB();
    const rId = req.query.roomId;
    const roomIdx = rooms.findIndex((x) => x.roomId === rId);
    if (roomIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    }
    const mId = req.query.messageId;
    const messageIdx = rooms[roomIdx].messages.findIndex(
      (x) => x.messageId === mId
    );
    if (messageIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid messege id" });
    }

    rooms[roomIdx].messages.splice(messageIdx, 1);
    writeDB(rooms);

    return res.json({ ok: true });
  }
}