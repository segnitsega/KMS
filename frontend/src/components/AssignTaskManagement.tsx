import React, { useRef, useState } from 'react';
import { FiEye, FiMoreHorizontal, FiZap, FiUpload } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

const activeTasks = [
  { title: 'Review Q1 Documentation', status: 'In Progress', priority: 'High', desc: 'Review and approve all Q1 quarterly documentation for accuracy.', assigned: 'Sarah Johnson', due: 'Jan 25, 2024', progress: '60%' },
  { title: 'New Hire Onboarding', status: 'Assigned', priority: 'Medium', desc: 'Prepare onboarding materials for new team members.', assigned: 'All HR Team', due: 'Jan 28, 2024', progress: '0%' },
  { title: 'Security Audit Report', status: 'Overdue', priority: 'Urgent', desc: 'Conduct security audit and report findings.', assigned: 'Security Team', due: 'Feb 2, 2024', progress: '0%' },
];

const AssignTaskManagement: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex">
        {/* Create New Task Assignment */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="font-semibold text-xl mb-1">Create New Task Assignment</h2>
          <p className="text-gray-500 mb-6">Assign tasks and responsibilities to team members</p>
          <input className="w-full mb-4 p-3 border rounded-lg" placeholder="Enter task title..." />
          <textarea className="w-full mb-4 p-3 border rounded-lg" placeholder="Describe the task details, requirements, and expected outcomes..." />

          <div className="mb-4">
            <div className="font-medium mb-2">Resource Upload</div>
            <div
              className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-colors duration-200 ${dragActive ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-blue-50"}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              style={{ cursor: "pointer" }}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
              />
              <FiUpload className="text-blue-700 text-6xl mb-4" />
              <p className="text-gray-700 font-semibold mb-1 text-lg">
                {file ? file.name : "Drag and drop your file here"}
              </p>
              <p className="text-gray-400 text-sm">or click to browse from your computer</p>
              <p className="text-gray-400 text-sm mt-2">Supported: PDF, DOC, DOCX, TXT</p>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1 flex flex-col">
              <label className="font-semibold text-xl mb-1">Assign To</label>
              <select className="p-3 border rounded-lg" defaultValue="">
                <option value="" disabled>Select user</option>
                <option value="Addis Alemayo">Addis Alemayo</option>
                <option value="All user">All user</option>
                <option value="Expert only">Expert only</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col">
              <label className=" font-semibold text-xl mb-1">Priority Level</label>
              <select className="p-3 border rounded-lg appearance-none" defaultValue="">
                <option value="" disabled>Select priority</option>
                <option value="Urgent">🔴 Urgent</option>
                <option value="High">🟠 High Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="Low">🟢 Low Priority</option>
              </select>
            </div>
          </div>
          <label className="font-semibold text-xl mb-1">Due Date</label>
          <input className="w-full mb-4 p-3 border rounded-lg" placeholder="mm/dd/yyyy --:-- --" />
          <div className="flex justify-left mt-6">
            <Button variant="outline" className="bg-gradient-to-r from-[#1976ed] to-[#1976ed] text-white px-6 py-2 font-medium rounded-lg">Assign Task</Button>
          </div>
        </div>
      </div>

      {/* Active Task Assignments Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mt-4">
        <h2 className="font-semibold text-xl mb-1">Active Task Assignments</h2>
        <p className="text-gray-500 mb-6">Monitor assigned tasks and their progress</p>

        <div className="space-y-4">
          {activeTasks.map((task, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 flex flex-col gap-2 border border-[#e3eafc] shadow-sm">
              <div className="flex items-center gap-3 mb-1">
                <div className="font-semibold text-base">{task.title}</div>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                  task.status === 'Assigned' ? 'bg-blue-100 text-blue-700' :
                  'bg-red-100 text-red-700'
                }`}>{task.status}</span>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  task.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                } flex items-center gap-1`}>
                  {task.priority === 'Urgent' && <FiZap />} {task.priority}
                </span>
              </div>
              <div className="text-gray-500 text-sm mb-1">{task.desc}</div>
              <div className="flex gap-4 text-xs text-gray-400 mb-2">
                <span>Assigned to: {task.assigned}</span>
                <span>Due: {task.due}</span>
                <span>Progress: {task.progress}</span>
              </div>
              <div className="flex gap-2 mt-2 justify-end">
                <Button variant="outline" className="px-4 py-1 font-medium flex items-center gap-1"><FiEye className="text-lg" />View</Button>
                <Button variant="outline" className="px-2 py-1 font-medium"><FiMoreHorizontal className="text-lg" /></Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button  variant="outline" className="bg-gradient-to-r from-[#1976ed] to-[#1976ed] text-white px-6 py-2 font-medium rounded-lg">View All Tasks</Button>
        </div>
      </div>
    </div>
  );
};

export default AssignTaskManagement;
