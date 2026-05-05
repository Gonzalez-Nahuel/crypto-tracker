import { CryptoNewsType } from "@/interfaces";
import Image from "next/image";

type ArticleProps = {
  article: CryptoNewsType;
};

export const Article = ({ article }: ArticleProps) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden border border-thin bg-card hover:bg-muted transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
    >
      {article.urlToImage && (
        <div className="w-full h-48 overflow-hidden">
          <Image
            src={article.urlToImage}
            alt={article.title}
            width={500}
            height={300}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="p-4 flex flex-col gap-3">
        <h3 className="font-bold text-lg leading-tight line-clamp-2">
          {article.title}
        </h3>

        {article.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {article.description}
          </p>
        )}

        <span className="text-xs text-primary font-medium">Leer más →</span>
      </div>
    </a>
  );
};
