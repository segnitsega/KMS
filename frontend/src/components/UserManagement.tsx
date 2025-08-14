import React from 'react';

const users = [
  {
    initials: 'JD',
    name: 'John waqata',
    email: 'john.doe@company.com',
    role: 'Admin',
    roleColor: 'bg-green-100 text-green-700',
    action: 'Edit',
    actionColor: 'bg-blue-100 text-blue-700',
  },
  {
    initials: 'SJ',
    name: 'Sarah Tolasa',
    email: 'sarah.johnson@company.com',
    role: 'Expert',
    roleColor: 'bg-purple-100 text-purple-700',
    action: 'Edit',
    actionColor: 'bg-blue-100 text-blue-700',
  },
  {
    initials: 'MC',
    name: 'Addis Alemayo',
    email: 'mike.chen@company.com',
    role: 'Regular',
    roleColor: 'bg-blue-100 text-blue-700',
    action: 'Promote',
    actionColor: 'bg-blue-100 text-blue-700',
  },
];

const UserManagement: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-lg p-8 mt-4">
    <h2 className="font-semibold text-xl mb-1">User Management</h2>
    <p className="text-gray-500 mb-6">Manage user roles and permissions</p>
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.email} className="flex items-center bg-[#f6fafd] rounded-xl p-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4" style={{background: 'linear-gradient(135deg, #1976ed 60%, #43a047 100%)'}}>
            {user.initials}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-base">{user.name}</div>
            <div className="text-gray-500 text-sm">{user.email}</div>
          </div>
          <span className={`px-3 py-1 rounded-lg text-xs font-medium mr-3 ${user.roleColor}`}>{user.role}</span>
          <button
            className={`px-4 py-1 rounded-lg text-xs font-medium border border-[#e3eafc] bg-white text-[#1976ed] hover:bg-[#e3eafc] transition-colors duration-150`}
            style={{ borderWidth: '1px' }}
            onClick={() => alert(`Edit user: ${user.name}`)}
          >
            {user.action}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default UserManagement;
