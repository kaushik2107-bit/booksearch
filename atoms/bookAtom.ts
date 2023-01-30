import { atom } from "recoil";

interface bookData {
  name: string;
  id: string;
  author: string;
  published_on: string;
  genres: string[];
  link: string;
  working: number;
  notWorking: number;
  image: string;
}

export const bookAtom = atom<bookData[] | null | Record<string, any>>({
  key: "listbook",
  default: null,
});

export const bookModal = atom<bookData | null | Record<string, any>>({
  key: "book",
  default: null,
});

export const bookBool = atom<boolean>({
  key: "bookbool",
  default: false,
});
