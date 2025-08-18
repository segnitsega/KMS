import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiLinkedin,
  FiGithub,
  FiExternalLink
} from "react-icons/fi";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
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
  phone,
  location,
  joined,
  skills,
  links,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative overflow-y-auto max-h-[120vh]">
        <button
          className="absolute top-4 right-4 text-2xl hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:w-1/3">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold mb-2">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="text-xl font-semibold mb-1">{name}</div>
            <div className="text-gray-500 mb-2">{department}</div>
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs mb-4">
              {role}
            </span>

            <div className="flex flex-col gap-2 w-full">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg py-2 font-medium">
                Send Message
              </button>
            </div>
          </div>
          <div className="flex-1">
            {/* Contact Info */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
              <div className="flex flex-wrap gap-4 mb-2">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <FiMail className="text-gray-600" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <FiPhone className="text-gray-600" />
                  <span>{phone}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mb-2">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <FiMapPin className="text-gray-600" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <FiCalendar className="text-gray-600" />
                  <span>Joined {joined}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h2 className="text-xl font-bold mb-2">Professional Links</h2>
              <div className="flex gap-3">
                {links.linkedin && (
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                  >
                    <FiLinkedin /> LinkedIn
                  </a>
                )}
                {links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                  >
                    <FiGithub /> GitHub
                  </a>
                )}
                {links.portfolio && (
                  <a
                    href={links.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                  >
                    <FiExternalLink /> Portfolio
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
