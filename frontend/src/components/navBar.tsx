import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

interface navBarProps {
  userName: string;
  department: string;
  role: string
}

const NavBar = ({ userName, department, role }: navBarProps) => {

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
    <div className="border py-2 px-10 w-full flex items-center gap-20 shadow text-sm">
      <h1 className="flex items-center gap-2 w-[50%]">
        <span className="bg-gradient-to-r from-sky-500 to-blue-600  text-white font-bold py-2 px-3 rounded-md ">
          K-Hub
        </span>
        <span className="font-bold text-lg">Knowledge Hub</span>
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

      <div className="flex gap-3 items-center w-[400px] relative">
        <IoIosNotificationsOutline className="text-gray-500 text-xl" />
        <div>
          <h1>{userName}</h1>
          <span
            className={`bg-sky-500 text-white mr-1 py-0.2 px-2 rounded-lg`}
          >
            {role}
          </span>
          <span className="text-gray-500">{department}</span>
        </div>
        <div className="relative">
          <button onClick={() => setClicked((open) => !open)} className="focus:outline">
            <BsPerson className="text-gray-500 text-lg shadow-lg rounded-md text-gray-700 h over:bg-gray-100 transition duration-200" />
          </button>
          {clicked && (
            <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg py-2 px-4 w-40 flex flex-col gap-2 z-10">
              <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 py-2 px-2 rounded transition">
                <BsPerson className="text-lg" />
                profile
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-red-600 py-2 px-2 rounded transition">
                <FiLogOut className="text-lg" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
