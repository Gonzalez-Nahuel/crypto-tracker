import { CryptoDetailsData } from "@/interfaces";
import { SearchModalItem } from "./search-modal-item";

type SearchModalListProps = {
  title: string;
  list: CryptoDetailsData[];
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchModalList = ({
  title,
  list,
  setIsSearchModalOpen,
}: SearchModalListProps) => {
  return (
    <div>
      <h2 className="text-gray-400 text-sm font-bold my-4 px-4">{title}</h2>
      <ul className="max-h-84.5 overflow-auto">
        {list.map((item) => (
          <SearchModalItem
            key={item.id}
            item={item}
            setIsSearchModalOpen={setIsSearchModalOpen}
          />
        ))}
      </ul>
    </div>
  );
};
