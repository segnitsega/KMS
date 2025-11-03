import Header from "@/components/reusable-header";
import DocumentPageCard from "@/cards/documents/document-page-card";
import UploadDocumentModal from "@/components/UploadDocumentModal";
import DocumentPreviewModal from "@/components/document-preview-modal";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/utility/api";
import loadingSpinner from "../assets/loading-spinner.svg";
import { useLocation } from "react-router-dom";
import { formatDateDDMMYY } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const getDocs = async (page: number, limit: number) => {
  const docs = await api.get(`/docs?page=${page}&limit=${limit}`);
  console.log(docs.data);
  return docs.data;
};

const Documents = () => {
  // const queryClient = useQueryClient();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<null | any>(null);
  // const [page, setPage] = useState(1);
  const page = 1
  const [limit, setLimit] = useState(6);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryFn: () => getDocs(page, limit),
    queryKey: ["docs", page, limit],
    placeholderData: (prev: any) => prev,
  });

  const location = useLocation();
  useEffect(() => {
    if (location.state?.highlightId && data?.documents) {
      const doc = data.documents.find(
        (d: any) => d.id === location.state.highlightId
      );
      if (doc) {
        setPreviewDoc({
          title: doc.title,
          author: doc.author,
          date: doc.uploadedAt,
          category: doc.category,
          description: doc.description,
          downloads: doc.downloads,
          downloadUrl: doc.documentUrl,
        });
      }
    }
  }, [location.state, data]);

  return (
    <div className="flex flex-col gap-">
      {showUploadModal && (
        <UploadDocumentModal onClose={() => setShowUploadModal(false)} />
      )}
      <Header
        title="Documents"
        subtitle="Manage and share organizational documents"
        buttonText="Upload Document"
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
              docId={doc.id}
              title={doc.title}
              author={doc.author}
              date={formatDateDDMMYY(doc.uploadedAt)}
              numberOfDownloads={doc.downloads}
              categories={doc.category}
              description={doc.description}
              downloadUrl={doc.documentUrl}
              onView={() =>
                setPreviewDoc({
                  title: doc.title,
                  author: doc.author,
                  date: doc.uploadedAt,
                  category: doc.category,
                  description: doc.description,
                  downloads: doc.downloads,
                  downloadUrl: doc.documentUrl,
                })
              }
            />
          ))}
        </div>
      )}
      {data && (
        <div className="flex items-center justify-center">
          <Button
            className="bg-blue-500 w-[150px] mt-3"
            onClick={() => {
              setLimit((prev: any) => prev + 10);
              // queryClient.invalidateQueries({ queryKey: ["docs"] });
            }}
          >
            {isFetching ? "Loading.." : "Show More"}
          </Button>
        </div>
      )}
      {previewDoc && (
        <DocumentPreviewModal
          open={!!previewDoc}
          onClose={() => setPreviewDoc(null)}
          document={previewDoc}
        />
      )}
    </div>
  );
};

export default Documents;
