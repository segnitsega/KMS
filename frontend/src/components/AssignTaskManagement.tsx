import React, { useState, useRef } from "react";
import { FiEdit2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/utility/api";
import loadingSpinner from "../assets/loading-spinner.svg";
import { toast } from "sonner";

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  taskStatus: "Assigned" | "In Progress" | "Done";
  user: User;
}

const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/user");
  return res.data.users;
};

const getTasks = async (
  page: number,
  limit: number
): Promise<{ tasks: Task[] }> => {
  const res = await api.get(`/tasks?page=${page}&limit=${limit}`);
  return res.data;
};

const AssignTaskManagement = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const taskQuery = useQuery<{ tasks: Task[] }>({
    queryKey: ["tasks", page, limit],
    queryFn: () => getTasks(page, limit),
  });

  const { mutate: assignTask, isPending: assigning } = useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      userId: string;
      date: Date;
    }) => {
      const payload = {
        id: data.userId,
        title: data.title,
        description: data.description,
        dueDate: data.date.toISOString(),
      };

      if (editingTaskId) {
        const res = await api.put(`/admin/task/${editingTaskId}`, payload);
        return res.data;
      } else {
        const res = await api.post(`/admin/task-assign`, payload);
        return res.data;
      }
    },
    onSuccess: () => {
      toast.success(
        <span className="flex items-center gap-2">
          <span className="text-green-500 text-xl">✅</span>
          Task {editingTaskId ? "updated" : "assigned"} successfully!
        </span>,
        { icon: null }
      );
      resetForm();
      taskQuery.refetch();
    },
    onError: (error: any) => {
      console.error(
        "Task assign error:",
        error.response?.data || error.message
      );
      toast.error(
        <span className="flex items-center gap-2">
          <span className="text-red-500 text-xl">❌</span>
          Failed to {editingTaskId ? "update" : "assign"} task
        </span>,
        { icon: null }
      );
    },
  });

  const handleTaskAssign = () => {
    if (!title || !description || !userId || !date) return;
    assignTask({ title, description, userId, date });
  };

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setUserId(task.user.id);
    setDate(new Date(task.dueDate));
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUserId("");
    setDate(new Date());
    setEditingTaskId(null);
  };

  if (usersLoading)
    return (
      <div className="flex h-screen justify-center items-center">
        <img src={loadingSpinner} width={50} alt="loading" />
      </div>
    );

  if (usersError)
    return (
      <div className="flex h-screen text-red-500 justify-center items-center">
        Error loading users. Please refresh!
      </div>
    );

  return (
    <div className="flex flex-col gap-6" ref={topRef}>
      {/* FORM */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="font-semibold text-xl mb-1">
          {editingTaskId
            ? "Edit Task Assignment"
            : "Create New Task Assignment"}
        </h2>
        <p className="text-gray-500 mb-6">
          {editingTaskId
            ? "Update task details and due date"
            : "Assign tasks and responsibilities to team members"}
        </p>

        <div className="flex gap-10">
          <div className="flex flex-col w-full">
            <label className="font-semibold text-xl mb-1">Task title</label>
            <input
              className="mb-4 p-3 border rounded-lg"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="font-semibold text-xl mb-1">Description</label>
            <textarea
              className="w-full mb-4 p-3 border rounded-lg"
              placeholder="Describe the task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="font-semibold text-xl mb-1">Assign To</label>
            <select
              className="p-3 border rounded-lg"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              <option value="">Select user</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-xl mb-1">Due Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border"
            />
          </div>
        </div>

        <div className="flex justify-start mt-6 gap-2">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-[#1976ed] to-[#1976ed] text-white px-6 py-2 font-medium rounded-lg"
            onClick={handleTaskAssign}
            disabled={assigning}
          >
            {assigning
              ? editingTaskId
                ? "Updating..."
                : "Assigning..."
              : editingTaskId
              ? "Update Task"
              : "Assign Task"}
          </Button>
          {editingTaskId && (
            <Button
              variant="destructive"
              className="px-6 py-2 font-medium rounded-lg"
              onClick={resetForm}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* TASK LIST */}
      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="font-semibold text-xl mb-1">Active Task Assignments</h2>
        <p className="text-gray-500 mb-6">
          Monitor assigned tasks and their progress
        </p>

        {taskQuery.isLoading && (
          <div className="flex justify-center items-center">
            <img src={loadingSpinner} width={50} alt="loading" />
          </div>
        )}

        {taskQuery.isError && (
          <div className="flex text-red-500 justify-center items-center">
            Error loading tasks. Please refresh!
          </div>
        )}

        {taskQuery.data && (
          <div className="space-y-4">
            {taskQuery.data.tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl p-4 flex flex-col gap-2 border border-[#e3eafc]"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="font-semibold text-base">{task.title}</div>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      task.taskStatus === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : task.taskStatus === "Assigned"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
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
                    onClick={() => handleEditClick(task)}
                  >
                    <FiEdit2 className="text-lg" /> Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-[#1976ed] to-[#1976ed] text-white px-6 py-2 font-medium rounded-lg"
            onClick={() => {
              setPage(1);
              setLimit(100);
              taskQuery.refetch();
            }}
          >
            {taskQuery.isFetching ? "Loading..." : "View All Tasks"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignTaskManagement;
