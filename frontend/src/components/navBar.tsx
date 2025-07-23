import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";

const NavBar = () => {
  const role = "Admin"; // This can be dynamic based on user role
  const department = "IT"; // This can also be dynamic based on user department
  const [clicked, setClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="border py-2 px-10 w-full flex items-center gap-20 shadow">
      <h1 className="flex items-center gap-2 w-[50%]">
        <span className="bg-blue-600 text-white text-xl py-1 px-3 rounded-md">
          k
        </span>
        <span className="font-bold text-xl">Knowledge Hub</span>
      </h1>
      <div
        ref={inputRef}
        className={`flex items-center border  rounded-md p-2 w-[100%] ${
          clicked ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <CiSearch className="text-gray-500 text-lg " />
        <input
          type="text"
          name=""
          id=""
          placeholder="Search knowledge base, documents, people..."
          className="ml-2 outline-none w-full "
          onFocus={() => setClicked(true)}
        />
      </div>

      <div className="flex gap-3 items-center w-[400px]">
        <IoIosNotificationsOutline className="text-gray-500 text-xl" />
        <div>
          <h1>Tadesse Gemechu</h1>
          <span className="bg-red-300 text-red-500 mr-1 p-1 rounded-lg">
            {role}
          </span>
          <span className="text-gray-500">{department}</span>
        </div>
        <BsPerson className="text-gray-500 text-lg" />
      </div>
    </div>
  );
};

export default NavBar;
