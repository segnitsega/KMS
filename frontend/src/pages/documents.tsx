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
    <div className="flex w-full min-w-0 flex-col gap-4 sm:gap-6">
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
        <div className="flex justify-center py-10 sm:py-16">
          <img src={loadingSpinner} width={50} alt="loading" />
        </div>
      )}
      {isError && (
        <div className="flex min-h-[12rem] items-center justify-center rounded-md bg-white px-4 py-8 text-center text-sm text-red-500 sm:text-base">
          Error getting documents. Please refresh the page.
        </div>
      )}
      {data && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
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
        <div className="flex items-center justify-center px-2 sm:px-0">
          <Button
            className="mt-2 w-full bg-blue-500 sm:mt-3 sm:w-[150px]"
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
