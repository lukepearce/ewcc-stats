const axios = require("axios")
const SiteClient = require('datocms-client').SiteClient;

const strava = require('./strava')

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  try {
    // Set up dato client
    const datoClient = new SiteClient(process.env.GATSBY_DATO_CMS_FULL_ACCESS_KEY);

    // Get users from dato
    const datoMembers = await datoClient.items.all({
      filter: {
        type: '55768'
      },
    });

    function getClubData(token) {
      const memberApiUrl = 'https://www.strava.com/api/v3/clubs/EWCC1/members'
      // Get club data from Strava - access token can be from any member account
      axios.get(`${memberApiUrl}?access_token=${token}`)
        .then(response => {
          const clubData = response.data;
          // Use Gatsby's createNode helper to create a node from the node data
          createNode({
            clubData,
            id: createNodeId(`strava-club-ewcc`),
            parent: null,
            children: [],
            internal: {
              type: `StravaClub`,
              content: JSON.stringify(clubData),
              contentDigest: createContentDigest(clubData),
            }
          });
        });
    }

    // Use function to get refreshed member access tokens (WIP)
    return axios.post(`${process.env.GATSBY_FUNCTION_PATH}update-tokens`, {
      members: datoMembers,
    })
      .then(response => {

        const members = response.data.members;

        getClubData(members[0].stravaAccessToken);

        // Create members endpoint
        // Gets athlete profile data and stats from Strava
        return strava.getMembersStravaData(members)
          .then(athletes => {
            const nodeId = createNodeId(`strava-athletes`);
            createNode({
              ...athletes,
              id: nodeId,
              parent: null,
              children: [],
              internal: {
                type: `StravaAthletes`,
                content: JSON.stringify(athletes),
                contentDigest: createContentDigest(athletes),
              },
            });

            athletes.forEach((athlete) => {

              // Use Gatsby's createNode helper to create a node from the node data
              const nodeId = createNodeId(`strava-athlete-${athlete.id}`);

              // Rename athlete.id to athlete.memberId
              athlete.memberId = athlete.id;
              delete athlete.id

              createNode({
                ...athlete,
                id: nodeId,
                parent: null,
                children: [],
                internal: {
                  type: `StravaAthlete`,
                  content: JSON.stringify(athlete),
                  contentDigest: createContentDigest(athlete),
                },
              });
            })
          })
      })
      .catch((error) => {
        console.log('function error', error);
      });

  } catch (e) {
    throw new Error(`source-strava: ${e.message}`)
  }
}