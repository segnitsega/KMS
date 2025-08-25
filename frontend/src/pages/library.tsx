import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import Header from "../components/reusable-header";
import AddBookModal from "../components/AddBookModal";
import { FiDownload, FiEye, FiBookOpen } from "react-icons/fi";
import api from "../utility/api"
import { useQuery } from "@tanstack/react-query";
import loadingSpinner from "@/assets/loading-spinner.svg";

const getBooksData = async () => {
  const response = await api.get("/library");
  return response.data.data;
};

const Library = () => {
  const [search, setSearch] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const TABS = [
    { label: "All Books", value: "all" },
    { label: "My Library", value: "my-library" },
  ];

  const [activeTab, setActiveTab] = useState(TABS[0].value);

  const {
    data: books = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: getBooksData,
    queryKey: ["books"],
  });

  const filteredBooks = books.filter((book: any) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || activeTab === book.category;
    return matchesSearch && matchesTab;
  });

  const handleUpload = async (
    file: File,
    description: string,
    metadata: any
  ) => {
    try {
      const formData = new FormData();
      formData.append("book", file);
      formData.append("title", metadata.title);
      formData.append("author", metadata.author);
      formData.append("genre", metadata.genre);
      formData.append("description", description);

      await api.post("/library/upload-book", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowUploadModal(false);
      refetch();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Library"
        subtitle="Browse and download training resources."
        buttonText="Add Book"
        dropDownText="All Books"
        dropDownOptions={TABS.map((tab) => tab.label)}
        searchPlaceholder="Search books..."
        onButtonClick={() => setShowUploadModal(true)}
      />

      {showUploadModal && (
        <AddBookModal onClose={() => setShowUploadModal(false)} />
      )}

      {isLoading && (
        <div className="flex justify-center mt-10">
          <img src={loadingSpinner} width={50} alt="loading" />
        </div>
      )}

      {isError && (
        <div className="flex h-screen text-red-500 justify-center items-center">
          Error getting books, please refresh the page!
        </div>
      )}

      <div className="flex items-center gap-3 my-4 flex-wrap">
        {TABS.map((tab) => (
          <Button
            key={tab.value}
            variant={activeTab === tab.value ? "default" : "outline"}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition",
              activeTab === tab.value
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            )}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!isLoading && !isError && filteredBooks.length > 0
          ? filteredBooks.map((book: any) => (
              <div
                key={book.id}
                className="rounded-2xl shadow-lg overflow-hidden flex flex-col bg-gradient-to-br from-white to-gray-50"
              >
                <div className="p-6 pb-4 flex-1 flex flex-col justify-between relative">
                  <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-purple-400 text-white">
                    {book.genre || "Book"}
                  </span>
                  <div className="flex-1 flex flex-col justify-center items-center py-6">
                    <FiBookOpen size={40} className="text-purple-600" />
                  </div>
                </div>
                <div className="bg-white p-6 pt-4 flex flex-col gap-2">
                  <h2 className="font-semibold text-lg text-gray-800 mb-1">
                    {book.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-2">
                    {book.description}
                  </p>
                  <div className="flex items-center text-gray-400 text-xs gap-4 mb-4">
                    <span>By {book.author}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                      onClick={() => window.open(book.bookUrl, "_blank")}
                    >
                      <FiDownload className="inline mr-1" /> Download
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-0 rounded-md"
                      onClick={() => console.log("Preview", book.id)}
                    >
                      <FiEye />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          : !isLoading &&
            !isError && (
              <p className="text-gray-500 text-sm col-span-full text-center">
                No books found.
              </p>
            )}
      </div>
    </div>
  );
};

export default Library;
