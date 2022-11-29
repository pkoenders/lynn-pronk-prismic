import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

// Helpers
// import i18n from '/config/i18n'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { RichText } from 'prismic-reactjs'
import linkResolver from '/src/utils/linkResolver'
import { validateString } from '/src/utils/helpers'

// Layout
import PageLayout from '/src/components/common/layout/pageLayout/'
import PageBody from '/src/components/common/layout/pageLayout/body'

// Icons
import IconMaterial from '/src/components/common/icons/material'

const GalleryItem = ({ currentLang, itemData }) => {
  const galleryItem = itemData.data
  const title = validateString(galleryItem.title.text)
  const date = galleryItem.creation_date
  const width = galleryItem.width
  const height = galleryItem.height
  // const link = galleryItem.link.url
  // const intro = validateString(galleryItem.intro.text)

  const content = validateString(galleryItem.description.richText)

  const mainImage = galleryItem.main_image.gatsbyImageData
  const galleryImageRoll = galleryItem.body1[0]

  return (
    // Set content width - xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full'
    <PageLayout classOverides="lg withSecondaryNav">
      <div>
        <PageBody className="content">
          {title && <h1>{title}</h1>}
          <div>
            <div className="galleryContent">
              {/* <span className="intro">
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    aria-describedby="Open link in a new window"
                    rel="noreferrer"
                    className="visit"
                  >
                    <IconMaterial icon={'open_in_new'} />
                    {link}
                  </a>
                )}
              </span> */}
              {content && <RichText render={content} linkResolver={linkResolver} />}

              <div className="outTro">
                {date && (
                  <span className="detail">
                    <span className="sr-only">Year</span>
                    <IconMaterial icon={'calendar_month'} />
                    <span>
                      <time>{date}</time>
                    </span>
                  </span>
                )}
                {width && height && (
                  <span className="detail">
                    <IconMaterial icon={'crop'} />
                    <p>
                      <span className="sr-only">Size</span>
                      <span className="sr-only">Width</span>
                      {width} cm
                      <strong> &nbsp;x&nbsp; </strong>
                      <span className="sr-only">Height</span>
                      {height} cm
                    </p>
                  </span>
                )}
              </div>

              {/* <p>
                This work is licensed under a{' '}
                <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
                  Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License
                </a>
              </p>
              <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
                <img
                  alt="Creative Commons License"
                  style={{ borderWidth: 0, marginTop: 16 + 'px' }}
                  src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png"
                />
              </a> */}

              <p xmlnsCc="http://creativecommons.org/ns#">
                This work is licensed under{' '}
                <a
                  href="http://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
                  target="_blank"
                  rel="license noopener noreferrer"
                  style={{ display: 'block' }}
                >
                  Attribution-NonCommercial-NoDerivatives 4.0 International
                  <span
                    style={{
                      display: 'block',
                      marginTop: 16 + 'px',
                    }}
                  >
                    <img
                      style={{
                        height: 44 + 'px',
                        // marginLeft: 3 + 'px',
                        verticalAlign: 'text-bottom',
                      }}
                      src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
                    />
                    <img
                      style={{
                        height: 44 + 'px',
                        marginLeft: 4 + 'px',
                        verticalAlign: 'text-bottom',
                      }}
                      src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
                    />
                    <img
                      style={{
                        height: 44 + 'px',
                        marginLeft: 4 + 'px',
                        verticalAlign: 'text-bottom',
                      }}
                      src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
                    />
                    <img
                      style={{
                        height: 44 + 'px',
                        marginLeft: 4 + 'px',
                        verticalAlign: 'text-bottom',
                      }}
                      src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1"
                    />
                  </span>
                </a>
              </p>
            </div>

            <aside className="galleryImgs">
              {mainImage && (
                <Zoom zoomMargin={32}>
                  <GatsbyImage
                    image={mainImage}
                    alt={
                      galleryItem.main_image.alt
                        ? galleryItem.main_image.alt
                        : 'This image currently has no description'
                    }
                    copyright={
                      galleryItem.main_image.copyright
                        ? 'cc-by-nc-nd ' +
                          new Date().getFullYear() +
                          ' ' +
                          galleryItem.main_image.copyright
                        : 'cc-by-nc-nd ' + new Date().getFullYear() + ' ' + 'Lynn Pronk'
                    }
                  />
                </Zoom>
              )}

              {galleryImageRoll !== undefined &&
                galleryImageRoll.items.map((item, index) => (
                  <Zoom zoomMargin={32}>
                    <GatsbyImage
                      image={item.image.gatsbyImageData}
                      alt={
                        item.image.alt ? item.image.alt : 'This image currently has no description'
                      }
                      copyright={
                        item.image.copyright
                          ? 'cc-by-nc-nd ' + new Date().getFullYear() + ' ' + item.image.copyright
                          : 'cc-by-nc-nd ' + new Date().getFullYear() + ' ' + 'Lynn Pronk'
                      }
                      key={index}
                    />
                  </Zoom>
                ))}
            </aside>
          </div>
        </PageBody>
      </div>
    </PageLayout>
  )
}

export default GalleryItem
