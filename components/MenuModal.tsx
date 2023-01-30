import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { menuModal } from "../atoms/menuModal";

function MenuModal() {
  const [menu, setMenu] = useRecoilState(menuModal);
  const handleClose = () => setMenu(false);
  return (
    <div
      className="fixed w-screen h-screen bg-[black]/25 lg:hidden z-[1000] top-0"
      onClick={handleClose}
    >
      <AnimatePresence>
        <motion.div
          key="modal4"
          className="absolute h-screen w-screen bg-gray-900 text-[#dedede] rounded-l-lg right-0 p-4 px-6 flex flex-col"
          onClick={(e) => e.stopPropagation()}
          initial={{ right: "-350px", opacity: 0 }}
          animate={{ right: 0, opacity: 1 }}
          exit={{ right: "-350px", opacity: 0 }}
        >
          <header className="flex justify-between items-center pb-6">
            <Image
              className="object-contain"
              src={"/logo/logo-transparent-white.png"}
              width={150}
              height={10}
              alt={"Logo"}
            />
            <XMarkIcon
              className="w-6 h-6 cursor-pointer"
              onClick={handleClose}
            />
          </header>
          <hr />
          <div className={`flex flex-col py-3 space-y-4 flex-1 items-center`}>
            <a className="linkMenu">
              <Link href="/" onClick={handleClose}>
                Home
              </Link>
            </a>
            <a className="linkMenu">
              <Link href="/" onClick={handleClose}>
                About
              </Link>
            </a>
            <a className="linkMenu">
              <Link href="/contact" onClick={handleClose}>
                Contact
              </Link>
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default MenuModal;
