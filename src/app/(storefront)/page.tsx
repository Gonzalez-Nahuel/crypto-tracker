import { MetricCardWrapper } from "@/components/metric-cards/metric-card-wrapper";
import { CryptoTable } from "@/components/top-100-list/crypto-table";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="mx-4 min-h-[200vh]">
      <MetricCardWrapper />
      <CryptoTable />
      <ScrollToTopButton />
    </main>
  );
}
