import Link from "next/link";

interface AllOrdersLayout {
  id: string;
  bookId: number;
  customerName: string;
  createdBy: string;
  quantity: number;
  timeStamp: number;
}

export const AllOrdersLayout = (
  orderId: string,
  bookId: number,
  customerName: string,
  createdBy: string,
  quantity: number,
  timeStamp: number
) => {
  return (
    <div className=" min-h-56   border border-white rounded flex w-8/12 mx-auto ">
      <div className="p-4 space-y-2 ">
        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
        <p>
          <strong>Book ID:</strong> {bookId}
        </p>
        <p>
          <strong>Customer Name:</strong> {customerName}
        </p>
        <p>
          <strong>Created By:</strong> {createdBy}
        </p>
        <p>
          <strong>Quantity:</strong> {quantity}
        </p>
        <p>
          <strong>Time Stamp:</strong> {timeStamp}
        </p>
      </div>

      <div className="flex flex-col m-2  items-center justify-center  text-sm">
        <div className="m-2 w-60">
          <Link href={`/update-order/`} prefetch={false}>
            <button className="bg-gradient-to-tr from-neutral-700 to-neutral-700 text-white font-bold py-1 px-4 mr-2 rounded">
              Update Order
            </button>
          </Link>
        </div>
        <div className="m-2 w-60">
          <Link href={`/delete-order/${orderId}`} prefetch={false}>
            <button className="bg-gradient-to-tr from-neutral-700 to-neutral-700 text-white font-bold py-1 px-4 mr-2 rounded">
              Delete Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
