const axios = require("axios")

function getAthlete(stravaApiUrl, athleteId, athleteAccessToken) {
  return new Promise((resolve, reject) => {
    axios.get(`${stravaApiUrl}/athletes/${athleteId}?access_token=${athleteAccessToken}`)
      .then(response => {
        console.log('athlete response', response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

function getAthleteStats(stravaApiUrl, athleteId, athleteAccessToken) {
  return new Promise((resolve, reject) => {
    axios.get(`${stravaApiUrl}/athletes/${athleteId}/stats?access_token=${athleteAccessToken}`)
      .then(response => {
        console.log('athlete stats', response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

exports.getMembersStravaData = function getMembersStravaData(members) {

  const stravaApiUrl = "https://www.strava.com/api/v3";

  const athletePromises = members.map((member) => {

    //const athlete = getAthlete(stravaApiUrl, member.stravaId, member.stravaAccessToken)
    return new Promise((resolve, reject) => {
      axios.get(`${stravaApiUrl}/athletes/${member.stravaId}?access_token=${member.access_token}`)
        .then(response => {
          resolve({
            type: 'athlete',
            memberId: member.id,
            stravaId: member.stravaId,
            athlete: response.data
          });
        })
        .catch((error) => {
          reject(error);
        })
    })
  })

  const athleteStatsPromises = members.map((member) => {

    //const athleteStats = getAthleteStats(stravaApiUrl, member.stravaId, member.stravaAccessToken)
    return new Promise((resolve, reject) => {
      axios.get(`${stravaApiUrl}/athletes/${member.stravaId}/stats?access_token=${member.access_token}`)
        .then(response => {
          resolve({
            type: 'stats',
            memberId: member.id,
            stravaId: member.stravaId,
            athleteStats: response.data
          })
        })
        .catch((error) => {
          reject(error);
        })
    })
  })

  const athleteActivitiesPromises = members.map((member) => {
    return new Promise((resolve, reject) => {
      axios.get(`${stravaApiUrl}/athlete/activities?per_page=200&after=1546300800&access_token=${member.access_token}`)
        .then(response => {
          resolve({
            type: 'activities',
            memberId: member.id,
            stravaId: member.stravaId,
            athleteActivities: response.data
          })
        })
        .catch((error) => {
          reject(error);
        })
    })
  })

  // return object of member, athleteData and athleteStatsData
  return Promise.all([
    ...athletePromises,
    ...athleteStatsPromises,
    ...athleteActivitiesPromises
  ])
    .then((data) => {
      return members.map((member) => {
        return {
          ...member,
          athlete: data.find((item) => {
            return (item.stravaId === member.stravaId && item.type === 'athlete')
          }).athlete,
          stats: data.find((item) => {
            return (item.stravaId === member.stravaId && item.type === 'stats')
          }).athleteStats,
          activities: data.find((item) => {
            return (item.stravaId === member.stravaId && item.type === 'activities')
          }).athleteActivities,
        }
      })
    })
    .catch((error) => {
      //reject(error)
      console.log(error);
    })
}