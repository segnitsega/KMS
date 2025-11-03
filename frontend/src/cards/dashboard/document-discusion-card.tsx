import type { IconType } from "react-icons";
// import { Link } from "react-router-dom";

interface createDocumentCardProp {
  title: string;
  text: string;
  icon: IconType;
  iconStyle: string;
}

const CreateDocumentCard = ({
  title,
  text,
  icon: Icon,
  iconStyle,
}: createDocumentCardProp) => {
  return (
    <div className="flex w-[300px] md:w-[] gap-4 items-center border p-6 rounded-lg bg-white">
      <Icon className={`p-2 text-4xl rounded-lg ${iconStyle} `} />
      <div>
        <h1>{title}</h1>
        <span className="text-gray-500">{text}</span>
      </div>
    </div>
  );
};

export default CreateDocumentCard;
