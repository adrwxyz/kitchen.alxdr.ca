/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Alexander Receipes",
    shortTitle: "Recipes",
    description: "Cook More, Together",
    url: "https://cook.adrw.xyz", // No trailing slash allowed!
    image: "/images/og-image.jpg", // Path to your image you placed in the 'static' folder
    author: "The Alexanders",
    intro: "Classic recipes you’ll want to keep making.",
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
    {
      resolve: "@marinda/gatsby-theme-recipes",
      options: {
        title: "Alexander Receipes",
        shortTitle: "Recipes"
      }
    }
  ]
};
