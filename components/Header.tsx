import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { menuModal } from "../atoms/menuModal";
import useAuth from "../hooks/useAuth";

function Header() {
  const { user, login, loading, logout } = useAuth();
  const [menu, setMenu] = useRecoilState(menuModal);
  const [yScroll, setYScroll] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY === 0) setYScroll(false);
      else setYScroll(true);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY === 0) setYScroll(false);
        else setYScroll(true);
      });
    };
  }, []);

  return (
    <header
      className={`fixed z-[100] w-screen flex items-center justify-between px-6 p-4 bg-gray-800/40 md:py-6 md:px-8 ${
        yScroll && "bg-gray-800"
      }`}
    >
      <Image
        className="object-contain"
        src={"/logo/logo-transparent-white.png"}
        width={150}
        height={10}
        alt={"Logo"}
      />
      {/* <ul className="space-x-4 lg:space-x-6 hidden md:flex items-center">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <Bars3BottomRightIcon
        className="w-8 h-8 md:hidden cursor-pointer"
        onClick={() => setMenu(true)}
      /> */}
      <button
        className="bg-purple-700 text-white rounded-sm p-[2px] pr-3 flex items-center gap-3 text-sm"
        onClick={() => (!user ? login() : logout())}
      >
        <img src="/googleLogo.png" className="w-8 h-8 rounded-sm" />
        {!user ? "Sign in with Google" : "Logout"}
      </button>
    </header>
  );
}

export default Header;
