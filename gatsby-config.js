module.exports = {
  siteMetadata: {
    title: "cook.adrw.xyz"
  },
  __experimentalThemes: [
    {
      resolve: "gatsby-theme-digital-garden",
      options: {
        notesPath: "/notes"
      }
    },
    {
      resolve: "gatsby-theme-digital-garden-portfolio",
      options: {
        projectsPath: "/recipes",
        projects: "recipes"
      }
    }
  ],
  plugins: [
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads"
            }
          },
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "assets"
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static"
            }
          }
        ]
      }
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-redirects",
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
}
