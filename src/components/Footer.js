import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto container md:p-6 p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 Created By ❤️ <span className="font-bold">Aneesh! </span>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li className="mb-2 md:mb-0">
            <Link to="/" className="mr-2 md:mr-4 hover:underline">
              Home
            </Link>
          </li>
          <li className="mb-2 md:mb-0">
            <Link to="/about" className="mr-2 md:mr-4 hover:underline">
              About
            </Link>
          </li>
          <li className="mb-2 md:mb-0">
            <Link to="/help" className="mr-2 md:mr-4 hover:underline">
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
