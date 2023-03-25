import React from "react";
import { baseUrl } from "@/lib/data";
import { SingleBooksDetails } from "@/components/SingleBorderDetails";

const OrderDetails = async ({ params }: { params: { id: string } }) => {
  const orderId = params.id;

  const res = await fetch(`${baseUrl}/books/${orderId}`);
  const book = await res.json();

  return (
    <div>
      <SingleBooksDetails
        id={book.id}
        name={book.name}
        author={book.author}
        isbn={book.isbn}
        type={book.type}
        price={book.price}
        available={book.available}
        currentStock={book["current-stock"]}
      />
    </div>
  );
};

export default OrderDetails;
