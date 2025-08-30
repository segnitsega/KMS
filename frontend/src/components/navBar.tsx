import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import api from "../utility/api";
import EditProfile from "./editProfile";
import { useAuthStore } from "@/stores/auth-store";

interface navBarProps {
  userName: string;
  department: string;
  role: string;
}

interface SearchResult {
  id: string;
  title?: string;
  name?: string;
  type: string;
}

const NavBar = ({ userName, department, role }: navBarProps) => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    useAuthStore.getState().setIsAuthenticated(false);
    navigate("/login");
  };

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      performSearch(debouncedSearchQuery);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);

  const performSearch = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const [
        articlesResponse,
        documentsResponse,
        discussionsResponse,
        usersResponse,
      ] = await Promise.allSettled([
        api.get(`/articles/search?q=${encodeURIComponent(query)}`),
        api.get(`/docs/search?q=${encodeURIComponent(query)}`),
        api.get(`/discussions/search?q=${encodeURIComponent(query)}`),
        api.get(`/user/search?q=${encodeURIComponent(query)}`),
      ]);

      const results: SearchResult[] = [];

      if (articlesResponse.status === "fulfilled") {
        articlesResponse.value.data.articles?.forEach((article: any) => {
          results.push({
            id: article.id,
            title: article.title,
            type: "article",
          });
        });
      }

      if (documentsResponse.status === "fulfilled") {
        documentsResponse.value.data.documents?.forEach((document: any) => {
          results.push({
            id: document.id,
            title: document.title,
            type: "document",
          });
        });
      }

      if (discussionsResponse.status === "fulfilled") {
        discussionsResponse.value.data.discussions?.forEach(
          (discussion: any) => {
            results.push({
              id: discussion.id,
              title: discussion.title,
              type: "discussion",
            });
          }
        );
      }

      if (usersResponse.status === "fulfilled") {
        usersResponse.value.data.users?.forEach((user: any) => {
          results.push({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            type: "user",
          });
        });
      }

      setSearchResults(results);
      if (searchFocused && results.length > 0) {
        setShowResults(true);
      }
    } catch (err) {
      setError("Error fetching search results");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
    setTimeout(() => setShowResults(false), 200);
  };

  const handleResultClick = (result: SearchResult) => {
    const recentSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    const newRecentSearches = [
      {
        id: result.id,
        type: result.type,
        title: result.title || result.name,
        timestamp: new Date().toISOString(),
      },
      ...recentSearches.filter((item: any) => item.id !== result.id),
    ].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
    let path = "";
    switch (result.type) {
      case "article":
        path = `/articles/${result.id}`;
        break;
      case "document":
        path = `/documents/${result.id}`;
        break;
      case "discussion":
        path = `/discussions/${result.id}`;
        break;
      case "user":
        path = `/profile/${result.id}`;
        break;
      default:
        console.log("Unknown result type:", result.type);
        return;
    }
    navigate(path, { state: { highlightId: result.id } });
    setShowResults(false);
    setSearchQuery("");
  };

  const getRecentSearches = () => {
    try {
      return JSON.parse(localStorage.getItem("recentSearches") || "[]");
    } catch {
      return [];
    }
  };

  const clearRecentSearches = () => {
    localStorage.removeItem("recentSearches");
    setShowResults(false);
  };

  return (
    <div className="border py-2 px-10 w-full flex items-center gap-20 shadow text-sm relative">
      {profileEdit && (
        <div className="fixed inset-0 flex justify-center bg-black/30 backdrop-blur-sm z-10">
          <EditProfile setProfileEdit={setProfileEdit} />
        </div>
      )}
      <h1 className="flex items-center gap-2 w-[50%]">
        <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-2 px-3 rounded-md ">
          K-Hub
        </span>
        <span className="font-bold text-lg">Knowledge Hub</span>
      </h1>

      {/* Search Section */}
      <div className="relative w-[100%]">
        <div
          ref={inputRef}
          className={`flex items-center border rounded-md p-2 ${
            searchFocused ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <CiSearch className="text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search knowledge base, documents, people..."
            className="ml-2 outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          {loading && (
            <div className="ml-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        {showResults && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">
                        {result.title || result.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {result.type}
                      </p>
                    </div>
                    <CiSearch className="text-gray-400" />
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="p-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-xs font-medium text-gray-500">
                    RECENT SEARCHES
                  </p>
                </div>
                {getRecentSearches().length > 0 ? (
                  getRecentSearches().map((recent: any, index: number) => (
                    <div
                      key={`recent-${index}`}
                      className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        const fakeResult: SearchResult = {
                          id: recent.id,
                          type: recent.type,
                          title: recent.title,
                          name: recent.title,
                        };
                        handleResultClick(fakeResult);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{recent.title}</p>
                          <p className="text-xs text-gray-500 capitalize">
                            {recent.type}
                          </p>
                        </div>
                        <CiSearch className="text-gray-400" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-gray-500 text-sm">
                    No recent searches
                  </div>
                )}
                {getRecentSearches().length > 0 && (
                  <div className="p-3 border-t border-gray-100">
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Clear recent searches
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {error && (
          <div className="absolute top-full left-0 right-0 bg-red-100 border border-red-300 rounded-md p-2 mt-1 text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* User Section */}
      <div className="flex gap-3 items-center w-[400px] relative">
        <IoIosNotificationsOutline className="text-gray-500 text-xl" />
        <div>
          <h1>{userName}</h1>
          <span className="bg-sky-500 text-white mr-1 py-0.2 px-2 rounded-lg">
            {role}
          </span>
          <span className="text-gray-500">{department}</span>
        </div>
        <div className="relative">
          <div ref={dropdownRef} className="inline-block relative">
            <BsPerson
              className="text-lg shadow-lg rounded-md text-green-700 hover:bg-gray-100 transition duration-200 cursor-pointer"
              onClick={() => setShowDropdown((open) => !open)}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg py-2 px-4 w-40 flex flex-col gap-2 z-10">
                <button
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 py-2 px-2 rounded transition cursor-pointer"
                  onClick={() => {
                    setProfileEdit(true);
                    setShowDropdown(false);
                  }}
                >
                  <BsPerson className="text-lg cursor-pointer" />
                  Profile
                </button>
                <button
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600 py-2 px-2 rounded transition cursor-pointer"
                  onClick={() => handleLogout()}
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
