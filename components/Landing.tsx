import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useRecoilState } from "recoil";
import { bookAtom, searchTerm } from "../atoms/bookAtom";
import useAuth from "../hooks/useAuth";

interface bookData {
  name: string;
  id?: string;
  author: string;
  published_on: string;
  genres: string[];
  link: string;
  working: number;
  notWorking: number;
  image: string;
}

function Landing({ setIsLoading, isLoading }) {
  const [term, setTerm] = useState<string>("");
  const [search, setSearch] = useRecoilState(bookAtom);
  const [seTerm, setSeTerm] = useRecoilState(searchTerm);
  const { user, login, loading, logout } = useAuth();

  const handleSearch = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setSeTerm(term);
      const resu = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=10`
      );
      console.log(resu.data.items);
      let books: bookData[] = [];
      resu.data.items.map((item) => {
        const ans: bookData = {
          name: item.volumeInfo.title,
          author: item.volumeInfo.authors,
          published_on: item.volumeInfo.publishedDate,
          genres: item.volumeInfo.categories,
          link: "#",
          working: 0,
          notWorking: 0,
          image: item.volumeInfo.imageLinks?.smallThumbnail,
        };
        books.push(ans);
      });
      console.log(books);
      setSearch(books);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative w-screen h-96 md:h-[87vh] flex items-center justify-center">
      <Image
        src="/bookBackground.jpg"
        alt={"image"}
        className="absolute object-cover brightness-[0.4]"
        fill
        style={{ objectFit: "cover" }}
        placeholder={"blur"}
        blurDataURL={"LAEf7%VtE1R*~pIUIqj[9aRit7s:"}
      />
      <div className="z-10 flex flex-col items-center justify-center space-y-3 h-full w-full">
        <h1 className="text-3xl shadow-2xl">Welcome to BookSearch</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="rounded-sm p-2 px-3 rounded-l-[5px] outline-none border-2 border-transparent focus:border-red-500 text-gray-700 md:w-[500px] lg:w-[700px] lg:p-3 lg:px-4"
            placeholder="Enter a book name"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />

          <button className="bg-red-500 rounded-r-[5px] p-2 px-3 outline-none border-2 border-transparent w-[80px] md:w-[100px] lg:w-[150px] lg:p-3 lg:px-4">
            {isLoading ? <ClipLoader size={15} color="#ffffff" /> : "Search"}
          </button>
        </form>
        {/* <div className="text-center pt-5 flex flex-col items-center space-y-1">
          <span className="text-md">
            Help us make it better! {user?.displayName?.split(" ")[0]}
          </span>

          <button
            className="bg-white rounded-md text-gray-600 p-2 flex items-center gap-3 text-sm"
            onClick={() => (!user ? login() : logout())}
          >
            <img src="/googleLogo.png" className="w-6 h-6" />
            {!user ? "Sign in with Google" : "Logout"}
          </button>
        </div> */}
        <button
          className="flex md:hidden bg-purple-700 text-white rounded-sm p-[2px] pr-3 items-center gap-3 text-sm"
          onClick={() => (!user ? login() : logout())}
        >
          <img src="/googleLogo.png" className="w-8 h-8 rounded-sm" />
          {!user ? "Sign in with Google" : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Landing;
