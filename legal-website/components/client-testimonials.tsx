"use client"

import { useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useGetTestimonialSectionQuery } from "@/lib/Services"

interface Testimonial {
  id: string
  name: { en: string; ar: string }
  position: { en: string; ar: string }
  company: { en: string; ar: string }
  testimonial: { en: string; ar: string }
  image: string
  rating: number
}

interface ClientTestimonialsSectionProps {
  language?: "en" | "ar"
}

export function ClientTestimonialsSection({ language = "en" }: ClientTestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const isRTL = language === "ar"

  const { data:data, isLoading, error } = useGetTestimonialSectionQuery()

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : data?.testimonials?.length - 1))
  }, [data?.testimonials?.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < data?.testimonials?.length - 1 ? prev + 1 : 0))
  }, [data?.testimonials?.length])

  if (!data) {
    // Loader while fetching
    return (
      <div className="flex justify-center items-center h-[0vh] bg-[#4B2615]">
     
      </div>
    )
  }

  const currentTestimonial = data?.testimonials?.[currentIndex]

  if (isLoading) return <p>Loading testimonials...</p>
  if (error) return <p>Error loading testimonials</p>
  if (!data.testimonials || data.testimonials.length === 0) return <p>No testimonials available</p>
  return (
    <section className="py-16 bg-[#4B2615]" dir={isRTL ? "rtl" : "ltr"} aria-label={data.content[language].title}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-6 font-serif">{data.content[language].title}</h2>
          <p className="text-white max-w-2xl leading-relaxed">{data.content[language].description}</p>
        </div>

        {/* Testimonial Content */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Client Image */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-amber-800">
                <Image
                  src={currentTestimonial.image || "/placeholder.svg"}
                  alt={currentTestimonial.name[language]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 192px"
                  priority
                />
              </div>
            </div>

            {/* Testimonial Text */}
            <div className="flex-1">
              <blockquote className="text-white text-lg leading-relaxed mb-6 italic">
                "{currentTestimonial.testimonial[language]}"
              </blockquote>

              <div className="text-amber-100">
                <div className="font-semibold text-xl text-white mb-1">{currentTestimonial.name[language]}</div>
                <div className="text-sm">
                  {currentTestimonial.position[language]} / {currentTestimonial.company[language]}
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex mt-4 space-x-1 rtl:space-x-reverse">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${index < currentTestimonial.rating ? "text-yellow-400" : "text-amber-700"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center mt-8 space-x-4 rtl:space-x-reverse">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 bg-amber-800 hover:bg-amber-700 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label={language === "en" ? "Previous testimonial" : "الشهادة السابقة"}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={goToNext}
              className="w-12 h-12 bg-amber-800 hover:bg-amber-700 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label={language === "en" ? "Next testimonial" : "الشهادة التالية"}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 space-x-2 rtl:space-x-reverse">
            {data.testimonials.map((_: Testimonial, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-white" : "bg-amber-700"
                }`}
                aria-label={`${language === "en" ? "Go to testimonial" : "انتقل إلى الشهادة"} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
