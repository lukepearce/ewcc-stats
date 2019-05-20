import React from 'react'
import { graphql, Link } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'

const RoadmapPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
      
      <h1>Feature Roadmap</h1>
      
      <h2>Group stats for past/current year</h2>
      <p style={{ textDecoration: 'line-through' }}>Yearly total distance (bar)</p>
      <p>Monthly distance (line)</p>
      <p style={{ textDecoration: 'line-through' }}>Yearly total elevation (bar)</p>
      <p>Monthly elevation (line)</p>
      <p style={{ textDecoration: 'line-through' }}>Yearly time on bike (pie)</p>
      <p>Cumulative distance, with times around planet</p>
      <p>Cumulative elevation, with times up everest</p>
      <p>Cumulative time</p>
      <p>Longest ride of the year</p>
      <p>Most elevation on a ride this year</p>
      <p>Most time spent riding on a single activity this year</p>
      <p>Top Speed</p>
      
      <h2>Personal</h2>
      <p>Projections for the year (uses current years activities totals)</p>
      <p>All group stat pages but just for you</p>
      
      <h2>Group leader boards</h2>
      <p>Longest ride ever</p>
      <p>Most elevated ride ever</p>
      <p>Most trainer rides</p>
      <p>Most commutes</p>
      <p>Longest commute</p>
      <p>Photographer of the group (most photos taken)</p>
      <p>Calories burnt</p>
      <p>Highest speed reached</p>
      <p>Most kudoed athlete</p>
      <p>Most kudoed activity</p>
      <p>Cafe stop time (paused)</p>
      
      <h2>Non strava API</h2>
      <p>Calendar of group events and trips</p>
      <p>Calendar of personal events and trips (can open them to be public)</p>
      
      <h2>Trip Management</h2>
      <p>Route links</p>
      <p>Discussions</p>
      <p>Kit checklists</p>
      <p>Member lists</p>
    </Layout>
  )
}

export default RoadmapPage

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
