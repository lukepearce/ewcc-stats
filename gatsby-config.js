const STRAVA_AUTH_QUERY = "?client_id=31292&response_type=code&redirect_uri=http://ewcc.netlify.com&approval_prompt=force&scope=profile:read_all,activity:read";
const STRAVA_AUTH_URL_MOBILE = "https://www.strava.com/oauth/mobile/authorize";
const STRAVA_AUTH_URL_DESKTOP = "https://www.strava.com/oauth/authorize";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `EWCC Official Stats`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `Luke Pearce`,
  },
  plugins: [
    `gatsby-plugin-extract-schema`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-strava",
      options: {
        token: process.env.GATSBY_STRAVA_ACCESS_TOKEN,
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
