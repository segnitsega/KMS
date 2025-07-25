// import { Icon } from "lucide-react";
import type { IconType } from "react-icons";

interface statusCardProps {
    title: string;
    value: string | number;
    icon: IconType;
    color: string;
    bgColor: string;
}

const StatusCard = ({title, value, icon: Icon, color, bgColor}: statusCardProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-6 border rounded-md w-full">
        <div className="mb-2">
            <h1 className="text-gray-500 text-lg">{title}</h1>
            <span className="font-bold text-xl">{value}</span>
        </div>
        <Icon className={`p-2 text-5xl rounded-lg ${color} ${bgColor} `}/>
    </div>
  )
}

export default StatusCard