import Header from '@/components/reusable-header'
import ExpertDirectoryCard from '@/cards/expert-directory/expert-directory-card'
import ProfileModal from '@/components/ProfileModal'
import React, { useState } from 'react';

const ExpertDirectory = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  // All expert data
  const experts = [
    {
      name: "Sarah Johnson",
      role: "admin",
      department: "IT",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      joined: "1/15/2020",
      skills: ["System Administration", "Security", "Project Management"],
      links: {
        linkedin: "#",
        github: "#",
        portfolio: "#"
      }
    },
    {
      name: "Michael Chen",
      role: "expert",
      department: "Engineering",
      email: "michael.chen@company.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      joined: "3/20/2019",
      skills: ["React", "Node.js", "Cloud Architecture", "DevOps"],
      links: {
        linkedin: "#",
        github: "#",
        portfolio: "#"
      }
    },
    {
      name: "Emily Rodriguez",
      role: "employee",
      department: "Marketing",
      email: "emily.rodriguez@company.com",
      phone: "+1 (555) 987-6543",
      location: "Los Angeles, CA",
      joined: "6/10/2021",
      skills: ["Content Strategy", "SEO", "Social Media"],
      links: {
        linkedin: "#",
        github: "#",
        portfolio: "#"
      }
    },
    {
      name: "David Kim",
      role: "new hire",
      department: "Sales",
      email: "david.kim@company.com",
      phone: "+1 (555) 222-3333",
      location: "Chicago, IL",
      joined: "1/8/2024",
      skills: ["Communication", "CRM"],
      links: {
        linkedin: "#",
        github: "#",
        portfolio: "#"
      }
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Expert Directory"
        subtitle="Find colleagues with specific skills and expertise"
        dropDownText="All Departments"
        dropDownOptions={["All Departments", "Engineering", "Marketing"]}
        searchPlaceholder="Search by name, skill..."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {experts.map((expert, idx) => (
          <ExpertDirectoryCard
            key={expert.name}
            name={expert.name}
            role={expert.role}
            department={expert.department}
            date={expert.joined}
            skill1={expert.skills[0]}
            skill2={expert.skills[1]}
            skill3={expert.skills[2]}
            skill4={expert.skills[3]}
            onViewProfile={() => {
              setSelectedProfile(expert);
              setProfileOpen(true);
            }}
          />
        ))}
      </div>
      {selectedProfile && (
        <ProfileModal
          isOpen={profileOpen}
          onClose={() => setProfileOpen(false)}
          {...selectedProfile}
        />
      )}
    </div>
  );
}

export default ExpertDirectory