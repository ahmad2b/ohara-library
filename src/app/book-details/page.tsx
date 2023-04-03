"use client";
import React, { useState } from "react";
import FormField from "@/components/(form)/FormField";
import FormLayout from "@/components/(form)/FormLayout";
import { SingleBooksDetails } from "@/components/SingleBorderDetails";

const BookDetails = () => {
  const [bookId, setBookId] = useState("");
  const [showResult, setShowResult] = useState(false);

  const [bookDetails, setBookDetails] = useState({
    id: "",
    name: "",
    author: "",
    isbn: "",
    type: "",
    price: 0,
    available: true,
    currentStock: 0,
  });

  const getBookDetails = async () => {
    const response = await fetch(`/api/books/${bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log("Book Details", data);

    if (data) {
      setShowResult(true);

      setBookDetails({
        id: data.id,
        name: data.name,
        author: data.author,
        isbn: data.isbn,
        type: data.type,
        price: data.price,
        available: data.available,
        currentStock: data.currentStock,
      });
    }
  };

  return (
    <>
      <FormLayout
        formHeading="Single Book Details"
        formSubHeading="Get any Single Book Details by entering the Book ID"
        buttonText="Get Book Details"
        onSubmit={getBookDetails}
      >
        <FormField
          label="Book ID"
          type="text"
          placeholder="Enter Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        />
      </FormLayout>

      {showResult && (
        <SingleBooksDetails
          id={bookDetails.id}
          name={bookDetails.name}
          author={bookDetails.author}
          isbn={bookDetails.isbn}
          type={bookDetails.type}
          price={bookDetails.price}
          available={bookDetails.available}
          currentStock={bookDetails.currentStock}
        />
      )}
    </>
  );
};

export default BookDetails;
