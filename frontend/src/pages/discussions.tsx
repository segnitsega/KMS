import { useState } from "react";
import Header from "@/components/reusable-header";
import DiscussionPost from "@/components/DiscussionPost";
import NewDiscussionModal from "@/components/NewDiscussionModal";
import api from "@/utility/api";
import { useQuery } from "@tanstack/react-query";
import loadingSpinner from "../assets/loading-spinner.svg";

const getDiscussionData = async () => {
  const response = await api.get("/discussions?limit=5");
  return response.data.discussions;
};

const Discussions = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getDiscussionData,
    queryKey: ["discussions"],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading)
    return (
      <div className="flex h-screen bg-white justify-center items-center">
        <img src={loadingSpinner} width={50} alt="loading" />
      </div>
    );

  if (isError)
    return (
      <div className="flex h-screen bg-white text-red-500 justify-center items-center">
        Error getting discussions please refresh the page !
      </div>
    );

  if (data)
    return (
      <div>
        <Header
          title="Discussions"
          subtitle="Collaborate and share ideas with your team"
          buttonText="New Discussions"
          dropDownText="All Categories"
          dropDownOptions={[
            "All Categories",
            "General",
            "Technical",
            "HR",
            "Training",
            "Announcements",
          ]}
          searchPlaceholder="Search document..."
          onButtonClick={openModal}
        />
        {data.map((discussion) => (
          <div key={discussion.id} className="mt-6">
            <DiscussionPost
            discussionId={discussion.id}
              title={discussion.title}
              description={discussion.description}
              author={discussion.authorName}
              categories={discussion.category}
              replies={discussion.replies}
              likes={discussion.likes}
              timestamp={discussion.uploadedAt}
            />
          </div>
        ))}

        {isModalOpen && <NewDiscussionModal onClose={closeModal} />}
      </div>
    );
};

export default Discussions;
