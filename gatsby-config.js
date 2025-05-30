require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const linkResolver = require('./src/utils/linkResolver')

module.exports = {
  siteMetadata: {
    title: `Lynn Pronk Portraits`,
    description: `Gallery | Lynn Pronk Portraits`,
    siteUrl: 'https://www.lynnpronkportraits.com', // No trailing slash allowed!
    defaultImage: '/static/android-chrome-512x512.png', // Path to your image you placed in the 'static' folder
    logo: '/static/android-chrome-512x512.png', // Used for SEO
    author: 'Peter Koenders',
    year: '2022',
  },

  flags: {
    // PRESERVE_FILE_DOWNLOAD_CACHE: true,
    // FAST_DEV: true,
    DEV_SSR: false,
  },

  plugins: [
    `babel-plugin-styled-components`,
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-sass',

    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-WJB5D0DS9X', // Google Analytics / GA
          // 'AW-CONVERSION_ID', // Google Ads / Adwords / AW
          // 'DC-FLOODIGHT_ID', // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: 'GTM-M5HMD6B',
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ['/preview/**', '/do-not-track/me/too/'],
          // Defaults to https://www.googletagmanager.com
          // origin: 'YOUR_SELF_HOSTED_ORIGIN',
        },
      },
    },

    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        // releaseID: `${process.env.PRISMIC_RELEASE_ID}`,
        // prismicToolbar: true,
        linkResolver: () => (doc) => linkResolver(doc),
        // defaultLanguage: 'en-nz',
        // langs: ['en-nz', 'mi-nz'],

        schemas: {
          homepage: require('./custom_types/homepage.json'),
          general_page: require('./custom_types/general_page.json'),

          gallery_item: require('./custom_types/gallery_item.json'),
          gallery_page: require('./custom_types/gallery_page.json'),

          blog_post: require('./custom_types/blog_post.json'),
          blog_list: require('./custom_types/blog_list.json'),

          forms: require('./custom_types/forms.json'),
          shared_content: require('./custom_types/shared_content.json'),
          main_navigation: require('./custom_types/main_navigation.json'),
        },

        // add prismic toolbar
        // prismicToolbar: true,
      },
    },

    {
      resolve: 'gatsby-plugin-prismic-previews',
      options: {
        repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        toolbar: 'new',
      },
    },

    // {
    //   resolve: `gatsby-styled-components-dark-mode`,
    //   options: {
    //     light: require(`./src/themes/default/pkoenders.js`),
    //     dark: require(`./src/themes/default/pkoenders-dark.js`),
    //   },
    // },

    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },

    'gatsby-plugin-gatsby-cloud',
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,

    'gatsby-plugin-react-helmet',

    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.lynnpronkportraits.com',
        sitemap: 'https://www.lynnpronkportraits.com/sitemap/sitemap-index.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/gatsby-config.js`,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lynn Pronk Portraits`,
        description: `Lynn Pronk Portraits`,
        short_name: `Lynn Pronk Portraits`,
        start_url: `/`,
        background_color: `#091b38`,
        theme_color: `#091b38`,
        lang: `en-nz`,
        display: `standalone`,
        icon: `static/manifest.svg`, // This path is relative to the root of the site.
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },

    //`gatsby-plugin-offline`,
  ],
}
