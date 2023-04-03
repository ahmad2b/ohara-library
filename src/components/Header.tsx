import Link from "next/link";
import { SiStatuspal } from "react-icons/si";
import { BsBookshelf } from "react-icons/bs";
import { FaScroll } from "react-icons/fa";

const MenuItem = ({ href, itemName }: { href: string; itemName: string }) => {
  return (
    <div>
      <Link href={href}>{itemName}</Link>
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex justify-between p-4 border-b">
      <MenuItem href="/api-status" itemName="Status" />
      <MenuItem href="/" itemName="Home" />
      <MenuItem href="/book-details" itemName="Single Book" />
      {/* <MenuItem href="/" itemName="Books List" /> */}
      <MenuItem href="/order/new" itemName="Order" />
      <MenuItem href="/all-orders" itemName="All Orders" />
      <MenuItem href="/single-order" itemName="Single Order" />
      <MenuItem href="/delete-order" itemName="Delete" />
      <MenuItem href="/register" itemName="Register" />
    </div>
  );
};

export default Header;
