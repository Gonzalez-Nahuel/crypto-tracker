import { CryptoNewsType } from "@/interfaces";
import { Article } from "../top-100-crypto/article";

type CryptoNewsProps = {
  news: CryptoNewsType[];
};

export const CryptoNews = ({ news }: CryptoNewsProps) => {
  return (
    <div className="my-10">
      <h2 className="font-extrabold text-3xl mb-8">Crypto News</h2>
      <div className="flex flex-col gap-8">
        {news.map((article) => (
          <Article key={article.url} article={article} />
        ))}
      </div>
    </div>
  );
};
