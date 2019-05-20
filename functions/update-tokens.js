// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
import queryString from 'query-string'
import axios from 'axios'
import { SiteClient } from 'datocms-client'

// const {
//   GATSBY_DATO_CMS_FULL_ACCESS_KEY,
//   GATSBY_STRAVA_CLIENT_ID,
//   GATSBY_STRAVA_SECRET
// } = process.env;

export function handler(event, context, callback) {
  const GATSBY_STRAVA_SECRET = "fbf261195aef35d398297f85006140f0c9feb81a"
  const GATSBY_STRAVA_CLIENT_ID = "31292"
  const GATSBY_DATO_CMS_FULL_ACCESS_KEY = "5e5c880e24fdc5c224019ebebb0fae"

  // turn into promise
  const updateAthleteData = (memberId, data) => {
    (async () => {
      const client = new SiteClient(GATSBY_DATO_CMS_FULL_ACCESS_KEY);

      // create a new Article
      const res = await client.items.update(memberId, {
        stravaRefreshToken: data.refresh_token,
        stravaAccessToken: data.access_token,
      });

      console.log('dato', res);
    })();
  }

  const data = JSON.parse(event.body);

  const members = data['members'];

  const memberPromises = members.map((member) => {

      console.log('member refresh token', member.stravaRefreshToken)

      const queryParams = {
        client_id: GATSBY_STRAVA_CLIENT_ID,
        client_secret: GATSBY_STRAVA_SECRET,
        refresh_token: member.stravaRefreshToken,
        grant_type: 'refresh_token'
      }

      const qs = queryString.stringify(queryParams)

      return axios.post(`https://www.strava.com/oauth/token?${qs}`)
        .then(response => {
          console.log('strava refresh response', response)

          updateAthleteData(member.id, response.data);

          return {
            ...member,
            access_token: response.data.access_token
          }
        })
        .catch((error) => {
          reject(error);
        })

  })

  Promise.all(memberPromises)
    .then((members) => {
      console.log(members);
      callback(null, {
        // return null to show no errors
        statusCode: 200, // http status code
        body: JSON.stringify({
          members: members
        }),
      })
    })
    .catch((err) => {
      console.log(err);
    })

}