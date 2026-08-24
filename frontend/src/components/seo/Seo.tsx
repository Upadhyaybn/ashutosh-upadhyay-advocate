import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  index?: boolean;
  structuredData?: Record<string, unknown>;
}

const SITE_NAME =
  "Advocate Ashutosh Upadhyay";

const SITE_URL =
  "https://www.ashutoshupadhyayadvocate.com";

const AUTHOR =
  "Ashutosh Upadhyay, Advocate";

function Seo({
  title,
  description,
  path = "/",
  index = true,
  structuredData,
}: SeoProps) {

  const canonicalUrl =
    path === "/"
      ? SITE_URL
      : `${SITE_URL}${path}`;

  const fullTitle =
    `${title} | ${SITE_NAME}`;

  return (
    <Helmet>

      <title>
        {fullTitle}
      </title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="author"
        content={AUTHOR}
      />

      <meta
        name="robots"
        content={
          index
            ? "index,follow"
            : "noindex,follow"
        }
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:site_name"
        content={SITE_NAME}
      />

      <meta
        property="og:locale"
        content="en_IN"
      />

      <meta
        property="og:title"
        content={fullTitle}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        name="twitter:card"
        content="summary"
      />

      <meta
        name="twitter:title"
        content={fullTitle}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      {structuredData && (

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

      )}

    </Helmet>
  );
}

export default Seo;