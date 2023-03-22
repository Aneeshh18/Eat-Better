const Footer = () => {
  return (
    <footer className=" bg-white rounded-lg shadow m-4 dark:bg-gray-800">
    <div className="w-full mx-auto container md:p-6 p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="" className="hover:underline">Created By ❤️ Aneesh™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>
  );
};

export default Footer;







{/* <footer classNameName="bg-gray-900 text-white">
       <div classNameName="md:flex md:items-center sm:px-12 px-4 py-7 ">
           <h1 classNameName=" text-xl md:mb-0 mb-6 font-semibold">Created By ❤️ Aneesh © 2023 </h1>
       </div>
     </footer> */}