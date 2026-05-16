import { HiArrowTrendingUp } from "react-icons/hi2";

interface Article {
  title: string;
  author: string;
  // views: number;
}

interface FeaturedArticlesProps {
  articles: Article[];
}

const FeaturedArticles = ({ articles }: FeaturedArticlesProps) => {
  return (
    <div className="rounded-md border bg-blue-50 p-4 sm:p-6">
      <div className="mb-3 flex items-center text-base font-semibold sm:mb-4 sm:text-lg">
        <HiArrowTrendingUp className="mr-2 shrink-0 text-blue-500" size={24} />
        Featured Articles
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {articles.map((article, index) => (
          <div
            key={index}
            className="flex min-w-0 flex-col gap-2 rounded-md border bg-white p-4 shadow"
          >
            <h3 className="truncate text-base font-semibold">{article.title}</h3>
            <p className="truncate text-sm text-gray-500">by {article.author}</p>
            <div className="flex items-center text-gray-500 text-sm mt-auto">
              {/* <AiOutlineEye className="mr-1" /> */}
              {/* {article.views} views */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArticles;
