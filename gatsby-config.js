import dotenv from 'dotenv'
dotenv.config({path: '.env'})

// sass console.log( process.env.SANITY_TOKEN)
 export default  {
  siteMetadata: {
    title: `Miami Slices`,
    siteUrl: `https://www.gatsby.pizza.com`,
     description: `Best Pizza in Miami`,
    twitter: '@MiamiSlices'
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',

{
resolve:'gatsby-source-sanity',
options: {projectId:'wdzway2g', dataset: 'production',
watchMode: true, token: process.env.SANITY_TOKEN}}

  ]
}