import React from "react";
import { useNavigate } from "react-router-dom";
import HelpSupportModule from "@/components/HelpSupportModule";
import { FiMessageCircle, FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

const HelpSupport: React.FC = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate("/kms/discussions");
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 sm:gap-6">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">Help & Support</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base lg:text-lg">
          Get assistance, find answers, and connect with our support team for any issues or questions.
        </p>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:mb-8 lg:grid-cols-3">
        <div className="flex flex-col items-center rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8">
          <FiMessageCircle className="mb-2 h-10 w-10 text-[#1976ed] sm:h-12 sm:w-12" />
          <h2 className="mb-1 text-base font-semibold sm:text-lg">Live Chat</h2>
          <p className="mb-4 text-center text-sm text-gray-500 sm:text-base">
            Get instant help from our support team
          </p>
          <button
            className="w-full max-w-xs rounded-lg border border-blue-600 px-6 py-2 font-medium text-blue-600 transition hover:bg-blue-100 sm:w-auto"
            onClick={handleStartChat}
          >
            Start Chat
          </button>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8">
          <MdOutlineEmail className="mb-2 h-10 w-10 text-[#43a047] sm:h-12 sm:w-12" />
          <h2 className="mb-1 text-base font-semibold sm:text-lg">Email Support</h2>
          <p className="mb-4 text-center text-sm text-gray-500 sm:text-base">
            Send us a detailed message about your issue
          </p>
          <button className="w-full max-w-xs rounded-lg border border-green-600 px-6 py-2 font-medium text-green-600 transition hover:bg-green-100 sm:w-auto">
            Send Email
          </button>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-white p-5 shadow-lg sm:col-span-2 sm:p-6 lg:col-span-1 lg:p-8">
          <FiPhone className="mb-2 h-10 w-10 text-[#8e24aa] sm:h-12 sm:w-12" />
          <h2 className="mb-1 text-base font-semibold sm:text-lg">Phone Support</h2>
          <p className="mb-4 text-center text-sm text-gray-500 sm:text-base">
            Call us for urgent technical assistance
          </p>
          <button className="w-full max-w-xs rounded-lg border border-purple-600 px-6 py-2 font-medium text-purple-600 transition hover:bg-purple-100 sm:w-auto">
            Call Now
          </button>
        </div>
      </div>
      <HelpSupportModule />
    </div>
  );
};

export default HelpSupport;
