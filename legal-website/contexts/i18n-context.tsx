// i18n-context.tsx
"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "ar"

export interface Translations {
  [key: string]: any
}

interface I18nContextType {
  language: Language
  translations: Translations
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
  loaded: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [translations, setTranslations] = useState<Translations>({})
  const [loaded, setLoaded] = useState(false)

  const loadTranslations = async (lang: Language) => {
    setLoaded(false)
    try {
      const response = await fetch(`/locales/${lang}.json`)
      const data = await response.json()
      setTranslations(data)
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error)
      setTranslations({})
    } finally {
      setLoaded(true)
    }
  }

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }

  const t = (key: string): string => {
    if (!loaded || !translations || Object.keys(translations).length === 0) return "" // فارغ أثناء التحميل
    const keys = key.split(".")
    let value: any = translations
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) value = value[k]
      else return key
    }
    return typeof value === "string" ? value : key
  }

  useEffect(() => {
    const savedLang = (localStorage.getItem("language") as Language) || "en"
    setLanguageState(savedLang)
    loadTranslations(savedLang)
    document.documentElement.lang = savedLang
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr"
  }, [])

  useEffect(() => {
    loadTranslations(language)
  }, [language])

  const value: I18nContextType = {
    language,
    translations,
    setLanguage,
    t,
    isRTL: language === "ar",
    loaded,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  if (!context) throw new Error("useI18n must be used within I18nProvider")
  return context
}
