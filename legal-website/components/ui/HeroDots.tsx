"use client";

interface HeroDotsProps {
  slides: any[];
  current: number;
  setCurrent: (i: number) => void;
}

export default function HeroDots({ slides, current, setCurrent }: HeroDotsProps) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
      {slides.map((_, index) => (
        <button
          key={index}
          className={`w-3 h-3 rounded-full transition-all ${
            current === index ? "bg-white scale-110" : "bg-gray-400"
          }`}
          onClick={() => setCurrent(index)}
        />
      ))}
    </div>
  );
}
