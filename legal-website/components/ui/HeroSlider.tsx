"use client";

interface HeroSliderProps {
  slides: any[];
  current: number;
}

export default function HeroSlider({ slides, current }: HeroSliderProps) {
  if (!slides || slides.length === 0) return (
    <div className="flex justify-center items-center h-[100vh] bg-[#4B2615]">
        <div className="w-12 h-12 border-4 border-t-[#A0522D] border-b-[#A0522D] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
      </div>
  );

  return (
    <div className="w-full h-full relative">
      {slides.map((slide, index) => {
        const isActive = index === current;
        const imageUrl = slide?.attributes?.image?.data?.attributes?.url || "";
        const title = slide?.attributes?.title || "";

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={`http://localhost:1337${imageUrl}`}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-3xl font-bold">
              {title}
            </div>
          </div>
        );
      })}
    </div>
  );
}
