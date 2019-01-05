// export function(event, context, callback) {
//   const {identity, user} = context.clientContext;
//
//   // identity - url / token
//   // The URL is the endpoint for the underlying GoTrue API powering the
//   // Identity service. The token attribute is a short-lived admin token
//   // that can be used to make requests as an admin to the GoTrue API.
//
//   console.log(user);
//   console.log(identity);
// }

// import fetch from "node-fetch";
//
// exports.handler = async (event, context, callback) => {
//   const { identity, user } = context.clientContext;
//   const userID = user.sub;
//   const userUrl = `${identity.url}/admin/users/${userID}`;
//   const adminAuthHeader = "Bearer " + identity.token;
//
//   callback(null, {
//     statusCode: 200,
//     body: "Hello world!"
//   });
//
//   try {
//     return fetch(userUrl, {
//       method: "PUT",
//       headers: { Authorization: adminAuthHeader },
//       body: JSON.stringify({ app_metadata: { roles: ["superstar"] } })
//     })
//       .then(response => {
//         return response.json();
//       })
//       .then(data => {
//         console.log("Updated a user! 204!");
//         console.log(JSON.stringify({ data }));
//         return { statusCode: 204 };
//       })
//       .catch(e => return {...});
//   } catch (e) { return e; }
// };