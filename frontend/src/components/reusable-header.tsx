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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
          <span className="text-sm text-gray-500 sm:text-base">{subtitle}</span>
        </div>

        {buttonText && (
          <Button
            onClick={onButtonClick}
            className="w-full shrink-0 cursor-pointer bg-blue-500 text-base hover:bg-blue-500 sm:w-auto sm:text-lg"
          >
            + {buttonText}
          </Button>
        )}
      </div>

      {/* Search + Dropdown */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        {searchPlaceholder && (
          <div
            ref={inputRef}
            className={`flex w-full items-center rounded-md border bg-white p-2 sm:w-[90%] ${
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
          <div className="flex w-full items-center gap-2 sm:w-auto">
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
