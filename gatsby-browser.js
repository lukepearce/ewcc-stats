/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import netlifyIdentity from 'netlify-identity-widget'

const onInitialClientRender = () => {
  console.log('hi');
  netlifyIdentity.init({ container: '#netlify-identity-modal'})
  window.netlifyIdentity = netlifyIdentity
}

export default onInitialClientRender
