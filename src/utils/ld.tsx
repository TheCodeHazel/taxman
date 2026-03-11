// components/JsonLdSchema.tsx
import Script from 'next/script'

export const JsonLdSchema = () => {
  return (
    <Script
      id="json-ld-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://TaxConsult.com/#organization",
              "name": "TaxConsult",
              "url": "https://TaxConsult.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://TaxConsult.com/logo.png",
                "width": 180,
                "height": 60
              },
              "description": "TaxConsult is a professional accounting, tax consultancy, and business registration firm in Pakistan serving individuals, startups, SMEs, and companies in Rawalpindi and Islamabad.",
              "areaServed": {
                "@type": "Country",
                "name": "Pakistan"
              },
              "sameAs": [
                "https://www.facebook.com/TaxConsult",
                "https://www.linkedin.com/company/TaxConsult"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "telephone": "+92-XXX-XXXXXXX",
                "email": "ceo@abidalico.com",
                "areaServed": "PK"
              }
            },

            {
              "@type": "WebSite",
              "@id": "https://TaxConsult.com/#website",
              "url": "https://TaxConsult.com",
              "name": "TaxConsult – Accounting, Tax & Business Registration Services",
              "description": "Expert accounting services, tax filing, NTN & STR registration, SECP company registration, bookkeeping, payroll, and financial consultancy in Rawalpindi and Islamabad.",
              "publisher": {
                "@id": "https://TaxConsult.com/#organization"
              }
            },

            {
              "@type": "ProfessionalService",
              "@id": "https://TaxConsult.com/#professionalservice",
              "name": "TaxConsult Accounting & Tax Consultancy",
              "url": "https://TaxConsult.com",
              "description": "Professional accounting firm offering tax consultancy, income tax return filing, SECP company registration, NTN & STR registration, bookkeeping, payroll management, and business compliance services in Rawalpindi and Islamabad.",
              "provider": {
                "@id": "https://TaxConsult.com/#organization"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Rawalpindi",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "Pakistan"
                  }
                },
                {
                  "@type": "City",
                  "name": "Islamabad",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "Pakistan"
                  }
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Accounting & Business Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Income Tax Return Filing",
                      "serviceType": "Tax Consultancy"
                    },
                    "availability": "https://schema.org/InStock"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "NTN Registration",
                      "serviceType": "Tax Registration"
                    },
                    "availability": "https://schema.org/InStock"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "STR / Sales Tax Registration",
                      "serviceType": "Sales Tax Services"
                    },
                    "availability": "https://schema.org/InStock"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "SECP Company Registration",
                      "serviceType": "Business Registration"
                    },
                    "availability": "https://schema.org/InStock"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Bookkeeping & Accounting Services",
                      "serviceType": "Accounting"
                    },
                    "availability": "https://schema.org/InStock"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Payroll Management",
                      "serviceType": "Payroll Services"
                    },
                    "availability": "https://schema.org/InStock"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Business & Financial Consultancy",
                      "serviceType": "Business Consulting"
                    },
                    "availability": "https://schema.org/InStock"
                  }
                ]
              }
            }
          ]
        })
      }}
    />
  )
}
