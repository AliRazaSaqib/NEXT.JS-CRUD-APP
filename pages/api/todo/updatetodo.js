import connectMongo from "../../../database/conn";
import TodoList from "../../../model/TodoSchema";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  // only post method is accepted
  if (req.method === "PATCH") {
    if (!req.body)
      return res.status(404).json({ error: "Don't have form data...!" });
    const { _id, subject, message } = req.body;

    // hash password
    TodoList.findOneAndUpdate(
      { _id: _id },
      { subject, message },
      function (err, data) {
        if (err) return res.status(404).json({ err });
        res.status(201).json({ status: true, todo: data });
      }
    );
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
}
