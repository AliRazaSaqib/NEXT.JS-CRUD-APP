import connectMongo from "../../../database/conn";
import TodoList from "../../../model/TodoSchema";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  // only post method is accepted
  if (req.method === "GET") {
    if (!req)
      return res.status(404).json({ error: "Some thing went wrong...!" });

    // hash password
    TodoList.find({}, function (err, data) {
      if (err) return res.status(404).json({ err });
      res.status(201).json({ todo: data });
    });
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only GET Accepted" });
  }
}
