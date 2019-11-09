import theme from "@marinda/gatsby-theme-recipes/src/gatsby-plugin-theme-ui"

export default {
  ...theme,
  colors: {
    text: "#362101",
    background: "#fff",
    primary: "#d61c04",
    secondary: "#862E9C",
    accent: "#F4D3E5",
    muted: "#F9E7C9",
    grey: "#F1F1F1",
    modes: {
      dark: {
        text: "#fff",
        background: "#48052B",
        primary: "#FEAEA4",
        secondary: "#862E9C",
        accent: "#AE246E",
        muted: "#1C0311",
        grey: "#3A0925"
      }
    }
  },
  fonts: {
    body: "'Avenir Next', Arial, Helvetica, sans-serif",
    heading: "'Avenir Next', Arial, Helvetica, sans-serif",
    monospace: "'Fira Code', 'Courier New', Courier, monospace"
  }
}
