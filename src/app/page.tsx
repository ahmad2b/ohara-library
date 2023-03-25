import SingleBookFrame from "@/components/SingleBookFrame";
import { baseUrl } from "@/lib/data";

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

export default async function Home() {
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
