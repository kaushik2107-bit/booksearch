import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookBool } from "../atoms/bookAtom";
import { menuModal } from "../atoms/menuModal";
import BookModal from "../components/BookModal";
import Extra from "../components/Extra";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Landing from "../components/Landing";
import List from "../components/List";
import MenuModal from "../components/MenuModal";
import Search from "../components/Search";
import SearchSkeleton from "../components/SearchSkeleton";

const Home: NextPage = () => {
  const menu = useRecoilValue(menuModal);
  const isOpen = useRecoilValue(bookBool);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>BookSearch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {menu && <MenuModal />}
      {isOpen && <BookModal />}
      <main className="flex w-full flex-1 flex-col bg-gray-700 text-white">
        <Header />
        <Landing setIsLoading={setIsLoading} isLoading={isLoading} />
        {isLoading === true ? (
          <SearchSkeleton />
        ) : isLoading === false ? (
          <Search />
        ) : (
          ""
        )}
        <Extra />
        {false && <List />}
        <Footer />
      </main>
    </div>
  );
};

export default Home;
