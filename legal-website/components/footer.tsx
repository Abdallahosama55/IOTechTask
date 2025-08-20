"use client"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"
import { Facebook, Twitter, Plus, CheckCircle } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { FormikHelpers } from "formik"

/**
 * Footer Component
 * Professional footer matching the exact design with newsletter subscription
 * @author Abdallah Osama Frontend Developer
 */
export default function Footer() {
  const { t, isRTL } = useI18n()

  const footerLinks = [
    { key: "footer.about", href: "/about" },
    { key: "footer.ourStrategy", href: "/strategy" },
    { key: "footer.ourAdvantages", href: "/advantages" },
    { key: "footer.socialResponsibility", href: "/social-responsibility" },
    { key: "footer.ourServices", href: "/services" },
  ]

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("footer.invalidEmail") || "Invalid email address")
      .required(t("footer.required") || "Required"),
  })

const handleSubmit = (
  values: { email: string },
  { resetForm }: FormikHelpers<{ email: string }>
) => {

 toast.success("Subscribed successfully!", {
    icon: <CheckCircle className="text-brown-500 w-5 h-5" />,
  })
  resetForm()
}

  return (
    <footer className="bg-[#4B2615] mt-6 text-white py-12" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section with Newsletter and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-6 border-b border-orange-200/20">
          {/* Newsletter Subscription with Formik */}
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col sm:flex-row items-center gap-2 mb-4 md:mb-0 w-full sm:w-auto">
                <div className="flex flex-col w-full sm:w-auto">
                  <Field
                    type="email"
                    name="email"
                    placeholder={t("footer.email")}
                    className="bg-white text-gray-900 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 w-full sm:w-64"
                  />
                
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#8B4513] hover:bg-[#6B3410] disabled:opacity-50 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  {t("footer.subscribe")}
                </button>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-white text-xs mt-1"
                  />
              </Form>
            )}
          </Formik>

          {/* Social Media and Contacts */}
          <div className="flex items-center gap-4">
            <span className="text-orange-100 text-sm">{t("footer.contacts")}</span>
            <div className="flex items-center gap-3">
              <Link href="#" className="text-orange-100 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-orange-100 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-orange-100 hover:text-white transition-colors">
                <Plus className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section with Links and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Footer Links */}
          <div className={`flex flex-wrap gap-6 mb-4 md:mb-0 ${isRTL ? "flex-row-reverse" : ""}`}>
            {footerLinks.map((link, index) => (
              <Link key={index} href={link.href} className="text-orange-100 hover:text-white text-sm transition-colors">
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-orange-100 text-sm">{t("footer.copyright")}</div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
