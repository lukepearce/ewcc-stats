import React from 'react'
import { graphql, Link } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'

const RoadmapPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <h1>Feature Roadmap</h1>
      <p>Yearly total distance (bar)</p>
      <p>Monthly distance (line)</p>
      <p>Yearly total elevation (bar)</p>
      <p>Monthly elevation (line)</p>
      <p>Yearly time on bike (pie)</p>
      <p>Cumulative distance, with times around planet</p>
      <p>Cumulative elevation, with times up everest</p>
      <p>Cumulative time</p>
      <p>Calendar of events and trips</p>
      <p>Personal projections</p>
      
    </Layout>
  );
};

export default RoadmapPage

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
