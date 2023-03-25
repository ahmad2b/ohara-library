const baseUrl = "https://simple-books-api.glitch.me";

const NextURL = "https://nextjs.org";

enum API_CALLS {
  GET_STATUS = "STATUS", // Status of the API
  GET_BOOKS_LIST = "BOOKS_LIST", // List of Books
  GET_SINGLE_BOOK = "GET_SINGLE_BOOK", // Single Book
  POST_SUBMIT_ORDERS = "POST_SUBMIT_ORDERS", // Orders
  GET_SINGLE_ORDER = "GET_SINGLE_ORDER_DETAILS", // Single Order
  GET_ALL_ORDERS = "ALL_ORDERS_LIST", // All Orders
  PATCH_UPDATE_ORDER = "UPDATE_ORDER", // Update Order
  DELETE_ORDER = "DELETE_ORDER", // Delete Order
}

export const BooksAPI = async (
  req: string,
  bookId?: string,
  customerName?: string
) => {
  const res = await fetch(`${baseUrl}/status`);

  if (!res.ok) {
    throw new Error(`Failed to fetch data! status: ${res.status}`);
  }

  if (req === API_CALLS.GET_STATUS) {
    const res = await fetch(`${baseUrl}/status`);
    const data = await res.json();
    return data;
  }

  if (req === API_CALLS.GET_BOOKS_LIST) {
    const res = await fetch(`${baseUrl}/books`);
    const data = await res.json();
    return data;
  }

  if (req === API_CALLS.GET_SINGLE_BOOK) {
    const res = await fetch(`${baseUrl}/books/${bookId}`);
    const data = await res.json();
    return data;
  }

  if (req === API_CALLS.POST_SUBMIT_ORDERS) {
    const res = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BOOK_TOKEN}`,
      },
      body: JSON.stringify({
        bookId,
        customerName,
      }),
      cache: "no-cache",
    });
    const data = await res.json();
    return data;
  }

  if (req === API_CALLS.GET_SINGLE_ORDER) {
    const res = await fetch(`${baseUrl}/orders/${bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BOOK_TOKEN}`,
      },
    });
    const data = await res.json();
    return data;
  }

  if (req === API_CALLS.GET_ALL_ORDERS) {
    const res = await fetch(`${baseUrl}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BOOK_TOKEN}`,
      },
    });
    const data = await res.json();
    return data;
  }

  if (req === API_CALLS.PATCH_UPDATE_ORDER) {
    const res = await fetch(`${baseUrl}/orders/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BOOK_TOKEN}`,
      },
      body: JSON.stringify({
        customerName,
      }),
    });

    return res.status;
  }

  if (req === API_CALLS.DELETE_ORDER) {
    const res = await fetch(`${baseUrl}/orders/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BOOK_TOKEN}`,
      },
    });

    return res.status;
  }
};
