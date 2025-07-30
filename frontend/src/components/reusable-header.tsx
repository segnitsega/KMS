import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";

interface HeaderProps {
  title: string;
  subtitle: string;
  buttonText: string;
  dropDownText: string;
  dropDownOptions: string[];
  searchPlaceholder: string;
}
const Header = ({
  title,
  subtitle,
  buttonText,
  dropDownText,
  dropDownOptions,
  searchPlaceholder,
}: HeaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState(dropDownText);

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
    <div className="">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-2xl">{title}</h1>
          <span className="text-gray-500">{subtitle}</span>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-500 cursor-pointer text-lg">
          + {buttonText}
        </Button>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div
          ref={inputRef}
          className={`flex items-center bg-white border  rounded-md p-2 w-[100%] ${
            clicked ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <CiSearch className="text-gray-500 text-lg " />
          <input
            type="text"
            name=""
            id=""
            placeholder={searchPlaceholder}
            className="ml-2 outline-none w-full "
            onFocus={() => setClicked(true)}
          />
        </div>
        <CiFilter className="text-2xl text-gray-500"/>
        <select
          id="dropdown"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border border-gray-300 bg-gray-200 rounded-md px-3 py-2 "
        >
          {dropDownOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Header;
