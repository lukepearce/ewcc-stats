import React from 'react'
import { graphql, Link } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'

const IndexPage = () => {
  let greeting = 'Hi';
  const user = window.netlifyIdentity.currentUser();
  if (user) {
    greeting = `${greeting}, ${user.user_metadata.full_name}`;
  }

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>{greeting}</h1>
      <p>Welcome to the start of a new place to keep track (and brag) about our Strava stats.</p>


      <div id="authorize-strava">Authorize Strava</div>
    </Layout>
  );
};

export default IndexPage

export const query = graphql`
  {
    stravaClub {
      clubData {
        firstname
        lastname
      }
    }
  }
`;
