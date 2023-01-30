import axios from "axios";
import { generateKey } from "crypto";
import React, { useEffect, useRef, useState } from "react";
import { client } from "../meilisearch";

interface info {
  name: string;
  author: string;
  published_on: string;
  genres: string[] | undefined;
  link: string;
  working: number;
  notWorking: 0;
}

function List() {
  const [demo, setDemo] = useState<object>();
  const [genre, setGenre] = useState<string[] | undefined>([]);
  const genreRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const addGenre = (e: any) => {
    e.preventDefault();
    setGenre((prev) => {
      if (genreRef.current && prev) {
        let val = genreRef.current.value;
        return [...prev, val];
      }
    });
  };

  const submitData = async () => {
    const resource: info = {
      name: formRef.current?.book.value,
      author: formRef.current?.author.value,
      published_on: formRef.current?.date.value,
      genres: genre,
      link: formRef.current?.link.value,
      working: 0,
      notWorking: 0,
    };
    const res: { data: { name: string; id: string } } = await axios.post(
      "http://localhost:3000/api/search",
      resource
    );
    const ans = await client
      .index("books")
      .addDocuments([{ ...resource, id: res.data.id }]);
  };

  return (
    <div className="flex flex-col items-center py-4">
      <h1 className="text-3xl py-4">Enter a book</h1>
      <form
        className="flex flex-col w-[70vw] space-y-3"
        ref={formRef}
        onSubmit={(e) => (e.preventDefault(), submitData())}
      >
        <input
          name="book"
          className="bg-transparent border-2 border-white p-2 rounded-[4px] outline-none"
          type="text"
          placeholder="Enter name of the book"
        />
        <input
          name="author"
          className="bg-transparent border-2 border-white p-2 rounded-[4px] outline-none"
          type="text"
          placeholder="Enter author's name"
        />
        <input
          name="date"
          className="bg-transparent border-2 border-white p-2 rounded-[4px] outline-none"
          type="text"
          placeholder="yyyy-mm-dd"
        />
        {genre && genre.length !== 0 && (
          <div className="flex space-x-2">
            {genre.map((item, index) => (
              <p
                className="bg-gray-600 px-3 rounded-md text-sm py-2"
                key={index}
              >
                {item}
              </p>
            ))}
          </div>
        )}
        <div className="flex gap-2 bg-transparent border-2 border-white p-2 rounded-[4px] outline-none">
          <input
            ref={genreRef}
            className="flex-grow bg-transparent outline-none"
            type="text"
            placeholder="Enter a genre"
          />
          <button
            className="bg-white text-gray-800 px-2 text-sm rounded-[3px]"
            onClick={(e) => addGenre(e)}
          >
            ADD
          </button>
        </div>
        <input
          name="link"
          className="bg-transparent border-2 border-white p-2 rounded-[4px] outline-none"
          type="text"
          placeholder="Enter link"
        />
        <button
          type="submit"
          className="rounded-[4px] bg-white text-gray-800 p-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default List;
