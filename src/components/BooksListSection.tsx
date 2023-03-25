// import SingleBookFrame from "@/components/SingleBookFrame";
import { baseUrl } from "@/lib/data";
import Link from "next/link";

const SingleBookFrame = (
  bookId: number,
  bookName: string,
  bookType: string,
  bookAvailable: boolean,
  bookPrice?: number
) => {
  return (
    <div className="  min-h-56 border border-white rounded w-64  ">
      <div className="  bg-gradient-to-tr from-black  h-36  to-neutral-800 border-b border-white  p-4">
        <h3 className=" mt-8 text-white font-bold text-xl ">{bookName}</h3>
      </div>

      <div className="p-4 space-y-2 ">
        <p>
          <strong>Book Type:</strong> {bookType}
        </p>
        <p>
          <strong>Available:</strong> {bookAvailable ? "Yes" : "No"}
        </p>
      </div>

      {/* <div className="flex m-2   justify-start text-sm">
        <Link href={`/book-details/${bookId}`} prefetch={false}>
          <button className="bg-gradient-to-tr from-neutral-700 to-neutral-700 text-white font-bold py-1 px-4 mr-2 rounded">
            Book Details
          </button>
        </Link>
        <Link href={`/order`} prefetch={false}>
          <button className="bg-gradient-to-tr from-neutral-700 to-neutral-700 text-white font-bold py-1 px-4  rounded">
            Order Book
          </button>
        </Link>
      </div> */}
    </div>
  );
};

interface Book {
  id: number;
  name: string;
  type: string;
  available: boolean;
}

const FetchBooksList = async () => {
  const response = await fetch(`${baseUrl}/books`);
  const data = await response.json();
  return data;
};

export default async function BooksListSection() {
  const booksList = await FetchBooksList();

  return (
    <div className=" min-h-screen">
      <div className="flex  ">
        <div className="flex-grow p-4 ml-4 mt-4">
          <div className="flex flex-wrap w-full gap-4 justify-center ">
            {booksList.map((book: Book) => {
              return (
                <div key={book.id}>
                  {SingleBookFrame(
                    book.id,
                    book.name,
                    book.type,
                    book.available
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
