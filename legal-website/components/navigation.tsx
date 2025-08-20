// Navigation.tsx
"use client"

import { useState } from "react"
import { ChevronDown, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/contexts/i18n-context"
import Link from "next/link"

/** * Services data structure for navigation dropdown * @author Abdallah Osama Frontend Developer */
const servicesData = [
  {
    items: [
      { key: "services.legalConsultation", href: "/services/legal-consultation" },
      { key: "services.foreignInvestment", href: "/services/foreign-investment" },
      { key: "services.contracts", href: "/services/contracts" },
      { key: "services.notarization", href: "/services/notarization" },
      { key: "services.insurance", href: "/services/insurance" },
    ],
  },
  {
    items: [
      { key: "services.defenseAllCases", href: "/services/defense-all-cases" },
      { key: "services.banksFinancial", href: "/services/banks-financial" },
      { key: "services.corporateGovernance", href: "/services/corporate-governance" },
      { key: "services.companiesLiquidation", href: "/services/companies-liquidation" },
      { key: "services.internalRegulations", href: "/services/internal-regulations" },
    ],
  },
  {
    items: [
      { key: "services.servicesCompanies", href: "/services/companies-institutions" },
      { key: "services.arbitration", href: "/services<Linkrbitration" },
      { key: "services.intellectualProperty", href: "/services/intellectual-property" },
      { key: "services.corporateRestructuring", href: "/services/corporate-restructuring" },
    ],
  },
  {
    items: [
      { key: "services.establishingCompanies", href: "/services/establishing-companies" },
      { key: "services.commercialAgencies", href: "/services/commercial-agencies" },
      { key: "services.supportingVision", href: "/services/vision-2030" },
      { key: "services.estates", href: "/services/estates" },
    ],
  },
]

/**
 * Navigation Component
 * Responsive navigation bar with services dropdown, search, and language switching
 * @author Abdallah Osama Frontend Developer
 */
 export function Navigation() {
  const { language, setLanguage, t, isRTL ,loaded } = useI18n()
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  if (!loaded) return null

  return (
    <nav dir={isRTL ? "rtl" : "ltr"} className="absolute top-0 left-0 w-full z-20 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-[#4B2615] rounded-lg flex items-center justify-center">
              <div className="text-white font-bold text-lg">Io.TASK</div>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden relative lg:block">
            <div className={`ml-10 flex items-baseline space-x-8 ${isRTL ? "space-x-reverse" : ""}`}>
              <Link href="/" className="text-orange-100 hover:text-white px-3 py-2 text-sm font-medium">{t("navigation.home")}</Link>
              <Link href="#" className="text-orange-100 hover:text-white px-3 py-2 text-sm font-medium">{t("navigation.about")}</Link>

              {/* Services Dropdown */}
              <div className="" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
                <button className="text-orange-100 hover:text-white px-3 py-2 text-sm font-medium flex items-center gap-1">
                  {t("navigation.services")} <ChevronDown className="w-4 h-4" />
                </button>
                {isServicesOpen && (
                  <div className="absolute top-full start-1/8 w-screen max-w-5xl rounded-2xl bg-[#4B2615]/95 backdrop-blur-sm shadow-2xl border border-[#4B2615]/30 " style={{ zIndex: 9999999 }}>
                    <div className="grid grid-cols-4  w-full gap-8 p-8">
                      {servicesData.map((column, index) => (
                        <div key={index} className="space-y-4">
                          {column.items.map((item, itemIndex) => (
                            <Link key={itemIndex} href={item.href} className="block text-orange-200 hover:text-white text-sm py-1 px-2 rounded hover:bg-[#4B2615]/50">
                              {t(item.key)}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="#" className="text-orange-100 hover:text-white px-3 py-2 text-sm font-medium">{t("navigation.blog")}</Link>
              <Link href="#" className="text-orange-100 hover:text-white px-3 py-2 text-sm font-medium">{t("navigation.team")}</Link>
              <Link href="#" className="text-orange-100 hover:text-white px-3 py-2 text-sm font-medium">{t("navigation.contact")}</Link>
            </div>
          </div>

          {/* Right Side */}
          <div className={`flex items-center space-x-4 ${isRTL ? "space-x-reverse" : ""}`}>
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("navigation.search")}
                    className="bg-[#4B2615]/80 text-orange-100 placeholder-orange-300 border border-[#4B2615]/50 rounded-md px-3 py-1 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    autoFocus
                  />
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="text-orange-100 hover:text-white p-1 ml-2">
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="text-orange-100 hover:text-white p-2">
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Language Toggle */}
            <button onClick={toggleLanguage} className="bg-transparent text-orange-100 hover:text-white text-sm border border-white rounded px-2 py-1">
              {t("common.language")}
            </button>

            <Button variant="outline" className="border-white text-orange-100 hover:bg-[#4B2615] hover:text-white bg-transparent hidden sm:inline-flex">
              {t("navigation.bookAppointment")}
            </Button>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-orange-100 hover:text-white p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#4B2615]/30 bg-[#4B2615]/98 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="#" className="text-orange-100 hover:text-white block px-3 py-2 text-base font-medium">{t("navigation.home")}</Link>
              <Link href="#" className="text-orange-100 hover:text-white block px-3 py-2 text-base font-medium">{t("navigation.about")}</Link>
              <Link href="#" className="text-orange-100 hover:text-white block px-3 py-2 text-base font-medium">{t("navigation.services")}</Link>
              <Link href="#" className="text-orange-100 hover:text-white block px-3 py-2 text-base font-medium">{t("navigation.blog")}</Link>
              <Link href="#" className="text-orange-100 hover:text-white block px-3 py-2 text-base font-medium">{t("navigation.team")}</Link>
              <Link href="#" className="text-orange-100 hover:text-white block px-3 py-2 text-base font-medium">{t("navigation.contact")}</Link>
              <div className="px-3 py-2">
                <Button variant="outline" className="border-orange-300/50 text-orange-100 hover:bg-[#4B2615] hover:text-white bg-transparent w-full">
                  {t("navigation.bookAppointment")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
