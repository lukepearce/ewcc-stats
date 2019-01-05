exports.handler = (event, context, callback) => {
  const { identity, user } = context.clientContext;
  const userID = user.sub;
  const userUrl = `${identity.url}/admin/users/${userID}`;
  const adminAuthHeader = "Bearer " + identity.token;

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(event),
  });
};