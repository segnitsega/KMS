import ContentManagement from "../components/ContentManagement";
import AssignTaskManagement from "../components/AssignTaskManagement";
import { useState } from "react";
import Header from "@/components/reusable-header";
import UserManagement from "@/components/UserManagement";
import api from "@/utility/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import loadingSpinner from "../assets/loading-spinner.svg";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const getStatus = async () => {
  const statsCount = await api.get(`/status-count`);
  console.log(statsCount.data);
  return statsCount.data;
};

const handleUserRegistration = async (data: {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}) => {
  const newUser = await api.post("/admin/add-user", data);
  console.log("User data: ", newUser.data);
  return newUser.data;
};

const Administration = () => {
  const [activeTab, setActiveTab] = useState("Content");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const userData = {
    firstName,
    lastName,
    email,
    password,
  };

  const generatePassword = (length = 12) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    setPassword(Array.from(array, (x) => charset[x % charset.length]).join(""));
  };

  const { mutate: addUser, isPending } = useMutation({
    mutationFn: () => handleUserRegistration(userData),
    onSuccess: () => {
      toast("✅ User added successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminUsersData"] });
      setFirstName("");
      setLastName("");
      setPassword("");
      setEmail("");
      setShowAddUserModal(false);
    },
    onError: () => {
      toast("❌ Failed to add user");
    },
  });

  const { data, isLoading } = useQuery({
    queryFn: getStatus,
    queryKey: ["statusData"],
  });

  const queryClient = useQueryClient();
  return (
    <div>
      <Header
        title="Administration"
        subtitle="Manage users, documents, and tasks from one place."
        buttonText={"Add User"}
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
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-500 text-3xl font-bold hover:text-red-500 cursor-pointer"
              onClick={() => setShowAddUserModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-6 text-blue-700">
              Add New User
            </h2>
            <form className="flex flex-col gap-2">
              <label>First Name </label>
              <input
                className="border rounded-md p-2"
                type="text"
                placeholder="Enter first Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label>Last Name </label>
              <input
                className="border rounded-md p-2"
                type="text"
                placeholder="Enter last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <label>Email </label>
              <input
                className="border rounded-md p-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="flex gap-4">
                <input
                  className="border rounded-md p-2"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="rounded-md p-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  type="button"
                  value="Generate Password"
                  onClick={() => generatePassword()}
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  className={`bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 cursor-pointer transition`}
                  onClick={() => {
                    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
                      toast("Please fill all fields");
                      return;
                    }
                    addUser();
                  }}
                >
                  {isPending ? "Adding..." : "Add"}
                </button>
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition cursor-pointer"
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
