import { AiOutlineEye } from "react-icons/ai";
import { HiArrowTrendingUp } from "react-icons/hi2";


interface Article {
  title: string;
  author: string;
  views: number;
}

interface FeaturedArticlesProps {
  articles: Article[];
}

const FeaturedArticles = ({
  articles,
}: FeaturedArticlesProps) => {
  return (
    <div className=" bg-blue-50 p-6 rounded-md border">
      <div className="flex items-center mb-4 font-semibold text-lg">
        <HiArrowTrendingUp className="mr-2 text-blue-500 " size={30}/>
        Featured Articles
      </div>
      <div className="flex gap-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="border bg-white rounded-md p-4 shadow flex-1 flex flex-col gap-2 "
          >
            <h3 className="font-semibold text-base">{article.title}</h3>
            <p className="text-gray-500 text-sm">by {article.author}</p>
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
