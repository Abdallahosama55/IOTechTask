"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Phone, MapPin, Mail } from "lucide-react";
import Image from "next/image";
import { useGetTeamSectionQuery } from "@/lib/Services";

interface TeamMember {
  id: string;
  name: { en: string; ar: string };
  position: { en: string; ar: string };
  image: string;
  phone?: string;
  email?: string;
  location?: string;
}

interface TeamContent {
  header: { en: string; ar: string };
  description: { en: string; ar: string };
  members: TeamMember[];
}

interface TeamSectionProps {
  language?: "en" | "ar";
}

export function TeamSection({ language = "en" }: TeamSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isRTL = language === "ar";

  const { data: teamData, isLoading, error } = useGetTeamSectionQuery();

  const members = teamData?.members || [];
  const membersPerView = 3;
  const maxIndex = Math.max(0, members.length - membersPerView);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  const visibleMembers = useMemo(
    () => members.slice(currentIndex, currentIndex + membersPerView),
    [currentIndex, members]
  );

  // if (isLoading) return <p>Loading team...</p>
  // if (error) return <ErrorState />;
  // if (!teamData) return <p>No team data available</p>;

  // render after hooks
  if (!teamData) {
    return (
      <section className="text-center py-10">
        {" "}
        <div className="flex justify-center items-center h-0 "></div>
      </section>
    );
  }

  return (
    <section
      className="py-16 bg-stone-100"
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={teamData.header[language]}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-900 mb-4 font-serif">
            {teamData.header[language]}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {teamData.description[language]}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Arrows */}
          <button
            onClick={goToPrevious}
            className={`absolute top-1/2 -translate-y-1/2 ${
              isRTL ? "right-0 -mr-12" : "left-0 -ml-12"
            } 
              z-10 w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl 
              transition-all duration-200 flex items-center justify-center
              hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500`}
            aria-label={
              language === "en" ? "Previous team members" : "الأعضاء السابقون"
            }
          >
            <ChevronLeft className="w-5 h-5 text-amber-900" />
          </button>

          <button
            onClick={goToNext}
            className={`absolute top-1/2 -translate-y-1/2 ${
              isRTL ? "left-0 -ml-12" : "right-0 -mr-12"
            } 
              z-10 w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl 
              transition-all duration-200 flex items-center justify-center
              hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500`}
            aria-label={
              language === "en" ? "Next team members" : "الأعضاء التاليون"
            }
          >
            <ChevronRight className="w-5 h-5 text-amber-900" />
          </button>

          {/* Members */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleMembers.map((member: TeamMember, index: number) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-64 bg-amber-100">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name[language]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    priority={index === 0}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name[language]}
                  </h3>
                  <p className="text-amber-700 text-sm font-medium mb-4 uppercase tracking-wide">
                    {member.position[language]}
                  </p>
                  <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors duration-200"
                      >
                        <Phone className="w-4 h-4 text-amber-700" />
                      </a>
                    )}
                    {member.location && (
                      <div
                        className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center"
                        title={member.location}
                      >
                        <MapPin className="w-4 h-4 text-amber-700" />
                      </div>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors duration-200"
                      >
                        <Mail className="w-4 h-4 text-amber-700" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2 rtl:space-x-reverse">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-amber-700" : "bg-amber-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
