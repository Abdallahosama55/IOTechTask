"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import {  useGetHeroSlidesQuery } from "@/lib/Services";
import ErrorState from "./ui/ErrorState";

type Language = "en" | "ar";

interface Slide {
  id: number;
  type: "image" | "video";
  title: Record<Language, string>;
  description: Record<Language, string>;
  videoUrl?: string | null;
  imageUrl?: string | null;
}

const translations: Record<Language, { readMore: string }> = {
  en: { readMore: "Read More" },
  ar: { readMore: "اقرأ المزيد" },
};

/* -------------------------------
   Carousel Dots Component
-------------------------------- */
interface CarouselDotsProps {
  slides: Slide[];
  currentIndex: number;
  onSelect: (index: number) => void;
  language: Language;
}
function CarouselDots({
  slides,
  currentIndex,
  onSelect,
  language,
}: CarouselDotsProps) {
  return (
    <div
      className={`absolute top-1/2 transform lg:-translate-y-1/2 flex flex-col space-y-3 ${
        language === "ar" ? "right-8" : "left-8"
      }`}
    >
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentIndex
              ? "bg-white scale-125"
              : "bg-white/40 hover:bg-white/60"
          }`}
        />
      ))}
    </div>
  );
}

/* -------------------------------
   Carousel Controls Component
-------------------------------- */
interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onToggleAutoPlay: () => void;
  isAutoPlaying: boolean;
  language: Language;
}
function CarouselControls({
  onPrev,
  onNext,
  onToggleAutoPlay,
  isAutoPlaying,
  language,
}: CarouselControlsProps) {
  return (
    <div
      className={`lg:absolute lg:bottom-20 md:flex hidden items-center space-x-4 ${
        language === "ar" ? "right-8" : "left-8"
      }`}
    >
      <button
        onClick={onPrev}
        className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={onToggleAutoPlay}
        className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
      >
        {isAutoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </button>
      <button
        onClick={onNext}
        className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}

/* -------------------------------
   Main HeroSection Component
-------------------------------- */
export function HeroSection({VisableContent=true}) {
 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [language, setLanguage] = useState<Language>("en");

const { data: slides = [], isLoading, error } = useGetHeroSlidesQuery()

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides]);

  // Detect document language
  useEffect(() => {
    const currentLang = document.documentElement.lang as Language;
    if (currentLang) setLanguage(currentLang);
  }, []);

  // Handlers
  const nextSlide = useCallback(
    () => setCurrentSlide((prev) => (prev + 1) % slides.length),
    [slides.length]
  );

  const prevSlide = useCallback(
    () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length),
    [slides.length]
  );

  const goToSlide = useCallback((index: number) => setCurrentSlide(index), []);
  const toggleAutoPlay = useCallback(() => setIsAutoPlaying((prev) => !prev), []);
if (isLoading)
  return (
    <section>
      <div className="flex justify-center items-center min-h-screen bg-brown-900">
        <div className="w-16 h-16 border-4 border-t-[#A0522D] border-b-[#A0522D] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
      </div>
    </section>
  );

if (error)
  return (
   
   <ErrorState/>

  );

  if (slides.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brown-900">
        <div className="w-16 h-16 border-4 border-t-[#A0522D] border-b-[#A0522D] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const current = slides[currentSlide];
  const t = translations[language];

  return (
    <section className="w-full relative min-h-screen hero-bg">
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 min-h-screen flex items-center">
     {VisableContent &&    <div className="max-w-7xl pt-18 mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div
              className={`text-white space-y-6 transition-all duration-700 ease-in-out ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight">
                {current.title[language]}
              </h1>
              <p className="text-lg text-white leading-relaxed max-w-lg">
                {current.description[language]}
              </p>
              <Button className="bg-white text-brown-900 hover:bg-brown-50 px-8 py-5 text-base font-medium">
                {t.readMore}
              </Button>
            </div>

            {/* Right Content */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-80 h-96 rounded-lg overflow-hidden shadow-2xl relative">
                {current.type === "video" ? (
                  <video
                    src={current.videoUrl ?? ""}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={current.imageUrl || "/images/hero-person.png"}
                    alt={current.title[language]}
                    className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Carousel Dots */}
          <CarouselDots
            slides={slides}
            currentIndex={currentSlide}
            onSelect={goToSlide}
            language={language}
          />

          {/* Navigation & Auto-play Controls */}
          <CarouselControls
            onPrev={prevSlide}
            onNext={nextSlide}
            onToggleAutoPlay={toggleAutoPlay}
            isAutoPlaying={isAutoPlaying}
            language={language}
          />
        </div>}
      </div>
    </section>
  );
}
