
import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vtuadda.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/admin/login'],
      },
       {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
       {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/admin/login'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
