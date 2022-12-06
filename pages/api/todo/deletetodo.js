import connectMongo from "../../../database/conn";
import TodoList from "../../../model/TodoSchema";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  if (req.method === "DELETE") {
    if (!req.body)
      return res.status(404).json({ error: "Something went wrong...!" });
    const { _id } = req.body;
    TodoList.findOneAndRemove({ _id: _id }, function (err, data) {
      if (err) return res.status(404).json({ err });
      res.status(201).json({ status: true, todo: data });
    });
  } else {
    res
      .status(500)
      .json({ message: "HTTP method is valid only for delete request" });
  }
}
