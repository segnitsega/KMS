import ContentManagement from "../components/ContentManagement";
import AssignTaskManagement from "../components/AssignTaskManagement";
import { useState } from "react";
import Header from "@/components/reusable-header";
import UserManagement from "@/components/UserManagement";
import api from "@/utility/api";
import { useQuery } from "@tanstack/react-query";
import loadingSpinner from "../assets/loading-spinner.svg";

const getStatus = async () => {
  const statsCount = await api.get(`/status-count`);
  console.log(statsCount.data);
  return statsCount.data;
};

const Administration = () => {
  const { data, isLoading } = useQuery({
    queryFn: getStatus,
    queryKey: ["statusData"],
  });

  const [activeTab, setActiveTab] = useState("Content");
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  return (
    <div>
      <Header
        title="Administration"
        subtitle="Manage users, documents, and tasks from one place."
        buttonText={"Add User"}
        dropDownText=""
        dropDownOptions={["content", "users", "assign tasks"]}
        searchPlaceholder="search content, users, tasks"
        onButtonClick={() => setShowAddUserModal(true)}
      />
      <div className="flex gap-0 mt-6 mb-8 bg-[#f6fafd] rounded-full overflow-hidden shadow">
        {["Content", "Users", "Assign Tasks"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 font-medium text-base transition-colors ${
              activeTab === tab
                ? "bg-gradient-to-r from-[#1976ed] to-[#1976ed] text-white rounded-full"
                : "bg-none text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex h-screen bg-white justify-center items-center">
          <img src={loadingSpinner} width={50} alt="loading" />
        </div>
      )}
      {data && (
        <div>
          {activeTab === "Content" && (
            <ContentManagement
              totalDocuments={data.documents}
              totalArticles={data.articles}
              totalDiscussions={data.discussions}
            />
          )}
          {activeTab === "Users" && <UserManagement />}
          {activeTab === "Assign Tasks" && <AssignTaskManagement />}
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-15 w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-500 text-2xl font-bold hover:text-red-500"
              onClick={() => setShowAddUserModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-6 text-blue-700">
              Add New User
            </h2>
            <form className="flex flex-col gap-4">
              <input
                className="border rounded-md p-2"
                type="text"
                placeholder="Full Name"
              />
              <input
                className="border rounded-md p-2"
                type="email"
                placeholder="Email"
              />
              <input
                className="border rounded-md p-2"
                type="text"
                placeholder="Role"
              />
              <input
                className="border rounded-md p-2"
                type="text"
                placeholder="Department"
              />
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Administration;
