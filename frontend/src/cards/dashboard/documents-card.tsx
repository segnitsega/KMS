import type { IconType } from "react-icons";
import { IoEyeOutline } from "react-icons/io5";
import { PiBookOpen } from "react-icons/pi";
import { Link } from "react-router-dom";

interface documentCardProp {
  heading: string;
  titles: string[];
  owners: string[];
  downloads?: string[];
  dates: string[];
  icon?: IconType;
  articleViews?: number[];
}

const DocumentCard = ({
  heading,
  titles,
  owners,
  downloads,
  dates,
  icon: Icon,
  articleViews,
}: documentCardProp) => {
  return (
    <div className="border rounded-md w-full bg-white">
      <div className="flex justify-between p-6">
        <h1>{heading}</h1>
        <Link to="/documents" className="text-blue-500">
          View all
        </Link>
      </div>

      <div className="border-b my-2"></div>

      <div className="flex items-center py-4 px-8 hover:bg-gray-100 cursor-pointer">
        {Icon ? (
          <Icon className="mr-2 p-2 text-4xl rounded-lg text-blue-700 bg-blue-200" />
        ) : (
          <PiBookOpen className="mr-2 p-2 text-4xl rounded-lg text-green-700 bg-green-200" />
        )}

        <div className="flex justify-between w-full">
          <div>
            <h1>{titles[0]}</h1>
            <span className="text-gray-500">
              {owners[0]} . {dates[0]}
            </span>
          </div>
          {downloads ? (
            <span className="flex gap-1 items-center text-gray-500">
              {" "}
              {downloads[0]} downloads
            </span>
          ) : (
            <span className="flex gap-1 items-center text-gray-500">
              <IoEyeOutline />
              {articleViews![0]}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center py-4 px-8 hover:bg-gray-100 cursor-pointer">
        {Icon ? (
          <Icon className="mr-2 p-2 text-4xl rounded-lg text-blue-700 bg-blue-200" />
        ) : (
          <PiBookOpen className="mr-2 p-2 text-4xl rounded-lg text-green-700 bg-green-200" />
        )}
        <div className="flex justify-between w-full">
          <div>
            <h1>{titles[1]}</h1>
            <span className="text-gray-500">
              {owners[1]} . {dates[1]}
            </span>
          </div>
          {downloads ? (
            <span className="flex gap-1 items-center text-gray-500">
              {" "}
              {downloads[1]} downloads
            </span>
          ) : (
            <span className="flex gap-1 items-center text-gray-500">
              <IoEyeOutline />
              {articleViews![1]}
            </span>
          )}
        </div>
      </div>

      <div className=" flex items-center py-4 px-8 hover:bg-gray-100 cursor-pointer">
        {Icon ? (
          <Icon className="mr-2 p-2 text-4xl rounded-lg text-blue-700 bg-blue-200" />
        ) : (
          <PiBookOpen className="mr-2 p-2 text-4xl rounded-lg text-green-700 bg-green-200" />
        )}
        <div className="flex justify-between w-full">
          <div>
            <h1>{titles[2]}</h1>
            <span className="text-gray-500">
              {owners[2]} . {dates[2]}
            </span>
          </div>
          {downloads ? (
            <span className="flex gap-1 items-center text-gray-500">
              {downloads[2]} downloads
            </span>
          ) : (
            <span className="flex gap-1 items-center text-gray-500">
              <IoEyeOutline />
              {articleViews![2]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
