import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const URL = 'https://www.sunlitcaribbeanestates.com/'

  return [
    {
      url: `${URL}/`, // Home Page
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/buy`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'daily',
    },
    {
      url: `${URL}/rent`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'daily',
    },
    {
      url: `${URL}/realtors`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/aboutus`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: 'weekly',
    },
  ]
}
