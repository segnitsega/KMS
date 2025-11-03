import { useState } from "react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import Header from "../components/reusable-header";
import AddBookModal from "../components/AddBookModal";
import { FiDownload, FiBookOpen, FiHeart } from "react-icons/fi";
import api from "../utility/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import loadingSpinner from "@/assets/loading-spinner.svg";
import { useAuthStore } from "@/stores/auth-store";
import { useDebounce } from "../hooks/useDebounce";

const highlightSearch = (text: string, searchTerm: string): React.ReactNode => {
  if (!searchTerm.trim()) {
    return text;
  }

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-blue-100 text-blue-800 rounded px-1">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const getBooksData = async ({ queryKey }: { queryKey: [string, string?] }) => {
  const [, searchTerm] = queryKey;
  const params = searchTerm ? { params: { search: searchTerm } } : {};
  const response = await api.get("/library", params);
  return response.data.data;
};

const getUserLibrary = async (userId: string) => {
  const response = await api.get(`/library/user/${userId}`);
  return response.data.userBooks;
};

const handleDownload = (bookId: string) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const downloadEndpoint = `${url}/library/download/${bookId}`;
  window.location.href = downloadEndpoint;
};

const Library = () => {
  const [search, setSearch] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const { userData } = useAuthStore();
  const userId = userData?.id;

  const TABS = [
    { label: "All Books", value: "all" },
    { label: "My Library", value: "my-library" },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].value);

  const debouncedSearch = useDebounce(search, 500);

  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery({
    queryFn: getBooksData,
    queryKey: ["books", debouncedSearch],
  });

  const { data: userLibrary = [], refetch: refetchLibrary } = useQuery({
    queryFn: () => getUserLibrary(userId!),
    queryKey: ["userLibrary", userId],
    enabled: !!userId,
  });

  const addMutation = useMutation({
    mutationFn: (bookId: string) =>
      api.post(`/library/user/${userId}`, { bookId }),
    onSuccess: () => refetchLibrary(),
  });

  const removeMutation = useMutation({
    mutationFn: (bookId: string) =>
      api.delete(`/library/user/${userId}`, { data: { bookId } }),
    onSuccess: () => refetchLibrary(),
  });

  const isInLibrary = (bookId: string) => {
    return userLibrary?.some((b: any) => b.bookId === bookId);
  };

  const toggleLibrary = (bookId: string) => {
    if (!userId) {
      alert("Please log in to save books to your library.");
      return;
    }
    if (isInLibrary(bookId)) {
      removeMutation.mutate(bookId);
    } else {
      addMutation.mutate(bookId);
    }
  };

  const filteredBooks = books.filter((book: any) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "my-library" && isInLibrary(book.id));
    return matchesTab;
  });

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">
          Please log in to view and manage your library.
        </p>
      </div>
    );
  }

  const displayedBooks = showAll ? filteredBooks : filteredBooks.slice(0, 6);

  return (
    <div className="flex flex-col">
      <Header
        title="Library"
        subtitle="Browse and download training resources."
        buttonText="Add Book"
        dropDownText="All Books"
        dropDownOptions={["All Books"]}
        // dropDownOptions={TABS.map((tab) => tab.label)}
        searchPlaceholder="Search books..."
        onButtonClick={() => setShowUploadModal(true)}
        onSearch={setSearch} // Added onSearch prop
      />
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
      {isLoading && (
        <div className="flex flex-col items-center mt-10">
          <img src={loadingSpinner} width={50} alt="loading" />
        </div>
      )}

      {showUploadModal && (
        <AddBookModal onClose={() => setShowUploadModal(false)} />
      )}

      {isError && (
        <div className="flex h-screen text-red-500 justify-center items-center">
          Error getting books, please refresh the page!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!isLoading && !isError && displayedBooks.length > 0
          ? displayedBooks.map((book: any) => (
              <div
                key={book.id}
                className="rounded-2xl shadow-lg overflow-hidden flex flex-col bg-gradient-to-br from-white to-gray-50 relative"
              >
                <button
                  onClick={() => toggleLibrary(book.id)}
                  className="absolute top-4 right-4 text-xl"
                >
                  <FiHeart
                    className={cn(
                      "transition-colors",
                      isInLibrary(book.id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400 hover:text-red-400"
                    )}
                  />
                </button>

                <div className="p-6 pb-4 flex-1 flex flex-col justify-between">
                  <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-purple-400 text-white">
                    {book.genre || "Book"}
                  </span>
                  <div className="flex-1 flex flex-col justify-center items-center py-6">
                    <FiBookOpen size={40} className="text-purple-600" />
                  </div>
                </div>

                <div className="bg-white p-6 pt-4 flex flex-col gap-2">
                  <h2 className="font-semibold text-lg text-gray-800 mb-1">
                    {highlightSearch(book.title, search)}
                  </h2>
                  <p className="text-gray-500 text-sm mb-2">
                    {highlightSearch(book.description, search)}
                  </p>
                  <div className="flex items-center text-gray-400 text-xs gap-4 mb-4">
                    <span>By {book.author}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                      onClick={() => handleDownload(book.id)}
                    >
                      <FiDownload className="inline mr-1" /> Download
                    </Button>
                    {/* <Button
                      variant="outline"
                      className="flex-0 rounded-md"
                      onClick={() => console.log("Preview", book.id)}
                    >
                      <FiEye />
                    </Button> */}
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

      {filteredBooks.length > 6 && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={() => setShowAll((prev) => !prev)}
            variant="outline"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full"
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Library;
