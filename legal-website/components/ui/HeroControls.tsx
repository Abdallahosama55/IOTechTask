"use client";

import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroControlsProps {
  nextSlide: () => void;
  prevSlide: () => void;
  playing: boolean;
  setPlaying: (p: boolean) => void;
}

export default function HeroControls({
  nextSlide,
  prevSlide,
  playing,
  setPlaying,
}: HeroControlsProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-between px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="bg-black/40 hover:bg-black/60 text-white"
      >
        <ChevronLeft />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setPlaying(!playing)}
        className="bg-black/40 hover:bg-black/60 text-white"
      >
        {playing ? <Pause /> : <Play />}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="bg-black/40 hover:bg-black/60 text-white"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
