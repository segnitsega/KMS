import { FiMail, FiCalendar, FiUser } from "react-icons/fi";

interface ExpertDirectoryCardProps {
  name: string;
  role: string;
  department: string;
  date: string;
  image?: string;
  skills?: string[];
  onViewProfile?: () => void;
}

const ExpertDirectoryCard = ({
  name,
  role,
  department,
  date,
  image,
  skills = [],
  onViewProfile,
}: ExpertDirectoryCardProps) => {
  return (
    <div className="border rounded-md bg-white p-5 w-full hover:shadow-md">
      <div className="mb-6">
        <div className="flex mt-0 space-x-3">
          <div className="w-15 h-15 bg-gradient-to-br from-blue-500 to-purple-600 border rounded-full flex items-center justify-center overflow-hidden">
            {image ? (
              <img className="w-full h-full object-cover" src={image} alt="" />
            ) : (
              <span className="text-white font-bold text-[17px]">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="text-bold text-[16px] font-semibold">{name}</div>
            <div className="flex space-x-2 mt-1 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                {role}
              </span>
              <span className="text-sm m-0.5 text-gray-600">{department}</span>
            </div>
            <div className="text-sm flex items-center space-x-2 text-gray-600">
              <span>
                <FiCalendar />
              </span>
              <span className="">joined {date}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          <h4 className="mt-2 text-sm text-gray-700 mb-1 font-medium">
            Skills & Expertise
          </h4>
          <div className="flex flex-wrap overflow-y-auto max-h-[60px] w-fit gap-1 mt-1">
            {skills.slice(0, 6).map((skill, i) => (
              <span
                key={i}
                className="px-2 text-[11px] py-1 bg-blue-50 text-blue-700 whitespace-nowrap rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex text-gray-800 text-sm border-t border-gray-200 pt-3">
        <p className="flex items-center ml-6 gap-1">
          <FiMail />
          <span>Contact</span>
        </p>
        <button
          className="flex items-center ml-3 gap-1 hover:underline focus:outline-none"
          onClick={onViewProfile}
        >
          <FiUser />
          <span>view profile</span>
          
        </button>
      </div>
    </div>
  );
};

export default ExpertDirectoryCard;
