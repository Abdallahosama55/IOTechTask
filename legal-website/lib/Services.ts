import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:1337"

export const Services = createApi({
  reducerPath: "Services",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/` }),
  endpoints: (builder) => ({
    getHeroSections: builder.query<any[], void>({
      query: () => `herosections?populate=*`,
      transformResponse: (response: any) => response?.data || [],
    }),
    getHeroSlides: builder.query<any[], void>({
      query: () => `herosections?populate=*`,
      transformResponse: (response: any) => {
        const mapSlides = (items: any[]) =>
          items?.map((item: any) => ({
            id: item.id,
            type: item.type,
            title: item.title,
            description: item.description,
            videoUrl: item.videoUrl || null,
            imageUrl: item.imageUrl ? `${BASE_URL}${item.imageUrl}` : null,
          })) || []

        return mapSlides(response?.data?.[0]?.slidehero || [])
      },
    }),
    getTeamSection: builder.query<any, void>({
      query: () => `herosections?populate=*`,
      transformResponse: (response: any) => response?.data?.[1]?.slidehero || null,
    }),
    getTestimonialSection: builder.query<any, void>({
      query: () => `herosections?populate=*`,
      transformResponse: (response: any) => response?.data?.[3]?.slidehero || null,
    }),

    getContentLegalSection: builder.query<any, void>({
      query: () => `herosections?populate=*`,
      transformResponse: (response: any) => response?.data?.[4]?.slidehero || null,
    }),
  }),
})

export const {
  
  useGetHeroSectionsQuery,
  useGetHeroSlidesQuery,
  useGetTeamSectionQuery,
  useGetTestimonialSectionQuery,
  useGetContentLegalSectionQuery,
} = Services
