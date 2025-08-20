"use client";

import { useGetContentLegalSectionQuery } from "@/lib/Services";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import ErrorState from "../ErrorState";

export default function LegalContent() {
  const {
    data: legalData = [],
    isLoading,
    error,
  } = useGetContentLegalSectionQuery();
  if (isLoading)
    return (
      <section>
        <div className="flex justify-center items-center min-h-screen bg-brown-900">
          <div className="w-16 h-16 border-4 border-t-[#A0522D] border-b-[#A0522D] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );

  if (error) return <ErrorState />;
  return (
    <div className="relative min-h-screen bg-white">
      {/* Background Image */}
      <Image
        src="/Bitmap.png"
        alt="Background"
        fill
        className="object-cover   w-full h-full"
        priority
      />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back Button */}
        <button className="flex items-center text-[#4B2615] hover:underline mb-6">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#1E1E1E] mb-6">
          {legalData.title}
        </h1>

        {/* Intro */}
        <p className="text-[#4B2615] mb-10 leading-relaxed">
          {legalData.intro}
        </p>

        {/* Sections */}
        {legalData.sections.map((section: any) => (
          <div key={section.id} className="mb-10">
            <h2 className="text-xl font-semibold text-[#1E1E1E] mb-3">
              {section.title}
            </h2>
            <p className="text-[#4B2615] border-s-4 mb-3 leading-relaxed p-4  ">
              {section.content}
            </p>
            {section.list.length > 0 && (
              <ul className="list-disc list-inside text-[#4B2615] space-y-1 pl-2">
                {section.list.map((item: any, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Footer */}
        <p className="text-[#4B2615] italic mt-10">{legalData.footer}</p>
      </div>
    </div>
  );
}
