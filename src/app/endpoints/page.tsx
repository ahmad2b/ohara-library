import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <div className="my-4">
        <h2 className="text-xl">Status:</h2>
        <p className="text-xs">
          Using fetch inside the page not the Next endpoint
        </p>
        <p>/api/status/</p>
        <Link href={"/api-status"} className="underline">
          <p>FrontPage: /api-status </p>
        </Link>
      </div>
      <div className="my-4">
        <h2 className="text-xl">List of Books:</h2>
        <p className="text-xs">add optional query parameteres</p>
        <p className="text-xs">
          Using fetch inside the page not the Next endpoint
        </p>
        <p>/api/books/</p>
        <Link href={"/"} className="underline">
          <p>FrontPage: / </p>
        </Link>
      </div>
      <div className="my-4">
        <h2 className="text-xl">Get a Single Book Details:</h2>
        <p className="text-xs">
          Using fetch inside the page not the Next endpoint
        </p>
        <p>/api/books/:id</p>
        <Link href={"/book-details"} className="underline">
          <p>FrontPage: /book-details/:id </p>
        </Link>
      </div>
      <div className="my-4">
        <h2 className="text-xl">API Authentication</h2>
        <p className="text-xs">
          The recieved response is being stored in the local browser storage
        </p>
        <p>/api/authentication/</p>
        <p>FrontPage: /register</p>
      </div>
      <div className="my-4">
        <h2 className="text-xl">Submit an Order:</h2>
        <p>/api/orders/</p>
        <p>FrontPage: /orders/new</p>
      </div>
      <div className="my-4">
        <h2 className="text-xl">Get all Orders:</h2>
        <p>/api/getorders/</p>
        <p>FrontPage: /all-orders</p>
      </div>
      <div className="my-4">
        <h2 className="text-xl">Get Single Order Details:</h2>
        <p>/api/getorders/:id</p>
        <p>FrontPage: /single-order</p>
      </div>
    </div>
  );
};

export default page;
