import {
  ArrowDownTrayIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  LinkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { bookBool, bookModal } from "../atoms/bookAtom";
import { menuModal } from "../atoms/menuModal";
import { BookLink } from "book-link";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

function BookModal() {
  const [book, setBook] = useRecoilState(bookModal);
  const [isOpen, setIsOpen] = useRecoilState(bookBool);
  const handleClose = () => (setIsOpen(false), setBook(null));
  const [bookLinks, setBookLinks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchLinks = async () => {
    setIsLoading(true);
    const api_key: string = process.env.NEXT_PUBLIC_API_KEY || "";
    const context_key: string = process.env.NEXT_PUBLIC_CONTEXT_KEY || "";
    const links = await BookLink.linkArray(book?.name, api_key, context_key);
    setBookLinks(links);
    setIsLoading(false);
  };

  const secure = (str: string) => {
    if (!str) return str;
    if (str.startsWith("https://")) return str;

    const ans = str.split("");
    ans.splice(4, 0, "s");
    const a = ans.join("");
    return a;
  };

  useEffect(() => {
    fetchLinks();
  }, [book]);

  return (
    <div
      className="fixed w-screen h-screen bg-[black]/[0.70] z-[1000] top-0 flex justify-center items-center"
      onClick={handleClose}
    >
      <AnimatePresence>
        <motion.div
          key="modal5"
          className="absolute max-h-[90vh] w-full md:w-[500px] lg:w-[700px] bg-gray-200 text-gray-800 rounded-lg p-4 px-6 flex flex-col overflow-y-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          <>
            <header className="flex items-center pb-2">
              <div className="flex-grow text-xl font-medium text-gray-700">
                {book?.name}
              </div>
              <div className="">
                <XMarkIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={handleClose}
                />
              </div>
            </header>
            <hr className="border-2 border-b-gray-400" />
            <div className="pt-2 flex w-full flex-grow gap-2">
              <div className="w-40 h-40 bg-gray-500 rounded-[4px] shrink-0 relative">
                <Image
                  loader={() => secure(book?.image)}
                  src={secure(book?.image)}
                  alt={"Book"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="py-2">
                <p className="text-3xl font-medium text-gray-700">
                  {book?.name}
                </p>
                <p className="text-md font-normal text-gray-600">
                  {book?.author}
                </p>
                <div className="text-black flex gap-2 pt-2 flex-wrap">
                  {book &&
                    book.genres &&
                    book.genres.map((item: any, index: any) => (
                      <div className="bg-gray-600 text-white w-fit rounded-full px-3 py-2 text-xs">
                        {item}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex pt-3">
              <div className="flex-grow flex justify-center items-center space-x-3 bg-green-500 p-2 text-white">
                <p>Working</p> <HandThumbUpIcon className="w-6 h-6" />
              </div>
              <div className="flex-grow flex justify-center items-center space-x-3 bg-red-500 p-2 text-white">
                <p>Not Working</p> <HandThumbDownIcon className="w-6 h-6" />
              </div>
            </div>
            {!isLoading ? (
              <div className="flex flex-col space-y-2 mt-2 transition-all delay-100">
                {bookLinks.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full p-2 rounded-[5px] bg-gray-300 hover:text-white hover:bg-gray-600 transition-all"
                  >
                    <p className="truncate flex-1 text-sm">{item}</p>
                    <Link href={item} className="px-4" target="_blank">
                      <ArrowDownTrayIcon className="w-6 h-6" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-2 mt-6 items-center">
                <BarLoader color="#12ee11" width={140} />
                <p className="text-xs tracking-wider text-gray-700 animate-pulse">
                  loading links...
                </p>
              </div>
            )}
          </>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default BookModal;
