import React from 'react'
import { Box, Flex, Heading } from '@rebass/emotion'
import { graphql, Link } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
// import BarGraph from '../components/graphs/bar'
import BarGraph from '../pages/bar-graph'
import LineGraph from '../pages/line-graph'


const IndexPage = (props) => {
  const colours = [
    '#cad981',
    'cadetblue',
    'red',
  ];
  const data = props.data.allStravaAthlete.edges;
  const athleteData = data.map((athlete, index) => {
    return {
      ...athlete.node,
      colour: colours[index],
    }
  })
  console.log(athleteData);
  // Elevation
  // const y = d => {
  //   let totalElevation = 0;
  //   d.activities.forEach(activity => {
  //     totalElevation = totalElevation += activity.total_elevation_gain;
  //   });
  //   return Math.round(totalElevation);
  // };
  
  // Time
  // const y = d => {
  //   let totalTime = 0;
  //   d.activities.forEach(activity => {
  //     totalTime = totalTime += ((activity.elapsed_time / 60) / 60);
  //   });
  //   console.log(Math.round(totalTime));
  //   return Math.round(totalTime);
  // };
  
  // Days active
  // Make a new period from 01-01-2019 until today
  // map activity dates to a simple date array
  // loop through period - check if day in activity dates
  // return count that match - so a map filter?
  // const x = d => new Date(d.date); // d.date is unix timestamps
  // const y = d => d.close;
  
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
      <h1>Year to date</h1>
      
      <h3>Yearly total distance (bar)</h3>
      <BarGraph
        data={athleteData}
        xLabel={'Member'}
        yLabel={'Distance (km)'}
        yType={'distance'}
      />
      
      <Heading>Yearly total elevation (bar)</Heading>
      <BarGraph
        data={athleteData}
        xLabel={'Member'}
        yLabel={'Elevation (m)'}
        yType={'elevation'}
      />
      
      <Heading>Yearly total time (bar)</Heading>
      <BarGraph
        data={athleteData}
        xLabel={'Member'}
        yLabel={'Time (hours)'}
        yType={'moving'}
      />
      
      <Heading>Yearly total calories (bar)</Heading>
      <BarGraph
        data={athleteData}
        xLabel={'Member'}
        yLabel={'Calories (KJ)'}
        yType={'calories'}
      />
      
      <LineGraph
        data={athleteData}
        xLabel={'Month'}
        yLabel={'Distance'}
        yType={'monthlyDistance'}
      />
      
      {/*{athleteData.map((member, i) => {*/}
      {/*return (*/}
      {/*<div key={i} style={{ marginBottom: '2em' }}>*/}
      {/*<p style={{ marginBottom: '0' }}>{member.firstname} {member.lastname}</p>*/}
      {/*<p style={{ marginBottom: '0' }}>Rides this year: {member.stats.ytd_ride_totals.count}</p>*/}
      {/*<p style={{ marginBottom: '0' }}>Distance this year: {Math.round(member.stats.ytd_ride_totals.distance / 1000)}km</p>*/}
      {/*<p style={{ marginBottom: '0' }}>Average distance per ride: {Math.round((member.stats.ytd_ride_totals.distance / 1000) / member.stats.ytd_ride_totals.count)} km/ride</p>*/}
      {/*<p style={{ marginBottom: '0' }}>Projected yearly rides: {member.stats.recent_ride_totals.count * 12}</p>*/}
      {/*<p style={{ marginBottom: '0' }}>Projected yearly*/}
      {/*distance: {Math.round((member.stats.recent_ride_totals.distance * 12) / 1000)}km</p>*/}
      {/*</div>*/}
      {/*)*/}
      {/*})}*/}
    
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
    {
        allStravaAthlete {
            edges {
                node {
                    memberId
                    stravaId
                    firstname
                    lastname
                    athlete {
                        ftp
                        profile
                        created_at
                        weight
                    }
                    activities {
                        id
                        start_date_local(formatString: "MM")
                        name
                        distance
                        total_elevation_gain
                        moving_time
                        elapsed_time
                        start_date
                        trainer
                        commute
                        average_speed
                        max_speed
                        average_heartrate
                        suffer_score
                        weighted_average_watts
                        kilojoules
                    }
                    stats {
                        biggest_ride_distance
                        biggest_climb_elevation_gain
                        ytd_ride_totals {
                            count
                            distance
                            moving_time
                            elapsed_time
                            elevation_gain
                        }
                        recent_ride_totals {
                            count
                            distance
                            moving_time
                            elapsed_time
                            elevation_gain
                            achievement_count
                        }
                    }
                }
            }
        }
    }
`
