import { CryptoDetails } from "@/components/top-100-crypto/crypto-details";
import { URL_APIS } from "@/constants";
import { apiRequest } from "@/lib/api-request";

type DetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function Details({ params }: DetailsProps) {
  const { id } = await params;

  let news = [];

  const page = Math.floor(Math.random() * 5 + 1);

  const baseUrl = URL_APIS.cryptoNews;
  const endpoint = `v2/everything?q=bitcoin AND crypto&pageSize=10&page=${page}&apiKey=${process.env.NEWS_API_KEY}`;

  const cryptoNewsResponse = await apiRequest({ baseUrl, endpoint });

  if (cryptoNewsResponse.ok) news = cryptoNewsResponse.data.articles;

  return <CryptoDetails id={id} news={news} />;
}
