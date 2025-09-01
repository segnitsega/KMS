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
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Help & Support</h1>
      </div>
      <p className="text-gray-500 mb-6 text-lg">Get assistance, find answers, and connect with our support team for any issues or questions.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <FiMessageCircle size={48} className="mb-2 text-[#1976ed]" />
          <h2 className="font-semibold text-lg mb-1">Live Chat</h2>
          <p className="text-gray-500 mb-4 text-center">Get instant help from our support team</p>
          <button
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-100 transition"
            onClick={handleStartChat}
          >
            Start Chat
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <MdOutlineEmail size={48} className="mb-2 text-[#43a047]" />
          <h2 className="font-semibold text-lg mb-1">Email Support</h2>
          <p className="text-gray-500 mb-4 text-center">Send us a detailed message about your issue</p>
          <button className="border border-green-600 text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-100 transition">Send Email</button>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <FiPhone size={48} className="mb-2 text-[#8e24aa]" />
          <h2 className="font-semibold text-lg mb-1">Phone Support</h2>
          <p className="text-gray-500 mb-4 text-center">Call us for urgent technical assistance</p>
          <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-100 transition">Call Now</button>
        </div>
      </div>
      <HelpSupportModule />
    </div>
  );
};

export default HelpSupport;
