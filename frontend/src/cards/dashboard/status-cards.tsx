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
    <div className="flex items-center justify-between p-4 border rounded-md w-full">
        <div>
            <h1>{title}</h1>
            <span>{value}</span>
        </div>
        <Icon className={`p-1 text-4xl rounded-lg ${color} ${bgColor} `}/>
    </div>
  )
}

export default StatusCard