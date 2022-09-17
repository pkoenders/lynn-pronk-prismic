import * as React from 'react'
import { graphql } from 'gatsby'

// Helpers
import { validateString } from '/src/utils/helpers'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'

// Layout
import Layout from '/src/components/layout'
import HTMLHeader from '/src/components/common/htmlheader/'
import SeoZone from '/src/components/slices/seoZone'
import GalleryItem from '/src/components/gallery/item'
import SecondaryNav from '/src/components/common/secondaryNav'

const GalleryItemTemplate = ({ data, pageContext }) => {
  if (!data) return null

  const { next, previous } = pageContext
  // Validate and create Next title
  var nextTitle
  if (!next) {
    nextTitle = null
  } else {
    nextTitle = validateString(next.data.title.text)
  }

  // Validate and create Previous title
  var previousTitle
  if (!previous) {
    previousTitle = null
  } else {
    previousTitle = validateString(previous.data.title.text)
  }

  const document = data.allPrismicGalleryItem.edges[0].node
  const primaryNav = data.prismicMainNavigation.data.nav
  const currentLang = data.prismicMainNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav}>
      <HTMLHeader currentLang={currentLang} />
      <SeoZone seoZone={document.data.body} />
      <SecondaryNav
        currentLang={currentLang}
        next={next}
        nextTitle={nextTitle}
        previous={previous}
        previousTitle={previousTitle}
      />
      <GalleryItem itemData={document} />
    </Layout>
  )
}

export default withPrismicPreview(GalleryItemTemplate, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
  },
])

export const query = graphql`
  query GalleryItemQuery($uid: String, $locale: String) {
    ##
    ##Main navigation
    prismicMainNavigation(lang: { eq: $locale }) {
      _previewable
      type
      lang
      data {
        nav {
          ... on PrismicMainNavigationDataNavNavItem {
            id
            primary {
              label {
                text
              }
              link {
                uid
                raw
                lang
                type
              }
            }
            items {
              sub_nav_link {
                uid
                type
                lang
                raw
              }
              sub_nav_link_label {
                text
              }
            }
          }
        }
      }
    }
    ##
    ## End main navigtion

    allPrismicGalleryItem(filter: { lang: { eq: $locale }, uid: { eq: $uid } }) {
      edges {
        next {
          uid
          type
          lang
          data {
            title {
              text
            }
          }
        }
        previous {
          uid
          type
          lang
          data {
            title {
              text
            }
          }
        }
        node {
          lang
          type
          uid
          id
          alternate_languages {
            lang
            uid
            type
            id
          }

          tags
          data {
            #Template data
            title {
              text
            }
            creation_date(formatString: "YYYY")
            intro
            description {
              richText
              text
            }
            link {
              url
            }
            width
            height
            main_image {
              alt
              gatsbyImageData(
                breakpoints: [768, 992, 1200, 1366]
                layout: CONSTRAINED
                placeholder: BLURRED
                imgixParams: {
                  q: 100
                  fm: "jpg, avif, webp"
                  nr: 0
                  nrs: 50
                  dpr: 2
                  auto: "compress, format"
                  trim: "auto"
                }
              )
              #alt
            }

            body1 {
              ... on PrismicGalleryItemDataBody1ImageList {
                items {
                  image {
                    alt
                    gatsbyImageData(
                      breakpoints: [768, 992, 1200, 1366]
                      layout: CONSTRAINED
                      placeholder: BLURRED
                      imgixParams: {
                        q: 100
                        fm: "jpg, avif, webp"
                        #nr: 100
                        dpr: 2
                        auto: "compress,format"
                      }
                    )
                  }
                }
                slice_type
              }
            }
            #Template data - ends

            #SEO start
            body {
              ... on PrismicGalleryItemDataBodySeoTags {
                primary {
                  no_index
                  ##General SEO
                  seo_title {
                    text
                  }
                  seo_description {
                    text
                  }
                  seo_image {
                    url
                  }

                  ##OpenGraph
                  include_opengraph
                  opengraph_title {
                    text
                  }
                  opengraph_description {
                    text
                  }
                  opengraph_type
                  opengraph_price
                  opengraph_currency
                  opengraph_availability
                  ##Twittter
                  include_twitter
                  twitter_title {
                    text
                  }
                  twitter_description {
                    text
                  }
                  twitter_handle
                  twitter_type
                }
                slice_type
              }
            }
            #SEO - ends
          }
        }
      }
    }
  }
`
