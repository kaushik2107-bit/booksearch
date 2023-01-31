import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="bg-black/[0.8] w-full h-[60px] flex items-center justify-evenly p-3">
      <Link
        className=""
        href="https://searchbookpdf.vercel.app/"
        target={"_blank"}
      >
        <img src="/vercel.svg" className="object-cover w-20 invert" />
      </Link>
      <Link
        className=""
        href="https://github.com/kaushik2107-bit/booksearch"
        target={"_blank"}
      >
        <img
          src="/github-logo-vector.png"
          className="object-cover w-20 invert mix-blend-screen"
        />
      </Link>
    </div>
  );
}

export default Footer;
