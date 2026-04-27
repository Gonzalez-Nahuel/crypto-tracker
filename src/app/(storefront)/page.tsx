import { MetricCardWrapper } from "@/components/metric-cards/metric-card-wrapper";
import { CryptoTable } from "@/components/top-100-crypto/crypto-table";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="mx-4 h-full overflow-hidden">
      <MetricCardWrapper />
      <CryptoTable />
      <ScrollToTopButton />
    </div>
  );
}
