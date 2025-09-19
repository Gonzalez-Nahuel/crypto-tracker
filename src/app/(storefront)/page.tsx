import { MetricCardWrapper } from "@/components/metric-cards/metric-card-wrapper";
import { CryptoList } from "@/components/top-100-list/crypto-list";

export default function Home() {
  return (
    <main className="mx-4">
      <MetricCardWrapper />
      <CryptoList />
    </main>
  );
}
