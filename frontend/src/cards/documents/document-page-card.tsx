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
  onView,
}: createDocumentCardProp) => {

  const handleDownload = () => {
    const url= import.meta.env.VITE_BACKEND_URL
    const downloadEndpoint = `${url}/docs/download/${docId}`
    window.location.href = downloadEndpoint;
  }

  return (
    <div className="w-full min-w-0 rounded-md border bg-white shadow">
      <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
        <IoDocumentTextOutline className="mt-0.5 shrink-0 text-2xl text-blue-500 sm:text-3xl" />
        <div className="flex min-w-0 flex-col gap-1.5 sm:gap-2">
          <h1 className="truncate text-base font-semibold sm:text-lg">{title}</h1>
          <p className="flex items-center gap-2 truncate text-sm text-gray-500">
            <BsPerson className="shrink-0" />
            <span className="truncate">{author}</span>
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-500">
            <SlCalender className="shrink-0" /> {date}
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-500">
            <FiDownload className="shrink-0" />
            {numberOfDownloads} downloads
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 px-3 text-sm text-gray-500 sm:mt-4 sm:gap-4 sm:px-4">
      {categories}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 border-t px-4 py-3 sm:mt-6 sm:gap-4 sm:px-6 sm:py-4">
        <button
          className="flex gap-1 items-center text-blue-600 hover:underline focus:outline-none"
          onClick={onView}
          type="button"
        >
          <IoEyeOutline /> View
        </button>
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
