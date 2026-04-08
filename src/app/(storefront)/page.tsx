import { MetricCardWrapper } from "@/components/metric-cards/metric-card-wrapper";
import { CryptoTable } from "@/components/top-100-list/crypto-table";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="mx-4">
      <MetricCardWrapper />
      <CryptoTable />
    </main>
  );
}
