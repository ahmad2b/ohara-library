import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between p-4 border-b-2">
      <Link href={`/api-status`} prefetch={false}>
        API Status
      </Link>
      <Link href={`/`} prefetch={false}>
        Books List
      </Link>
      {/* <Link href={`/single-book`} prefetch={false}>
        Single Book
      </Link> */}
      {/* <Link href={`/`} prefetch={false}>
        Order a Book
      </Link>
      <Link href={`/`} prefetch={false}>
        Single Order Details
      </Link>
      <Link href={`/all-orders`} prefetch={false}>
        All Order Details
      </Link> */}
      <Link href={`/api-auth`} prefetch={false}>
        Register
      </Link>
    </div>
  );
};

export default Header;
