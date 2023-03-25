import React from "react";

const page = () => {
  return (
    <div>
      <div className="my-4">
        <h2>Status</h2>
        <p>/api/status/</p>
        <p>FrontPage: </p>
      </div>
      <div className="my-4">
        <h2>List of Books</h2>
        <p className="text-xs">add optional query parameteres</p>
        <p>/api/books/</p>
        <p>FrontPage: </p>
      </div>
      <div className="my-4">
        <h2>Get a Single Book Details</h2>
        <p>/api/books/:id</p>
        <p>FrontPage: </p>
      </div>
      <div className="my-4">
        <h2>API Authentication</h2>
        <p className="text-xs">
          The recieved response is being stored in the local browser storage
        </p>
        <p>/api/authentication/</p>
        <p>FrontPage: /register</p>
      </div>
      <div className="my-4">
        <h2>Submit an Order</h2>
        <p>/api/orders/</p>
        <p>FrontPage: /orders/new</p>
      </div>
      <div className="my-4">
        <h2>Get all Orders</h2>
        <p>/api/getorders/</p>
        <p>FrontPage: /all-orders</p>
      </div>
    </div>
  );
};

export default page;
