import { MetricCardWrapper } from "@/components/metric-cards/metric-card-wrapper";
import { CryptoTable } from "@/components/top-100-list/crypto-table";
import { GetUserWatchList } from "@/lib/bd/get-user-watchlist";

export const dynamic = "force-dynamic";

export default async function Home() {
  const userFavList = await GetUserWatchList();

  return (
    <main className="mx-4">
      <MetricCardWrapper />
      <CryptoTable favList={userFavList} />
    </main>
  );
}
