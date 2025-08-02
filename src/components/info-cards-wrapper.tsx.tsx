import { InfoCard } from "./cards/info-card";

export const InfoCardsWrapper = () => {
  return (
    <section className="flex gap-2 w-max mx-auto my-4">
      <InfoCard />
      <InfoCard />
      <InfoCard />
      <InfoCard />
    </section>
  );
};
