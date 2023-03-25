import Link from "next/link";

interface SingleBooksDetails {
  id: string;
  name: string;
  author: string;
  isbn: string;
  type: string;
  price: number;
  available: boolean;
  currentStock: number;
}

export const SingleBooksDetails = ({
  id,
  name,
  author,
  isbn,
  type,
  price,
  available,
  currentStock,
}: SingleBooksDetails) => {
  return (
    <div className=" flex  min-h-56 border border-white rounded max-w-2xl w-full mx-auto mt-36 ">
      <div className=" flex items-center  bg-gradient-to-tr from-black   to-neutral-800 border-r border-white w-2/6  p-4">
        <h3 className="  text-white font-bold text-2xl ">{name}</h3>
      </div>

      <div className="flex-grow">
        <div className="p-4 space-y-2 ">
          <p>
            <strong>Author:</strong> {author}
          </p>
          <p>
            <strong>Book Id:</strong> {id}
          </p>
          <p>
            <strong>Book ISBN:</strong> {isbn}
          </p>
          <p>
            <strong>Book Type:</strong> {type}
          </p>
          <p>
            <strong>Available:</strong> {available ? "Yes" : "No"}
          </p>
          {available ? (
            <p>
              <strong>Current Stock:</strong> {currentStock}
            </p>
          ) : null}
          <p>
            <strong>Price:</strong> {price}
          </p>
        </div>

        <div className="flex m-4   justify-start  w-full ">
          <div className="mr-4">
            <Link href={`/`} prefetch={false}>
              <button className="bg-gradient-to-tr from-neutral-700 to-neutral-700 text-white font-bold py-2 px-6 rounded">
                Go Back
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/order/${id}`} prefetch={false}>
              <button className="bg-gradient-to-tr from-neutral-700 to-neutral-700 text-white font-bold py-2 px-6 rounded">
                Order Book
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
