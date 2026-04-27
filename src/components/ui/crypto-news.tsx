import Image from "next/image";

export const CryptoNews = () => {
  return (
    <div className="flex flex-col gap-10">
      <h2>Crypto News</h2>
      <Image
        src={
          "https://gizmodo.com/app/uploads/2026/04/g-love-crypto-theft-1200x675.jpg"
        }
        alt={"asdadasda"}
        width={500}
        height={400}
        unoptimized
      />
      <h3>Otro Titulo</h3>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nisi
        aspernatur, maiores totam, nostrum distinctio non quidem laudantium
        natus accusantium rem quaerat ratione quos nobis expedita. Dignissimos,
        mollitia quo? In.
      </p>
    </div>
  );
};
