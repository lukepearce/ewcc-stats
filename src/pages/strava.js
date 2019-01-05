import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

const StravaPage = (props) => {
  const athlete = props.data.stravaAthlete.athleteData;

  return (
    <Layout>
      <div>
          <p>Name: {athlete.firstname} {athlete.lastname}</p>
          <p>You joined Strava on {athlete.created_at}, {athlete.created_at} ago</p>
          <img src={athlete.profile} alt={athlete.firstname} />
      </div>
    </Layout>
  );
};

export default StravaPage

//const athleteId = 983545;

export const query = graphql`
  {
    stravaAthlete {
      athleteData {
        id
        firstname
        lastname
        profile
        created_at(formatString: "DD MM, YYYY")
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
`;