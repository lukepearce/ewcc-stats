import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

const StravaPage = (props) => {
  const athlete = props.data.stravaAthlete.athlete;
  return (
    <Layout>
      <div>
        <p>Name: {athlete.firstname} {athlete.lastname}</p>
        <p>You joined Strava on {athlete.created_at}</p>
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
      athlete {
        id
        firstname
        lastname
        profile
        created_at(formatString: "MMMM Do, YYYY")
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
`;