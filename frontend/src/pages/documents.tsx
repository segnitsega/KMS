import Header from "@/components/reusable-header";
import DocumentPageCard from "@/cards/documents/document-page-card";
import UploadDocumentModal from "@/components/UploadDocumentModal";
import DocumentPreviewModal from "@/components/document-preview-modal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/utility/api";
import loadingSpinner from "../assets/loading-spinner.svg";

const getDocs = async (page: number, limit: number) => {
  const docs = await api.get(`/docs?page=${page}&limit=${limit}`);
  console.log(docs.data);
  return docs.data;
};

const Documents = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<null | any>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getDocs(page, limit),
    queryKey: ["docs"],
  });

  return (
    <div className="flex flex-col gap-6">
      {showUploadModal && (
        <UploadDocumentModal onClose={() => setShowUploadModal(false)} />
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

      {isLoading && (
        <div className="flex bg-white justify-center mt-10">
          <img src={loadingSpinner} width={50} alt="loading" />
        </div>
      )}

      {isError && (
        <div className="flex h-screen bg-white text-red-500 justify-center items-center">
          Error getting discussions please refresh the page !
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.documents.map((doc: any) => (
            <DocumentPageCard
              key={doc.id}
              title={doc.title}
              author={doc.firstName + " " + doc.lastName}
              date={doc.uploadedAt}
              numberOfDownloads={doc.downloads}
              categories={doc.category}
              description={doc.description}
              downloadUrl={doc.documentUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Documents;

{
  /**
            onView={() => setPreviewDoc({
                category: doc.category[0],
                downloads: doc.numberOfDownloads ? parseFloat(doc.numberOfDownloads) : 0,
              })}
            />
        {previewDoc && (
          <DocumentPreviewModal
            open={!!previewDoc}
            onClose={() => setPreviewDoc(null)}
            document={previewDoc}
          />
        )}
          **/
}
