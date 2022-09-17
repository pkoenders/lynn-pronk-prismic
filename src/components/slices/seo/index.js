import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

const SEOIndex = ({ slice }) => (
  <StaticQuery
    query={`${SEOquery}`}
    render={(data) => {
      const SeoTitle = slice.primary.seo_title.text
        ? `${slice.primary.seo_title.text} | ${data.site.siteMetadata.title}`
        : data.site.siteMetadata.title

      const OpenGraphTitle = slice.primary.opengraph_title.text
        ? `${slice.primary.opengraph_title.text} | ${data.site.siteMetadata.title}`
        : data.site.siteMetadata.title

      const TwitterTitle = slice.primary.twitter_title.text
        ? `${slice.primary.twitter_title.text} | ${data.site.siteMetadata.title}`
        : data.site.siteMetadata.title

      return (
        <>
          {/* No index */}
          {slice.primary.no_index === true && (
            <Helmet>
              <meta name="robots" content="noindex" />
              <meta name="googlebot" content="noindex" />
            </Helmet>
          )}

          <Helmet>
            {/* Page title. Maximum length 60-70 characters */}
            <title>{SeoTitle}</title>

            {/* Page description. No longer than 155 characters. */}
            <meta
              name="description"
              content={
                slice.primary.seo_description.text
                  ? slice.primary.seo_description.text
                  : data.site.seo_description.description
              }
            />

            {slice.primary.seo_image.url && (
              <meta name="image" content={slice.primary.seo_image.url} />
            )}
          </Helmet>

          {/* OpenGraph props */}
          {slice.primary.include_opengraph === true && (
            <Helmet>
              <meta
                property="og:title"
                content={slice.primary.opengraph_title.text !== '' ? OpenGraphTitle : SeoTitle}
              />
              <meta
                property="og:description"
                content={
                  slice.primary.opengraph_description.text !== ''
                    ? slice.primary.opengraph_description.text
                    : slice.primary.seo_description.text
                }
              />
              {slice.primary.opengraph_type && (
                <meta property="og:type" content={slice.primary.opengraph_type} />
              )}

              {slice.primary.opengraph_availability && (
                <meta property="availability" content={slice.primary.opengraph_availability} />
              )}

              {slice.primary.opengraph_price && (
                <meta property="product:price:amount" content={slice.primary.opengraph_price} />
              )}

              {slice.primary.opengraph_currency && (
                <meta
                  property="product:price:currency"
                  content={slice.primary.opengraph_currency}
                />
              )}
              {slice.primary.seo_image.url && (
                <meta property="og:image" content={slice.primary.seo_image.url} />
              )}
              {/* <meta property="fb:admins" content="Facebook numeric ID" /> */}
            </Helmet>
          )}

          {/* Twitter props */}
          {slice.primary.include_twitter === true && (
            <Helmet>
              <meta
                name="twitter:title"
                content={slice.primary.twitter_title.text !== '' ? TwitterTitle : SeoTitle}
              />
              <meta
                name="twitter:description"
                content={
                  slice.primary.twitter_description.text !== ''
                    ? slice.primary.twitter_description.text
                    : slice.primary.seo_description.text
                }
              />
              {slice.primary.twitter_type && (
                <meta name="twitter:card" content={slice.primary.twitter_type} />
              )}
              {slice.primary.twitter_handle && (
                <meta name="twitter:site" content={slice.primary.twitter_handle} />
              )}
              {/* <meta name="twitter:creator" content="@author_handle" /> */}
              {slice.primary.seo_image.url && (
                <meta name="twitter:image" content={slice.primary.seo_image.url} />
              )}
            </Helmet>
          )}
        </>
      )
    }}
  />
)

export default SEOIndex

const SEOquery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
