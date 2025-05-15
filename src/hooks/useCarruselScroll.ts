import { RefObject, useEffect, useState } from "react";
//Complete control on a Horizontal carousel

export function useCarouselScroll<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollLeft = () => {
    ref.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    ref.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    const slider = ref.current;
    if (!slider) return;

    const handleScroll = () => {
      setCanScrollLeft(slider.scrollLeft > 0);
      setCanScrollRight(
        slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 1
      );
    };

    slider.addEventListener("scroll", handleScroll);
    handleScroll(); // inicial

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return { scrollLeft, scrollRight, canScrollLeft, canScrollRight };
}
