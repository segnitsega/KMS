import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  role: string;
  department: string;
  email: string;
  phoneNumber: string;
  location: string;
  joined: string;
  skills: string[];
  links: { linkedin?: string; github?: string; portfolio?: string };
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  name,
  role,
  department,
  email,
  phoneNumber,
  location,
  joined,
  skills,
  // links,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 relative overflow-y-auto max-h-[95vh]">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 transition"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 border-b pb-6 mb-6">
          {/* Avatar */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-md">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <h2 className="mt-4 text-2xl font-bold">{name}</h2>
            <p className="text-gray-500">{department}</p>
            <span className="mt-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-100 to-red-200 text-red-600 text-xs font-semibold shadow-sm">
              {role}
            </span>

            <button
              className="mt-4 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg py-2 font-medium shadow hover:scale-[1.02] transition"
              onClick={() => window.location.href = `mailto:${email}`}
            >
              Send Message
            </button>
          </div>

          {/* Contact & Skills */}
          <div className="flex-1 space-y-6">
            {/* Contact Information */}
            <section>
              <h3 className="text-xl font-semibold mb-3">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                  <FiMail className="text-blue-500" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                  <FiPhone className="text-green-500" />
                  <span>{phoneNumber}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                  <FiMapPin className="text-red-500" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                  <FiCalendar className="text-purple-500" />
                  <span>Joined {joined}</span>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h3 className="text-xl font-semibold mb-3">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium shadow-sm hover:shadow-md cursor-default"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No skills provided</p>
                )}
              </div>
            </section>

            {/* Links */}
            {/* <section>
              <h3 className="text-xl font-semibold mb-3">Professional Links</h3>
              <div className="flex flex-wrap gap-3">
                {links.linkedin && (
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
                  >
                    <FiLinkedin /> LinkedIn
                  </a>
                )}
                {links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium shadow hover:bg-gray-800 transition"
                  >
                    <FiGithub /> GitHub
                  </a>
                )}
                {links.portfolio && (
                  <a
                    href={links.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium shadow hover:bg-green-600 transition"
                  >
                    <FiExternalLink /> Portfolio
                  </a>
                )}
              </div>
            </section> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
