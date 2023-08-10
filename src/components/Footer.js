const Footer = () => {
  return (
    <footer className=" bg-white  rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto container md:p-6 p-2 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
            Created By ❤️  <span className="font-bold">Aneesh! </span>
          . All Rights Reserved.
        </span>
        {/* <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6">
              Home
            </a>
          </li>
          <li>
            <a href="./About.js" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="./Help.js" className="mr-4 hover:underline md:mr-6">
              FAQ
            </a>
          </li>
        </ul> */}
      </div>
    </footer>
  );
};

export default Footer;
