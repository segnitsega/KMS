import api from "@/utility/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import loadingSpinner from "../assets/loading-spinner.svg";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { toast } from "sonner";
import { FiTrash2 } from "react-icons/fi";
import spinner from "../assets/tiny-spinner.svg"

const getUsers = async () => {
  const users = await api.get("/user");
  return users.data;
};

const UserManagement = () => {
  const [editUser, setEditUser] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    userId: "",
  });
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null)

  const generatePassword = (length = 12) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    setPassword(Array.from(array, (x) => charset[x % charset.length]).join(""));
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: getUsers,
    queryKey: ["adminUsersData"],
  });

  const { mutate: saveUserData, isPending } = useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      password: string;
      userId: string;
    }) => {
      const response = await api.post(
        `/admin/update-user/${data.userId}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      toast("✅ Update success");
    },
    onError: () => {
      toast("❌ Error updating");
    },
  });

    const { mutate: removeUser, isPending: deletePending } = useMutation({
    mutationFn: async (userId: string) => {
      const response = await api.delete(`/admin/remove-user/${userId}`)
      return response.data
    },
    onSuccess: () => {
      setDeletingUserId(null)
      toast("✅ User removed from the system");
    },
    onError: () => {
      toast("✅ Error removing user");
    },
  });

  const handleUserEdit = (data: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
    userId: string;
  }) => {
    saveUserData(data);
  };

  const handleDeleteuser = async(id: string) => {
    setDeletingUserId(id)
    removeUser(id)
  }

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
        {editUser && (
          <div className="fixed inset-0 p-10 flex justify-center bg-black/30 backdrop-blur-sm ">
            <div className="bg-white p-6 rounded-md ">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Edit User
              </h2>

              <div className="space-y-2 mb-4">
                <h2 className="text-xl font-semibold">User Details</h2>

                <div className="flex gap-20">
                  <h2>First Name: {user.firstName}</h2>
                  <h2>Last Name: {user.lastName}</h2>
                </div>

                <div className="flex gap-10">
                  <h2>Email: {user.email}</h2>
                  <h2>Role: {user.role}</h2>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-semibold">
                  Edit user details and password
                </h2>
                <div className="flex items-center gap-2">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    placeholder={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className=" border px-2 py-1 rounded"
                  />
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    placeholder={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className=" border px-2 py-1 rounded"
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    placeholder={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border px-2 py-1 rounded"
                  />
                  <label>Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full border px-2 py-1 rounded"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label>Password</label>
                  <input
                    type="email"
                    value={password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Generate new password"
                    className="w-full border px-2 py-1 rounded"
                  />

                  <input
                    className="rounded-md p-1 bg-blue-600 text-white"
                    type="button"
                    value="Generate Password"
                    onClick={() => generatePassword()}
                  />
                </div>
              </div>

              <div className="flex justify-start gap-3 mt-4">
                <button
                  onClick={() => setEditUser(false)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUserEdit(formData)}
                  className={`px-3 py-1  text-white rounded   ${
                    isPending ? "bg-blue-400" : "bg-blue-600"
                  }`}
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

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
                className="px-3 py-1 rounded-lg text-xs font-medium mr-3"
              >
                {user.role}
              </span>
              <button
                className={`px-4 py-1 rounded-lg text-xs font-medium border border-[#e3eafc] bg-white text-[#1976ed] hover:bg-[#e3eafc] transition-colors duration-150`}
                style={{ borderWidth: "1px" }}
                onClick={() => {
                  setEditUser(true);
                  setUser(user);
                  setFormData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    password: "",
                    userId: user.id,
                  });
                }}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700 p-1 cursor-pointer text-lg"
                title="Delete document"
                onClick={() => handleDeleteuser(user.id)}
              >
                { deletingUserId === user.id ? <img src={spinner} className="w-8"/> : <FiTrash2
                />}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
};

export default UserManagement;
