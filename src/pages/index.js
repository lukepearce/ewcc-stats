import React from 'react'
import { Heading } from '@rebass/emotion';
import { css } from '@emotion/core';
import { graphql, Link } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      greeting: 'Hi',
    };
  }

  componentDidMount() {
    const user = window.netlifyIdentity.currentUser();
    console.log(user);
    if (user) {
      this.setState({ greeting: `Hi, ${user.user_metadata.full_name}` });
    }
  }
  

  render() {
    const headerStyles = css`
      color: #343434;
      line-height: 1.21;
      font-size: 48px;
      font-family: 'Helvetica';
      font-weight: 700;
    `;
    console.log(headerStyles);
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
        <Heading
          css={headerStyles}
        >
          {this.state.greeting}
        </Heading>
        <p>Welcome to the start of a new place to keep track (and brag) about our Strava stats.</p>
      </Layout>
    );
  }
};

export default IndexPage

// export const query = graphql`
//   {
//     stravaClub {
//       clubData {
//         firstname
//         lastname
//       }
//     }
//   }
// `;
