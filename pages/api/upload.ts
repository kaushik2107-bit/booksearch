import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase-server";
import books from "../../lib/file.json";
import { client } from "../../meilisearch";

type Data = {
  name: string;
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    console.log(books.length);
    const final = [];
    try {
      await Promise.all(
        books.map(async (item) => {
          const resource = {
            name: item.title,
            author: item.author,
            published_on: item.yearPublished.$numberInt,
            genres: ["book"],
            link: item.link,
            image: item.bookImage,
            working: 0,
            notWorking: 0,
          };
          // console.log(books.length);
          const result = await db.collection("books").add(resource);
          const ans = await client
            .index("books")
            .addDocuments([{ ...resource, id: result.id }]);
          // await client.index("books").deleteAllDocuments();
        })
      );
    } catch (err) {}
    return res.status(200).json({ name: "John Doe", id: "string" });
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
