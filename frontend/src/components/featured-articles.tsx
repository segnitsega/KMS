import { AiOutlineArrowUp, AiOutlineEye } from "react-icons/ai";

interface Article {
  title: string;
  author: string;
  views: number;
}

interface FeaturedArticlesProps {
  heading?: string;
  articles: Article[];
}

const FeaturedArticles = ({
  heading = "Featured Articles",
  articles,
}: FeaturedArticlesProps) => {
  return (
    <div className="bg-blue-100 p-6 rounded-md">
      <div className="flex items-center mb-4 text-blue-600 font-semibold text-lg">
        <AiOutlineArrowUp className="mr-2" />
        {heading}
      </div>
      <div className="flex gap-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-md p-4 shadow-md flex flex-col gap-2 w-64"
          >
            <h3 className="font-semibold text-base">{article.title}</h3>
            <p className="text-gray-700 text-sm">by {article.author}</p>
            <div className="flex items-center text-gray-500 text-sm mt-auto">
              <AiOutlineEye className="mr-1" />
              {article.views} views
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArticles;
