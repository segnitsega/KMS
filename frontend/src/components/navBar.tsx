import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import api from "@/utility/api";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode, type JwtPayload } from "jwt-decode";

type jwtPayload = JwtPayload & {
  id: string;
};

const token = localStorage.getItem("accessToken") as string;

let decoded: jwtPayload | string = "";
let userId: string;

if (token) {
  decoded = jwtDecode<jwtPayload>(token);
  userId = decoded.id;
}

const getUser = async () => {
  const user = await api.get(`/user/${userId}`);
  return user.data.user;
};

const NavBar = () => {
  const { data } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });

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

  if (data)
    return (
      <div className="border py-2 px-10 w-full flex items-center gap-20 shadow text-sm">
        <h1 className="flex items-center gap-2 w-[50%]">
          <span className="bg-blue-600 text-white font-bold py-2 px-3 rounded-md ">
            K
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

        <div className="flex gap-3 items-center w-[400px]">
          <IoIosNotificationsOutline className="text-gray-500 text-xl" />
          <div>
            <h1>{data.firstName} {data.lastName}</h1>
            <span className={`bg-pink-100 text-green-700 mr-1 py-1 px-2 rounded-lg`}>
              {data.role}
            </span>
            <span className="text-gray-500">{data.department}</span>
          </div>
          <BsPerson className="text-gray-500 text-lg" />
        </div>
      </div>
    );
};

export default NavBar;
