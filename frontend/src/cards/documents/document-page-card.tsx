import { IoDocumentTextOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { FiDownload } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";

interface createDocumentCardProp {
  title: string;
  author: string;
  date: string;
  numberOfDownloads: number;
  categories: string[];
}

const DocumentPageCard = ({
  title,
  author,
  date,
  numberOfDownloads,
  categories,
}: createDocumentCardProp) => {
  return (
    <div className="bg-white border rounded-md shadow w-full">
      <div className="flex p-4 ">
        <IoDocumentTextOutline className="text-blue-500 text-3xl mr-4" />
        <div className="flex flex-col gap-2">
          <h1>{title}</h1>
          <p className="flex items-center gap-2 text-gray-500">
            <BsPerson />
            {author}
          </p>
          <p className="flex items-center gap-2 text-gray-500">
            <SlCalender /> {date}
          </p>
          <p className="flex items-center gap-2 text-gray-500">
            <FiDownload />
            {numberOfDownloads} downloads
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-4 text-gray-500 text-sm px-4 ">
        {categories.map((category, index) => (
          <span key={index} className="bg-gray-100 p-1 rounded-md">
            {category}
          </span>
        ))}
      </div>

      <div className="flex gap-4 border-t-1 mt-6 px-6 py-4">
        <span className="flex gap-1 items-center text-gray-500 ">
          <IoEyeOutline /> View
        </span>

        <span className="flex gap-1 items-center text-gray-500 ">
          <FiDownload /> Download
        </span>
      </div>
    </div>
  );
};

export default DocumentPageCard;
