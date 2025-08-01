import { FiMessageCircle } from "react-icons/fi";
import { useState } from "react";
import { LuBot } from "react-icons/lu";
import { TbLetterX } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import { Input } from "./ui/input";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-8 z-50 rounded-t-lg">
      {isOpen ? (
        <div className="border rounded-t-lg shadow h-[380px] w-[300px]">
          {/* chatbot header */}
          <div className="fixed w-[300px] p-4 bg-blue-500 flex items-center justify-between text-white rounded-t-md">
            <div className="flex items-center gap-2">
              <LuBot />
              <span>AI Assistant</span>
            </div>

            <TbLetterX
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* chatbot content */}
          <div className="flex overflow-y-auto h-[300px] p-4 bg-white items-center justify-center">
            <span className="text-black">Here will be the chat messages...</span>
          </div>

          {/* chatbot footer */}
          <div className="fixed bottom-6 p-4 bg-white w-[300px] rounded-b-lg border-t flex  items-center gap-2">
            <Input placeholder="Aske me anythin..." className="p-2" />
            <IoIosSend
              className="bg-blue-500 p-1 rounded-md text-white"
              size={30}
            />
          </div>
        </div>
      ) : (
        <FiMessageCircle
          onClick={() => setIsOpen(true)}
          className="text-white bg-blue-500 p-3 rounded-full cursor-pointer"
          size={55}
        />
      )}
    </div>
  );
};
