import * as React from 'react'
import { SiteClient } from 'datocms-client';
import queryString from 'query-string'
import axios from "axios"

import Layout from '../components/layout'

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.saveAthleteData = this.saveAthleteData.bind(this);
    this.state = {
      stravaAuth: false,
      hasSaved: false
    };
  }

  saveAthleteData(data) {
    const apiKey = process.env.GATSBY_DATO_CMS_FULL_ACCESS_KEY;

    (async () => {
      const client = new SiteClient(apiKey);

      // create a new Article
      const res = await client.items.create({
        itemType: '55768',
        firstname: data.athlete.firstname,
        lastname: data.athlete.lastname,
        stravaRefreshToken: data.refresh_token,
        stravaAccessToken: data.access_token,
        stravaId: data.athlete.id,
      });

      console.log(res);

      this.setState({ hasSaved: true });
    })();
  }

  componentDidMount() {
    // once we have all users in dato
    // create source that gets users refresh tokens
    // loop over each user
    // get new access token
    // get data
    // map to node as athlete

    // This needs to live in a lambda function
    const parsed = queryString.parse(location.search);

    if (parsed.scope && parsed.code) {
      const queryParams = {
        client_id: process.env.GATSBY_STRAVA_CLIENT_ID,
        client_secret: process.env.GATSBY_STRAVA_SECRET,
        code: parsed.code,
        grant_type: 'authorization_code'
      };

      const qs = queryString.stringify(queryParams);

      axios.post(`https://www.strava.com/oauth/token?${qs}`)
        .then(response => {
          this.setState({ stravaAuth: true });

          this.saveAthleteData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <Layout>
        <div>
          Auth page
        </div>
      </Layout>
    )
  }
}

export default Auth;