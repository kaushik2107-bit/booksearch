import Image from "next/image";
import { Nunito } from "@next/font/google";
const nunito = Nunito({ subsets: ["latin"], weight: ["500", "900"] });

function Extra() {
  return (
    <div className="py-8 bg-gray-200">
      <div className="border-2 h-96 md:h-80 bg-gray-200 flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="w-1/2 px-8 max-md:w-full">
          <h2
            className={`text-gray-800 mb-2 text-xl md:text-3xl font-extrabold ${nunito.className}`}
          >
            Stuck finding your book for free!
          </h2>
          <p
            className={`${nunito.className} text-gray-600 text-sm font-normal lg:max-w-[450px]`}
          >
            Find the links to all the book in one go. No more going through all
            the search results and going through all of them until you find the
            result, you can do it here now.
          </p>
        </div>
        <div className="relative max-md:w-full w-1/2 flex justify-center items-center h-full">
          <Image
            src="/image.jpg"
            alt="image"
            fill
            style={{ objectFit: "contain" }}
            className="mix-blend-multiply saturate-150 contrast-150"
          />
        </div>
      </div>
      <div className="border-2 h-96 md:h-80 bg-gray-200 flex flex-col-reverse md:flex-row-reverse items-center justify-between">
        <div className="w-1/2 px-8 pb-8 md:py-0 max-md:w-full">
          <h2
            className={`text-gray-800 mb-2 text-xl md:text-3xl font-extrabold ${nunito.className}`}
          >
            Are you a developer? You can contribute too.
          </h2>
          <p
            className={`${nunito.className} text-gray-600 text-sm font-normal lg:max-w-[450px]`}
          >
            Go to the github repository now, and create a fork now. Your
            contribution will make it more better.
          </p>
        </div>
        <div className="relative max-md:w-full w-1/2 flex justify-center items-center h-full">
          <Image
            src="/clip.jpg"
            alt="image"
            fill
            style={{ objectFit: "contain" }}
            className="mix-blend-multiply saturate-150 contrast-150"
          />
        </div>
      </div>
    </div>
  );
}

export default Extra;
