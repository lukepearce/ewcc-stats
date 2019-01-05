import React from 'react'
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
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
        <h1>{this.state.greeting}</h1>
        <p>Welcome to the start of a new place to keep track (and brag) about our Strava stats.</p>
      </Layout>
    );
  }
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
