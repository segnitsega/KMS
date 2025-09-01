import { IoDocumentTextOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { FiDownload } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";

interface createDocumentCardProp {
  docId: string;
  title: string;
  author: string;
  date: string;
  numberOfDownloads: number;
  categories: string[];
  description?: string;
  onView?: () => void;
  downloadUrl?: string;
}

const DocumentPageCard = ({
  docId,
  title,
  author,
  date,
  numberOfDownloads,
  categories,
  description,
  onView,
  downloadUrl,
}: createDocumentCardProp) => {

  const handleDownload = () => {
    const url= import.meta.env.VITE_BACKEND_URL
    const downloadEndpoint = `${url}/docs/download/${docId}`
    window.location.href = downloadEndpoint;
  }

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
      {categories}
      </div>

      <div className="flex gap-4 border-t-1 mt-6 px-6 py-4">
        <button
          className="flex gap-1 items-center text-blue-600 hover:underline focus:outline-none"
          onClick={onView}
          type="button"
        >
          <IoEyeOutline /> View
        </button>
        {/* <a
          href={downloadUrl || '#'}
          className="flex gap-1 items-center text-gray-500 hover:underline"
          download
        >
          <FiDownload /> Download
        </a> */}
         <button
          onClick={handleDownload}
          className="flex gap-1 items-center text-gray-500 hover:underline focus:outline-none"
          type="button"
        >
          <FiDownload /> Download
        </button>
      </div>
    </div>
  );
};

export default DocumentPageCard;
