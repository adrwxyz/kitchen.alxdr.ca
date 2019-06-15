module.exports = {
  siteMetadata: {
    title: "cook.adrw.xyz"
  },
  __experimentalThemes: [
    {
      resolve: "@westegg/gatsby-theme-digital-garden",
      options: {
        header: {
          home: {
            href: "/",
            label: "/img/logos/ch.png"
          },
          links: [
            {
              href: "/recipes",
              label: "Recipes"
            },
            {
              href: "/notes",
              label: "Notes"
            }
          ]
        },
        notesPath: "/notes",
        projectsPath: "/recipes",
        projects: "recipes"
      }
    }
  ]
}
