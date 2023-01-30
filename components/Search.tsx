import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookAtom, bookBool, bookModal } from "../atoms/bookAtom";

interface bookData {
  name: string;
  id: string;
  author: string;
  published_on: string;
  genre: string[];
  link: string;
  working: number;
  notWorking: number;
  image: string;
}

function Search() {
  const books = useRecoilValue(bookAtom);
  const [isOpen, setIsOpen] = useRecoilState(bookBool);
  const [data, setData] = useRecoilState(bookModal);

  const handleOpen = (data: bookData) => {
    setIsOpen(true);
    setData(data);
  };

  const secure = (str: string) => {
    if (str.startsWith("https://")) return str;

    const ans = str.split("");
    ans.splice(4, 0, "s");
    const a = ans.join("");
    return a;
  };

  return (
    <div className="flex justify-center bg-gray-600 py-4">
      <div className="grid lg:grid-cols-2 grid-cols-1 md:w-[80vw] lg:w-[70vw] w-[90vw] gap-2 grid-rows-4">
        {books &&
          books.map((item: bookData, index: any) => (
            <div
              className="h-20 flex items-center space-x-2 bg-white rounded-[5px] p-[4px]"
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
    </div>
  );
}

export default Search;
