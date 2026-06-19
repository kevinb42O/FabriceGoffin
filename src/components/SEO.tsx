import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title,
  description = 'Ontdek de visie, standpunten en realisaties van Fabrice Goffin, Schepen in Oostende.',
  image = '/images/og-image.jpg', // Default OG image (should be an absolute URL in prod ideally, or a relative one if handled by crawler correctly)
  url,
  type = 'website',
}: SEOProps) {
  // Voor absolute URL's
  const siteUrl = 'https://fabricegoffin.be'; // Pas dit aan naar het échte domein als het bekend is.
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph tags / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Fabrice Goffin" />

      {/* Twitter tags */}
      <meta name="twitter:creator" content="@FabriceGoffin" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
}
