import {
  FaHouseUser,
  FaServicestack,
  FaBoxOpen,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export const MenuItems = [
  {
    title: "Home",
    url: "/",
    cName: "nav-links",
    icon: <FaHouseUser />,
  },
  {
    title: "Services",
    url: "/services",
    cName: "nav-links",
    icon: <FaServicestack />,
  },
  {
    title: "Products",
    url: "/products",
    cName: "nav-links",
    icon: <FaBoxOpen />,
  },
  {
    title: "Cart",
    url: "/cart",
    cName: "nav-links",
    icon: <FaCartShopping />,
  },
  {
    title: "Contact Us",
    url: "/contact-us",
    cName: "nav-links",
    icon: <FaPhoneAlt />,
  },
  {
    title: "Sign Up",
    url: "/sign-up",
    cName: "nav-links-mobile",
  },
];
export default MenuItems;
