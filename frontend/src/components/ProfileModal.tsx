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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-4">
      <div className="relative max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:p-6 md:p-8">
        {/* Close button */}
        <button
          className="absolute right-3 top-3 text-2xl text-gray-500 transition hover:text-red-500 sm:right-4 sm:top-4"
          onClick={onClose}
          aria-label="Close profile"
        >
          &times;
        </button>

        {/* Header */}
        <div className="mb-4 flex flex-col gap-6 border-b pb-4 sm:mb-6 sm:gap-8 sm:pb-6 md:flex-row">
          {/* Avatar */}
          <div className="flex flex-col items-center md:w-1/3 md:shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-3xl font-bold text-white shadow-md sm:h-28 sm:w-28 sm:text-4xl">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <h2 className="mt-3 max-w-full truncate px-2 text-center text-xl font-bold sm:mt-4 sm:text-2xl">
              {name}
            </h2>
            <p className="text-center text-sm text-gray-500 sm:text-base">{department}</p>
            <span className="mt-2 rounded-full bg-gradient-to-r from-red-100 to-red-200 px-3 py-1 text-xs font-semibold text-red-600 shadow-sm">
              {role}
            </span>

            <button
              className="mt-4 w-full max-w-xs rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 py-2 text-sm font-medium text-white shadow transition hover:scale-[1.02] sm:text-base"
              onClick={() => (window.location.href = `mailto:${email}`)}
            >
              Send Message
            </button>
          </div>

          {/* Contact & Skills */}
          <div className="min-w-0 flex-1 space-y-5 sm:space-y-6">
            {/* Contact Information */}
            <section>
              <h3 className="mb-2 text-lg font-semibold sm:mb-3 sm:text-xl">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                <div className="flex min-w-0 items-center gap-2 rounded-lg bg-gray-50 p-2.5 shadow-sm sm:gap-3 sm:p-3">
                  <FiMail className="shrink-0 text-blue-500" />
                  <span className="min-w-0 truncate text-sm sm:text-base">{email}</span>
                </div>
                <div className="flex min-w-0 items-center gap-2 rounded-lg bg-gray-50 p-2.5 shadow-sm sm:gap-3 sm:p-3">
                  <FiPhone className="shrink-0 text-green-500" />
                  <span className="min-w-0 truncate text-sm sm:text-base">{phoneNumber}</span>
                </div>
                <div className="flex min-w-0 items-center gap-2 rounded-lg bg-gray-50 p-2.5 shadow-sm sm:gap-3 sm:p-3">
                  <FiMapPin className="shrink-0 text-red-500" />
                  <span className="min-w-0 truncate text-sm sm:text-base">{location}</span>
                </div>
                <div className="flex min-w-0 items-center gap-2 rounded-lg bg-gray-50 p-2.5 shadow-sm sm:gap-3 sm:p-3">
                  <FiCalendar className="shrink-0 text-purple-500" />
                  <span className="min-w-0 truncate text-sm sm:text-base">Joined {joined}</span>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h3 className="mb-2 text-lg font-semibold sm:mb-3 sm:text-xl">
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill, i) => (
                    <span
                      key={i}
                      className="cursor-default rounded-full bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1 text-xs font-medium text-purple-700 shadow-sm hover:shadow-md sm:px-4 sm:text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No skills provided</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
