const axios = require("axios")
const queryString = require("query-string")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  try {

    // Convert the options object into a query string
    // const apiOptions = queryString.stringify(configOptions)

    const athlete = await axios.get(`https://www.strava.com/api/v3/athletes/983545?access_token=${configOptions.token}`)
      .then(response => {
        return response.data;
      });

    const stats = await axios.get(`https://www.strava.com/api/v3/athletes/${athlete.id}/stats?access_token=${configOptions.token}`)
      .then(response => {
        return response.data;
      });

    const athleteData = {
      ...athlete,
      ...{stats}
    };

    // Use Gatsby's createNode helper to create a node from the node data
    createNode({
      athleteData,
      id: createNodeId(`strava-athlete-${athlete.id}`),
      parent: null,
      children: [],
      internal: {
        type: `StravaAthlete`,
        content: JSON.stringify(athleteData),
        contentDigest: createContentDigest(athleteData),
      }
    });

    const clubData = await axios.get(`https://www.strava.com/api/v3/clubs/EWCC1/members?access_token=${configOptions.token}`)
      .then(response => {
        return response.data;
      });

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

  } catch (e) {
    throw new Error(`source-strava: ${e.message}`)
  }
}