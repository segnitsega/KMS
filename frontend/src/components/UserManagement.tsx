import api from "@/utility/api";
import { useQuery } from "@tanstack/react-query";
import loadingSpinner from "../assets/loading-spinner.svg";
import { IoPersonCircleOutline } from "react-icons/io5";

const getUsers = async () => {
  const users = await api.get("/user");
  return users.data;
};

const UserManagement = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUsers,
    queryKey: ["adminUsersData"],
  });

  if (isLoading)
    return (
      <div className="flex h-screen bg-white justify-center items-center">
        <img src={loadingSpinner} width={50} alt="loading" />
      </div>
    );
  if (isError)
    return (
      <div className="flex h-screen bg-white text-red-500 justify-center items-center">
        Error getting users, please refresh the page !
      </div>
    );

  if (data)
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mt-4">
        <h2 className="font-semibold text-xl mb-1">User Management</h2>
        <p className="text-gray-500 mb-6">Manage user roles and permissions</p>
        <div className="space-y-4">
          {data.users.map((user) => (
            <div
              key={user.id}
              className="flex items-center bg-[#f6fafd] rounded-xl p-4"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4"
                style={{
                  background:
                    "linear-gradient(135deg, #1976ed 60%, #43a047 100%)",
                }}
              >
                <IoPersonCircleOutline />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-base">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-gray-500 text-sm">{user.email}</div>
              </div>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-medium mr-3 ${user.roleColor}`}
              >
                {user.role}
              </span>
              <button
                className={`px-4 py-1 rounded-lg text-xs font-medium border border-[#e3eafc] bg-white text-[#1976ed] hover:bg-[#e3eafc] transition-colors duration-150`}
                style={{ borderWidth: "1px" }}
                onClick={() => alert(`Edit user: ${user.name}`)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    );
};

export default UserManagement;
