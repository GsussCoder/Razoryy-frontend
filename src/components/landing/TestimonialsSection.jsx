import { useState, useEffect, useMemo, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    barberName: "Dummy Barber",
    location: "Colombia - Sucre",
    comment:
      "Razoryy cambió por completo el caos de las citas de los sábados. El control de comisiones nos ahorra horas de excel.",
    rating: 5,
  },
];

const AUTOPLAY_DELAY = 5000;

function chunkWithIndex(items, size) {
  const pages = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(
      items
        .slice(i, i + size)
        .map((item, offset) => ({ item, originalIndex: i + offset })),
    );
  }
  return pages;
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(3);
      } else if (window.innerWidth >= 768) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pages = useMemo(
    () => chunkWithIndex(TESTIMONIALS, cardsToShow),
    [cardsToShow],
  );
  const maxIndex = Math.max(0, pages.length - 1);

  useEffect(() => {
    setCurrentIndex(0);
  }, [cardsToShow]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1,
    );
  };

  useEffect(() => {
    if (maxIndex === 0 || isPaused) return undefined;
    autoplayRef.current = setTimeout(nextSlide, AUTOPLAY_DELAY);
    return () => clearTimeout(autoplayRef.current);
  }, [currentIndex, maxIndex, isPaused]);

  return (
    <section className="py-20 px-6 sm:px-8 lg:px-12 xl:px-20 bg-slate-800/50 border-t border-slate-700/60 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Lo que dicen quienes ya usan Razoryy
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Descubre cómo ayudamos a barberos y administradores a optimizar sus
            locales.
          </p>
        </div>

        <div
          className="relative flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {maxIndex > 0 && (
            <button
              onClick={prevSlide}
              className="hidden md:block absolute -left-2 lg:-left-6 z-20 p-3 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white transition-all focus:outline-none shadow-xl backdrop-blur-sm"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div className="w-full px-0 md:px-2">
            <div className="overflow-x-auto md:overflow-hidden snap-x snap-mandatory scrollbar-none">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform:
                    cardsToShow > 1
                      ? `translateX(-${currentIndex * 100}%)`
                      : "none",
                }}
              >
                {pages.map((page, pageIdx) => (
                  <div
                    key={pageIdx}
                    className={`flex gap-6 w-full shrink-0 snap-center ${page.length < cardsToShow ? "justify-center" : ""}`}
                  >
                    {page.map(({ item: testi, originalIndex: idx }) => {
                      const emptyStars = Math.max(0, 5 - testi.rating);
                      const firstLetter = testi.barberName
                        .charAt(0)
                        .toUpperCase();
                      return (
                        <div
                          key={idx}
                          className="w-[calc(100%-16px)] mx-2 md:mx-0 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 bg-slate-800/80 p-6 rounded-xl border border-slate-700 flex flex-col justify-between min-h-65 hover:border-slate-600 transition-colors"
                        >
                          <div>
                            <div className="flex gap-1 mb-4">
                              {[...Array(testi.rating)].map((_, i) => (
                                <Star
                                  key={`f-${idx}-${i}`}
                                  className="w-4 h-4 fill-indigo-400 text-indigo-400"
                                />
                              ))}
                              {[...Array(emptyStars)].map((_, i) => (
                                <Star
                                  key={`e-${idx}-${i}`}
                                  className="w-4 h-4 text-slate-600"
                                />
                              ))}
                            </div>
                            <p className="text-slate-300 italic text-sm lg:text-base mb-6">
                              {testi.comment}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 border-t border-slate-700/50 pt-4">
                            <div className="w-10 h-10 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-full flex items-center justify-center font-bold text-base shrink-0">
                              {firstLetter}
                            </div>
                            <div>
                              <h4 className="text-white font-semibold text-base leading-tight">
                                {testi.barberName}
                              </h4>
                              <p className="text-indigo-400 text-xs mt-0.5">
                                {testi.location}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {maxIndex > 0 && (
            <button
              onClick={nextSlide}
              className="hidden md:block absolute -right-2 lg:-right-6 z-20 p-3 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white transition-all focus:outline-none shadow-xl backdrop-blur-sm"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-6 bg-indigo-500" : "w-2 bg-slate-700"} cursor-pointer`}
                aria-label={`Ir a la página ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
