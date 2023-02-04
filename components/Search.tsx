import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookAtom, bookBool, bookModal, searchTerm } from "../atoms/bookAtom";

interface bookData {
  name: string;
  id?: string;
  author: string;
  published_on: string;
  genre?: string[];
  link: string;
  working: number;
  notWorking: number;
  image: string;
}

function Search() {
  const [books, setBooks] = useRecoilState(bookAtom);
  const [isOpen, setIsOpen] = useRecoilState(bookBool);
  const [data, setData] = useRecoilState(bookModal);
  const term = useRecoilValue(searchTerm);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpen = (data: bookData) => {
    setIsOpen(true);
    setData(data);
  };

  const handleLoadMore = async () => {
    setLoading(true);
    const resu = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=10&startIndex=${books?.length}`
    );
    console.log(resu.data.items);
    let array: bookData[] = [];
    if (books) {
      array = [...books];
    }
    resu.data.items.map((item) => {
      const ans = {
        name: item.volumeInfo.title,
        author: item.volumeInfo.authors,
        published_on: item.volumeInfo.publishedDate,
        genres: item.volumeInfo.categories,
        link: "#",
        working: 0,
        notWorking: 0,
        image: item.volumeInfo.imageLinks?.smallThumbnail,
      };
      array.push(ans);
    });
    setBooks(array);
    setLoading(false);
  };

  const secure = (str: string) => {
    if (!str) return str;
    if (str.startsWith("https://")) return str;

    const ans = str.split("");
    ans.splice(4, 0, "s");
    const a = ans.join("");
    return a;
  };

  return (
    <div className="flex flex-col items-center bg-gray-300 py-4">
      <div className="grid lg:grid-cols-2 grid-cols-1 md:w-[80vw] lg:w-[70vw] w-[90vw] gap-2 grid-rows-4">
        {books &&
          books.map((item: bookData, index: any) => (
            <div
              className="h-20 flex items-center space-x-2 bg-white rounded-[5px] p-[4px] shadow-2xl"
              key={index}
              onClick={() => handleOpen(item)}
            >
              <div className="bg-gray-400 aspect-square h-full rounded-[5px] relative">
                <Image
                  loader={() => secure(item.image)}
                  src={secure(item.image)}
                  alt={"BOOK"}
                  fill
                  style={{ objectFit: "cover" }}
                  className="flex justify-center items-center text-sm"
                />
              </div>
              <div className="flex-grow overflow-hidden">
                <p className="text-gray-700 text-lg truncate">{item.name}</p>
                <p className="text-gray-600 text-sm truncate">{item.author}</p>
              </div>
            </div>
          ))}
      </div>
      <button
        className="underline mt-10 p-2 outline-none text-gray-700"
        onClick={handleLoadMore}
        disabled={loading}
      >
        {!loading ? "Load More" : "Loading..."}
      </button>
    </div>
  );
}

export default Search;
