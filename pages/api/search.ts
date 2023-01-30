import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase-server";

type Data = {
  name: string;
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const resource = req.body;
    const result = await db.collection("books").add(resource);
    res.status(201).json({ name: "Added", id: result.id });
  } else {
    res.status(200).json({ name: "John Doe", id: "string" });
  }
}

// books_uid: {
//   name: book_name,
//   author: author_name,
//   published_on: date,
//   edition: edition,
//   genres: array,
//   link: link,
//   working: number,
//   notWorking: number,
// }
