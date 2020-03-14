/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "COOK",
    shortTitle: "COOK",
    description: "Cook More, Together with trusted recipes from the Alexanders",
    url: "https://cook.adrw.xyz", // No trailing slash allowed!
    image: "/img/logos/ch-2.png", // Path to your image you placed in the 'static' folder
    author: "The Alexanders",
    intro: "...more, together, with trusted recipes from the Alexanders",
    menuLinks: [
      {
        name: "About",
        slug: "/about/"
      }
    ],
    footerLinks: [
      {
        name: "(C) 2009-2019 ADRW Digital",
        href: "https://adrw.xyz"
      },
      {
        name: "Andrew Paradi Alexander",
        href: "https://andrew.fm"
      },
      {
        name: "Built on Westegg",
        href: "https://westegg.xyz"
      }
    ]
  },
  plugins: [
    "@westegg/gatsby-theme-recipes",
    {
      resolve: "@westegg/gatsby-theme-core",
      options: {
        mdx: false
      }
    },
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: "3",
        matomoUrl: "https://matomo.adrw.xyz",
        siteUrl: "https://cook.alexanders.xyz"
      }
    }
  ]
}
