"use client";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeVisible = window.scrollY > 200;

      setVisible((prev) => {
        if (prev === shouldBeVisible) return prev;
        return shouldBeVisible;
      });
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="w-9 h-9  bg-amber-300 fixed bottom-6 right-8 text-white cursor-pointer rounded-full border-2 border-foreground z-10"
    >
      <ArrowUp size={25} className="mx-auto text-foreground" />
    </button>
  );
};
