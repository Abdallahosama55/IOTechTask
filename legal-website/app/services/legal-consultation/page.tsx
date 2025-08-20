// app/services/legal-consultation/page.tsx
"use client"

import { HeroSection } from "@/components/hero-section"
import LegalContent from "@/components/ui/LegalContent/LegelContent"
import React from "react"

export default function LegalConsultationPage() {
  return (
    <div className="">
<HeroSection VisableContent={false}/>
<LegalContent />

    </div>
  )
}
