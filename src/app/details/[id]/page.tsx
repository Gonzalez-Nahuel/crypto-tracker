import { CryptoDetails } from "@/components/top-100-list/crypto-details";

type DetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function Details({ params }: DetailsProps) {
  const { id } = await params;

  console.log(id);

  return <CryptoDetails id={id} />;
}
