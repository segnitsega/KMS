import React, { useRef, useState } from "react";
import { FiEye, FiMoreHorizontal, FiZap, FiUpload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/utility/api";
import loadingSpinner from "../assets/loading-spinner.svg";
import { toast } from "sonner";

const getUsers = async () => {
  const users = await api.get("/user");
  return users.data;
};

const getTasks = async (page: number, limit: number) => {
  const tasks = await api.get(`/tasks?page=${page}&limit=${limit}`);
  return tasks.data;
};

const AssignTaskManagement = () => {
  const[taskRefetched, SetTaskRefetched] = useState(false);
  const [page, setPage] = useState<string | number>(1);
  const [limit, setLimit] = useState<string | number>(3);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const taskQuery = useQuery({
    queryFn: () => getTasks(page, limit),
    queryKey: ["tasks"],
  });

  const { mutate: assignTask, isPending } = useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      userId: string;
      date: Date | string | undefined;
    }) => {
      let formattedDate = "";
      if (date) formattedDate = date.toLocaleDateString("en-GB");
      const taskData = {
        id: userId,
        title: title,
        description: description,
        dueDate: formattedDate,
      };
      const res = await api.post(`/admin/task-assign`, taskData);
      return res.data;
    },
    onSuccess: () => {
      toast("✅ Task assigned successfully!");
    },
    onError: () => {
      toast("❌ Failed to assign task");
    },
  });

  const handleTaskAssign = async () => {
    assignTask({ title, description, userId, date });
  };

  const handleTaskRefetch = async () => {
   await taskQuery.refetch();
    SetTaskRefetched(true);
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
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
        Error loading the page, please refresh the page !
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className=" bg-white rounded-lg shadow p-8">
        <h2 className="font-semibold text-xl mb-1">
          Create New Task Assignment
        </h2>
        <p className="text-gray-500 mb-6">
          Assign tasks and responsibilities to team members
        </p>

        <div className="flex gap-10 ">
          <div className="flex flex-col w-full">
            <label className="font-semibold text-xl mb-1">Task title</label>
            <input
              className=" mb-4 p-3 border rounded-lg"
              placeholder="Enter task title..."
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="font-semibold text-xl mb-1">Description</label>
            <textarea
              className="w-full mb-4 p-3 border rounded-lg"
              placeholder="Describe the task details, requirements, and expected outcomes..."
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex-1 flex flex-col">
              <label className="font-semibold text-xl mb-1">Assign To</label>
              <select
                className="p-3 border rounded-lg"
                defaultValue=""
                onChange={(e) => {
                  setUserId(e.target.value);
                  console.log(e.target.value);
                }}
              >
                {data.users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="">
            <label className="font-semibold text-xl mb-1">Due Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border"
            />
          </div>
        </div>

        <div className="flex justify-left mt-6">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-[#1976ed] to-[#1976ed] text-white px-6 py-2 font-medium rounded-lg"
            onClick={handleTaskAssign}
          >
            {isPending ? "Assigning task..." : "Assign Task"}
          </Button>
        </div>
      </div>

      {/* Active Task Assignments Section */}

      <div className="bg-white rounded-2xl shadow p-8 mt-4">
        <h2 className="font-semibold text-xl mb-1">Active Task Assignments</h2>
        <p className="text-gray-500 mb-6">
          Monitor assigned tasks and their progress
        </p>

        {taskQuery.isLoading && (
          <div className="flex h-screen bg-white justify-center items-center">
            <img src={loadingSpinner} width={50} alt="loading" />
          </div>
        )}

        {taskQuery.isError && (
          <div className="flex h-screen bg-white text-red-500 justify-center items-center">
            Error loading the page, please refresh the page !
          </div>
        )}

        {taskQuery.data && (
          <div className="space-y-4">
            {taskQuery.data.tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl p-4 flex flex-col gap-2 border border-[#e3eafc] "
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="font-semibold text-base">{task.title}</div>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      task.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : task.status === "Assigned"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {task.taskStatus}
                  </span>
                </div>
                <div className="text-gray-500 text-sm mb-1">
                  {task.description}
                </div>
                <div className="flex gap-4 text-xs text-gray-400 mb-2">
                  <span>
                    Assigned to: {task.user.firstName} {task.user.lastName}
                  </span>
                  <span>Due: {task.dueDate}</span>
                </div>
                <div className="flex gap-2 mt-2 justify-end">
                  <Button
                    variant="outline"
                    className="px-4 py-1 font-medium flex items-center gap-1"
                  >
                    <FiEye className="text-lg" />
                    View
                  </Button>
                  <Button variant="outline" className="px-2 py-1 font-medium">
                    <FiMoreHorizontal className="text-lg" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!taskRefetched && <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              className="bg-gradient-to-r from-[#1976ed] to-[#1976ed] text-white px-6 py-2 font-medium rounded-lg"
              onClick={() => {
                setPage("");
                setLimit("");
                handleTaskRefetch();
              }}
            >
             {taskQuery.isFetching ? "Loading..." : "View All Tasks"}
            </Button>
          </div>
        }
      </div>
    </div>
  );
};

export default AssignTaskManagement;
