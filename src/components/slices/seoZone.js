import React from 'react'
import SEOIndex from '/src/components/slices/seo/'

const SeoZone = ({ seoZone }) => {
  const sliceComponents = {
    seo_tags: SEOIndex,
  }

  if (seoZone) {
    const sliceZoneContent = seoZone.map((slice, index) => {
      const SliceComponent = sliceComponents[slice.slice_type]
      if (SliceComponent) {
        return <SliceComponent slice={slice} key={index} />
      }
      return null
    })
    return <>{sliceZoneContent}</>
  }
}

export default SeoZone
