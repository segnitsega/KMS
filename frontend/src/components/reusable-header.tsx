import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Button } from "./ui/button";

interface HeaderProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  dropDownText?: string;
  dropDownOptions?: string[];
  searchPlaceholder?: string;
  onButtonClick?: () => void;
  onSearch?: (value: string) => void; // added since you are calling onSearch
}

const Header = ({
  title,
  subtitle,
  buttonText,
  dropDownText,
  dropDownOptions,
  searchPlaceholder,
  onButtonClick,
  onSearch,
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Top Section: Title + Subtitle + Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">{title}</h1>
          <span className="text-gray-500">{subtitle}</span>
        </div>

        {buttonText && (
          <Button
            onClick={onButtonClick}
            className="bg-blue-500 hover:bg-blue-500 cursor-pointer text-lg"
          >
            + {buttonText}
          </Button>
        )}
      </div>

      {/* Search + Dropdown */}
      <div className="flex items-center gap-2 mt-4">
        {searchPlaceholder && (
          <div
            ref={inputRef}
            className={`flex items-center bg-white border rounded-md p-2 w-[90%] ${
              clicked ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <CiSearch className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="ml-2 outline-none w-full"
              onFocus={() => setClicked(true)}
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        )}

        {dropDownOptions && (
          <div className="flex items-center gap-2">
            {/* <CiFilter className="text-2xl text-gray-500" /> */}
            <select
              id="dropdown"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="border border-gray-300 bg-gray-200 rounded-md px-3 py-2"
            >
              {dropDownOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
