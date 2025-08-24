import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/reusable-header";
import ExpertDirectoryCard from "@/cards/expert-directory/expert-directory-card";
import ProfileModal from "@/components/ProfileModal";
import api from "@/utility/api";
import loadingSpinner from "../assets/loading-spinner.svg";

// API call for paginated/search users
const getExperts = async (page: number, limit: number, search?: string) => {
  if (search && search.trim()) {
    const { data } = await api.get(`/user/search?q=${search}`);
    return data.users;
  } else {
    const { data } = await api.get(`/user?page=${page}&limit=${limit}`);
    return data.users;
  }
};

const ExpertDirectory = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [page] = useState(1);
  const [limit] = useState(9);
  const [search, setSearch] = useState("");

  // Fetch experts from backend
  const {
    data: experts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["experts", page, limit, search],
    queryFn: () => getExperts(page, limit, search),
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <Header
        title="Expert Directory"
        subtitle="Find colleagues with specific skills and expertise"
        dropDownText="All Departments"
        dropDownOptions={[
          "All Departments",
          "Engineering",
          "Marketing",
          "Sales",
          "IT",
        ]}
        searchPlaceholder="Search by name, skill..."
        onSearch={setSearch}
      />

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <img src={loadingSpinner} alt="loading" className="w-16 h-16" />
        </div>
      )}

      {/* Error */}
      {isError && (
        <p className="text-center text-red-500">Error fetching experts.</p>
      )}

      {/* Expert Cards */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {experts.map((expert: any) => (
            <ExpertDirectoryCard
              key={expert.id}
              name={`${expert.firstName} ${expert.lastName}`}
              role={expert.role}
              department={expert.department}
              date={new Date(expert.joinedAt).toLocaleDateString()}
              skills={expert.skills}
              image={expert.profilePicture}
              onViewProfile={() => {
                setSelectedProfile(expert);
                setProfileOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Profile Modal */}
      {selectedProfile && (
        <ProfileModal
          isOpen={profileOpen}
          onClose={() => setProfileOpen(false)}
          name={`${selectedProfile.firstName} ${selectedProfile.lastName}`}
          role={selectedProfile.role}
          department={selectedProfile.department}
          email={selectedProfile.email || "Not Provided"}
          phone={selectedProfile.phone || "Not Provided"}
          location={selectedProfile.location || "Not Provided"}
          joined={new Date(selectedProfile.joinedAt).toLocaleDateString()}
          skills={selectedProfile.skills || []}
          links={{
            linkedin: selectedProfile.linkedin,
            github: selectedProfile.github,
            portfolio: selectedProfile.portfolio,
          }}
        />
      )}
    </div>
  );
};

export default ExpertDirectory;
