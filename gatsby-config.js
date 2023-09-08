/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Kitchen Alexander",
    shortTitle: "KA",
    description: "Recipes from the Alexander Kitchen",
    url: "https://kitchen.alxdr.ca", // No trailing slash allowed!
    image: "/img/logos/ch-2.png", // Path to your image you placed in the 'static' folder
    author: "The Alexanders",
    intro: "Recipes from the Alexander Kitchen",
    menuLinks: [
      {
        name: "About",
        slug: "/about/"
      }
    ],
    footerLinks: [
      {
        name: "(C) 2009-2023 ADRW Digital",
        href: "https://adrw.xyz"
      },
      {
        name: "Andrew Alexander",
        href: "https://adrw.xyz"
      }
    ]
  }
//  plugins: [
//    {
//      "@marinda/gatsby-theme-recipes"
//    }
//  ]
}
