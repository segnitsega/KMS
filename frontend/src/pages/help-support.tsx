import React from "react";
import HelpSupportModule from "@/components/HelpSupportModule";
import { IoIosHelpCircleOutline } from "react-icons/io";

const HelpSupport: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Help & Support</h1>
      </div>
      <p className="text-gray-500 mb-6 text-lg">Get assistance, find answers, and connect with our support team for any issues or questions.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <svg width="48" height="48" fill="none" stroke="#1976ed" strokeWidth="2" viewBox="0 0 24 24" className="mb-2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <h2 className="font-semibold text-lg mb-1">Live Chat</h2>
          <p className="text-gray-500 mb-4 text-center">Get instant help from our support team</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">Start Chat</button>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <svg width="48" height="48" fill="none" stroke="#43a047" strokeWidth="2" viewBox="0 0 24 24" className="mb-2"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>
          <h2 className="font-semibold text-lg mb-1">Email Support</h2>
          <p className="text-gray-500 mb-4 text-center">Send us a detailed message about your issue</p>
          <button className="border border-green-600 text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition">Send Email</button>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <svg width="48" height="48" fill="none" stroke="#8e24aa" strokeWidth="2" viewBox="0 0 24 24" className="mb-2"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.13.36 2.25.7 3.32a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.07.34 2.19.57 3.32.7A2 2 0 0 1 22 16.92z"/></svg>
          <h2 className="font-semibold text-lg mb-1">Phone Support</h2>
          <p className="text-gray-500 mb-4 text-center">Call us for urgent technical assistance</p>
          <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-50 transition">Call Now</button>
        </div>
      </div>
      <HelpSupportModule />
    </div>
  );
};

export default HelpSupport;
