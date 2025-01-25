// functions/Auth.js

const { parse } = require('querystring');

exports.handler = async (event, context) => {
  const { headers } = event;
  const auth = headers['authorization'];

  // Check if the authorization header exists and matches the expected credentials
  if (!auth || auth !== 'Basic ' + Buffer.from('username:password').toString('base64')) {
    return {
      statusCode: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Restricted Area"',
      },
      body: 'Unauthorized',
    };
  }

  // If authorized, continue with the request
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Authorized' }),
  };
};
