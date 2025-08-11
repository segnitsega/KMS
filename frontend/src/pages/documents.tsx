import Header from "@/components/reusable-header";
import DocumentPageCard from "@/cards/documents/document-page-card";
import UploadDocumentModal from "@/components/UploadDocumentModal";
import { useState } from "react";

const Documents = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const documents = [
    {
      title: "Employee Onboarding Guide",
      author: "Sarah Johnson",
      date: "2024-01-15",
      numberOfDownloads: "45",
      categories: ["onboarding", "HR", "guide"],
    },
    {
      title: "Employee Onboarding Guide",
      author: "Sarah Johnson",
      date: "2024-01-15",
      numberOfDownloads: "45",
      categories: ["onboarding", "HR", "guide"],
    },
    {
      title: "Employee Onboarding Guide",
      author: "Sarah Johnson",
      date: "2024-01-15",
      numberOfDownloads: "45",
      categories: ["onboarding", "HR", "guide"],
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      {showUploadModal && (
        <UploadDocumentModal
          onClose={() => setShowUploadModal(false)}
          onUpload={() => setShowUploadModal(false)}
        />
      )}
      <Header
        title="Documents"
        subtitle="Manage and share organizational documents"
        buttonText="Upload Document"
        dropDownText="All Catagories"
        dropDownOptions={["All Catagories", "Engineering", "Marketing"]}
        searchPlaceholder="Search document..."
        onButtonClick={() => setShowUploadModal(true)}
      />

      <div className="flex gap-6">
        {documents.map((doc, index) => (
          <DocumentPageCard
            key={index}
            title={doc.title}
            author={doc.author}
            date={doc.date}
            numberOfDownloads={parseFloat(doc.numberOfDownloads)}
            categories={doc.categories}
          />
        ))}
      </div>
    </div>
  );
};

export default Documents;
